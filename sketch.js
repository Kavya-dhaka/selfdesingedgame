var bg, bgImg;
var player, shooterImg, shooter_shooting;
var bullet, bullet_Img, bulletGroup;
var zombie, zombie_Img, zombieGroup;
var heart1, heart2, heart3;
var heart1_img, heart2_img, heart3_img;
var bullets = 70;
var gameState = "fight";
var life = 3;
var lose, win, explosion;
var score = 0;
var restart, restart_Img;

function preload() {

  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  zombie_Img = loadImage("assets/zombie.png");
  bgImg = loadImage("assets/bg.jpeg");
  heart1_img = loadImage("assets/heart_1.png");
  heart2_img = loadImage("assets/heart_2.png");
  heart3_img = loadImage("assets/heart_3.png");
  bullet_Img = loadImage("assets/bullet.png");
  restart_Img = loadImage("assets/reset.png");

  lose = loadSound("./assets/lose.mp3");
  win = loadSound("./assets/win.mp3");
  explosion = loadSound("./assets/explosion.mp3");
}

function setup() {


  createCanvas(windowWidth, windowHeight);

  //adding the background image
  bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20);
  bg.addImage(bgImg);
  bg.scale = 1.1;
  bg.visible = false;

  restart = createSprite(displayWidth - 200, displayHeight / 2 - 250);
  restart.addImage(restart_Img);
  restart.scale = 0.1;
  restart.visible = false;


  //creating the player sprite
  player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
  player.addImage(shooterImg);
  player.scale = 0.3;
  player.debug = false;
  player.setCollider("rectangle", 0, 0, 300, 400);

  heart1 = createSprite(displayWidth - 150, 40, 20, 20);
  heart1.addImage("heart1", heart1_img);
  heart1.scale = 0.4;
  heart1.visible = false;

  heart2 = createSprite(displayWidth - 175, 40, 20, 20);
  heart2.addImage("heart2", heart2_img);
  heart2.scale = 0.4;
  heart2.visible = false;

  heart3 = createSprite(displayWidth - 200, 40, 20, 20);
  heart3.addImage("heart3", heart3_img);
  heart3.scale = 0.4;

  zombieGroup = new Group();
  bulletGroup = new Group();
}

