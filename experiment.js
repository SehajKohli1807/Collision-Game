class Experiment {
  // Group Details
  static rollNos = '102103171,102103167'
  static names = 'The Codex(Sehaj, Divreet)'

  canvasSel = '#myCanvas'

  run() {

    canvasSetup(this.canvasSel)

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');


const input = prompt("What is your name?")
document.getElementById("player_name").innerText=`Player Name: ${input}`

document.getElementById("player_level").innerText=`Difficulty Level: Medium`;



// Character properties
var character = {
    x: 50,
    y: canvas.height/2,
    width:60,
    height: 60,
    speed: 11
};

// Obstacles array
var obstacles = [];


var gameOver = false;
var score = 0;


document.addEventListener('keydown', function(event) {
    if (!gameOver) {
        if (event.key === 'ArrowUp' && character.y > 0) {
            character.y -= character.speed;
        } else if (event.key === 'ArrowDown' && character.y < canvas.height - character.height) {
            character.y += character.speed;
        } else if (event.key === 'ArrowLeft' && character.x > 0) {
            character.x -= character.speed;
        } else if (event.key === 'ArrowRight' && character.x < canvas.width - character.width) {
            character.x += character.speed;
        }
    } else {
        if (event.key === 'Enter') {
            restartGame();
        }
    }
});




function gameLoop() {
    if (!gameOver) {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }
}

// Update game state
function update() {
    // Create obstacles more frequently
    var obstacles_count=0; 
    if (Math.random() < 0.08) {
        var obstacle = {
            x: canvas.width,
            y: Math.random() * canvas.height,
            width: 40 + Math.random() * 50,
            height: 40 + Math.random() * 50,
            speed: 7 + Math.random() * 5
        };
        obstacles.push(obstacle);
        obstacles_count++;
       
    }

    // Move obstacles
    for (var i = 0; i < obstacles.length; i++) {
        obstacles[i].x -= obstacles[i].speed;

        // Check collision with character
        if (checkCollision(character, obstacles[i])) {
            gameOver = true;
        }

        // Increment score if obstacle passes the character
        if (obstacles[i].x + obstacles[i].width < character.x) {
            score++;
        }
    }
}

// Game objects
function draw() {
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw character
    ctx.fillStyle = '#ffcc00';
    ctx.fillRect(character.x, character.y, character.width, character.height);

    // Draw obstacles
    ctx.fillStyle = '#ff4444';
    for (var i = 0; i < obstacles.length; i++) {
        ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
    }

    // Display score
    ctx.fillStyle = '#fff';
    ctx.font = '35px Arial';
    ctx.fillText('Score: ' + score, 20, 30);

    // Display game over message
    if (gameOver) {
        ctx.fillStyle = '#fff';
        ctx.font = '60px Arial';
        ctx.fillText('Game Over!', canvas.width / 2 - 120, canvas.height / 2);
    }
}


function checkCollision(obj1, obj2) {
    return obj1.x < obj2.x + obj2.width &&
           obj1.x + obj1.width > obj2.x &&
           obj1.y < obj2.y + obj2.height &&
           obj1.y + obj1.height > obj2.y;
}


function restartGame() {
    obstacles = [];
    gameOver = false;
    score = 0;
    character.x = 50;
    character.y = canvas.height / 2;
}


gameLoop();
  }

}
