var trex, trex_running, invisibleground, trexcollide;
var groundImage,ground;
var cloud, cloudimg;  
var obstacle, obstacle1img,obstacle2img,obstacle3img,obstacle4img,obstacle5img;
var score = 0;
var gameover, restart, gameoverimg, restartimg;

var obstaclesgroup,cloudgroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var background1, back;

function preload(){
  trex_running = loadImage("knight.png");
  
  
  groundImage = loadImage("ground2.png");
  cloudimg = loadImage("cloud.png");
  obstacle1img = loadImage("tree.png");
  obstacle2img = loadImage("wall.png");
  obstacle3img = loadImage("fire.png");
  obstacle4img = loadImage("robber.png");
  obstacle5img = loadImage("rock1.png");
  gameoverimg = loadImage("gameOver.png");
  restartimg = loadImage("restart1.png");
  
  background1 = loadImage("background1.png");
}

function setup(){
  createCanvas(600,200);
  
  ground = createSprite(10,180,600,10);
  ground.addImage("ground",groundImage);

  back = createSprite(100,100,600,200);
  back.addImage("backgroundimg", background1);

  // creating trex
  trex = createSprite(50,160,20,50);
  trex.addImage("knight", trex_running);

  
  //adding scale and position to trex
  trex.scale = 0.2;
  trex.x = 50

  

  

  invisibleground = createSprite(10,160,600,10);
  invisibleground.visible = false;
  obstaclesgroup = createGroup();
  cloudgroup= createGroup();
  

  gameover = createSprite(300,50,100,20);
  restart = createSprite(300,140);
  restart.addImage(restartimg);
  gameover.addImage("gameend", gameoverimg);
  restart.scale = 0.5;
  gameover.scale = 0.8;
  restart.visible = false;
  gameover.visible = false;

  
}


function draw(){
  background(0);
  trex.collide(invisibleground);  
  text("Score: "+ score , 450,20);
  drawSprites();
trex.debug = true;
trex.setCollider("circle",0,0,60);
if(gameState === PLAY){
  if(keyDown("space")&& trex.y>100){
    trex.velocityY = -10;
 
  }
  trex.velocityY = trex.velocityY + 0.5;

  ground.velocityX = -3;

  if(ground.x<0){
    ground.x = ground.width/2;
  }

  back.velocityX = -3;

  if(back.x<200){
    back.x = back.width/2;
  }

  text("Score: "+ score , 450,20);

  
  spawnObstacles();

  if (frameCount % 100 == 0) {
    score = score + 1;
    
    
  }

  if (obstaclesgroup.isTouching(trex)){

    gameState = END;
    
  }
}

if(gameState === END){
  ground.velocityX = 0;
  back.velocityX = 0;
  obstaclesgroup.setVelocityXEach(0);
  cloudgroup.setVelocityXEach(0);
  obstaclesgroup.setLifetimeEach(-1);
  cloudgroup.setLifetimeEach(-1);
  
  gameover.visible = true;
  restart.visible = true;  
  if(mousePressedOver(restart)) {
    reset();
  }
}
}



function spawnClouds(){
if (frameCount % 60 == 0){
  cloud = createSprite(600,100,40,10);
  cloud.y = Math.round(random(10,60));
  cloud.velocityX = -3;
  cloud.addImage(cloudimg);
  cloud.scale = 0.6;
  cloud.depth = trex.depth;
  trex.depth = trex.depth+1;
  cloud.lifetime = 200;

  cloudgroup.add(cloud);

}



}

function spawnObstacles(){
  if(frameCount % 100 == 0){
    obstacle = createSprite(600, 160, 20,40);
    obstacle.velocityX = -3;
    
    var ran = Math.round(random(1,5));
    switch(ran){
      case 1: obstacle.addImage(obstacle1img);
              break;
      case 2: obstacle.addImage(obstacle2img);
              break;  
      case 3: obstacle.addImage(obstacle3img);
              break;  
      case 4: obstacle.addImage(obstacle4img);
              break;
      case 5: obstacle.addImage(obstacle5img);
              break;    
    }
    obstacle.lifetime = 200;
    obstacle.scale = 0.8;
    obstaclesgroup.add(obstacle);
  }
}

function reset(){
  gameover.visible = false;
  restart.visible = false;
  score = 0;
  obstaclesgroup.destroyEach();
  cloudgroup.destroyEach();
  gameState = PLAY;
  trex.changeAnimation("runningtrex", trex_running);

}
