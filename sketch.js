var starlord, starlord_running, starlord_collided;
var ground, invisibleGround;

var coinsGroup, coinImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var PLAY=1, END=0, gameState = PLAY; 

var bg_img, gameOver, gameOver_Img, restart, restart_Img;


function preload(){
  starlord_running = loadAnimation("images/superhero anime 2.gif");
  starlord_collided = loadImage("images/starlord_collided.png");

  coinImage = loadAnimation("images/coin.gif");
  
  obstacle1 = loadImage("images/obstacle1.png");
  obstacle2 = loadImage("images/obstacle2.png");
  obstacle3 = loadImage("images/obstacle3.png");
  obstacle4 = loadImage("images/obstacle4.png");
  obstacle5 = loadImage("images/obstacle5.gif");
  obstacle6 = loadImage("images/obstacle6.png");
  obstacle7 = loadImage("images/obstacle7.png");
  obstacle8 = loadImage("images/obstacle8.png");

  bg_img = loadImage("images/bg_img3.png");
  
  gameOver_Img = loadImage("images/gameOver.png");
  restart_Img = loadImage("images/restart.png");
}

function setup() {
  createCanvas(650, 250);

  ground = createSprite(300, 125, 650, 250);
  ground.addImage("ground", bg_img);
  ground.x = ground.width/2;

  starlord = createSprite(100,230,20,50);
  starlord.addAnimation("running",starlord_running);
  starlord.scale = 0.13;
  //starlord.debug = true;
  starlord.setCollider("circle", 0, 0, 290);


  //starlord_collided.addImage("collided",starlord_collided);

     
  invisibleGround = createSprite(200,235,400,10);
  invisibleGround.visible = false;
  
  coinsGroup = new Group();
  obstaclesGroup = new Group();
  
  gameOver = createSprite(300,80);
  gameOver.addImage("game over", gameOver_Img);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  restart = createSprite(300,150);
  restart.addImage("restart", restart_Img);
  restart.scale = 0.5;
  restart.visible = false;
  
  score = 0;
}

function draw() {
  background(0);
  //image(bg_img, 0, 0, 1600, 400);

  text("Score: "+ score, 500,50);
  //textStroke("white");
  //textSize(18);
  //textFont("Georgia");
  //text(BOLD);
  
  starlord.collide(invisibleGround);
  ground.velocityX = -6;

  if (ground.x < 0){                  
    ground.x = ground.width/2;
  }  
 
  
  if (gameState === PLAY) {
  ground.velocityX = -(6+3*score/100);
    score = score + Math.round(getFrameRate()/60);
  if(keyDown("space") && starlord.y >= 159) {
    starlord.velocityY = -12.5;
  }
  starlord.velocityY = starlord.velocityY + 0.8
    if (ground.x < 0){                  
    ground.x = ground.width/2;
  }
  if(coinsGroup.isTouching(starlord)){
    coinsGroup.destroyEach();
  }
    if (obstaclesGroup.isTouching(starlord)) {
      gameState = END;
    }
    
    spawnCoins();
    spawnObstacles();
  }
   else if (gameState === END) {
    ground.velocityX = 0;
    starlord.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    coinsGroup.setLifetimeEach(-1);
    starlord.changeAnimation("collided",starlord_collided);
    gameOver.visible = true;
    restart.visible = true;
    if (mousePressedOver(restart)) {
    reset();
    }
  }
    
    
    
  drawSprites();
}

function spawnCoins() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var coin = createSprite(600,120,10,10);
    coin.y = Math.round(random(80,120));
    coin.addAnimation("coin",coinImage);
    coin.scale = 0.15;
    coin.velocityX = -(6+3*score/100);
    //coin.debug = true;
    coin.setCollider("circle", 0, 0, 150);

     //assign lifetime to the variable
    coin.lifetime = 200;
    
    //adjust the depth
    coin.depth = starlord.depth;
    starlord.depth = starlord.depth + 1;

    coin.depth = gameOver.depth;
    gameOver.depth = gameOver.depth + 1;
    
    //add each cloud to the group
    coinsGroup.add(coin);
  }
  
}

function spawnObstacles() {
  if(frameCount % 80 === 0) {
    var obstacle = createSprite(600,190,10,40);
    //obstacle4.positiony = 175;
    //obstaclesGroup.y = 175;
    obstacle.velocityX = -(6+3*score/100); 
    //obstacle.debug = true;
    obstacle.setCollider("circle", 0, 0, 80);
    obstacle.depth = starlord.depth;
    starlord.depth = starlord.depth + 1;

    //generate random obstacles
    var rand = Math.round(random(1,8));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      case 7: obstacle.addImage(obstacle7);
              break;
      case 8: obstacle.addImage(obstacle8);
              break;              
      default: break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    //obstacle4.height = 100;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
  
  function reset() {
    gameState = PLAY;
    starlord.changeAnimation("running",starlord_running);
    gameOver.visible = false;
    restart.visible = false;
    score = 0;
    obstaclesGroup.destroyEach();
    coinsGroup.destroyEach();
  }