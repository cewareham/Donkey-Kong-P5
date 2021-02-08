"use strict";

let font_sprite_sheet;

function preload() {
  // load all images in cc.sprites array giving them the name of their first property
  for (const property in cc.sprites) {
    cc[property] = loadImage("assets/" + cc.sprites[property]["path"]);
  }
  // load all sounds in cc.sounds array giving them the name of their first property
  for (const property in cc.sounds) {
    cc[property] = loadSound("sounds/" + cc.sounds[property]["path"]);
  }

  loadJSON('assets/bitmapFont.json', function(font_frames) {
    // Load font sprite sheet from frames array once it's ready
    // use font_frames["frames"] & don't need to mod JSON file at all!
    // use 'JSON-TP-Array' format when saving from leshylabs.com.apps.sstool -OR- 'JSON (Array)' from texturepacker
    // (DO NOT use free texturepacker because it doesn't calc sprite coords correctly!)
    font_sprite_sheet = loadSpriteSheet('assets/bitmapFont.png', font_frames["frames"]);
  });

}

function setup() {
  createCanvas(cc.highScore.width, cc.highScore.height);
  centerCanvas();
  //createCanvas(960, 720);
  //createCanvas(480, 360);
  let mgr = new SceneManager();
  //mgr.addScene ( HighScores );
  mgr.wire();
  mgr.showScene( HighScores, {"x":77, "y":80, "z":100, "d":23} );
  // o.oScene.sceneArgs = sceneArgs;
  //highScores = mgr.scene.oScene;
  //let args = highScores.sceneArgs;
}

function draw() {}

function centerCanvas() {
  // center the canvas in the browser
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
