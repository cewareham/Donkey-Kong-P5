"use strict";

// FullScreenButton class based on https://editor.p5js.org/kjhollen/sketches/dHOoxK_hD
// ONLY works using p5.js
class FullScreenButton {
   constructor(xx, yy, btnImg) {
     this.x = xx;          // x pos to draw button image
     this.y = yy;          // y pos to draw button image
     this.img = btnImg;    // button image->must be eg. img = loadImage("path-to-img");
   }
   
   display() {
      //stroke(0);
      // if we're in fullscreen mode don't draw the button
      // user must press ESCAPE key to exit fullscreen
      if (document.fullscreenElement) return;
      //if (fullscreen()) return;  // p5.js function w/o arg returns fullscreen state->works
     
      if (this.over() && mouseIsPressed) {      // mouseIsPressed is p5.js var
         this.openFullscreen();
         //scale(0.5);
         //resizeCanvas(windowWidth, windowHeight);
         //fullscreen(true);     // p5.js function does not work
      } else if (this.over()) {
         // tint image on mouse hover->turns white parts green
         tint(0, 255, 0);
      } else {
         noTint();
      }
      image(this.img, this.x, this.y);  // draw the button image
   }
   
   // over() automatically matches the width & height of the image read from the file
   // see this.img.width and this.img.height below
   over() {
     return (mouseX > this.x && mouseX < this.x + this.img.width &&
             mouseY > this.y && mouseY < this.y + this.img.height);
   }

   // in p5.js MUST call with elem set to drawingContext.canvas
   openFullscreen() {
      let elem = drawingContext.canvas;            // drawingContext is p5.js var
      if (elem.requestFullscreen) {
         elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {      // Firefox
         elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {   // Chrome, Safari & Opera
         elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {       // IE/Edge
         elem.msRequestFullscreen();
      }
   }
 
   closeFullscreen() {
      if (document.exitFullscreen) {
         document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {  // Safari
         document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {      // IE11
         document.msExitFullscreen();
      }
   }

}
