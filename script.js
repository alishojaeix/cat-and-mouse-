// Select the canvas and set up its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions to match the window size
canvas.width = window.innerWidth * 0.8; // 80% of window width
canvas.height = window.innerHeight * 0.8; // 80% of window height

// Player object (cat)
const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 100,
  height: 100,
  speed: 5,
};

// Load the cat image
const catImage = new Image();
catImage.src = 'cat.jpg'; // Replace with your own cat image URL
catImage.onload = () => {
  player.width = catImage.width / 4; // Scale the image
  player.height = catImage.height / 4; // Scale the image
};

// Mouse position
let mouseX = player.x;
let mouseY = player.y;

// Event listener for mouse movement
canvas.addEventListener('mousemove', (event) => {
  mouseX = event.offsetX;
  mouseY = event.offsetY;
});

// Function to draw the cat
function drawPlayer() {
  if (catImage.complete) {
    ctx.drawImage(
      catImage,
      player.x,
      player.y,
      player.width,
      player.height
    );
  }
}

// Function to update the player's position
function updatePlayer() {
  // Calculate the direction vector
  const dx = mouseX - player.x - player.width / 2;
  const dy = mouseY - player.y - player.height / 2;

  // Normalize the direction vector and scale by speed
  const distance = Math.sqrt(dx * dx + dy * dy);
  if (distance > 0) {
    player.x += (dx / distance) * player.speed;
    player.y += (dy / distance) * player.speed;
  }

  // Boundary constraints
  player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
  player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));
}

// Game loop
function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update the player's position
  updatePlayer();

  // Draw the player
  drawPlayer();

  // Request the next frame
  requestAnimationFrame(gameLoop);
}

// Start the game loop once the image is loaded
catImage.onload = () => {
  gameLoop();
};