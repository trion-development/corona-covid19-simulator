export class Vector2D {
  constructor(public x: number, public y: number) {
  }

  static random(randomNumberGenerator: (() => number) | undefined): Vector2D {
    // static function for a random vector
    if (randomNumberGenerator) {
      return new Vector2D(randomNumberGenerator(), randomNumberGenerator());
    }
    return new Vector2D(Math.random(), Math.random());
  }

  set(v: Vector2D): Vector2D {
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  add(v: Vector2D): Vector2D {
    // add 'v' to this vector
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  sub(v: Vector2D): Vector2D {
    // substract 'v' from this vector (direction from this to 'v' vector)
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  mult(factor: number): Vector2D {
    // multiply this vector by constant 'factor'
    this.x *= factor;
    this.y *= factor;
    return this;
  }

  div(factor: number): Vector2D {
    // divide this vector by constant 'factor'
    if (!factor) {
      return new Vector2D(0, 0);
    }
    this.x /= factor;
    this.y /= factor;
    return this;
  }

  normalize(): Vector2D {
    // convert to unit vector, vector with length of 1 (distance between origin and this vector)
    // NOTE: unsafe normalize (if length is zero)!
    return this.div(this.length());
  }

  length(): number {
    // lenght of this vector (Pythagorean theorem)
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  dot(v: Vector2D): number {
    // dot product between this and 'v' vector
    return this.x * v.x + this.y * v.y;
  }

  negate(): Vector2D {
    // opposite from this vector
    return new Vector2D(
      -this.x,
      -this.y
    );
  }
}
