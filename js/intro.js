"use strict";

// HighScores class -> opening scene
class Intro {
   // by using Scene Manager, you lose ability to pass args to constructor!
   // but you can pass an argument in the SceneManager & access it it setup() below.
   // CAN'T ACCESS the argument in constructor.
   constructor() {

   }

   setup = () => {
      createCanvas(cc.intro11.width, cc.intro11.height);
      centerCanvas();    
   }

   draw = () => {
      background(220);
      image(cc.intro11, 0, 0);
   }
}
