var PLAY = 1;
var END = 0;
var gameState = PLAY;
var message = "PRESS SPACE TO START";
var over = "GAMEOVER";
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var score = 0
var bananaGroup, obstacleGroup;
var score
var ground, invisibleGd;


function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");


}

function setup() {
  createCanvas(600, 400);


  monkey = createSprite(100, 315, 20, 20);
  monkey.addAnimation("mymonkey", monkey_running);
  monkey.scale = 0.1

  /*banana = createSprite(200, 275, 20, 20);
  banana.addImage(bananaImage);
  banana.scale = 0.1;*/

  /*obstacle = createSprite(500, 325, 20, 20);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.1;*/

  ground = createSprite(300, 350, 600, 20);
  ground.x = ground.width / 2;
  ground.visible= false;

  invisibleGd = createSprite(300, 370, 600, 10);
  invisibleGd.visible = false;
  
  bananaGroup = new Group();
  obstacleGroup = new Group()
}

function draw() {
  background(600);

  if (gameState === PLAY) {

    if (keyDown("space") && monkey.y >= 159) {
      message = "";
      over.visible = false;
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
   

    monkey.collide(invisibleGd);
    spawnBanana();
    spawnObstacles();

    if (monkey.isTouching(bananaGroup)) {
      bananaGroup.destroyEach();
      //monkey.scale=0.2;
     score = score + 1;
    }
  }
  if (obstacleGroup.isTouching(monkey)) {
   // monkey.scale=0.09;
    gameState = END;
  } else if (gameState === END) {
   
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
   

    //change the trex animation
    monkey.changeAnimation("mymonkey", monkey_running);

    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
  }
  drawSprites();

  fill("yellow");
  stroke("yellow");
  text("Score ::" + score, 500, 50);

  textSize(20);
  text(message, 200, 70);

  if (gameState === END) {
    fill("yellow");
    stroke("yellow");
    textSize(20);
    text(over, 200, 200);
  }

}

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 200 === 0) {
    banana = createSprite(600, 275, 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.y = Math.round(random(120, 200));
    banana.velocityX = -3;

    //assign lifetime to the variable
    banana.lifetime = 200;

    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = banana.depth + 1;

    //add each cloud to the group
    bananaGroup.add(banana);
  }

}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(600, 325, 20, 20);
    obstacle.addImage(obstacleImage);

    // obstacle.debug = true;
    //  obstacle.velocityX = -(6 + 3*score/100);

    //generate random obstacles
    var rand = Math.round(random(200, 600));
    obstacle.velocityX = -3;

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 200;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
    obstacle.depth = monkey.depth;
    monkey.depth = obstacle.depth + 1;
  }
}
