// Select elements on the page - canvas, shake button
const canvas = document.querySelector('#etch-a-sketch');
const shakeButton = document.querySelector('.shake');
const ctx = canvas.getContext('2d');
const MOVE_AMOUNT = 10;

// Setup canvas for drawing
const {width, height } = canvas;

// Create random x and y starting points on the canvas
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.beginPath(); // Start the drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// Write a draw function
function draw({key}) {
    // Increment the hue
    hue += 5;
    ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
    console.log(key);
    // Begin the path
    ctx.beginPath();
    ctx.moveTo(x, y);
    // Move x and y value on user input
    switch(key) {
        case 'ArrowUp': 
            y -= MOVE_AMOUNT;
            break;
        case 'ArrowDown':
            y += MOVE_AMOUNT;
            break;
        case 'ArrowLeft':
            x -= MOVE_AMOUNT;
            break;
        case 'ArrowRight':
            x +=  MOVE_AMOUNT;
            break;
        default:
            break;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
}

// Write a handler for the keys
function handleKeys(e) {
    if(e.key.includes('Arrow')) {
        e.preventDefault();
        draw({key: e.key})
    }
}

// Clear shake function 
function clearCanvas() {
    canvas.classList.add('shake');
    ctx.clearRect(0, 0, width, height);
    canvas.addEventListener('animationend', function() {
        canvas.classList.remove('shake');
    }, {once: true});
}

// Listen for arrow keys
window.addEventListener('keydown', handleKeys);
// Click the shake button to clear canvas
shakeButton.addEventListener('click', clearCanvas);