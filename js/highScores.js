"use strict";

// HighScores class -> opening scene
class HighScores {
   // by using Scene Manager, you lose ability to pass args to constructor!
   // but you can pass an argument in the SceneManager & access it it setup() below.
   // CAN'T ACCESS the argument in constructor.
   constructor() {
      //console.log(this);
      this.tintVal = 0;
      this.faded = false;
      this.fade = this.fadeIn;
      cc.gameDifficulty = cc.ez;
      this.level = 'easy';
      cc.menu.x0 = 7;
      cc.menu.y0 = height - cc.easy.height - 7;
      cc.menu.x1 = cc.menu.x0 + cc.easy.width;
      cc.menu.y1 = cc.menu.y0 + cc.easy.height;
      this.high_scores = {};
      this.key = 'DK-high-scores';  // access key for localStorage
      this.font = new BitmapFont(font_sprite_sheet);
      this.maxHighScores = 5;       // 5 high scores for each difficulty level

      //if (!this.read_high_scores()) this.write_original_scores();
      //this.clear_high_scores();
      //this.write_newhigh_score(1700, "score low man");
      this.read_high_scores();
      cc.coin_credit.play();
   }

   // SceneManager comes here after creation of object (new HighScores)
   // so this.sceneArgs will always exist here.
   // If you try to access this.sceneArgs in constructor above
   //  it won't yet exist & you get error
   setup() {
      //console.log(this);
      let x = this.sceneArgs.x;
      let y = this.sceneArgs.y;
   }

   // get user's name if he has a new high score & add to leaderboard
   newHighScore = (score) => {
      let person = prompt("New High Score: " + newHighscore + "\nPlease enter your name:");
      if (person == null || person == "") alert("No name entered");
      else this.write_newhigh_score(score, person);
   }

   draw = () => {
      background(220);
      if (this.tintVal == 255) tint(255, this.tintVal);
      else tint(255, 0);  // hide bg image until foreground images fade in

      //                d_=destination rect   s_=source rect in image
      // image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight])
      image(cc.bgHighScore, 0, 0, width, height, 376, 208, 344, 254);   // farthest back  image

      //this.fadeIn(5);  // fade foreground images in
      this.fade(5);
      image(cc.highScore, 0, 0, width, height); // highScore image has blank bg (see-thru) pixels on both sides
      noTint();
      let menuImage;
      switch (cc.gameDifficulty) {
         case cc.ez: menuImage = cc.easy; this.level = 'easy'; break;
         case cc.norm: menuImage = cc.normal; this.level = 'normal'; break;
         case cc.hrd: menuImage = cc.hard; this.level = 'hard'; break;
         default:
      }
      image(menuImage, cc.menu.x0, cc.menu.y0);
      this.show_high_scores();
   }

   show_high_scores = () => {
      if (!this.faded) return;
      let xsPos = 320,
         xnPos = 496,
         yPos = 450,
         color = 'red',
         fntSize = 21;

      this.font.render("000000", 210, 22, 'white', 0, fntSize, fntSize);
      this.font.render(this.high_scores[this.level][0].score, 430, 22, 'white', 0, fntSize, fntSize);

      for (let ii = 0; ii < this.high_scores[this.level].length; ii++) {
         if (ii > 2) color = 'yellow';
         this.font.render(this.high_scores[this.level][ii].score, xsPos, yPos + ii * 45, color, 0, fntSize, fntSize);
         this.font.render(this.high_scores[this.level][ii].name.toLowerCase(), xnPos, yPos + ii * 45, color, 0, fntSize, fntSize);
      }
   }

