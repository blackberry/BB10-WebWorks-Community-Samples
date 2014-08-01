cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.blackberry.invoke/www/client.js",
        "id": "com.blackberry.invoke.client",
        "merges": [
            "blackberry.invoke"
        ]
    },
    {
        "file": "plugins/com.blackberry.invoke/www/btoa.js",
        "id": "com.blackberry.invoke.btoa",
        "merges": [
            "blackberry.invoke.btoa"
        ]
    },
    {
        "file": "plugins/com.blackberry.invoked/www/client.js",
        "id": "com.blackberry.invoked.client",
        "clobbers": [
            "blackberry.invoked"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.blackberry.invoke": "1.0.0",
    "com.blackberry.invoked": "1.0.0"
}
// BOTTOM OF METADATA
});