## Background

>   This sample's primary intent is to serve as a *Getting Started* sample
>   for Cocos2d-HTML5 with BlackBerry 10. In this sample, a few key concepts
>   have been implemented including: Cocos2d-HTML5 initialization, parsing
>   TMX files, Box2DWeb implementation, Web Workers, and more. See the
>   *Key Features* section for complete details.
>   
>   If you have any feedback or find any issues, please feel free to report
>   them in the Issues section, or contact me directly via Twitter:
>   @WaterlooErik

## Key Features

### Cocos2d-HTML5 with BlackBerry 10
>   
>   This sample provides a basic skeleton implementation of the following files:
>   *   **config.xml:** Defines the basic properties (name, content, etc.) for our BlackBerry 10 WebWorks/HTML5 application.
>   *   **index.html:** Our main content to load, initializes WebWorks and kicks off Cocos2d-HTML5.
>   *   **main.js:** Creates our Cocos2d-HTML5 application and preloads our resources.
>   *   **SceneStart.js:** Initiates our main Cocos2d-HTML5 Scene and Layer, and kicks off the physics Web Worker.
>   
>   Because this is a sample intended for the BlackBerry platform, to run this application on a desktop browser you will need to either:
>   *   Modify **index.html** to explicitly call **onwebworksready();** instead of adding the event listener; or
>   *   Leverage the [Ripple Emulator](https://developer.blackberry.com/html5/download/) in Chrome for the missing WebWorks functionality.
>   
>   To successfully compile this application, there are two approaches. First, if you've cloned this repository from Github, you're
>   already set as the **BB10-WebWorks-Community-Samples/Boxquest/cocos** folder should already be populated. You can also copy
>   the **cocos** folder to the appropriate **tutorials** to allow them to run as well. This is possible since the
>   Cocos2d-HTML5 framework is included as a submodule in Github and *is the recommended approach*.
>   
>   Alternatively, you can download the Cocos2d-HTML5 framework from Github, however for best results please use this
>   specific version: https://github.com/cocos2d/cocos2d-html5/tree/a02ffc496de71ec3c51a98ce4a71dffaab0a69e8
>   
>   Once downloaded, the process would be the same; specifically to copy the Cocos2d-HTML5 framework into the **cocos**
>   subfolders of the main project and tutorials. For reference, the file structure should be that **cocos2d** is a direct
>   child of the **cocos** folder.

### Virtual Controls (Freewill.js)
>   
>   Freewill.js is a Joystick and Button framework intially developed for Cocos2d-HTML5. It was then generalized to be framework
>   agnostic while developing [PeaksAndValleys](https://github.com/blackberry/WebGL-Samples/tree/master/PeaksAndValleys). There have been some
>   slight modifications to meet the requirements for this sample, but ultimately Freewill.js can be leveraged in any HTML5 application
>   requiring virtual controls. For a basic sample implementation, please see: https://github.com/oros/Freewill.js
>   
>   The code is currently commented out, but if you would like to use the keyboard to control the hero, you can make the modifications
>   in SceneStart.js to accept keyboard input instead of leveraging Freewill.js.

### Box2DWeb Implementation
>   
>   Note that Cocos2d-HTML5 inclusion of Box2D is actually disabled in **index.html**.
>   This was done to preserve control over which version of Box2D is being used within this sample.
>   Instead Box2DWeb version 2.1.a.3 was downloaded from the following URL and imported directly into Box2dWebWorker.js:
>   http://box2dweb.googlecode.com/svn/trunk/

### Web Workers
>   
>   On the initial implementation of Box2dWeb, I experienced a lot of issues with objects falling through walls and missing collisions.
>   I also noticed that when the implementation was tested outside of the Cocos2d-HTML5 framework, these issues did not occur.
>   Initially, I had been performing the physics calculations within a scheduled update function in my primary Cocos2d-HTML5 Layer.
>   
>   It seems that there may be some timing issues with Cocos2d-HTML's update and the requirements of Box2DWeb's update implementations.
>   Upon moving all of Box2dWeb's initialization and processing into a separate Web Worker, all collision issues disappeared.
>   
>   While this requires passing values between the main application thread and Web Worker to maintain object positions and orientations,
>   the end result is a fully functioning implementation with the bonus of putting less strain on the main application thread where UI
>   and rendering occur.

### TMX Importing
>
>   TMX files can be created using [Tiled](http://www.mapeditor.org/) and store tilemap information that can be loaded into a Cocos2d-HTML5 application.
>   There were a few issues encountered however when loading a TMX file on the BlackBerry platform:
>   
>   ***The TMX object (cc.TMXTiledMap) would not actually display the TMX image until a refresh was completed. This is an issue for a BlackBerry WebWorks application where you do not have any browser navigation at hand.***
>   
>   To counter the image display, instead of adding a cc.TMXTiledMap to the Layer, we actually add a cc.Sprite with a picture of the tilemap. [Tiled](http://www.mapeditor.org/) permits you to export an
>   image of the tilemap, so this part was relatively easy. We do still process the cc.TMXTiledMap object behind the scenes when creating our walls with Box2DWeb and placing
>   various objects (spawns, coins, etc.) around the world.
>   
>   ***The TMX extension on the filename was causing the Ripple Emulator to associate an improper MIME type and fail loading.***
>   
>   A TMX file is actually just an XML file with a custom name, so to counter the Ripple Emulator issue, I simply renamed the exported TMX file to XML, and
>   loaded that into the Cocos2d-HTML5 application instead of the TMX version. The underlying files are exactly the same, it is simply the extension that changes.

### Custom Level Creation with [Tiled](http://www.mapeditor.org/)
>   
>   As noted, [Tiled](http://www.mapeditor.org/) was used to create the TMX file that contains the information about the world. Our application then processes that TMX file and generates the
>   world at runtime. As such, it is possible to replace the existing TMX file with your own version. To get a better understanding of how this file was created,
>   it would be simplest to view **0-0.tmx** with [Tiled](http://www.mapeditor.org/).
>   
>   Please note that **0-0.tmx** relies on **tiles.png** in the **images** folder.
>   
>   There are a few things to keep in mind regarding the TMX layers:
>   *   **Layer0** is where you perform your drawing.
>   *   **walls** is an object layer. Each object you place will be converted into a static (fixed) body by Box2DWeb.
>   *   **coins** represents objects that will be *collectible* and are denoted by the yellow blocks in the game.
>   *   **portals** represents the starting point and finish point for the level. The **first** portal placed will act as the spawn and the **second** portal will act as the finish. The finish portal only becomes visible once all coins are collected.

### Map Panning *(TODO)*
>   
>   Currently the application expects a 1280x768 pixel world as no re-sizing is performed on any of the objects. The goal is to allow for
>   much larger worlds and have the camera *pan* to follow the hero as the hero moves around the world.

### Level Completion *(TODO)*
>   
>   Currently nothing happens when you make it to the finish portal.

### Advanced Physics *(TODO)*
>   
>   No friction on ice, decreased gravity in water, lava collision detection, etc.

## Tested With
>   
>   *   BlackBerry 10 WebWorks SDK 1.0.4.5
>   *   BlackBerry Dev Alpha B, 10.0.9.1675

## Known Issues
>   
>   Currently performance is suffering a little when packaged as a WebWorks application vs. running in the browser. Investigating.

## Thank You!
>   
>   Immense thanks to the following people. They might not know how much they
>   helped me, but I appreciate it none the less.
>   *   The [Cocos2d-HTML5 Community](http://www.cocos2d-x.org/projects/cocos2d-x/boards/19)
>   *   [Seb Lee-Delisle (@seb_ly)](http://creativejs.com/2011/09/box2d-javascript-tutorial-series-by-seth-ladd/) for compiling the Box2DWeb tutorials by [Seth Ladd (@sethladd)](http://blog.sethladd.com/)
