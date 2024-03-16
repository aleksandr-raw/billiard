import {
    DAMPING,
    SHADOW_BLUR,
    SHADOW_COLOR,
    SHADOW_OFFSET_X,
    SHADOW_OFFSET_Y
} from "../constants/constants";

export class Ball {
    mass: number;
    damping = DAMPING;

    constructor(public x: number,
                public y: number,
                public radius: number,
                public color: string,
                public dx: number,
                public dy: number) {
        this.mass = radius * radius;
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.setShadow(ctx);
        this.setFillStyle(ctx);

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        this.resetShadow(ctx);
    }

    setColor(newColor: string) {
        this.color = newColor;
    }

    setShadow(ctx: CanvasRenderingContext2D) {
        ctx.shadowBlur = SHADOW_BLUR;
        ctx.shadowColor = SHADOW_COLOR;
        ctx.shadowOffsetX = SHADOW_OFFSET_X;
        ctx.shadowOffsetY = SHADOW_OFFSET_Y;
    }

    resetShadow(ctx: CanvasRenderingContext2D) {
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }

    setFillStyle(ctx: CanvasRenderingContext2D) {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, 'rgb(255, 255, 255)');
        gradient.addColorStop(0.3, this.color);
        gradient.addColorStop(0.9, this.color);
        gradient.addColorStop(1, 'rgba(0,0,0, 0.1)');
        ctx.fillStyle = gradient;
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
        this.dx *= this.damping;
        this.dy *= this.damping;
    }

    resolveCollision(other: Ball) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const collisionAngle = Math.atan2(dy, dx);
        const speed1 = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        const speed2 = Math.sqrt(other.dx * other.dx + other.dy * other.dy);
        const direction1 = Math.atan2(this.dy, this.dx);
        const direction2 = Math.atan2(other.dy, other.dx);
        const velocityX1 = speed1 * Math.cos(direction1 - collisionAngle);
        const velocityY1 = speed1 * Math.sin(direction1 - collisionAngle);
        const velocityX2 = speed2 * Math.cos(direction2 - collisionAngle);
        const velocityY2 = speed2 * Math.sin(direction2 - collisionAngle);
        const finalVelocityX1 = ((this.mass - other.mass) * velocityX1 + (other.mass + other.mass) * velocityX2) / (this.mass + other.mass);
        const finalVelocityX2 = ((this.mass + this.mass) * velocityX1 + (other.mass - this.mass) * velocityX2) / (this.mass + other.mass);
        this.dx = Math.cos(collisionAngle) * finalVelocityX1 + Math.cos(collisionAngle + Math.PI / 2) * velocityY1;
        this.dy = Math.sin(collisionAngle) * finalVelocityX1 + Math.sin(collisionAngle + Math.PI / 2) * velocityY1;
        other.dx = Math.cos(collisionAngle) * finalVelocityX2 + Math.cos(collisionAngle + Math.PI / 2) * velocityY2;
        other.dy = Math.sin(collisionAngle) * finalVelocityX2 + Math.sin(collisionAngle + Math.PI / 2) * velocityY2;

        const overlap = this.radius + other.radius - Math.sqrt(dx * dx + dy * dy);
        const correction = (overlap / 2) * (1 + this.mass / other.mass);
        this.x += correction * Math.cos(collisionAngle);
        this.y += correction * Math.sin(collisionAngle);
        other.x -= correction * Math.cos(collisionAngle);
        other.y -= correction * Math.sin(collisionAngle);
    }

}
