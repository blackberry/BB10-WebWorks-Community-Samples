# WebWorks Tag Reading

This library allows WebWorks to handle tag reading in pure JavaScript. No extensions are required - tags are delivered through the Invocation Framework.

## Features

* Parse NDEF messages.
* Build NDEF messages.
* Logic to access fields of well known NDEF messages.
* Raw data access to break out content in fields of not so well known messages.

## Using

The following shows steps to use the library.

### config.xml

BlackBerry 10 delivers NDEF tag reads to applications via the Invocation Framework.

```xml
<rim:invoke-target id="com.robwilliams.d20121122.ww.a">
	<type>APPLICATION</type>
	<filter>
		<action>bb.action.OPEN</action>
		<mime-type>application/vnd.rim.nfc.ndef</mime-type>
		<property value="ndef://1,ndef://2,ndef://4" var="uris" />
	</filter>
</rim:invoke-target>
```

* `com.robwilliams.d2012112.ww.a` - this is an ID which must be unique. Please don't use `robwilliams` IDs.
* `application/vnd.rim.nfc.ndef` - this is the MIME type used internally to identify NDEF tags.
* `ndef://1,ndef://2,ndef://4` - this shows interest in `WELL KNOWN` (1), `MEDIA` (2) and `EXTERNAL` (4) tags.  
You can provide a finer filter here. Try `ndef://1/Sp` will limit to Smart Posters (Sp)  

### index.html

In your html or JavaScript you should register an invocation handler. You can then use this library to parse the records.

Although not necessary, I've created conventient names for some variables to make typing easier;
```javascript
var WELL_KNOWN = blackberrynfc.ndef.tnf.WELL_KNOWN;
var decodeRecords = blackberrynfc.ndef.message.decodeRecords;
```

Inside the invocation handler, check that the invocation you've received is for the correct target;
```javascript
	function onInvoked(onInvokedInfo) {
		try {
			if ("com.robwilliams.d20121122.ww.a" == onInvokedInfo.target
					&& onInvokedInfo.data) {
```

Decode the record(s);
```javascript
// Convert the bytes to records.
var records = decodeRecords(onInvokedInfo.data);
```

Look for a record that is the type you're interested in;
```javascript
if (records.length > 0) {
	var record = records[0];
	if (record.isType(WELL_KNOWN, "Sp")) {
```

Enjoy the NDEF goodness;
```javascript
alert("Read a smart poster\n" + record.getText() + "\n"
	+ record.getURI());
```

## More Information

See the tests under `js/test` for ways to create and extract information from tags.

