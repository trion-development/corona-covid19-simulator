export declare class Vector2D {
    x: number;
    y: number;
    constructor(x: number, y: number);
    static random(randomNumberGenerator: (() => number) | undefined): Vector2D;
    set(v: Vector2D): Vector2D;
    add(v: Vector2D): Vector2D;
    sub(v: Vector2D): Vector2D;
    mult(factor: number): Vector2D;
    div(factor: number): Vector2D;
    normalize(): Vector2D;
    length(): number;
    dot(v: Vector2D): number;
    negate(): Vector2D;
}
