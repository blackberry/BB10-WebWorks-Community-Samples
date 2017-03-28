/*
 * Copyright (c) 2014 BlackBerry Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#include "SocketListener.hpp"

SocketListener *SocketListener::_instance;

SocketListener::SocketListener(QObject *parent)
	: QObject(parent)
	, _server(new QTcpServer(this))
	, _socket(NULL)
    , _socketServerPort(LOCAL_SERVER_PORT)
    , _webSocketNegotiated(false)
{
	if (QObject::connect(_server, SIGNAL(newConnection()),
			                this, SLOT(onNewConnection()))) {
		qDebug() << "SSSS Connected socket server signal" << endl;
		listen();
	} else {
		qDebug() << "SSSS Failed to connect socket server signal" << endl;
	}
}

SocketListener::~SocketListener() {
	if (_socket) {
		disconnectSocket();
		_socket->close();
		_socket->deleteLater();
	}
	if (_server) {
		_server->close();
		QObject::disconnect(_server, SIGNAL(newConnection()),
				               this, SLOT(onNewConnection()));
		_server->deleteLater();
	}
	_instance = NULL;
}

SocketListener *SocketListener::getInstance(QObject *parent)
{
    if (_instance == 0) {
        _instance = new SocketListener(parent);
    }
    return _instance;
}

void SocketListener::listen()
{

    qDebug() << "SSSS SocketListener::listen() - getSocketServerPort() " << getSocketServerPort() << endl;

    qDebug() << "SSSS Start listening" << endl;

    if (_server->isListening()) {
        qDebug() << "SSSS Server is already listening" << endl;
    } else {
        qDebug() << "SSSS Server is not listening" << endl;
    }

	if (_server->listen(QHostAddress::LocalHost, getSocketServerPort()) ) {
	    qDebug() << "SSSS Listen returned true" << endl;
	} else {
        qDebug() << "SSSS Listen returned false" << endl;
	}

    qDebug() << "SSSS QLocalServer info -         serverAddress() " << _server->serverAddress() << endl;
    qDebug() << "SSSS QLocalServer info -            serverPort() " << _server->serverPort() << endl;
    qDebug() << "SSSS QLocalServer info -           isListening() " << _server->isListening() << endl;
    qDebug() << "SSSS QLocalServer info - maxPendingConnections() " << _server->maxPendingConnections() << endl;
    qDebug() << "SSSS QLocalServer info - hasPendingConnections() " << _server->hasPendingConnections() << endl;
    qDebug() << "SSSS QLocalServer info -           serverError() " << _server->serverError() << endl;
    qDebug() << "SSSS QLocalServer info -           errorString() " << _server->errorString() << endl;
}

void SocketListener::onNewConnection()
{
	QTcpSocket *newSocket = _server->nextPendingConnection();

    qDebug() << "SSSS onNewConnection() - socket state=" << newSocket->state();

	if (newSocket->state() == QTcpSocket::ConnectedState) {
		qDebug() << "SSSS New connection from client";
	}

	if (!socketIsConnected()) {
		_socket = newSocket;
        _webSocketNegotiated = false;

		QObject::connect(_socket, SIGNAL(disconnected()),
	                        this, SLOT(onDisconnected()));
	    QObject::connect(_socket, SIGNAL(readyRead()),
	                        this, SLOT(onReadyRead()));
	    emit guiConnected();

	} else {
		newSocket->close();
	}
}

void SocketListener::onDisconnected()
{
	qDebug() << "SSSS Disconnected" << endl;

	disconnectSocket();
	_socket->close();
	_socket->deleteLater();
    _webSocketNegotiated = false;
	_socket = NULL;

	emit guiDisconnected();
}

void SocketListener::onReadyRead()
{
    qDebug() << "SSSS ReadBufferSize: " << _socket->readBufferSize() << endl;

    QByteArray readData = _socket->readAll();

	if (webSocketIsNegotiated()) {
        qDebug() << "SSSS Header is valid: " << headerIsValid(readData) << endl;
        qDebug() << "SSSS Header length: " << headerLength(readData) << endl;
        qDebug() << "SSSS Payload length: " << payloadLength(readData) << endl;
	    qDebug() << "SSSS Read: " << webSocketPayload(readData) << endl;

	    emit inboundMessage(webSocketPayload(readData));

	} else {
	    performWebSocketNegotiation(readData);
	}
}

void SocketListener::disconnectSocket()
{
	qDebug() << "SSSS disconnect Socket" << endl;

	QObject::disconnect(_socket, SIGNAL(disconnected()),
			               this, SLOT(onDisconnected()));
	QObject::disconnect(_socket, SIGNAL(readyRead()),
                           this, SLOT(onReadyRead()));
}

void SocketListener::onMessageForGui(const QVariant &text)
{
	if (webSocketIsConnected()) {
		qDebug() << "SSSS Message for GUI" << text.toString() << endl;

		QByteArray payLoad = createWsMessage(text.toString().toUtf8());

        qDebug() << "SSSS Sending Wworks Message - size/data " << payLoad.size() << "/" << payLoad.toHex() << endl;
        qDebug() << "SSSS Sending Wworks created message header valid:" << headerIsValid(payLoad) << endl;
        qDebug() << "SSSS Sending Wworks created message header length:" << headerLength(payLoad) << endl;
        qDebug() << "SSSS Sending Wworks created message data length:" << payloadLength(payLoad) << endl;

        _socket->write(payLoad.constData(), payLoad.size());

	} else {
		qDebug() << "SSSS Message for GUI - socket not connected" << endl;
	}
}

bool SocketListener::socketIsConnected()
{
	return ((_socket != NULL) && (_socket->state() == QTcpSocket::ConnectedState));
}

bool SocketListener::webSocketIsConnected()
{
    return (socketIsConnected() && webSocketIsNegotiated());
}

bool SocketListener::webSocketIsNegotiated()
{
    return _webSocketNegotiated;
}

qint16 SocketListener::getSocketServerPort() const
{
    return _socketServerPort;
}

void SocketListener::performWebSocketNegotiation(QByteArray data)
{
    qDebug() << "SSSS performWebSocketNegotiation() Read: " << data << endl;

/*
 * GET / HTTP/1.1
 * Upgrade: websocket
 * Connection: Upgrade
 * Host: localhost:14354
 * Origin: local://
 * Pragma: no-cache
 * Cache-Control: no-cache
 * Sec-WebSocket-Key: XD8QtHitNF2guK6oGN9lrQ==
 * Sec-WebSocket-Version: 13
 * Sec-WebSocket-Extensions: x-webkit-deflate-frame
 * User-Agent: Mozilla/5.0 (BB10; Touch) AppleWebKit/537.35+ (KHTML, like Gecko) Version/10.3.0.920 Mobile Safari/537.35+
 * <<< empty line >>>
 *
 */
    QString payLoad = QString(data);
    QString requestKey("");
    QString acceptKey("");

    QRegExp getRx("GET / HTTP/1.1");
    QRegExp upgradeRx("Upgrade:\\s+websocket");
    QRegExp connectionRx("Connection:\\s+Upgrade");
    QRegExp keyRx("Sec-WebSocket-Key:\\s+(.+==)");
    QRegExp versionRx("Sec-WebSocket-Version:\\s+(\\d+)");

    if (getRx.indexIn(payLoad) != -1) {
        qDebug() << "SSSS Received HTTP GET request" << endl;
    } else {
        qDebug() << "SSSS Received incorrect message during WebSockets negotiation:" << getRx.errorString() << endl;
        return;
    }

    if (upgradeRx.indexIn(payLoad) != -1) {
        qDebug() << "SSSS Received WebSocket Upgrade request" << endl;
    } else {
        qDebug() << "SSSS Received incorrect message during WebSockets negotiation:" << getRx.errorString() << endl;
        return;
    }

    if (connectionRx.indexIn(payLoad) != -1) {
        qDebug() << "SSSS Received WebSocket Connection parameter" << endl;
    } else {
        qDebug() << "SSSS Received incorrect message during WebSockets negotiation:" << getRx.errorString() << endl;
        return;
    }

    if ((versionRx.indexIn(payLoad) != -1) && (versionRx.cap(1).compare("13") == 0)) {
        qDebug() << "SSSS Sec-WebSocket-Version=" << versionRx.cap(1) << endl;
    } else {
        qDebug() << "SSSS Received incorrect WebSockets version during negotiation:" << getRx.errorString() << endl;
        return;
    }

    if (keyRx.indexIn(payLoad) != -1) {
        qDebug() << "SSSS Sec-WebSocket-Key=" << keyRx.cap(1) << endl;
        requestKey = keyRx.cap(1);
    } else {
        qDebug() << "SSSS Received incorrect WebSockets key during negotiation:" << getRx.errorString() << endl;
        return;
    }

    acceptKey = acceptanceKey(requestKey);

    qDebug() << "SSSS WebSocket - request key:" << requestKey << " Accept Key:" << acceptKey << endl;

    QString newLine = "\r\n";
    QString response = "HTTP/1.1 101 Switching Protocols" + newLine
                     + "Upgrade: websocket" + newLine
                     + "Connection: Upgrade" + newLine
                     + "Sec-WebSocket-Accept: " + acceptKey + newLine
                     + "Sec-WebSocket-Version: 13" + newLine + newLine
         ;

    qDebug() << "SSSS WebSocket - response:\n" << response << endl;

    _socket->write(response.toLatin1().constData(), response.toLatin1().size());

    _webSocketNegotiated = true;
}

