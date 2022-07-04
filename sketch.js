//Create variables here
var dogImage, happydogImage, milkImage;
var database, foodS, foodStock, feed, lastFed, fedTime, addFood, foodObj;
var changing_gameState,reading_gameState, gameState;
var bedroomImage, washroomImage, gardenImage; 
var milkBottle1,milkBottle2,milk;

function preload(){
	//load images here
  dogImage = loadImage("images/virtual pet images/dogImg.png");
  happydogImage = loadImage("images/virtual pet images/happy dog.png");
  milkImage = loadImage("images/virtual pet images/milk.png");
  bedroomImage = loadImage("images/virtual pet images/Bed Room.png");
  washroomImage = loadImage("images/virtual pet images/Wash Room.png");
  gardenImage = loadImage("images/virtual pet images/Garden.png");
  sadDog = loadImage("images/virtual pet images/Dog.png");
  livingroomImage = loadImage("images/virtual pet images/Living Room.png");
}

function setup() {
  database = firebase.database();
	createCanvas(900, 500);
  foodObj = new Food();

  dog = createSprite(550,250,30,30);
  dog.scale=0.3;
  dog.addImage(sadDog);

  foodStock = database.ref('food');
  foodStock.on("value", readStock);
  foodStock.set(20);
  
  milkBottle1 = createSprite(140,435,10,10);
  milkBottle1.addImage(milkImage);

  milkBottle2 = createSprite(210,280,10,10);
  milkBottle1.addImage(milkImage);

  milkBottle2.scale = 0.025;
  milkBottle1.scale = 0.025;

  milkBottle2.visible = false;

  /*fedTime=database.ref("feedTime");
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  feed = createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });

*/
}


function draw() {  
  background("green");

foodObj.display();
writeStock(foodS);

if(foodS == 0){
  dog.addImage(happyDog);
  milkBottle2.visible = false;
  
}
else{
  dog.addImage(sadDog);
  milkBottle2.visible = true;
}

var gameStateRef = database.ref("gameState");
gameStateRef.on("value",function(data){
  gameState = data.val();
})
if(gameState === 1){
  dog.addImage(happydogImage);
  dog.scale = 0.17;
  dog.y = 250;
}
if(gameState === 2){
  dog.addImage(sadDogImage);
  dog.scale = 0.17;
  dog.y = 250;
  milkBottle2.visible = false;
}
  var bath = createButton("i want to take bath");
  bath.position(580,125);

  if(bath.mousePressed(function(){
    gameState = 3;
    database.ref("/").update({"gameState":gameState})
  }))

  if(gameState === 3){
    dog.addImage(washroomImage);
    dog.scale = 1;
    milkBottle2.visible = false;
  }

  var sleep = createButton("im very sleepy");
  bath.position(580,125);

  if(sleep.mousePressed(function(){
    gameState = 4;
    database.ref("/").update({"gameState":gameState})
  }))

  if(gameState === 4){
    dog.addImage(bedroomImage);
    dog.scale = 1;
    milkBottle2.visible = false;
  }

  var play = createButton("Lets play");
  play.position(580,125);

  if(play.mousePressed(function(){
    gameState = 5;
    database.ref("/").update({"gameState":gameState})
  }))

  if(gameState === 5){
    dog.addImage(livingroomImage);
    dog.scale = 1;
    milkBottle2.visible = false;
  }

  var garden = createButton("lets play in park");
  garden.position(580,125);

  if(garden.mousePressed(function(){
    gameState = 6;
    database.ref("/").update({"gameState":gameState})
  }))

  if(gameState === 6){
    dog.addImage(gardenImage);
    dog.scale = 1;
    milkBottle2.visible = false;
  }

  drawSprites();
  textSize(17);
  fill("black");
  text("milk bottles remaining" + foodS,170,440);

}




  /*fedTime = database.ref('feedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
    console.log(lastFed);
  })
  currentTime=hour();
    if(currentTime==(lastFed+1)){
        update("Playing");
        foodObj.garden();
    }else if(currentTime==(lastFed+2)){
        update("Sleeping");
        foodObj.bedroom();
    }else if(currentTime==(lastFed+2) && currentTime<=(lastFed+4)){
        update("Bathing");
        foodObj.washroom();
    }else{
        update("Hungry")
        foodObj.display();
    }
  
    if(gameState!="Hungry"){
      feed.hide();
      addFood.hide();
      dog.remove();
    }else{
      feed.show();
      addFood.show();
      dog.addImage(sadDog);
    }

  displayLastFed();
  foodObj.display();
  drawSprites();
}*/

function readStock(data){
  foodS= data.val();
  //foodObj.updateFoodStock(foodS);
}

function writeStock(x){
  database.ref("/").update({
    food:x
  })
}

/*function feedDog(){
  dog.addImage("dogImg",happydogImage);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function displayLastFed(){
  
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    console.log("inside: "+lastFed);
    text("Last Feed : "+ lastFed%12 + " PM", 350, 30);
  }else if(lastFed==0){
    text("last Feed : 12 AM", 350, 30);
  }else{
    text("Last Feed : " +lastFed + " AM", 350, 30);
  }
}

function update(state){
  database.ref('/').update({
    gameState:state
  });
}*/



