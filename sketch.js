var sky,plane,smile,bird;
var skyImg,planeImg,smileImg,birdImg;
var treasureCollection = 0;
var smileG,birdG;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  planeImg = loadImage("plane.png");
  skyImg = loadImage("sky.png");
  birdImg = loadImage("bird.png");
  smileImg = loadImage("smile.png");
  endImg = loadImage("gameOver.png")
 
}

function setup(){
  
  createCanvas(400,400);
// Moving background
sky=createSprite(380,200,400,20);
sky.addAnimation("s1",skyImg);
sky.y=sky.height/2
sky.velocityY=3;


//creating boy running
plane = createSprite(width/2,height-20,20,20);
plane.addImage("flying",planeImg);
plane.scale=0.08;
  
  
birdG=new Group();
smileG=new Group();


}

function draw() {

  if(gameState===PLAY){
  background(0);
  plane.x = World.mouseX;
  
  edges= createEdgeSprites();
  plane.collide(edges);
  
  //code to reset the background
  if(sky.y > width ){
    sky.y = width/2;
  }
  
    createSmile();
    createBird();
    

    if (smileG.isTouching(plane)) {
      smileG.destroyEach();
      treasureCollection=treasureCollection+50;
    }else{
      if(birdG.isTouching(plane)) {
        gameState=END;
        
        plane.addImage("flying",endImg);
        plane.x=200;
        plane.y=300;
        plane.scale=0.6;
        
        birdG.destroyEach();
        smileG.destroyEach();
        
        
        smileG.setVelocityYEach(0);
        birdG.setVelocityYEach(0);
        
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Points: "+ treasureCollection,150,30);
  }

}

function createSmile() {
  if (World.frameCount % 300 == 0) {
  var smile = createSprite(Math.round(random(50, width-50),40, 10, 10));
  smile.addImage(smileImg);
  smile.scale=0.12;
  smile.velocityY = 3;
  smile.lifetime = 300;
  smileG.add(smile);
  }
}


function createBird(){
  if (World.frameCount % 200 == 0) {
  var bird = createSprite(Math.round(random(50, width-50),40, 10, 10));
  bird.addImage(birdImg);
  bird.scale=0.1;
  bird.velocityY = 3;
  bird.lifetime = 300;
  birdG.add(bird);
  }
}