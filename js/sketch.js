"use strict";

let mgr;

function preload() {
  // load all images in cc.sprites array giving them the name of their first property
  for (const property in cc.sprites) {
    cc[property] = loadImage("assets/" + cc.sprites[property]["path"]);
  }
  // load all sounds in cc.sounds array giving them the name of their first property
  for (const property in cc.sounds) {
    cc[property] = loadSound("sounds/" + cc.sounds[property]["path"]);
  }
}

function setup() {
  createCanvas(cc.highScore.width, cc.highScore.height);
  centerCanvas();
  //createCanvas(960, 720);
  //createCanvas(480, 360);
  mgr = new SceneManager();
  mgr.addScene ( HighScores );
  mgr.wire();
  mgr.showScene( HighScores );
}

function draw() {}

function centerCanvas() {
  setStyle(drawingContext.canvas, cc.centerCanvas);
}

// call using setStyle("color", "red"); -OR-
// call using object--setStyle({ color: red, backgroundcolor: "white" });    
// VIP! don't use this to set width,height,x,y->these need this.width etc.
// so instead use setSize(), setPos() or setSizePos() for these!
function setStyle(canvas, css, value) {
  let style = canvas.style,
      cssType = typeof css,
      valueType = typeof value;

  if (cssType !== "undefined" && valueType === "undefined") {
    if (cssType === "object") {
      for (var prop in css) {
        if (css.hasOwnProperty(prop)) {
          style[prop] = css[prop];
        }
      }
    }
  } else if (cssType === "string" && valueType === "string") {
    style[css] = value;
    // equiv calls->style.color="red"; -or- style["color"]="red";   
  } else {
    throw { message: "Invalid parameters passed to setStyle()" };
  }
}