int SocketListener::headerLength(QByteArray data)
{
    int length = 0;
    bool maskPresent;
    uint payloadLen7bits;

    if (!headerIsValid(data)) {
        return length;
    }

    length++;

    maskPresent = data[length] & MASK_FIELD;
    payloadLen7bits = (uint) data[length++] & LEN_FIELD;

    if (maskPresent) {
        length += 4;
    }

    if (payloadLen7bits == LEN_16BITS) {
        length += 2;
    }

    if (payloadLen7bits == LEN_64BITS) {
        length += 8;
    }

    return length;
}

qint64 SocketListener::payloadLength(QByteArray data)
{
    qint64 length = 0;
    uint payloadLen7bits;

    if (!headerIsValid(data)) {
        return length;
    }

    payloadLen7bits = (uint) data[1] & LEN_FIELD;

    if (payloadLen7bits == LEN_16BITS) {
        for (int i=0; i<2; i++) {
            length += ((qint64)((uint)data[2+i] & MASK_FF)) << (1-i)*8;
        }
        return length;
    }

    if (payloadLen7bits == LEN_64BITS) {
        for (int i=0; i<8; i++) {
            length += ((qint64)((uint)data[2+i] & MASK_FF)) << (7-i)*8;
        }
        return length;
    }

    length = payloadLen7bits;

    return length;
}

