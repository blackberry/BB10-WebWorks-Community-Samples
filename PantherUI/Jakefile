desc("runs build");
task("default", ["build"], function () {});

desc("combines the source files");
task("build", [], function () {

    console.log("Building PantherUI...");

    var fs = require('fs'),
        zlib = require('zlib'),
        gzip = zlib.createGzip(),
        ginp = "",
        gout = '',
        childProcess = require('child_process'),
        outputCSS = "",
        outputJS = "";

    console.log(" - including Carousel.css");
    outputCSS += fs.readFileSync("lib/modules/Carousel/Carousel.css", "utf-8");

    console.log("writing: PantherUI.css");
    fs.writeFileSync("dist/PantherUI.css", outputCSS);

    console.log("minifying: PantherUI.css");
    childProcess.exec("cleancss -o dist/PantherUI.min.css dist/PantherUI.css", complete);

    console.log("gzipping: PantherUI.min.css");
    //setTimeout(function(){
        ginp = fs.createReadStream('dist/PantherUI.min.css');
        gout = fs.createWriteStream('dist/PantherUI.min.css.gz');
        ginp.pipe(gzip).pipe(gout);
        console.log("Build CSS Complete.");
    //}, 2000);

    console.log(" - including Panther.js");
    outputJS += fs.readFileSync("lib/Panther.js", "utf-8");

    console.log(" - including Panther.Carousel.js");
    outputJS += fs.readFileSync("lib/modules/Carousel/Panther.Carousel.js", "utf-8");

    console.log("writing: PantherUI.js");
    fs.writeFileSync("dist/PantherUI.js", outputJS);

    console.log("minifying: PantherUI.js");
    childProcess.exec("uglifyjs dist/PantherUI.js > dist/PantherUI.min.js", complete);

    console.log("gzipping: PantherUI.min.js");
    //setTimeout(function(){
        ginp = fs.createReadStream('dist/PantherUI.min.js');
        gout = fs.createWriteStream('dist/PantherUI.min.js.gz');
        ginp.pipe(gzip).pipe(gout);
        console.log("Build JS Complete.");
    //}, 4000);
}, true);
