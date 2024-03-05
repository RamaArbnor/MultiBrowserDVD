let x = 50;
let y = 50;
let xspeed = 4;
let yspeed = 4;
let r = 50;

let realWidth;
let realHeight;

let screenX = window.screenLeft;
let screenY = window.screenTop;

let button;
let paused;

function setup() {
  realWidth = 1920;
  realHeight = 1080 - 125;
  createCanvas(800, 600 );

  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = "white";

  // frameRate(1);

  let pos = JSON.parse(localStorage.getItem("pos"));
  localStorage.setItem("paused", true);

  if (pos) {
    x = pos.x;
    y = pos.y;
  }

  if(x < 10 ){
    x = 100
  }
}

function draw() {
  background(51);
  fill(255);
  noStroke();
  screenX = window.screenLeft;
  screenY = window.screenTop;
  text("ScreenX: " + screenX, 10, 10);
  text("ScreenY: " + screenY, 10, 20);
  text("Width: " + width, 10, 30);
  text("Height: " + height, 10, 40);
  text("Real Width: " + realWidth, 10, 50);
  text("Real Height: " + realHeight, 10, 60);
  text("X: " + x, 10, 70);
  text("Y: " + y, 10, 80);
  text("Paused: " + JSON.parse(localStorage.getItem("paused")), 10, 100);

  //draw the ball if it's inside the canvas 
  if(x > screenX && x < screenX + width ){
    ellipse(x - screenX, y - screenY, r);
    text("Drawn", 10, 90)
  }

  if(!JSON.parse(localStorage.getItem("paused"))){
    x = x + xspeed;
    y = y + yspeed;
  }


  if(x > realWidth || x + r < 0){
    xspeed = -xspeed;
  }

  // bounce on each edge
  if (x + r >= realWidth) {
    xspeed = -xspeed;

  } else if (x <= 0) {
    xspeed = -xspeed;

  }

  if (y + r >= realHeight) {
    yspeed = -yspeed;

  } else if (y <= 0) {
    yspeed = -yspeed;

  }

  localStorage.setItem("pos", JSON.stringify({x, y}));


}

function mousePressed() {
  localStorage.setItem("paused", !JSON.parse(localStorage.getItem("paused")));
}

function keyPressed() {
  //reset the ball position when space is pressed
  if (keyCode === 32) {
    x = 50;
    y = 50;
    localStorage.setItem("pos", JSON.stringify({x, y}));
  }
}