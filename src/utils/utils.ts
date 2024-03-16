import {Ball} from "../objects/Ball";

export const calculateDistance = (ball1: Ball, ball2: Ball) => {
    const dx = ball1.x - ball2.x;
    const dy = ball1.y - ball2.y;
    return Math.sqrt(dx * dx + dy * dy);
};

export const isCollision = (ball1: Ball, ball2: Ball) => {
    const distance = calculateDistance(ball1, ball2);
    return distance < ball1.radius + ball2.radius;
};

export const resolveCollision = (ball1: Ball, ball2: Ball) => {
    if (isCollision(ball1, ball2)) {
        ball1.resolveCollision(ball2);
    }
};

export const checkWallCollision = (ball: Ball, canvas: HTMLCanvasElement) => {
    if (ball.x + ball.dx < ball.radius || ball.x + ball.dx > canvas.width - ball.radius) {
        ball.dx = -ball.dx * ball.damping;
    }
    if (ball.y + ball.dy < ball.radius || ball.y + ball.dy > canvas.height - ball.radius) {
        ball.dy = -ball.dy * ball.damping;
    }
};

export const checkBallCollision = (balls: Ball[]) => {
    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        for (let j = i + 1; j < balls.length; j++) {
            const otherBall = balls[j];
            resolveCollision(ball, otherBall);
        }
    }
};
