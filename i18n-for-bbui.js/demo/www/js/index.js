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