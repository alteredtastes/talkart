(function () {
  'use strict'

  angular
    .module('talkart')
    .factory('Voice', Voice);

  function Voice(p5, Creator) {

    return function(p) {
      p.myRec = new p5.SpeechRec();
      p.myRec.continuous = true;
      p.myRec.interimResults = true;

      var x, y;
      var dx, dy;

      p.setup = function() {
        p.createCanvas(200, 200);
        p.background(255, 255, 255);
        p.fill(0, 0, 0, 255);
        x = p.width/2;
        y = p.height/2;
        dx = 0;
        dy = 0;

        p.textSize(20);
        p.textAlign(p.LEFT);
        p.text('draw: up, down, left, right, clear', 20, 20);
        p.myRec.onResult = p.parseResult;
        p.myRec.start();
      }

      p.draw = function() {
        p.ellipse(x, y, 5, 5);
        x+=dx;
        y+=dy;
        if(x<0) x = p.width;
        if(y<0) y = p.height;
        if(x>p.width) x = 0;
        if(y>p.height) y = 0;
      }

      p.parseResult = function() {
        var mostrecentword = p.myRec.resultString.split(' ').pop();
        if(mostrecentword.indexOf("left")!==-1) {
          Creator.makeShapeCircle();
        }
        else if(mostrecentword.indexOf("right")!==-1) { dx=1;dy=0; }
        else if(mostrecentword.indexOf("up")!==-1) { dx=0;dy=-1; }
        else if(mostrecentword.indexOf("down")!==-1) { dx=0;dy=1; }
        else if(mostrecentword.indexOf("clear")!==-1) { p.background(255); }
        console.log(mostrecentword);
      }
    }
  }
})();