   mousePressed = () => {
      if (mouseButton === LEFT) {
         if (int(mouseX) > cc.menu.x0 && int(mouseX) < cc.menu.x1) {
            let yTop = cc.menu.y0,
               yMid = cc.menu.y0 + cc.easy.height / 3,
               yBot = cc.menu.y1 - cc.easy.height / 3;

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
      } else if (keyCode === cc.SPACE) {     // space bar pressed
         this.sceneManager.showScene(Intro);
         //this.tintVal = 255;
         //this.faded = false;
         //this.fade = this.fadeOut;
         //alert("SPACE pressed");
      }
      if (cc.gameDifficulty < cc.ez) cc.gameDifficulty = cc.hrd;
      else if (cc.gameDifficulty > cc.hrd) cc.gameDifficulty = cc.ez;
   }

   fadeIn(dTint) {
      this.tintVal += dTint;   // set tintVal to something < 255 initially
      if (this.tintVal > 255) {
         this.tintVal = 255; // fully faded in
         this.faded = true;
      }
      tint(255, this.tintVal);
   }

   fadeOut(dTint) {
      this.tintVal -= dTint;   // set tintVal to something > 0 initially
      if (this.tintVal < 0) {
         this.tintVal = 0;   // fully faded out
         this.faded = true;
         //this.sceneManager.showScene(Intro);
         //alert("FADED OUT, READY FOR NEXT SCENE!");
      }
      tint(255, this.tintVal);
   }

   //*** BEGIN high score code

   // read high scores from local storage if supported & there
   read_high_scores() {
      if (typeof (Storage) !== "undefined") {
         let scores = [];
         if (localStorage[this.key]) {
            scores = JSON.parse(localStorage[this.key]);

            for (const prop in scores) {  //*** use this format to access OBJECT PROPERTIES ***
               // sort by score->3 props (each prop is an array of objects here)->easy, normal & hard
               // src: https://stackoverflow.com/questions/1069666/sorting-object-property-by-values
               // use slice() to copy the array and not just make a reference
               //byScore = scores[prop].slice(0);
               //byScore.sort(function(a,b) {
               scores[prop].sort(function (a, b) {   // sort array by scores with highest score 1st
                  return b.score - a.score;
               });
               // renumber rank with 1st entry as 1
               for (let ii = 0; ii < scores[prop].length; ii++) {  //*** use this format to access ARRAY ELEMENTS ***
                  scores[prop][ii].rank = (ii + 1).toString();   // toString() puts quotes around value
               }
            }

            this.high_scores = scores;
            return true;
         }
      }
      return false;
   }

   write_original_scores() {
      let orgHighScores = cc.orgHighScores;
      localStorage[this.key] = JSON.stringify(orgHighScores);  // save org high scores to local storage
      this.read_high_scores();
   }

   clear_high_scores() {
      if (typeof (Storage) !== "undefined") {
         localStorage[this.key] = JSON.stringify(cc.noHighScores);
         this.read_high_scores();
      }
   }

   delete_high_scores() {
      window.localStorage.removeItem(this.key);
   }

   write_newhigh_score(newHighScore, newName) {
      if (typeof (Storage) !== "undefined") {
         let current = newHighScore;
         if (newName.length > 14) newName = newName.substring(0, 14);
         let scores = [];
         let levelScores = [];
         if (localStorage[this.key]) {
            scores = JSON.parse(localStorage[this.key]);                               // read existing high scores

            for (const prop in scores) {  //*** use this format to access OBJECT PROPERTIES ***
               this.sort(scores[prop]);
               this.rank(scores[prop]);
            }

            levelScores = scores[this.level];

            if (levelScores.length < this.maxHighScores) {
               levelScores.splice(levelScores.length - 1, 0, { "rank": "1", "score": newHighScore.toString().padStart(6, 0), "name": newName });
               this.sort(levelScores);
               this.rank(levelScores);
            } else {
               for (let ii = 0; ii < this.maxHighScores; ii++) {
                  let ss = parseInt(levelScores[ii].score);
                  if (ss == 0) levelScores.splice(ii, 1);   // delete entry with score = 0

                  let val = (!isNaN(ss) ? ss : 0);
                  if (current > val) {
                     val = current;
                     // .splice(ii, 0, {}) -> at element ii, remove nothing (0), add object {}
                     levelScores.splice(ii, 0, { "rank": (ii + 1).toString(), "score": val.toString().padStart(6, 0), "name": newName });
                     break;
                  }
               }
            }

            if (levelScores.length > this.maxHighScores) levelScores.length = this.maxHighScores;
            scores[this.level] = levelScores;
            localStorage[this.key] = JSON.stringify(scores);

         } else {
            let scores = [{ "rank": (ii + 1).toString(), "score": val.toString().padStart(6, 0), "name": newName }];
            localStorage[this.key] = JSON.stringify(scores);
         }
         this.read_high_scores();
      }
   }

   /*
   minimum_score() {
       // returns the minimum score required to be on the high score list
       if (!this.high_scores) this.read_high_scores();
       return this.high_scores[this.high_scores.length-1];
   }
   */

   sort(ary) {
      ary = ary.sort(function (a, b) { return parseInt(b[1]) - parseInt(a[1]) });      // sort by 2nd array param->score
   }

   // set the rank property according to order AFTER sorting the array
   rank(ary) {
      for (let ii = 0; ii < ary.length; ii++) {    //*** use this format to access ARRAY ELEMENTS ***
         ary[ii].rank = (ii + 1).toString();       // toString() puts quotes around value
      }
   }

   //*** END high score code
}
