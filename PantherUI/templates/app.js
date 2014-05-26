/* ===========================================================================
 * app.js
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

var app = {
    lorem: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales consequat lacus, ac lacinia odio ultrices at. Morbi congue volutpat hendrerit. In sit amet risus quis quam consectetur dignissim quis a magna. Nam facilisis lorem sit amet leo posuere consequat eget in sapien. Suspendisse in feugiat lacus. Aenean pretium enim non lectus adipiscing ut facilisis ante dictum. Sed laoreet augue ac felis mattis non egestas sapien vulputate. Aliquam condimentum justo non ipsum tristique commodo. Etiam dolor augue, eleifend vitae molestie id, semper consectetur libero. Nunc id sem odio, sed congue ante. Suspendisse pulvinar scelerisque sem, in porta elit tincidunt eu. Praesent suscipit ultrices nisi, id feugiat lacus mattis dapibus.',
        'Vestibulum at mauris sed lacus pretium euismod. Vivamus fermentum viverra iaculis. Vestibulum facilisis justo nisl, at ultrices sapien. Ut vulputate aliquam libero, vitae faucibus eros ultricies id. Nulla facilisi. Sed vehicula purus vitae tortor vestibulum vel volutpat neque volutpat. Praesent turpis purus, sodales quis cursus vitae, ultrices ut massa. Aenean aliquam pretium libero, eu consequat felis iaculis ut. Phasellus sollicitudin metus vitae nulla tincidunt a rhoncus magna gravida. Suspendisse nec urna orci. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;',
        'Pellentesque vel tellus in leo commodo aliquet. Nam ut volutpat urna. Aliquam id nibh leo. Pellentesque dignissim porta massa. Praesent nisi risus, blandit in tempus venenatis, interdum molestie est. In viverra nulla a velit venenatis at dignissim mauris pharetra. Nunc venenatis tellus quam, eget auctor magna. Praesent ullamcorper, dolor ornare vehicula malesuada, arcu lacus pretium nisl, at pulvinar est massa vitae eros. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec porta erat in nisl pulvinar hendrerit. Ut ut leo purus, nec scelerisque orci. Nam bibendum ullamcorper elit, et pharetra odio imperdiet id. Maecenas tempor lobortis velit, non faucibus turpis vestibulum eu. Curabitur suscipit, lorem condimentum bibendum volutpat, tellus mauris tempus elit, a consectetur enim arcu quis felis. In sit amet magna quis tortor dapibus cursus.',
        'Duis nec turpis sapien. Fusce in velit ante, eu fermentum massa. Nunc pretium pellentesque metus pharetra fringilla. Mauris at quam a dui condimentum sodales consectetur non sem. Phasellus in faucibus mauris. Maecenas tincidunt, quam nec hendrerit semper, magna urna volutpat enim, nec ultricies mauris orci ut magna. Cras eu turpis tortor. Nunc consequat malesuada velit ut euismod. Mauris porttitor magna in erat tincidunt auctor eu at quam. Cras in nulla quis nisl egestas sagittis. Proin luctus, augue et fringilla vestibulum, ipsum mauris venenatis libero, ac ullamcorper felis dolor egestas ante. Cras a est auctor risus accumsan aliquet.',
        'Praesent lacinia euismod vehicula. Donec sed ligula eget ligula pretium posuere. Sed vel suscipit sem. Donec semper luctus ipsum a vehicula. Vestibulum erat lacus, auctor porta pharetra vitae, accumsan sit amet justo. Aliquam non tortor in augue blandit feugiat vitae vitae mi. Nunc pharetra consectetur arcu.',
        'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce eget lobortis nisl. Donec ornare congue mi ut cursus. Vestibulum sit amet ornare eros. Ut pharetra, elit ac ultricies egestas, sapien sem hendrerit odio, eget luctus justo est sed est. Vivamus vulputate, lacus sed dictum tempus, sem erat viverra nisi, nec volutpat elit libero iaculis dui. Mauris tincidunt lorem nec diam condimentum at euismod diam commodo. Maecenas tincidunt velit vel risus ornare sodales. Sed quis sem dolor, non hendrerit sem. Praesent lectus urna, fringilla in lobortis tempor, congue vitae mauris. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed sem sapien, gravida ut eleifend at, consectetur a est. Praesent consectetur fermentum congue. Cras eleifend laoreet lectus vitae vehicula. Donec mollis, magna et gravida facilisis, elit nibh dignissim lorem, vel rhoncus magna arcu eu eros. Nullam placerat odio nec justo sagittis tristique.',
        'Curabitur nunc massa, lacinia quis ullamcorper quis, tempus eget elit. Mauris eu aliquam erat. Fusce dignissim sagittis eros, in sollicitudin lacus interdum non. Quisque velit est, placerat adipiscing fermentum eu, consequat eu purus. Suspendisse sed justo diam. Vestibulum erat justo, egestas eget tempus at, rhoncus eu arcu. Vestibulum non mi massa. Donec dui sem, elementum in pellentesque et, ultricies sit amet dui. Nullam purus ante, dignissim eu luctus non, vulputate eu turpis. Duis sollicitudin vulputate sollicitudin. Aliquam erat volutpat. Nunc tempor nisi eget nisi fermentum in pellentesque lorem feugiat.',
        'Etiam nisi ipsum, lacinia eget rutrum id, rhoncus id nisl. Proin eu sem vel ligula dapibus gravida ut commodo risus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris rhoncus aliquet elit, quis bibendum turpis rhoncus dictum. Curabitur pharetra, diam a elementum sollicitudin, nibh nunc tristique lorem, eu sagittis dolor sapien id nulla. Vestibulum hendrerit ligula in ipsum gravida eget cursus velit congue. Vestibulum sollicitudin, urna sit amet gravida pretium, enim felis vehicula erat, sed consectetur metus nunc a risus. Vestibulum eu tortor quam. Aliquam vitae lorem eu nisl imperdiet facilisis nec molestie mi. Fusce convallis laoreet neque quis blandit. Donec nec neque nisi. Donec quis dolor metus, ut rhoncus erat.',
        'Praesent ornare purus quis dui pharetra hendrerit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris ac magna lectus. Donec nibh mi, euismod eget consectetur et, cursus sed augue. Sed rhoncus interdum ornare. Curabitur vel arcu augue. Sed dapibus leo a ipsum congue at vestibulum dui varius. Aliquam ut ipsum purus, sed scelerisque odio. Integer massa tortor, blandit id aliquam id, pellentesque quis est. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'Praesent eleifend tellus id felis tempus mattis. Nunc fringilla urna purus. Morbi interdum leo et sapien consectetur varius nec blandit magna. Phasellus viverra malesuada elit, eget fringilla nulla feugiat at. Nulla et elit a arcu posuere egestas. Proin dictum orci sed justo dapibus porta sit amet tincidunt lacus. Praesent sit amet mauris risus, vel ullamcorper nisl.',
        'Aliquam sem sapien, congue vitae vestibulum vel, accumsan eget est. Suspendisse dictum lorem at magna pharetra semper. Sed convallis magna in nisi rutrum auctor. Aliquam egestas pellentesque sem non posuere. Mauris ultricies neque tellus. Fusce hendrerit ipsum sed nisl fermentum ac pharetra sem blandit. Ut ut interdum eros. Fusce dictum auctor nisi, quis feugiat purus mattis nec. In suscipit est nec magna vehicula volutpat. Fusce laoreet lacus tellus. Ut pharetra congue tellus, in suscipit eros interdum at. Nullam eget tellus et ipsum vestibulum euismod. Sed consectetur libero et nisl hendrerit ut ultrices libero dignissim. Duis vehicula elit scelerisque diam suscipit sit amet posuere augue interdum.',
        'Ut eget neque nulla. Sed fringilla dui vitae augue luctus sollicitudin. Nulla facilisi. Donec hendrerit feugiat risus sit amet lacinia. Nam molestie ante nec nisi pharetra pellentesque. Vestibulum in mi ac orci semper dapibus vel in orci. Integer eget tellus vel ante mattis ultrices. Vivamus sagittis blandit urna. In porttitor, arcu sed sodales fermentum, magna odio imperdiet metus, a commodo augue ipsum ac felis.',
        'Phasellus quis neque neque. Etiam aliquet ullamcorper mattis. Suspendisse dignissim posuere viverra. Nam mauris nunc, convallis id porta interdum, placerat ac ante. Nunc gravida facilisis nisi, dapibus consequat arcu vestibulum in. Ut laoreet, nisl malesuada volutpat facilisis, lorem risus consequat magna, ut pellentesque leo risus eu risus. Integer ullamcorper metus sit amet erat vulputate lacinia. Nam eget elit neque, lacinia tempus velit. Phasellus eu lorem augue, et elementum sapien. Quisque varius placerat congue. Phasellus dignissim mauris vel eros venenatis adipiscing. Phasellus mollis, felis et molestie consectetur, nisl nisi vehicula magna, eget eleifend eros sem in metus.',
        'Nunc porta eleifend pharetra. Fusce tortor risus, vestibulum aliquet consectetur sed, vestibulum eu dolor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec mattis commodo nulla. Curabitur vel justo massa. Mauris gravida lacus leo, non porta metus. Fusce enim mi, egestas at commodo id, sagittis id augue. Curabitur eleifend vestibulum magna vitae vestibulum. Integer a mi at dolor imperdiet ultricies et faucibus ligula. Maecenas venenatis, augue a euismod suscipit, arcu purus mollis turpis, vitae elementum mi neque non lectus. Praesent nisi nulla, mattis non aliquet nec, ultrices non sapien. Praesent feugiat mattis mauris, eget vulputate mauris mattis id. Fusce malesuada, metus quis dictum eleifend, dui nisi fermentum mi, nec pellentesque mi nunc sed lacus. Quisque rutrum dolor sed nisl dignissim et luctus nibh varius. Proin laoreet ligula eu sapien pharetra pretium.',
        'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed vitae enim est. Nam in nulla ornare ante venenatis iaculis at vel tortor. Nullam sed pretium ante. Praesent eget enim quis nunc eleifend imperdiet. Integer placerat dignissim lorem, ut condimentum tortor mollis vitae. Mauris a magna orci. Aenean elementum tristique tristique. Nulla facilisi. Ut consectetur libero nec nibh aliquet sed semper eros aliquet.',
        'Donec sagittis dolor vel magna fringilla eleifend. Sed a mattis nulla. Vestibulum commodo ultricies nunc sed semper. Duis ut odio orci, a accumsan magna. Sed condimentum faucibus laoreet. Proin mattis arcu non ante aliquam ut sagittis lacus rhoncus. Suspendisse sit amet nibh a augue rutrum dapibus. Sed sit amet mollis leo. Nulla facilisi. Quisque accumsan faucibus urna, vitae vestibulum nunc condimentum ut. Duis vitae rhoncus justo. Vivamus urna orci, placerat vel placerat ut, accumsan quis purus.',
        'Aliquam et nisl nulla, at lacinia lectus. Nam nulla massa, rutrum a venenatis vel, lacinia ut sapien. Curabitur justo est, ultricies vel iaculis eu, pretium ac justo. Nam erat erat, venenatis in accumsan non, laoreet a lorem. Mauris justo massa, bibendum ac scelerisque ac, iaculis in sem. Aliquam pellentesque lacinia est at tincidunt. Phasellus consequat leo et sem semper vitae sodales risus fermentum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer neque nibh, varius at accumsan ut, semper a nulla. Sed id velit sed magna pulvinar elementum rutrum in lorem. Nullam a dapibus metus. Nam scelerisque lectus et elit viverra aliquam. Maecenas rhoncus metus eget nulla faucibus vitae adipiscing lectus pulvinar. Mauris a mi id dolor tempus sollicitudin. Integer pharetra nunc ac neque auctor scelerisque. Nulla nunc neque, faucibus vitae rutrum molestie, aliquam eget urna.',
        'Vestibulum justo purus, dignissim sit amet accumsan et, fermentum sed purus. Donec rutrum turpis sit amet diam cursus pellentesque. Mauris pulvinar convallis dictum. Mauris ac ligula ut nulla adipiscing ornare. Etiam euismod augue eu sapien rhoncus non tincidunt augue vehicula. Cras velit felis, condimentum accumsan egestas a, consectetur et massa. Suspendisse aliquet ante sed quam bibendum in condimentum elit fermentum. Aliquam viverra scelerisque nulla id iaculis. Fusce luctus posuere risus, sit amet aliquet urna dapibus sodales. Aliquam erat volutpat. Etiam in nibh quis lacus bibendum facilisis. Curabitur non orci convallis tortor varius fringilla non vitae tellus. Nulla commodo urna justo. Aliquam dictum arcu at libero convallis eleifend. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec vitae nulla id turpis tempor suscipit sit amet ut lectus.',
        'In id tellus nec nisl cursus adipiscing in vitae erat. Phasellus non metus quis quam pharetra mollis. Quisque dolor dui, hendrerit sed facilisis pretium, hendrerit sed urna. Aliquam imperdiet elit tortor. Donec ut scelerisque sem. Donec a pulvinar nisi. Proin augue purus, porta et aliquam sed, volutpat nec dolor. Praesent ut lectus lectus. Quisque dignissim, dolor nec tincidunt scelerisque, lectus erat convallis nunc, sit amet interdum enim arcu id sem. Morbi ornare quam quis velit consequat sit amet ornare eros dapibus. Mauris a purus sagittis lorem rhoncus fermentum.',
        'Aenean facilisis pellentesque sem vel dictum. Duis vel ante lacus. Aliquam sed tristique enim. Fusce vel lacus tellus, vitae accumsan mauris. Fusce volutpat pellentesque arcu sed condimentum. Quisque sit amet magna eu ligula laoreet laoreet tristique a dolor. Morbi mollis ante vitae odio aliquam auctor. Cras ac molestie lectus. Pellentesque vestibulum ipsum a purus ultrices adipiscing. Sed auctor elit et tellus adipiscing iaculis. Maecenas mi augue, malesuada vel porta et, mattis vitae velit. Sed et tortor metus. Proin faucibus ullamcorper eros, et placerat orci suscipit ut. Nulla et ipsum massa, rhoncus bibendum mi. Duis id turpis neque, in tristique nisi. Suspendisse consequat iaculis diam.'
    ]
};

/**
 *
 */
