/* ===========================================================================
 * Panther.Carousel.js
 *
 * Jim Ing (@jim_ing)
 * ===========================================================================
 *
 * Copyright 2013 - 2014 BlackBerry Limited.
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

Panther.Carousel = (function () {
    function Carousel3D (el) {
        this.element = el;
        this.rotation = 0;
        this.panelCount = this.element.children.length;
        this.theta = 0;
        this.isHorizontal = true;

        // Custom properties
        this.backgroundColor = 'rgb(209, 209, 209)'; // light gray
        this.id = '';
        this.prevSideIndex = null;
        this.sideIndex = 0;
        this.maximized = [];
        this.prevStyle = {};
        this.callback = null;
        this.callbackBreak = false;
        this.isIE11 = navigator.userAgent.match(/Trident\/7\./);
    }

    /**
     *
     */
    Carousel3D.prototype.modify = function () {
        console.info('Carousel3D - modify:');
        var panel, angle, i, transformFn;

        this.panelCount = this.element.children.length;
        this.panelSize = this.element[this.isHorizontal ? 'offsetWidth' : 'offsetHeight'];
        this.rotateFn = this.isHorizontal ? 'rotateY' : 'rotateX';
        this.theta = 360 / this.panelCount;

        // Do some trig to figure out how big the carousel is in 3D space
        this.radius = Math.round((this.panelSize / 2) / Math.tan(Math.PI / this.panelCount));

        if (this.panelCount < 3) {
            alert('A 3D carousel requires at least 3 sides');
            return;
        }

        for (i = 0; i < this.panelCount; i++) {
            panel = this.element.children[i];
            angle = this.theta * i;
            panel.style.opacity = 1;
            panel.style.backgroundColor = this.backgroundColor;
            transformFn = this.rotateFn + '(' + angle + 'deg) translateZ(' + this.radius + 'px)';

            // TODO: add workaround for IE10+ since it doesn't support "transform-style: preserve-3d"
            //       need to animate child elements individually
            if (this.isIE11) {
                //transformFn = 'perspective (1050px) ' + transformFn;
            }

            // Rotate panel, then push it out in 3D space
            panel.style.WebkitTransform = transformFn;
            panel.style.MozTransform = transformFn;
            //panel.style.MsTransform = transformFn;
            panel.style.msTransform = transformFn;
            panel.style.OTransform = transformFn;
            panel.style.Transform = transformFn;
        }

        // Adjust rotation so panels are always flat
        this.rotation = Math.round(this.rotation / this.theta) * this.theta;
        this.transform();
    };

    /**
     *
     */
    Carousel3D.prototype.transform = function () {
        console.info('Carousel3D - transform:');

        var transformFn = 'translateZ(-' + this.radius + 'px) ' + this.rotateFn + '(' + this.rotation + 'deg)';
        // TODO:
        if (this.isIE11) {
            //transformFn = 'perspective (1050px) ' + transformFn;
        }

        // Push the carousel back in 3D space, and rotate it
        this.element.style.WebkitTransform = transformFn;
        this.element.style.MozTransform = transformFn;
        //this.element.style.MsTransform = transformFn;
        this.element.style.msTransform = transformFn;
        this.element.style.OTransform = transformFn;
        this.element.style.Transform = transformFn;

        this.prevSideIndex = this.sideIndex;

        // Figure out which side we're on
        var n = Math.abs(Math.ceil(this.rotation / 360)) + 1;
        if (this.rotation <= 0) {
            this.sideIndex = Math.abs(this.panelCount - (n * this.panelCount) - (this.rotation / this.theta));
        }
        else {
            this.sideIndex = Math.abs((n * this.panelCount) - (this.rotation / this.theta));
        }
        console.log('rotation=' + this.rotation, 'n=' + n, 'sideIndex=' + this.sideIndex, 'prevSideIndex=' + this.prevSideIndex);

        // Execute callback function
        if (this.callback && this.callbackBreak === false) {
            this.callback(this);
            // var r = confirm("Continue?");
            // if (r === true) {
            //     this.callback(this);
            // }
        }
    };

    /**
     * Custom
     */
    Carousel3D.prototype.addPanel = function (title, content) {
        console.info('Carousel3D - addPanel:');

        var figure = document.createElement('figure'),
            html = '';

        // TODO: allow markup to be passed in
        html += '<div class="panther-Carousel-panelTitleBar">';
        html += '<span class="panther-Carousel-panelTitle">&lt; ' + title + ' &gt;</span>';
        html += '<span class="panther-Carousel-panelMaximize">&nbsp;</span>';
        html += '</div>';
        html += '<div class="panther-Carousel-panelContent">';
        html += content;
        html += '</div>';

        figure.innerHTML = html;

        this.element.appendChild(figure);

        Panther.Carousel.refresh();
    };

    /**
     * Custom
     */
    Carousel3D.prototype.turn = function (side) {
        var angle = 360 / this.panelCount,
            rotation = -(angle * side - angle);

        console.info('Carousel3D - turn:', side, angle, rotation);

        if (side > this.panelCount) {
            console.warn(this.id + ' does not have a side ' + side );
            return;
        }

        this.rotation = rotation;
        this.transform();
    };

    var core = {
        pos: {
            x: {
                start: 0,
                end: 0
            }
        },

        all: {},

        /**
         *
         */
        init: function (opts) {
            console.info('Carousel - init:');

            if (!opts && opts.id) {
                return;
            }

            var el = document.getElementById(opts.id);

            // Create carousel
            var c = new Carousel3D(el);

            // TODO: add option to set titlebar color
            //console.log(c.element.children[0].children[0].style);
            //c.element.children[0].children[0].style.backgroundColor = '#000';

            if (opts) {
                for (var i in opts) {
                    //console.log(i, opts[i]);
                    c[i] = opts[i];
                }
            }
            console.log(c);

            c.modify();

            // Bind input listeners for swipe gestures
            var touch = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

            if (touch === true) {
                Panther.Carousel.addTouchListeners(el, c);

                // Refresh carousels on orientation change
                window.addEventListener('orientationchange', function () {
                    Panther.Carousel.refresh();
                }, false);
            }
            else {
                Panther.Carousel.addMouseListeners(el, c);

                // Refresh carousels on window resize
                var resizeTimeout;
                window.addEventListener('resize', function() {
                    clearTimeout(resizeTimeout);
                    resizeTimeout = setTimeout(function() {
                        Panther.Carousel.refresh();
                    }, 250);
                }, false);
            }

            Panther.Carousel.all[opts.id] = c;

            return c;
        },

        /**
         *
         */
        addMouseListeners: function (elem, c) {
            console.info('addMouseListeners', c.id);

            var mousestart = false;

            elem.addEventListener('mousedown', function (ev) {
                mousestart = true;
                Panther.Carousel.pos.x.start = ev.clientX;
                Panther.Carousel.inputstart(c, ev.clientX, ev.clientY, ev.timeStamp);
            }, false);

            elem.addEventListener('mousemove', function (ev) {
                if (!mousestart) return;
                Panther.Carousel.inputmove(c, ev.clientX, ev.clientY, ev.timeStamp);
            }, false);

            elem.addEventListener('mouseup', function (ev) {
                mousestart = false;
                if (ev.target.className == 'panther-Carousel-panelTitle') {
                    Panther.Carousel.pos.x.end = ev.clientX;
                    Panther.Carousel.inputend(c, ev.clientX, ev.clientY, ev.timeStamp);
                }
                else if (ev.target.className == 'panther-Carousel-panelMaximize') {
                    Panther.Carousel.toggleMaximize(ev);
                }
            }, false);
        },

        /**
         *
         */
        addTouchListeners: function (elem, c) {
            console.info('addTouchListeners', elem, c.element, c.id);

            elem.addEventListener('touchstart', function (ev) {
                if (ev.target.className == 'panther-Carousel-panelTitle') {
                    Panther.Carousel.pos.x.start = ev.changedTouches[0].clientX;
                    Panther.Carousel.inputstart(c, ev.changedTouches[0].clientX, ev.changedTouches[0].clientY, ev.timeStamp);
                }
                else if (ev.target.className == 'panther-Carousel-panelMaximize') {
                    Panther.Carousel.toggleMaximize(ev);
                }
            });

            elem.addEventListener('touchmove', function (ev) {
                if (ev.target.className == 'panther-Carousel-panelTitle') {
                    ev.preventDefault(); // need this for Android
                    ev.isScrollable = true; //
                    Panther.Carousel.inputmove(c, ev.changedTouches[0].clientX, ev.changedTouches[0].clientY, ev.timeStamp);
                }
            });

            elem.addEventListener('touchend', function (ev) {
                if (ev.target.className == 'panther-Carousel-panelTitle') {
                    //console.log(ev.type, ev);
                    Panther.Carousel.pos.x.end = ev.changedTouches[0].clientX;
                    Panther.Carousel.inputend(c, ev.changedTouches[0].clientX, ev.changedTouches[0].clientY, ev.timeStamp);
                }
            });
        },

        /**
         *
         */
        inputstart: function (c, x, y, timestamp) {
            //console.info('inputstart', x, y, timestamp);
            //document.getElementById('debug').innerHTML = 'inputstart: x=' + x + ', y=' + y;
        },

        /**
         *
         */
        inputmove: function (c, x, y, timestamp) {
            //console.info('inputmove', x, y, timestamp);
            //document.getElementById('debug').innerHTML += '<br>' + 'inputmove: x=' + x + ', y=' + y;
        },

        /**
         *
         */
        inputend: function (c, x, y, timestamp) {
            //console.info('inputend', x, y, timestamp);
            //document.getElementById('debug').innerHTML += '<br>' + 'inputend: x=' + x + ', y=' + y;

            //var minDragDistance = c.panelSize * 0.1; // px
            var minDragDistance = 16; // px
            var diff = Math.abs(Panther.Carousel.pos.x.end - Panther.Carousel.pos.x.start);
            //console.log('diff=' + diff, 'minDragDistance=' + minDragDistance);

            if (diff < minDragDistance) {
                return;
            }

            // left
            if (Panther.Carousel.pos.x.end < Panther.Carousel.pos.x.start) {
                c.rotation += c.theta * 1 * -1;
            }
            // right
            else {
                c.rotation += c.theta * -1 * -1;
            }

            c.transform();
        },

        /**
         *
         */
        refresh: function () {
            console.info('Carousel - refresh:');

            for (var i in Panther.Carousel.all) {
                Panther.Carousel.all[i].modify();
            }
        },

        /**
         *
         */
        toggleMaximize: function (param) {
            var cid = param.target.parentNode.parentNode.parentNode.id;
            var ctn = param.target.parentNode.parentNode.parentNode.parentNode;
            var i;
            console.info('Carousel - toggleMaximize:', cid, ctn.id);

            if (Panther.Carousel.all[cid].maximized !== true) {
                // Hide all carousels
                for (i in Panther.Carousel.all) {
                    document.getElementById(i).style.display = 'none';
                }

                // Maximize selected carousel
                ctn.style.top = '0';
                ctn.style.left = '0';
                ctn.style.width = '100%';
                ctn.style.height = '100%';
                ctn.style.zIndex = '200';

                // Unhide selected carousel
                document.getElementById(cid).style.display = '';

                Panther.Carousel.all[cid].maximized = true;
            }
            else {
                // Restore carousel to original properties in CSS by clearing JavaScript-set properties
                ctn.style.top = '';
                ctn.style.left = '';
                ctn.style.width = '';
                ctn.style.height = '';
                ctn.style.zIndex = '';

                // Unhide all carousels
                for (i in Panther.Carousel.all) {
                    document.getElementById(i).style.display = '';
                }

                Panther.Carousel.all[cid].maximized = false;
            }

            Panther.Carousel.refresh();
        },

        /**
         *
         */
        turnNext: function (carouselId) {
            if (!Panther.Carousel.all[carouselId]) {
                return;
            }
            console.info('Carousel - turnNext:', carouselId);

            var c = Panther.Carousel.all[carouselId];

            c.rotation += c.theta * 1 * -1;
            c.transform();
        },

        /**
         *
         */
        turnPrev: function (carouselId) {
            if (!Panther.Carousel.all[carouselId]) {
                return;
            }
            console.info('Carousel - turnPrev:', carouselId);

            var c = Panther.Carousel.all[carouselId];

            c.rotation += c.theta * -1 * -1;
            c.transform();
        },

        /**
         *
         */
        turnTo: function (carouselId, side, callback) {
            var carouselIds = [],
                cid;

            //console.log(typeof carouselId, carouselId instanceof Array);
            if (typeof carouselId == 'string') {
                carouselIds.push(carouselId);
            }
            else if (carouselId instanceof Array) {
                carouselIds = carouselId;
            }
            else {
                console.warn('Unexpected type', carouselId);
            }

            for (var i = 0, ii = carouselIds.length; i < ii; i++) {
                cid = carouselIds[i];

                if (!Panther.Carousel.all[cid]) {
                    console.warn(cid + ' does not exist');
                    break;
                }

                console.info('Carousel - turn:', cid, side);

                Panther.Carousel.all[cid].turn(side);

                if (callback) {
                    callback(cid, side);
                }
            }
        }
    };

    return core;
}());

