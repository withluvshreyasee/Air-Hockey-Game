var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var striker = createSprite(200,200,10,10);
striker.shapeColor = "white";

var playerMallet = createSprite(200,50,50,10);
playerMallet.shapeColor = "black";

var computerMallet = createSprite(200,350,50,10);
computerMallet.shapeColor = "black";

var goal1 = createSprite(200,28,100,20);
goal1.shapeColor = "yellow";

var goal2 = createSprite(200,372,100,20);
goal2.shapeColor = "yellow";

var boundary1 = createSprite(15,200,6,395);
boundary1.shapeColor = "white";
var boundary2 = createSprite(200,13,395,6);
boundary2.shapeColor = "white";
var boundary3 = createSprite(387,200,6,395);
boundary3.shapeColor = "white";
var boundary4 = createSprite(200,387,395,6);
boundary4.shapeColor = "white";
var boundary5 = createSprite(200,280,395,6);
boundary5.shapeColor = "white";
var boundary6 = createSprite(200,120,395,6);
boundary6.shapeColor = "white";

var computerMalletScore = 0;
var playerMalletScore = 0;

var gameState = "serve";


function draw() {
background("GREEN");

if (gameState === "serve") {
  textSize(20);
  fill("pink");
  text("Press SPACE to Strike",120,180);
  computerMallet.x = 200;
  computerMallet.y = 350;
} 

textSize(30);
fill("pink");
text(computerMalletScore,25,240);
text(playerMalletScore,25,185);

if (keyDown("left")) {
  playerMallet.x = playerMallet.x - 10;
}

if (keyDown("right")) {
  playerMallet.x = playerMallet.x + 10;
}

if (keyDown("up")) {
  if (playerMallet.y > 25) {
  playerMallet.y = playerMallet.y - 10; 
}
}

if (keyDown("down")) {
  if (playerMallet.y < 120) {
  playerMallet.y = playerMallet.y + 10;  
}
}

computerMallet.x = striker.x;

for (var num=0; num < 400; num = num + 20) {
  line(num, 200, num + 10, 200);  
}

playerMallet.bounceOff(boundary1);
playerMallet.bounceOff(boundary2);
playerMallet.bounceOff(boundary3);
playerMallet.bounceOff(boundary4);
playerMallet.bounce(goal1);
striker.bounceOff(boundary1);
striker.bounceOff(boundary2);
striker.bounceOff(boundary3);
striker.bounceOff(boundary4);
striker.bounceOff(playerMallet);
striker.bounceOff(computerMallet);

computerMallet.bounceOff(boundary1);
computerMallet.bounceOff(boundary3);

if (keyDown("space") && gameState === "serve") {
    serve();
    gameState = "play";
  }

if (striker.isTouching(goal1) || striker.isTouching(goal2) ) {
  if (striker.isTouching(goal1)) {
    computerMalletScore =  computerMalletScore + 1; 
   }
  if (striker.isTouching(goal2)) {
    playerMalletScore =  playerMalletScore + 1;  
    }
    reset();
    gameState = "serve";
    
 }
  
 if (playerMalletScore === 5 || computerMalletScore === 5){
    gameState = "end";
    fill("maroon");
    textSize(30);
    text("Game Over",170,160);
    text("press 'R' to restart",140,180);
    playerMallet.x = 200;
    playerMallet.y = 40;
  
  }
  if (keyDown("r") && gameState === "end"){
    gameState = "serve";
    computerMalletScore = 0;
    playerMalletScore = 0;
    
  }

  drawSprites();               
}
function serve() {
  striker.velocityX = 3;
  striker.velocityY = 4;
}
function reset() {
striker.x = 200;
striker.y = 200;
striker.velocityX = 0;
striker.velocityY = 0;
}
// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};