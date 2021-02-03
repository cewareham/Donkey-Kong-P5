"use strict";

let cc = {
  ez   : 0,
  norm : 1,
  hrd  : 2,
  gameDifficulty: 0,
  menu: {"x0":7, "y0":0, "x1":0, "y1":0},
  // next line - CANVAS STYLE SETTINGS to center canvas in browser-horizontally & vertically
  centerCanvas: { padding:0, margin:"auto", display:"block", position:"absolute", top:0, bottom:0, left:0, right:0 },

  sprites: {
    "bgHighScore" : { "path" : "bgHighScore.png", "x1":376,"y1":208,"x2":344,"y2":254 },
    "highScore"   : { "path" : "highScore.png" },
    "easy"        : { "path" : "easy.png" },
    "normal"      : { "path" : "normal.png" },
    "hard"        : { "path" : "hard.png" },
    "grow"        : { "path" : "grow.png" },
    "shrink"      : { "path" : "shrink.png" }
  },
  sounds: {
    "coin_credit" : { "path" : "coin_credit.wav" }
  },
  orgHighScores: {
    "easy" :    [ { "rank" : "1", "score" : "179900", "name" : "PIXELATOR505" },
                  { "rank" : "2", "score" : "169400", "name" : "GOR-DEE" },
                  { "rank" : "3", "score" : "163700", "name" : "SPEEDMASTER24" },
                  { "rank" : "4", "score" : "152500", "name" : "COLINMACC" },
                  { "rank" : "5", "score" : "151700", "name" : "CON" }            
                ],
    "normal" :  [ { "rank" : "1", "score" : "128200", "name" : "PIXELATOR505" },
                  { "rank" : "2", "score" : "116800", "name" : "CON" },
                  { "rank" : "3", "score" : "113000", "name" : "CON" },
                  { "rank" : "4", "score" : "112200", "name" : "PIXELATOR505" },
                  { "rank" : "5", "score" : "109700", "name" : "FLAREVA" }            
                ],
    "hard" :    [ { "rank" : "1", "score" : "110200", "name" : "NYAONYAO" },
                  { "rank" : "2", "score" : "096800", "name" : "NYAONYAO" },
                  { "rank" : "3", "score" : "090400", "name" : "NYAONYAO" },
                  { "rank" : "4", "score" : "083700", "name" : "NYAONYAO" },
                  { "rank" : "5", "score" : "076000", "name" : "NYAONYAO" }            
                ]
   }
 }
 