function draw() {
  background(0);

  if (gameState === "fight") {
    bg.visible = true;
    player.visible = true;
    if (life == 3) {
      heart3.visible = true;
      heart2.visible = false;
      heart1.visible = false;
    }
    if (life == 2) {
      heart3.visible = false;
      heart2.visible = true;
      heart1.visible = false;
    }
    if (life == 1) {
      heart3.visible = false;
      heart2.visible = false;
      heart1.visible = true;
    }
    if (life == 0) {
      gameState = "lost";
    }
    //moving the player up and down and making the game mobile compatible using touches
    if ((keyDown("UP_ARROW") || touches.length > 0 ) && player.y > 80) {
      player.y = player.y - 30;
    }
    if ((keyDown("DOWN_ARROW") || touches.length > 0) && player.y < height - 80) {
      player.y = player.y + 30;
    }
    //release bullets and change the image of shooter to shooting position when space is pressed
    if (keyWentDown("space")) {
      player.addImage(shooter_shooting);
      bullet = createSprite(displayWidth - 1150, player.y - 25, 20, 10);
      bullet.velocityX = 20;
      bullet.addImage(bullet_Img);
      bullet.scale = 0.1;
      bulletGroup.add(bullet);
      bullets = bullets - 1;
      explosion.play();
    }

    //player goes back to original standing image once we stop pressing the space bar
    else if (keyWentUp("space")) {
      player.addImage(shooterImg);
    }
    enemy();

    if (zombieGroup.isTouching(player)) {
      lose.play();
      for (var i = 0; i < zombieGroup.length; i++) {
        if (zombieGroup[i].isTouching(player)) {
          zombieGroup[i].destroy();
          life = life - 1;
        }
      }
    }

    if (zombieGroup.isTouching(bulletGroup)) {
      for (var i = 0; i < zombieGroup.length; i++) {
        if (zombieGroup[i].isTouching(bulletGroup)) {
          zombieGroup[i].destroy();
          bulletGroup.destroyEach();
          score = score + 1;
        }
      }
    }
    if (score === 50) {
      gameState = "won";
      win.play();
    }
    if (bullets == 0) {
      gameState = "bullet";
      lose.play();
    }


  }
  else if (gameState == "lost") {
    //  textSize(100);
    // fill("red");
    // text("you lost", 400, 400);
    //  zombieGroup.destroyEach();
    // player.visible = false;
    // bg.visible = false;
    // restart.visible = true;
    //  heart1.visible = false;
    // heart2.visible = false;
    //  heart3.visible = false;

    // if (mousePressedOver(restart)) {
    //   reset();
    //}
    swal(
      {
        title: `Game Over!!!`,
        text: "you lost all lives",
        imageUrl:
          "https://e7.pngegg.com/pngimages/907/821/png-clipart-thumbs-down-emoji-smiley-emoji-face-emoticon-thumb-smiley.png",
        imageSize: "150x150",
        confirmButtonText: "Play Again"
      },
      function (isConfirm) {
        if (isConfirm) {
          location.reload();
        }
      }
    );
  }

  else if (gameState == "won") {
    //textSize(100);
    //fill("yellow");
    ///text("you won", 400, 400);
    //  zombieGroup.destroyEach();
    //player.visible = false;
    // bg.visible = false;
    //restart.visible = true;
    //heart1.visible = false;
    // heart2.visible = false;
    //heart3.visible = false;
    swal(
      {
        title: `congratulations!!!`,
        text: "you won",
        imageUrl:
          "https://w7.pngwing.com/pngs/38/272/png-transparent-thumb-signal-gesture-thumbs-up-miscellaneous-logo-smiley.png",

        imageSize: "150x150",
        confirmButtonText: "Play Again"
      },
      function (isConfirm) {
        if (isConfirm) {
          location.reload();
        }
      }
    );
  }
  else if (gameState == "bullet") {
    // textSize(50);
    // fill("green");
    // text("you ran out of bullets", 470, 410);
    // bulletGroup.destroyEach();
    // player.visible = false;
    //zombieGroup.destroyEach();
    //bg.visible = false;
    //restart.visible = true;
    //heart1.visible = false;
    // heart2.visible = false;
    // heart3.visible = false;
    swal(
      {
        title: `Game Over!!!`,
        text: "you lost all bullets",
        imageUrl:
          "https://e7.pngegg.com/pngimages/907/821/png-clipart-thumbs-down-emoji-smiley-emoji-face-emoticon-thumb-smiley.png",
        imageSize: "150x150",
        confirmButtonText: "Play Again"
      },
      function (isConfirm) {
        if (isConfirm) {
          location.reload();
        }
      }
    );
  }
  drawSprites();

  textSize(20);
  fill("white");
  text("Bullets = " + bullets, displayWidth - 210, displayHeight / 2 - 350);
  text("Score = " + score, displayWidth - 210, displayHeight / 2 - 320);
  text("Lives = " + life, displayWidth - 210, displayHeight / 2 - 290);
}

function reset() {
  gameState = "fight";
  zombieGroup.destroyEach();
  life = 3;
  restart.visible = false;
  bullets = 70;
  score = 0;
}

function enemy() {
  if (frameCount % 50 === 0) {
    zombie = createSprite(random(600, 1100), random(100, 500), 20, 20);
    zombie.addImage(zombie_Img);
    zombie.scale = 0.15;
    zombie.velocityX = -2.25;
    zombie.lifeTime = 500;
    zombie.setCollider("rectangle", 0, 0, 400, 600);
    zombie.debug = false;
    zombieGroup.add(zombie);
  }
}