bool SocketListener::headerIsValid(QByteArray data)
{
    bool maskPresent;
    uint payloadLen7bits;

    if (data.size() < 2) {
        return false;
    }

    maskPresent = data[1] & MASK_FIELD;
    payloadLen7bits = (uint) data[1] & LEN_FIELD;

    if (!maskPresent && data.size() < 2) {
        return false;
    }

    if (maskPresent && data.size() < 6) {
        return false;
    }

    if (!maskPresent && payloadLen7bits == LEN_16BITS && data.size() < 4) {
        return false;
    }

    if (maskPresent && payloadLen7bits == LEN_16BITS && data.size() < 8) {
        return false;
    }

    if (!maskPresent && payloadLen7bits == LEN_64BITS && data.size() < 10) {
        return false;
    }

    if (maskPresent && payloadLen7bits == LEN_64BITS && data.size() < 14) {
        return false;
    }

    return true;
}

QString SocketListener::webSocketPayload(QByteArray data)
{
    qDebug() << "SSSS webSocketPayload() Read: " << data.toHex() << endl;
    qDebug() << "SSSS webSocketPayload() Header is Valid: " << headerIsValid(data) << endl;
    qDebug() << "SSSS webSocketPayload() Header Length: " << headerLength(data) << endl;
    qDebug() << "SSSS webSocketPayload() Payload Length: " << payloadLength(data) << endl;

    qint64 payloadLen = payloadLength(data);
    int headerLen = headerLength(data);

    QByteArray mask;

    bool fin = data[0] & FIN_FIELD;
    uint opcode = ((uint)data[0]) & OPCODE_FIELD;
    bool maskPresent = data[1] & MASK_FIELD;

    if (!maskPresent) {
        _socket->close();
        return QString("");
    }

    if (maskPresent) {
        for (int i = 0; i < MASK_LEN; i++ ) {
            mask[i] = data[headerLen-MASK_LEN+i];
        }
    }

    if (payloadLen > LEN_32BIT_MAX) { // messy -- but outside scope of this simple example
        payloadLen = LEN_32BIT_MAX;
    }

    QByteArray decodedPayload;
    for (int i = 0; i < (int)payloadLen; i++) {
        decodedPayload.append(data[i + headerLen] ^ mask[i % MASK_LEN]);
    }

    qDebug() << "SSSS webSocketPayload() FIN:" << fin << endl;
    qDebug() << "SSSS webSocketPayload() OpCode:" << opcode << endl;
    qDebug() << "SSSS webSocketPayload() MASK:" << mask.toHex() << endl;
    qDebug() << "SSSS webSocketPayload() Payload Length:" << payloadLen << endl;
    qDebug() << "SSSS webSocketPayload() Payload:" << QString(decodedPayload) << endl;

    if (opcode == OPCODE_PING) {
        qDebug() << "SSSS webSocketPayload() got a PING:" << endl;

        QByteArray response = QByteArray(data);

        response[0] = (char)((((uint)response[0] & (FIN_FIELD|RSV1_FIELD|RSV2_FIELD|RSV3_FIELD)) | OPCODE_PONG) & MASK_FF);

        _socket->write(response.constData(), response.size());

        qDebug() << "SSSS webSocketPayload() replied with a PONG:" << endl;

        return QString("");
    }

    if (opcode == OPCODE_CLOSE) {
        qDebug() << "SSSS webSocketPayload() got a CLOSE:" << endl;

        QByteArray response;

        response.append((char) (FIN_FIELD | OPCODE_CLOSE));
        response.append((char) 0);

        _socket->write(response.constData(), response.size());

        qDebug() << "SSSS webSocketPayload() replied with a CLOSE:" << endl;

        return QString("");
    }

    const char *utf8Payload = decodedPayload.constData();

    return QString::fromUtf8(utf8Payload, decodedPayload.size());
}