app.init = function () {
    console.info('app - init:', screen.width + 'x' + screen.height);

    document.getElementById('debug').innerHTML += navigator.userAgent + '<br>';
    document.getElementById('debug').innerHTML += window.innerWidth + 'px &times; ' + window.innerHeight + 'px, devicePixelRatio=' + window.devicePixelRatio + '<br>';

    if (navigator.userAgent.match(/WebWorks-BB10/)) {
        document.getElementById('appname').innerHTML = blackberry.app.name + ' v.' + blackberry.app.version;
    }

    // Generate sample list content
    var htmlList = '<ul>',
        digits, lastDigit;

    for (var i = 0, ii = 250; i < ii; i++) {
        digits = i.toString();
        lastDigit = digits.substr(digits.length - 1, digits.length);
        //console.log(digits, lastDigit);
        htmlList += '<li>' + (i + 1) + '. '  + app.lorem[lastDigit].substr(0, 128) + '</li>';
    }
    htmlList += '</ul>';

    var htmlLorem = '', k;
    for (var j = 0, jj = app.lorem.length; j < jj; j++) {
        htmlLorem += '<p>' + app.lorem[j] + '</p>';
    }

    // Update panel content for Carousel 1
    var c1_panels = document.querySelectorAll('#carousel1>figure>div[class=panther-Carousel-panelContent]');

    c1_panels[1].innerHTML = htmlList;
    c1_panels[2].innerHTML = htmlLorem;
    c1_panels[3].innerHTML = htmlLorem;
    c1_panels[4].innerHTML = htmlLorem;
    c1_panels[5].innerHTML = htmlLorem;
    c1_panels[6].innerHTML = htmlLorem;
    c1_panels[7].innerHTML = htmlLorem;
    c1_panels[8].innerHTML = htmlLorem;
    c1_panels[9].innerHTML = 'Hello World!';

    Panther.init();

    // Initialize carousels
    Panther.Carousel.all['carousel1'] = Panther.Carousel.init({
        id: 'carousel1',
        //backgroundColor: 'rgba(0, 152, 240, 0.9)' // blue
        //backgroundColor: 'rgba(111, 197, 248, 0.9)' // light blue
        //backgroundColor: 'rgba(230, 212, 167, 0.9)' // Kayak
        backgroundColor: 'rgba(239, 228, 189, 0.9)' // Japanese Garden
    });

    Panther.Carousel.all['carousel2'] = Panther.Carousel.init({
        id: 'carousel2',
        //backgroundColor: 'rgba(150, 184, 0, 0.9)' // green
        //backgroundColor: 'rgba(198, 220, 99, 0.9)' // light green
        //backgroundColor: 'rgba(168, 173, 128, 0.9)' // Kayak
        backgroundColor: 'rgba(186, 178, 147, 0.9)' // Japanese Garden
    });

    Panther.Carousel.all['carousel3'] = Panther.Carousel.init({
        id: 'carousel3',
        isHorizontal: false,
        //backgroundColor: 'rgba(163, 13, 126, 0.9)' // purple
        //backgroundColor: 'rgba(209, 103, 183, 0.9)' // light purple
        //backgroundColor: 'rgba(93, 145, 125, 0.9)' // Kayak
        backgroundColor: 'rgba(163, 151, 112, 0.9)' // Japanese Garden
    });

    // Enable visibility after the carousels are created to avoid the flicker
    app.toggleCarousels('visible');

    //console.log(Panther.Carousel);
};

