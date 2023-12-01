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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoundary();

    ball.draw();

    // Move the ball
    ball.x += ball.vx;
    ball.y += ball.vy;

    // Check collision with the circular boundary
    let dx = ball.x - circleBoundary.x;
    let dy = ball.y - circleBoundary.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance + ball.radius > circleBoundary.radius) {
        let angle = Math.atan2(dy, dx);
        ball.vx = -Math.cos(angle) * Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
        ball.vy = -Math.sin(angle) * Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);

        ball.color = getRandomColor();

        // Diminishing increase in velocity
        let speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
        let increaseFactor = 1.02 + (1 / speed);
        if (increaseFactor > 1.05) increaseFactor = 1.05; // Cap the maximum increase

        ball.vx *= increaseFactor;
        ball.vy *= increaseFactor;
    }

    requestAnimationFrame(update);
}

update();
