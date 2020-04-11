import { Border } from './border';
import { Health } from './health.enum';
import { Vector2D } from './vector2d';
export declare class Person {
    health: Health;
    static readonly LEFT_BOUNDARY = 0.8;
    static readonly RIGHT_BOUNDARY: number;
    static readonly TOP_BOUNDARY = 0.8;
    static readonly BOTTOM_BOUNDARY: number;
    position: Vector2D;
    socialDistancing: boolean;
    private velocity;
    private timeToRecovery;
    private positionDiff;
    private rng;
    constructor(health: Health, randomNumberGenerator?: () => number);
    static applySpeed(velocity: Vector2D): Vector2D;
    static reflectBall(ball: Person, direction: Vector2D, distanceDiff: number): void;
    static separateBalls(ballA: Person, ballB: Person, positionSub: Vector2D, distanceDiff: number): void;
    static ellasticCollision(ballA: Person, ballB: Person, direction: Vector2D, distance: number): void;
    static borderCollision(border: Border, ball: Person): void;
    canvasBoundariesCollision(): void;
    bordersCollision(leftBorder: Border, rightBorder: Border): void;
    ballsCollision(ball: Person, infectionRate: number): void;
    move(): void;
    checkHealth(deathRate: number): void;
}
