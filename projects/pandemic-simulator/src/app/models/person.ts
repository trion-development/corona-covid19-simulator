import { Border } from './border';
import { HEIGHT, PERSON_GAP, PERSON_RADIUS, PERSON_SPEED, sicknessInterval, WIDTH } from './constants';
import { Health } from './health.enum';
import { Vector2D } from './vector2d';

export class Person {

  static readonly LEFT_BOUNDARY = PERSON_RADIUS;
  static readonly RIGHT_BOUNDARY = WIDTH - PERSON_RADIUS;
  static readonly TOP_BOUNDARY = PERSON_RADIUS;
  static readonly BOTTOM_BOUNDARY = HEIGHT - PERSON_RADIUS;

  position: Vector2D;
  socialDistancing: boolean;


  private velocity: Vector2D;
  private timeToRecovery: number;

  private positionDiff = new Vector2D(0, 0);
  private rng: () => number;

  constructor(public health: Health, randomNumberGenerator?: () => number) {
    this.rng = randomNumberGenerator || Math.random;
    this.position = Vector2D.random(this.rng);
    this.position.x *= WIDTH;
    this.position.y *= HEIGHT;
    this.velocity = Person.applySpeed(Vector2D.random(this.rng).sub(new Vector2D(0.5, 0.5)));
    this.socialDistancing = false;
    this.timeToRecovery = Math.floor(
      sicknessInterval.from + this.rng() * (sicknessInterval.to - sicknessInterval.from)
    );
  }

  static applySpeed(velocity: Vector2D): Vector2D {
    return velocity.normalize().mult(PERSON_SPEED);
  }

  static reflectBall(ball: Person, direction: Vector2D, distanceDiff: number): void {
    direction.normalize();

    // move the ball outside of collision
    const diff = distanceDiff + PERSON_GAP / 2;
    ball.position = ball.position.add(direction.mult(diff));

    direction.normalize();
    // reflect ball, solution: r=d−2(d*n)n (https://math.stackexchange.com/questions/13261/how-to-get-a-reflection-vector)
    ball.velocity = ball.velocity.sub(direction.mult(2 * ball.velocity.dot(direction)));
  }

  static separateBalls(ballA: Person, ballB: Person, positionSub: Vector2D, distanceDiff: number): void {
    // move balls outside of collision
    const diff = distanceDiff / 2 + PERSON_GAP;
    const adjustment = positionSub.normalize().mult(diff);
    ballA.position = ballA.position.add(adjustment);
    ballB.position = ballB.position.add(adjustment.negate());
    positionSub.normalize();
  }

  static ellasticCollision(ballA: Person, ballB: Person, direction: Vector2D, distance: number): void {
    // Elastic collision, but the ball speed is reverted after the collision (no energy lost in this case)
    // The formula can be found here: https://en.wikipedia.org/wiki/Elastic_collision
    const adjustment = direction.mult(ballA.velocity.sub(ballB.velocity).dot(direction) / (distance * distance));
    ballA.velocity = Person.applySpeed(ballA.velocity.sub(adjustment));
    ballB.velocity = Person.applySpeed(ballB.velocity.sub(adjustment.negate()));
  }

  static borderCollision(border: Border, ball: Person): void {
    if (!border.closed) {
      return;
    }

    if (border.ballLeftPosition <= ball.position.x && border.ballRightPosition >= ball.position.x) {
      // move ball outside the border
      ball.position.x = (ball.position.x <= border.position) ?
        border.ballLeftPosition : border.ballRightPosition;

      // reflect ball
      ball.velocity.x = -ball.velocity.x;
    }
  }

  canvasBoundariesCollision(): void {
    if (this.position.x <= Person.LEFT_BOUNDARY || this.position.x >= Person.RIGHT_BOUNDARY) {
      // move ball inside the boundaries
      this.position.x = (this.position.x <= Person.LEFT_BOUNDARY) ?
        Person.LEFT_BOUNDARY : Person.RIGHT_BOUNDARY;

      // reflection ball
      this.velocity.x = -this.velocity.x;
    }
    if (this.position.y <= Person.TOP_BOUNDARY || this.position.y >= Person.BOTTOM_BOUNDARY) {
      // move ball inside the borders
      this.position.y = (this.position.y <= Person.TOP_BOUNDARY) ?
        Person.TOP_BOUNDARY : Person.BOTTOM_BOUNDARY;

      // reflection ball
      this.velocity.y = -this.velocity.y;
    }
  }

  bordersCollision(leftBorder: Border, rightBorder: Border): void {
    Person.borderCollision(leftBorder, this);
    Person.borderCollision(rightBorder, this);
  }

  ballsCollision(ball: Person, infectionRate: number): void {
    if (this.health === Health.DEAD || ball.health === Health.DEAD) {
      return;
    }
    this.positionDiff.set(this.position);
    this.positionDiff.sub(ball.position);
    const distance = this.positionDiff.length();
    const distanceDiff = (2 * PERSON_RADIUS) - distance; // 2* ballradius === minDistance

    if (distanceDiff >= 0) {
      if (this.socialDistancing) {
        Person.reflectBall(ball, this.positionDiff.negate(), distanceDiff);
      } else if (ball.socialDistancing) {
        Person.reflectBall(this, this.positionDiff, distanceDiff);
      } else {
        Person.separateBalls(this, ball, this.positionDiff, distanceDiff);

        if (!ball.socialDistancing || !this.socialDistancing) {
          Person.ellasticCollision(this, ball, this.positionDiff, distance);
        }
      }

      if ((this.health === Health.SICK || ball.health === Health.SICK) &&
        (this.health === Health.HEALTHY || ball.health === Health.HEALTHY) &&
        (this.rng() < infectionRate)) {
        this.health = ball.health = Health.SICK;
      }   // both will be sick if at least one is infected in the collision
    }
  }

  move(): void {
    if (!this.socialDistancing && this.health !== Health.DEAD)
      // move the ball using velocities if not social distancing or dead
    {
      this.position = this.position.add(this.velocity);
    }
  }

  checkHealth(deathRate: number): void {
    if (this.health === Health.SICK && (--this.timeToRecovery) === 0)
      // check if this ball is dead or recovered
    {
      this.health = (this.rng() < deathRate) ? Health.DEAD : Health.RECOVERED;
    }
  }
}
