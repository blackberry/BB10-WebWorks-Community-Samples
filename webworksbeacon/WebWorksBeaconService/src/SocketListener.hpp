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

#ifndef SOCKETLISTENER_HPP_
#define SOCKETLISTENER_HPP_

#include "common.hpp"

#include <QObject>
#include <QDir>
#include <QtNetwork/QTcpSocket>
#include <QtNetwork/QTcpServer>
#include <QRegExp>
#include <QCryptographicHash>
#include <unistd.h>
#include <stdint.h>
#include <arpa/inet.h>

#define LOCAL_SERVER_PORT (14354)
#define MASK_FIELD_OFF (0x00)
#define MASK_FIELD (0x80)
#define MASK_LEN (4)
#define FIN_FIELD (0x80)
#define RSV1_FIELD (0x40)
#define RSV2_FIELD (0x20)
#define RSV3_FIELD (0x10)
#define OPCODE_FIELD (0x0f)
#define LEN_FIELD (0x7f)
#define LEN_7BITS (125)
#define LEN_16BITS (126)
#define LEN_64BITS (127)
#define MASK_FF (0xff)
#define LEN_16BIT_MAX (0x7fff)
#define LEN_32BIT_MAX (0x7fffffff)
#define MAGIC_ACCEPTANCE_UUID "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"

#define OPCODE_CONTINUATION (0x00)
#define OPCODE_TEXT (0x01)
#define OPCODE_BINARY (0x02)
#define OPCODE_CLOSE (0x08)
#define OPCODE_PING (0x09)
#define OPCODE_PONG (0x0a)

class SocketListener
	: public QObject
{
	Q_OBJECT

public:
	virtual ~SocketListener();
    static SocketListener *getInstance(QObject *parent);
	void listen();

signals:
    void guiConnected();
    void guiDisconnected();
    void inboundMessage(const QString &message);

private slots:
	void onNewConnection();
	void onDisconnected();
	void onReadyRead();

public slots:
	void onMessageForGui(const QVariant &text);

private:
	SocketListener(QObject *parent = NULL);
    static SocketListener *_instance;
	void disconnectSocket();
	bool socketIsConnected();
    qint16 getSocketServerPort() const;
    bool webSocketIsConnected();
    bool webSocketIsNegotiated();
    void performWebSocketNegotiation(QByteArray data);
    QString webSocketPayload(QByteArray data);
    QString acceptanceKey(QString key);
    QByteArray createWsMessage(QByteArray data);

    int headerLength(QByteArray data);
    qint64 payloadLength(QByteArray data);
    bool headerIsValid(QByteArray data);

    QTcpServer *_server;
	QTcpSocket *_socket;
    qint16 _socketServerPort;
    bool _webSocketNegotiated;
};

#endif /* SOCKETLISTENER_HPP_ */
