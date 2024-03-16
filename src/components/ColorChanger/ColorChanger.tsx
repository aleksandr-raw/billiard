import React, {useEffect, useRef, useState} from "react";
import {Ball} from "../../objects/Ball";
import './ColorChanger.css';

type ColorChangerProps = {
    selectedBall: Ball | null;
    onCloseModal: () => void;
    onApplyColor: (color: string) => void;
}

export const ColorChanger = ({
                                 selectedBall,
                                 onCloseModal,
                                 onApplyColor
                             }: ColorChangerProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [previewColor, setPreviewColor] = useState(selectedBall?.color || '#000000');

    const handleCanvasClick = () => {
        inputRef.current?.click();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !selectedBall) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const previewBall = new Ball(
            canvas.width / 2,
            canvas.height / 2,
            selectedBall.radius,
            previewColor,
            0,
            0
        );

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        previewBall.draw(ctx);
    }, [selectedBall, previewColor]);

    const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPreviewColor(e.target.value);
    };

    const handleApplyColor = () => {
        onApplyColor(previewColor);
        onCloseModal();
    };
    return (
        <div className={'color-modal'}>
            <h1 className={'color-title'}>Сlick on the ball to change color</h1>
            <div className={'color-input-wrapper'}>
                <canvas className={'color-preview-ball'} ref={canvasRef}
                        width={100}
                        height={100}
                        onClick={handleCanvasClick}/>
                <input ref={inputRef} className={'color-input'} type="color"
                       value={previewColor}
                       onChange={handleChangeColor}/>
            </div>
            <button className={'color-btn'} onClick={handleApplyColor}>Apply
            </button>
        </div>
    )
}