/**
 *
 */
app.addPanel = function (elemId, turn) {
    console.info('app - addPanel:', elemId);

    var num = Panther.Carousel.all[elemId].panelCount + 1,
        polygonNames = {
            3: 'triangle',
            4: 'quadrilateral',
            5: 'pentagon',
            6: 'hexagon',
            7: 'heptagon',
            8: 'octagon',
            9: 'nonagon',
            10: 'decagon',
            11: 'hendecagon',
            12: 'dodecagon',
            13: 'tridecagon or triskaidecagon',
            14: 'tetradecagon',
            15: 'pentadecagon, pentakaidecagon or quindecagon',
            16: 'hexadecagon or hexakaidecagon',
            17: 'heptadecagon, heptakaidecagon, or septadecagon',
            18: 'octadecagon or octakaidecagon',
            19: 'enneadecagon, enneakaidecagon, or nonadecagon',
            20: 'icosagon',
            30: 'triacontagon',
            40: 'tetracontagon',
            50: 'pentacontagon',
            60: 'hexacontagon',
            70: 'heptacontagon',
            80: 'octacontagon',
            90: 'enneacontagon or nonacontagon',
            100: 'hectagon'
        },
        polygonName = (polygonNames[num]) ? ' (' + polygonNames[num] + ')' : '',
        html = '';

    for (var j = 0, jj = app.lorem.length; j < jj; j++) {
        html += app.lorem[j];
    }

    Panther.Carousel.all[elemId].addPanel(num, html);

    if (turn === true) {
        Panther.Carousel.turnTo(elemId, (Panther.Carousel.all[elemId].panelCount));
    }

    // Update the description for number of sides
    if (document.getElementById(elemId + '_desc')) {
        document.getElementById(elemId + '_desc').innerHTML = num + '-sided' + polygonName;
    }
};

/**
 *
 */
app.toggleCarousels = function (prop) {
    console.info('app - toggleCarousels:');

    document.querySelectorAll('.panther-Carousels')[0].style.visibility = prop;
};
