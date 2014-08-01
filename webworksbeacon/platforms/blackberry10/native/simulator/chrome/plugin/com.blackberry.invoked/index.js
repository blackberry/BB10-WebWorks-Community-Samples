/*
 * Copyright 2011-2012 Research In Motion Limited.
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
var _actionMap = {
        invoked: {
            context: require("./invocationEvents"),
            event: "invoked",
            trigger: function (pluginResult, request) {
                var onInvokedInfo = JSON.parse(request);

                // Workaround for double invoke bug
                if (onInvokedInfo.uri !== "invoke://localhost") {
                    pluginResult.callbackOk(onInvokedInfo, true);
                }
            }
        },
        oncardresize: {
            context: require("./invocationEvents"),
            event: "oncardresize",
            trigger: function (pluginResult, info) {
                pluginResult.callbackOk(info, true);
            }
        },
        oncardclosed: {
            context: require("./invocationEvents"),
            event: "oncardclosed",
            trigger: function (pluginResult, info) {
                pluginResult.callbackOk(info, true);
            }
        }
    },
    _listeners = {};

module.exports = {
    cardResizeDone: function (success, fail, args, env) {
        var result = new PluginResult(args, env);
        try {
            window.qnx.webplatform.getApplication().invocation.cardResized();
            result.noResult(true);
        } catch (e) {
            result.error(e, false);
        }
    },

    cardStartPeek: function (success, fail, args, env) {
        var cardPeek,
            result = new PluginResult(args, env);

        try {
            cardPeek = decodeURIComponent(args.peekType);
            window.qnx.webplatform.getApplication().invocation.cardPeek(cardPeek);
            result.noResult(true);
        } catch (e) {
            result.error(e, false);
        }
    },

    cardRequestClosure: function (success, fail, args, env) {
        var request,
            result = new PluginResult(args, env);

        try {
            request = JSON.parse(decodeURIComponent(args.request));
            window.qnx.webplatform.getApplication().invocation.sendCardDone(request);
            result.noResult(true);
        } catch (e) {
            result.error(e, false);
        }
    },

    startEvent: function (success, fail, args, env) {
        var result = new PluginResult(args, env),
            eventName = JSON.parse(decodeURIComponent(args.eventName)),
            context = _actionMap[eventName].context,
            invokedEvent = _actionMap[eventName].event,
            listener = _actionMap[eventName].trigger.bind(null, result);

        if (!_listeners[eventName]) {
            _listeners[eventName] = {};
        }

        if (_listeners[eventName][env.webview.id]) {
            result.error("Underlying listener for " + eventName + " already already running for webview " + env.webview.id);
        } else {
            context.addEventListener(invokedEvent, listener);
            _listeners[eventName][env.webview.id] = listener;
            result.noResult(true);
        }
    },

    stopEvent: function (success, fail, args, env) {
        var result = new PluginResult(args, env),
            eventName = JSON.parse(decodeURIComponent(args.eventName)),
            listener = _listeners[eventName][env.webview.id],
            context = _actionMap[eventName].context,
            invokedEvent = _actionMap[eventName].event;

        if (!listener) {
            result.error("Underlying listener for " + eventName + " never started for webview " + env.webview.id);
        } else {
            context.removeEventListener(invokedEvent, listener);
            delete _listeners[eventName][env.webview.id];
            result.noResult(false);
        }
    }
};

