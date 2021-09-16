var bg,bgimg,bgimg2;
var wood,woodimg,woodGroup;
var kelly,kimg;
var monster,mimg;
var ghost,gimg,ghostGroup;
var canvas;
var story,simg;
var instruction,iimg;
var space_rules,rulesimg;
var gameState = 0;


function preload(){
 bgimg = loadImage("bg.jpg"); 
 kimg = loadAnimation("k1.png","k2.png","k3.png","k4.png","k5.png","k6.png","k7.png","k8.png","k9.png","k10.png","k11.png","k12.png","k13.png","k14.png","k15.png");
simg = loadImage("story4.png");
iimg = loadImage("rules.png");
rulesimg = loadImage("text1.png");
bgimg2 = loadImage("wall.jpg");
woodimg = loadImage("wood.png");
gimg = loadAnimation("g1.png","g2.png","g3.png","g4.png","g5.png","g6.png","g7.png","g8.png","g9.png","g10.png");

}

function setup() {
  canvas = createCanvas(displayWidth,displayHeight);
  story = createSprite(450,300);
  story.addImage(simg);
  story.scale = 0.8;
  story.visible = false;
  space_rules = createSprite(450,700);
  space_rules.addImage(rulesimg);
  space_rules.visible = false;
  instruction = createSprite(450,250);
  instruction.addImage(iimg); 
  instruction.visible = false;
  kelly = createSprite(120,700);
  kelly.addAnimation("walking",kimg);
  kelly.scale = 0.7
  kelly.visible = false;

  woodGroup = new Group;
  ghostGroup = new Group;
}

function draw() {
background(0);
image(bgimg,0,0,width,height);
if(gameState === 0){
  story.visible = true;
  space_rules.visible = true;
}
  if(keyDown("space") && gameState === 0){
    gameState = 1;
    story.visible = false;
  space_rules.visible = false;
    instruction.visible = true;
  }

  if(keyDown("up") && gameState === 1){
    gameState = 2;
    instruction.visible = false;
  }

  if(gameState === 2){
    image(bgimg2,0,0,width,height);
    kelly.visible = true;
    if(keyDown("up")){
      kelly.y = kelly.y - 20;
    }

    if(keyDown("down")){
      kelly.y = kelly.y + 10;
    }

    if(keyDown("left")){
      kelly.x = kelly.x - 10;
    }

    if(keyDown("right")){
      kelly.x = kelly.x + 10;
    }

    if(ghostGroup.isTouching(kelly)){
      gameState = 3;
    }
    spawnWood();
    spawnGhost();

    kelly.collide(woodGroup);
  }
   if(gameState === 3){
    background(0);
    fill("yellow");
    textSize(20);
    text("GAME OVER!! press k to restart", width/2-50 , height/2+100);
    kelly.destroy();
    ghostGroup.destroyEach();
    woodGroup.destroyEach();
   }

  if(keyDown("K") && gameState === 3){
    reset();
  }

drawSprites();  
}

function spawnWood(){
  if(frameCount % 120 === 0){
    wood = createSprite(0,0);
    wood.x = Math.round(random(0,width-50));
    wood.y = Math.round(random(0,height-50));
    wood.addImage(woodimg);
    wood.velocityX = 2;
    wood.lifetime = 200;
    woodGroup.add(wood);
  }
}
  function spawnGhost(){
  if(frameCount % 100  === 0){
    ghost = createSprite(0,0);
    ghost.x = Math.round(random(0,width-50));
    ghost.y = Math.round(random(0,height-50));
    ghost.addAnimation("running",gimg);
    ghost.scale = 0.3;
    ghost.velocityX = 2;
    ghost.lifetime = 200;
    ghostGroup.add(ghost);
  }
  }

  function reset(){
  gameState = 2;
  kelly.visible = true;
  kelly.addAnimation("running",kimg);
  }

  



