import {useEffect} from "react";
import {checkBallCollision} from "../utils/utils";
import {Ball} from "../objects/Ball";

export const useBallCollision = (balls: Ball[]) => {
    useEffect(() => {
        checkBallCollision(balls);
    }, [balls]);
};