QByteArray SocketListener::createWsMessage(QByteArray data)
{
    uint8_t maskField = MASK_FIELD_OFF;
    uint8_t fin = FIN_FIELD;
    uint8_t opCode = OPCODE_TEXT;
    uint8_t length07bits = LEN_7BITS;
    uint8_t length16bits = LEN_16BITS;
    uint8_t length64bits = LEN_64BITS;

    QByteArray message;

    qDebug() << "SSSS webSocketPayload() data(text)" << QString(data) << endl;
    qDebug() << "SSSS webSocketPayload() data(Hex)" << data.toHex() << endl;

    message.append((uint8_t) (fin | opCode));

    if (data.length() <= length07bits) {
        message.append((uint8_t) (maskField | (data.length() & MASK_FF)));

    } else if (data.length() <= LEN_16BIT_MAX) {
        message.append((uint8_t) (maskField | length16bits));
        /*
         * Network order is defined as big-endian!
         */
        message.append((uint8_t) ((data.length() >> 8) & MASK_FF));
        message.append((uint8_t) (data.length() & MASK_FF));

    } else {
        message.append((uint8_t) (maskField | length64bits));
        /*
         * Network order is defined as big-endian!
         */
        for (int i=7; i>=4; i--) {
            message.append((char)0);
        }
        for (int i=3; i>=0; i--) {
            message.append((uint8_t) ((data.length() >>  i*8) & MASK_FF));
        }
    }

    for (uint i = 0; i < (uint)data.length(); i++) {
        message.append((uint8_t) data[i]);
    }

    return message;
}

QString SocketListener::acceptanceKey(QString key)
{
    return QCryptographicHash::hash(
                key.append(MAGIC_ACCEPTANCE_UUID).toLatin1(),
                QCryptographicHash::Sha1
            ).toBase64();
}
