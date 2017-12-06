const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const progressBar = document.querySelector("progress");
const PLAYER_SOURCE = "https://i.imgur.com/HOaDVK2.png";
const PLAYER_SPEED = 7;
const PLAYER_STARTING_X = 250;
const PLAYER_STARTING_Y = 150;
const PLAYER_WIDTH = 67;
const PLAYER_HEIGHT = 55;
const ENEMY_SOURCE = "https://i.imgur.com/YapzdhJ.png";
const ENEMY_SPEED = Math.random()*(3-.75)+.75;
const ENEMY_STARTING_X = 80;
const ENEMY_STARTING_Y = 200;
const ENEMY_WIDTH = 60;
const ENEMY_HEIGHT = 60;
const POWER_UP_START_X = Math.random()*(canvas.width - 1) + 1;
const POWER_UP_START_Y = Math.random()*(canvas.height - 1) + 1;
const POWER_UP_WIDTH = 50;
const POWER_UP_HEIGHT = 50;
let gameIsOver = false;
let timer = 0;
let score = 0;
const TIME_UNTIL_SPAWN = 500;

let snowyImage = new Image();
snowyImage.src = "https://i.imgur.com/2z59iGt.jpg";

let gameOverImg = new Image();
gameOverImg.src = "https://i.imgur.com/ITiY5vs.png";

let santaHatImg = new Image();
santaHatImg.src = 'https://i.imgur.com/ThdI5fE.png';


function haveCollided(sprite1, sprite2) {
  return (
    sprite1.x < sprite2.x + (sprite2.imgWidth) &&
    sprite1.x + (sprite1.imgWidth) > sprite2.x &&
    sprite1.y < sprite2.y + (sprite2.imgHeight) &&
    sprite1.imgHeight + sprite1.y > sprite2.y
  );
}

class Sprite {
  draw() {
    var img = new Image();
    img.src = this.source;
    ctx.drawImage(img, this.x, this.y, this.imgWidth, this.imgHeight);
  }
  moveToward(leader, speed) {
    let dx = leader.x - this.x;
    let dy = leader.y - this.y;
    let distanceBetween = Math.hypot(dx, dy);
    if (speed > distanceBetween) {
      this.x = leader.x;
      this.y = leader.y;
    }
    else {
      let speedx = speed * (dx / distanceBetween);
      let speedy = speed * (dy / distanceBetween);
      this.x += speedx;
      this.y += speedy;
    }
  }
  jumpBack(sprite2) {
    if ((this.x + this.imgWidth / 2) < (sprite2.x + sprite2.imgWidth / 2)) {
      this.x -= 2;
    }
    if ((this.y + this.imgHeight / 2) < (sprite2.y + sprite2.imgHeight / 2)) {
      this.y -= 2;
    }
    if ((this.x + this.imgWidth / 2) > (sprite2.x + sprite2.imgWidth / 2)) {
      this.x += 2;
    }
    if ((this.y + this.imgHeight / 2) > (sprite2.y + sprite2.imgHeight / 2)) {
      this.y += 2;
    }
  }
}

class Player extends Sprite {
  constructor(source, x, y, speed, imgWidth, imgHeight) {
    super();
    Object.assign(this, {
      source,
      x,
      y,
      speed,
      imgWidth,
      imgHeight
    });
  }
}

let player = new Player(
  PLAYER_SOURCE,
  PLAYER_STARTING_X,
  PLAYER_STARTING_Y,
  PLAYER_SPEED,
  PLAYER_WIDTH,
  PLAYER_HEIGHT
);

class Enemy extends Sprite {
  constructor(source, x, y, speed, imgWidth, imgHeight) {
    super();
    Object.assign(this, {
      source,
      x,
      y,
      speed,
      imgWidth,
      imgHeight
    });
  }
}

let enemies = [
  new Enemy(ENEMY_SOURCE, ENEMY_STARTING_X, ENEMY_STARTING_Y, ENEMY_SPEED, ENEMY_WIDTH, ENEMY_HEIGHT)
];

let mouse = {
  x: 0,
  y: 0
};
document.body.addEventListener("mousemove", updateMouse);

function updateMouse(event) {
  const {
    left,
    top
  } = canvas.getBoundingClientRect();
  mouse.x = event.clientX - left;
  mouse.y = event.clientY - top;
}

function updateScene() {
  player.moveToward(mouse, player.speed);
  enemies.forEach(enemy => enemy.moveToward(player, enemy.speed));
  if (player.x < 0) {
    player.x = 0;
  }
  if (player.x + player.imgWidth > canvas.width) {
    player.x = canvas.width - player.imgWidth;
  }
  if (player.y < 0) {
    player.y = 0;
  }
  if (player.y + player.imgHeight > canvas.height) {
    player.y = canvas.height - player.imgHeight;
  }
  if (timer % TIME_UNTIL_SPAWN === 0) {
    enemies.push(new Enemy(ENEMY_SOURCE, ENEMY_STARTING_X, ENEMY_STARTING_Y, ENEMY_SPEED, ENEMY_WIDTH, ENEMY_HEIGHT));
    score += 2;
    document.getElementById('score').innerHTML= score;
  }
  enemies.forEach(enemy => {
    if (haveCollided(enemy, player)) {
      progressBar.value -= 1;
      enemy.jumpBack(player);
    }
  });
  for (let i = 1; i < enemies.length; i++) {
    if (haveCollided(enemies[i-1], enemies[i])) {
      enemies[i].jumpBack(enemies[i-1]);
    }
  }
    if (progressBar.value <= 0) {
      gameIsOver = true;
    }
  requestAnimationFrame(drawScene);
}

function santaHat() {
  ctx.drawImage(santaHatImg, 10, 10, POWER_UP_WIDTH, POWER_UP_HEIGHT);
}

  setTimeout(santaHat, 1000);

  function gameOver() {
    clearBackground();
    ctx.drawImage(gameOverImg, 30, 30);
    //http://www.powerpointhintergrund.com/ppt-image/game-over-png-1406.html
  }

  function clearBackground() {
    ctx.drawImage(snowyImage, 0, 0, canvas.width, canvas.height);
    //http://clipartix.com/winter-clipart-image-40921/
  }

  function drawScene() {
    clearBackground();
    player.draw();
    enemies.forEach(enemy => enemy.draw());
    if (gameIsOver) {
      gameOver();
    } else {
      timer++;
      updateScene();
    }

  }

  requestAnimationFrame(drawScene);