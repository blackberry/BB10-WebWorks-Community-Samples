i18n for bbui.js
================

this lib will add i18n support to bbui apps.

### Before you start

you should copy the files in `src` folder to your project ( I mean `i18n.js` and `translation.js` ), open `translation.js` , you'll fill your i18n data here.

see the example file:

```
// variable should be named "qstr" , do not change it.
var qstr={
    default:"en-US", //default must be provided.
    "en-US":{
        "title":"Collection",
        "clearhistory":"Clear History"
    },
    "zh-CN":{
        "title":"标题",
        "clearhistory":"清除数据"
    },
    'zh-TW':{
        "title":"標題"
        // other keys would be translated using default locale.
    }
}
```

`en-US` `zh-CN` `zh-TW` means different languages ( get your current device display language from blackberry.system.language ),edit your own i18n key/value pairs.

Note that the default language should have all the key/value pairs, for example , `zh-TW` is now empty, any i18n string that is not specified in the zh-TW language would use the default 'en-US' language key/value pairs. If there's no that key in default locale, the key would be quoted with `[]` to let you know.

### how to use


#### get system language

if you want to get the display language of the device, you'd add `com.blackberry.system` plugin to your webworks app.

```
webworks plugin add com.blackberry.system
```

#### import the lib and language resources 

import i18n.js and translation.js to your index.html.

```
<script src="js/i18n.js" type="text/javascript"></script>
<script src="js/translation.js" type="text/javascript" charset="UTF-8"></script>
```

note that translation.js should declare charset attribute.

#### edit your html files

use ` to wrap the i18n key in your webworks app, and add i18n to the tag, for example:

```
<div data-bb-type='title' data-bb-caption="`title`" i18n>
	<div i18n>`desc` blablablabla `desc`</div>
</div>
```

**Note**, you must specify `i18n"` to your tag element.

#### modify bb.init functions 

then, add the following code to your ***onscreenready*** function:

```
config.onscreenready = function(element, id) {
  i18n.process(element,blackberry.system.language);
}
```

Get your i18n app run now~~!!


### how to use in Javascript ?

Yes you can directly call : `i18n.get(keystring,locale)` to get the localized string in qstr.

for example:

```
var toast_text = i18n.get('toast','en-US');
```

### About me

I'm Merrick Zhang , ( BlackBerry Vendor : anpho ) , All my open-source code and apps can be found here: http://anpho.github.io
