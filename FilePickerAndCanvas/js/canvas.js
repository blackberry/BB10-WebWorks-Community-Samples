/**
 * Copyright (c) 2013 Matthew Haag
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 *
 * You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

(function(app){
  var $c, canvasWidth, canvasHeight, ctx, img,image_val;

  app.CanvasLoad = function(){
    $c = $('canvas');
    canvasWidth = $c.width()
    canvasHeight = $c.height()
    ctx =$c[0].getContext('2d');
    img = new Image();   // Create new img element
    img.onload = function(){
      //size our image
      var targetWidth,targetHeight,startX=0,startY=0;
      if(img.width > img.height){
        //landscape
        targetWidth = canvasWidth;
        targetHeight = targetWidth * img.height/img.width;
        startY = (canvasHeight - targetHeight)/2;
      } else {
        //portrate
        targetHeight = canvasHeight;
        targetWidth = targetHeight * img.width/img.height;
        startX = (canvasWidth - targetWidth)/2;
      }
      ctx.drawImage(img,startX,startY,targetWidth,targetHeight);
    };
    app.imageChanges()
  };

  app.imageChanges = function(){
    var newImage = app.image();
    if(!newImage)
      img.src = "./img/initial.png"
    else{
      if(newImage !== image_val)
        image_val = newImage;
      blackberry.io.custom.getImage(image_val,function(url){
        img.src = url; // Set source path
      });
    }
  }

  app.image_changed = function(url){
    if(url && url.length == 1)
      url = url[0];
    else
      throw('BAD DATA');   
    app.setImage(url);
    app.imageChanges();
  };

  app.image = function() {
    if(image_val)
      return image_val;
    return image_val = localStorage.getItem('image_val');
  }

  app.setImage = function(url) {
    image_val = url;
    localStorage.setItem('image_val',url)
  }

  app.change = function(){
    _invoke.invoke(app.image_changed);
  }
})(FC);