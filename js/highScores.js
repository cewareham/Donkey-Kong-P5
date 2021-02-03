"use strict";

// HighScores class -> opening scene
class HighScores {
   constructor() {
      this.tintVal = 0;
      cc.gameDifficulty = cc.ez;
      cc.menu.x0 = 7;
      cc.menu.y0 = height-cc.easy.height-7;
      cc.menu.x1 = cc.menu.x0 + cc.easy.width;
      cc.menu.y1 = cc.menu.y0 + cc.easy.height;
      cc.coin_credit.play();
   }

   draw = () => {
      background(220);
      if (this.tintVal == 255) tint(255, this.tintVal);
      else tint(255, 0);  // hide bg image until foreground images fade in
    
      //                d_=destination rect   s_=source rect in image
      // image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight])
      image(cc.bgHighScore, 0, 0, width, height, 376, 208, 344, 254);   // farthest back  image
    
      this.fadeIn(5);  // fade foreground images in
      image(cc.highScore, 0, 0, width, height); // highScore image has blank bg (see-thru) pixels on both sides
      noTint();
      let menuImage;
      switch(cc.gameDifficulty) {
        case cc.ez  : menuImage = cc.easy  ; break;
        case cc.norm: menuImage = cc.normal; break;
        case cc.hrd : menuImage = cc.hard  ; break;
        default:
      }
      image(menuImage, cc.menu.x0, cc.menu.y0);    
   }

   mousePressed = () => {
      console.log(int(mouseX) + "," + int(mouseY));
      console.log(canvas.width + "->" + canvas.height);
      if (mouseButton === LEFT) {
        if (int(mouseX) > cc.menu.x0 && int(mouseX) < cc.menu.x1) {
          let yTop = cc.menu.y0,
              yMid = cc.menu.y0 + cc.easy.height/3,
              yBot = cc.menu.y1 - cc.easy.height/3;
    
          if (mouseY > yTop && mouseY < yMid) {
            cc.gameDifficulty = cc.ez;
          } else if (mouseY > yMid && mouseY < yBot) {
            cc.gameDifficulty = cc.norm;
          } else if (mouseY > yBot && mouseY < cc.menu.y1) {
            cc.gameDifficulty = cc.hrd;
          }    
        }
      }
    }
    
    keyPressed() {
      if (keyCode === UP_ARROW) {
        cc.gameDifficulty--;
      } else if (keyCode === DOWN_ARROW) {
        cc.gameDifficulty++;
      } else if (keyCode === ENTER) {

      }
      if (cc.gameDifficulty < cc.ez) cc.gameDifficulty = cc.hrd;
      else if (cc.gameDifficulty > cc.hrd) cc.gameDifficulty = cc.ez;
    }

    fadeIn(dTint) {
      this.tintVal += dTint;   // set tintVal to something < 255 initially
      if (this.tintVal > 255) this.tintVal = 255; // fully faded in
      tint (255, this.tintVal);
    }
    
    fadeOut(dTint) {
      this.tintVal -= dTint;   // set tintVal to something > 0 initially
      if (this.tintVal < 0) this.tintVal = 0;   // fully faded out
      tint (255, this.tintVal);
    }
}
