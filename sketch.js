var bg,bgImg;
var player, shooterImg, shooter_shooting;
var enemy, zombieImg, zombieGroup;
var heart1Img,heart2Img,heart3Img;
var heart1,heart2,heart3;
var life = 3;
var gameState = PLAY;
var gameState = END;



function preload(){

  zombieImg = loadImage("zombie.png")
  
  shooterImg = loadImage("shooter_2.png")
  shooter_shooting = loadImage("shooter_3.png")

  bgImg = loadImage("bg.jpeg")

heart1Img = loadImage("heart_1.png")
heart2Img = loadImage("heart_2.png")
heart3Img = loadImage("heart_3.png")

gameOverImg = loadImage("gameOver.png")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

heart1 = createSprite(displayWidth - 150,40 ,20,20);
 heart1.addImage(heart1Img)
 heart1.visible = false
 heart1.scale = 0.3
heart2 = createSprite(displayWidth - 150,40 ,20,20);
 heart2.addImage(heart2Img)
 heart2.visible = false
 heart2.scale = 0.3
heart3 = createSprite(displayWidth - 150,40 ,20,20);
 heart3.addImage(heart3Img)
 heart3.visible = true
 heart3.scale = 0.3

 game_over = createSprite(displayWidth / 2, displayHeight / 2,40,40);
 game_over.addImage(gameOverImg)
 game_over.visible = true

   zombieGroup = new Group();
  
}

function draw() {
  background(0); 

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting) 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)

}

if(life === 3){
 heart3.visible = true
 heart2.visible = false
 heart1.visible = false
}

if(life === 2){
  heart2.visible = true
  heart3.visible = false
  heart1.visible = false
 }

 if(life === 1){
  heart1.visible = true
  heart2.visible = false
  heart3.visible = false
 }

if(zombieGroup.isTouching(player)){
  
for(var i = 0; i<zombieGroup.length;i++){

if(zombieGroup[i].isTouching(player)){
zombieGroup[i].destroy();
life = life - 1
}
}
}

//if(gameState === 2){
  
//}

//x-axis displayWidth-100,displayWidth-1100

getZombie();

drawSprites();

}


function getZombie(){
  

  if(frameCount % 100 === 0){
    enemy = createSprite(displayWidth-(random(100,1100)), displayHeight-(random(200,500)), 50, 50);
    enemy.addImage(zombieImg)
     enemy.scale = 0.15
   enemy.velocityX = -2
   enemy.lifetime = 400
   zombieGroup.add(enemy)
   enemy.debug = true
   enemy.setCollider("rectangle",0,0,400,400);
  }
}

