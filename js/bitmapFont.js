"use strict";

// bitmap font class
class BitmapFont {
   constructor(spriteSheet) {
      // spriteSheet must be created with p5.play
      this.spriteSheet = spriteSheet;
    }

    render = (msg, xx, yy, color='white', charSpace=0, ww, hh) => {
      tint(color);
      for (let ii=0; ii<msg.length; ii++) {
        let char = msg[ii];
        if (char == " ") char = "zspace";
        else if (char == ".") char = "zdot";
        else if (char == "-") char = "zdash";
        else if (char == "%") char = "zpercent";
        let objSprite = this.spriteSheet.drawFrameFree(char, xx, yy, ww, hh);
        xx += (objSprite.width + charSpace);
      }
      noTint();
    }

}
