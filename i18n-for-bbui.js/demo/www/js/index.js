/*
* Copyright 2014 BlackBerry Limited.
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

var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        console.log(id);
        app.bbuistart();
    },
    bbuistart: function() {
        var config;
        if (darkColoring) {
            config = {
                controlsDark: true,
                listsDark: true
            };
        } else {
            config = {
                controlsDark: false,
                listsDark: false,
                coloredTitleBar: true
            };
        }
        config.onscreenready = function(element, id) {
            console.log('Loading: ' + id);
            console.log('System Language is : ' + blackberry.system.language);
            
            
            /*
             * i18n support
             */
            i18n.process(element,blackberry.system.language);
            
            
            if (darkColoring) {
                var screen = element.querySelector('[data-bb-type=screen]');
                if (screen) {
                    screen.style['background-color'] = darkScreenColor;
                }
            }
        };

        config.ondomready = function(element, id, params) {
            
        };

        bb.init(config);
        if (darkColoring) {
            document.body.style['background-color'] = darkScreenColor;
            document.body.style['color'] = '#E6E6E6';
        }
        bb.pushScreen('main.html', 'main');
    }
};

function openAlert(){
    var i18ntext=i18n.get('inner','zh-CN');
    window.alert(i18ntext);
}