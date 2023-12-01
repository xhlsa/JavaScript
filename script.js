const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.style.background = 'black'; // Set canvas background to black

const circleBoundary = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 250 // Radius of the circular boundary
};

function drawBoundary() {
    ctx.beginPath();
    ctx.arc(circleBoundary.x, circleBoundary.y, circleBoundary.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = 'white';
    ctx.stroke();
}

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    vx: 5,
    vy: 5,
    radius: 20,
    color: 'blue',
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
};

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function update() {
    const acceleration = 0.01;
    const dampingFactor = 0.02;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoundary();

    ball.draw();

    // Move the ball
    ball.x += ball.vx;
    ball.y += ball.vy;

    // Calculate speed for the speed display
    let speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);

    // Check collision with the circular boundary
    let dx = ball.x - circleBoundary.x;
    let dy = ball.y - circleBoundary.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance + ball.radius > circleBoundary.radius) {
        // Adjust the ball's position to be exactly on the boundary
        let overlap = distance + ball.radius - circleBoundary.radius;
        ball.x -= overlap * (dx / distance);
        ball.y -= overlap * (dy / distance);

        // Reflect the ball off the boundary
        let angle = Math.atan2(dy, dx);
        let newSpeed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
        ball.vx = -Math.cos(angle) * newSpeed;
        ball.vy = -Math.sin(angle) * newSpeed;

        ball.color = getRandomColor();

        // Adjust the velocity based on acceleration and damping
        let increase = acceleration - (dampingFactor * newSpeed);
        ball.vx += increase * Math.cos(angle);
        ball.vy += increase * Math.sin(angle);
    }

    drawSpeed(speed); // Display the speed

    requestAnimationFrame(update);
}



function drawSpeed(speed) {
    ctx.save();
    ctx.font = '16px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(`Speed: ${speed.toFixed(2)}`, 10, canvas.height - 10);
    ctx.restore();
}



update();
