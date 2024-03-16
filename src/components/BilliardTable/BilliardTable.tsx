import React, {useCallback, useEffect, useRef, useState} from "react";
import {Ball} from "../../objects/Ball";
import './BilliardTable.css';
import {checkBallCollision, checkWallCollision} from "../../utils/utils";
import {
    BASE_RADIUS,
    BASE_RADIUS_MULTIPLIER_MAX,
    BASE_RADIUS_MULTIPLIER_MIN,
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    COLOR_HUE_MULTIPLIER,
    COLOR_LIGHTNESS,
    COLOR_SATURATION,
    OFFSET,
    PADDING,
    ROW_COUNT
} from "../../constants/constants";
import {ColorChanger} from "../ColorChanger/ColorChanger";

export const BilliardTable = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const [balls, setBalls] = useState<Ball[]>([]);
    const [selectedBall, setSelectedBall] = useState<Ball | null | undefined>(null);
    const [mouseDown, setMouseDown] = useState(false)

    const isBallUnderCursor = (ball: Ball, x: number, y: number) => {
        const distance = Math.hypot(ball.x - x, ball.y - y);
        return distance <= ball.radius;
    };

    useEffect(() => {
        const billiardBalls: Ball[] = [];
        let id = 1;
        for (let row = 0; row < ROW_COUNT; row++) {
            for (let col = 0; col <= row; col++) {
                const radius = BASE_RADIUS * (BASE_RADIUS_MULTIPLIER_MIN + Math.random() * BASE_RADIUS_MULTIPLIER_MAX);
                const x = OFFSET.x + (row * (radius * 2 + PADDING));
                const y = OFFSET.y + (col * (radius * 2 + PADDING)) - (row * (radius + PADDING / 2));
                billiardBalls.push(new Ball(x, y, radius, `hsl(${id * COLOR_HUE_MULTIPLIER}, ${COLOR_SATURATION}%, ${COLOR_LIGHTNESS}%)`, 0, 0));
                id++;
            }
        }
        setBalls(billiardBalls);
    }, []);


    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            balls.forEach(ball => {
                ball.update();
                ball.draw(ctx);
                checkWallCollision(ball, canvas);
            });

            checkBallCollision(balls);

            requestAnimationFrame(animate);
        };

        animate();
    }, [balls]);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!mouseDown) return;
        const rect = canvasRef.current!.getBoundingClientRect();
        const x = e.clientX - rect.left - 7;
        const y = e.clientY - rect.top - 7;
        balls.forEach(ball => {
            if (isBallUnderCursor(ball, x, y)) {
                const dx = ball.x - x;
                const dy = ball.y - y;
                const magnitude = Math.sqrt(dx * dx + dy * dy);
                ball.dx += dx / magnitude;
                ball.dy += dy / magnitude;
            }
        });
    }, [mouseDown, balls]);


    const handleMouseDown = useCallback(() => {
        setMouseDown(true);
        if (canvasRef.current) {
            canvasRef.current.classList.add('mouse-down');
        }
    }, []);

    const handleMouseUp = useCallback(() => {
        setMouseDown(false);
        if (canvasRef.current) {
            canvasRef.current.classList.remove('mouse-down');
        }
    }, []);

    const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        const rect = canvasRef.current!.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const clickedBall = balls.find(ball => Math.hypot(ball.x - x, ball.y - y) < ball.radius);
        setSelectedBall(clickedBall);
    }, [balls]);

    const handleApplyColor = useCallback((color: string) => {
        if (selectedBall) {
            selectedBall.setColor(color);
        }
    }, [selectedBall]);


    const onCloseModal = () => {
        setSelectedBall(null);
    }

    return (
        <div className={'container'}>
            <canvas className={'table'} ref={canvasRef}
                    onMouseMove={handleMouseMove}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onClick={handleClick} width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}/>
            {selectedBall &&
                <ColorChanger
                    selectedBall={selectedBall}
                    onCloseModal={onCloseModal}
                    onApplyColor={handleApplyColor}/>}
        </div>
    );
}
