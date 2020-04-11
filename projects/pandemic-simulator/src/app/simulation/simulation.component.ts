import { AfterViewInit, Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from '../chart/chart.component';
import { Border } from '../models/border';
import {
  borderWidthHalf,
  colors,
  FULL_ANGLE,
  lightGrayColor,
  oneThirdWidth,
  PERSON_RADIUS,
  TOTAL_FRAMES,
  twoThirdsWidth,
  updateIntervallMs,
  WIDTH
} from '../models/constants';
import { Health } from '../models/health.enum';
import { Person } from '../models/person';
import { SimulatorParams } from '../models/simulator-params';

@Component({
  selector: 'cosi-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit, AfterViewInit {

  @ViewChild('canvasElement') canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('container') canvasContainer: ElementRef<HTMLElement>;
  @ViewChild(ChartComponent) chart: ChartComponent;

  @Input() simulatorParams: SimulatorParams;
  @Input() randomNumberGenerator?: () => number;

  private rightBorder: Border = {
    position: twoThirdsWidth,
    leftWall: twoThirdsWidth - borderWidthHalf,
    rightWall: twoThirdsWidth + borderWidthHalf,
    ballLeftPosition: twoThirdsWidth - borderWidthHalf - PERSON_RADIUS,
    ballRightPosition: twoThirdsWidth + borderWidthHalf + PERSON_RADIUS,
    closed: false,
    color: lightGrayColor
  };
  private leftBorder: Border = {
    position: oneThirdWidth,
    leftWall: oneThirdWidth - borderWidthHalf,
    rightWall: oneThirdWidth + borderWidthHalf,
    ballLeftPosition: oneThirdWidth - borderWidthHalf - PERSON_RADIUS,
    ballRightPosition: oneThirdWidth + borderWidthHalf + PERSON_RADIUS,
    closed: false,
    color: lightGrayColor
  };

  private ctx: CanvasRenderingContext2D;
  private persons: Person[] = [];
  private currentFrame = 0;
  private updateInterval: number;
  private resizeTimeout: number;

  constructor(private zone: NgZone) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (ctx) {
      this.ctx = ctx;
      this.drawOutline();
    }
  }

  toggleRightBorder(): void {
    this.rightBorder.closed = !this.rightBorder.closed;
    this.rightBorder.color = this.rightBorder.closed ? colors.border.closed : colors.border.opened;
  }

  toggleLeftBorder(): void {
    this.leftBorder.closed = !this.leftBorder.closed;
    this.leftBorder.color = this.leftBorder.closed ? colors.border.closed : colors.border.opened;
  }

  start(): void {

    this.zone.runOutsideAngular(() => {
      clearInterval(this.updateInterval);

      this.chart.init(this.simulatorParams.population);

      // clean simulation states
      this.persons = [];
      this.currentFrame = 0;

      // create sick and healthy balls
      let ballIdx = 0;
      while (ballIdx < 1) {
        if (this.randomNumberGenerator) {
          this.persons.push(new Person(Health.SICK, this.randomNumberGenerator));
        } else {
          this.persons.push(new Person(Health.SICK));
        }
        ballIdx++;
      }
      while (ballIdx < this.simulatorParams.population) {
        if (this.randomNumberGenerator) {
          this.persons.push(new Person(Health.HEALTHY, this.randomNumberGenerator));
        } else {
          this.persons.push(new Person(Health.HEALTHY));
        }
        ballIdx++;
      }

      // shuffle balls
      this.shuffleBalls();

      const socialDistancingTotal = Math.floor(this.simulatorParams.population * this.simulatorParams.distancing);
      // make socialDistancing balls
      for (let i = 0; i < socialDistancingTotal; i++) {
        this.persons[i].socialDistancing = true;
      }

      // start chart
      // start chart
      this.chart.start();

      // set interval
      this.updateInterval = setInterval(
        () => this.update(this.simulatorParams.infectionRate, this.simulatorParams.deathRate),
        updateIntervallMs
      );
    });
  }

  private shuffleBalls(): void {
    // Fisher–Yates shuffle (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
    for (let i = 0; i < this.persons.length; i++) {
      const rand = Math.floor((this.randomNumberGenerator ? this.randomNumberGenerator() : Math.random()) * this.persons.length);
      const temp = this.persons[i];
      this.persons[i] = this.persons[rand];
      this.persons[rand] = temp;
    }
  }

  private update(infectionRate: number, deathrate: number): void {
    // This O(N^2) method could be faster using
    // Binary Space Partitioning (https://en.wikipedia.org/wiki/Binary_space_partitioning)
    // or Quadtrees (https://en.wikipedia.org/wiki/Quadtree)
    for (let i = 0; i < this.persons.length; i++) {
      for (let j = i + 1; j < this.persons.length; j++) {
        // check collision and update states, positions & velocities
        this.persons[i].ballsCollision(this.persons[j], infectionRate);
      }
    }

    const statsData = {[Health.SICK]: 0, [Health.HEALTHY]: 0, [Health.RECOVERED]: 0, [Health.DEAD]: 0};
    this.persons.forEach(person => {
      // count stats
      statsData[person.health]++;

      // update ball positions & velocities
      person.move();
      person.checkHealth(deathrate);

      // check canvas boundaries collision
      person.canvasBoundariesCollision();

      // check borders collision
      person.bordersCollision(this.leftBorder, this.rightBorder);
    });

    // update chart
    this.chart.update(statsData);

    // draw everything
    this.draw();

    // stop simulation if needed
    this.currentFrame++;
    if (this.currentFrame === TOTAL_FRAMES) {
      clearInterval(this.updateInterval);
      window.addEventListener('resize', () => this.resizeEventHandler());
      this.simulationEnd();
    }
  }

  private resizeEventHandler(): void {
    // this mechanism is to prevent/delay many drawings of the same things when resizing the browser
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.draw();
    }, updateIntervallMs);
  }

  private draw(): void {
    const dimensions = this.drawOutline();

    // draw dead balls (they should be under all other balls in the canvas)
    for (let i = 0; i < this.persons.length; i++) {
      if (this.persons[i].health === Health.DEAD) {
        this.drawBall(this.persons[i], dimensions.scaleWidthRatio);
      }
    }
    // draw other balls
    for (let i = 0; i < this.persons.length; i++) {
      if (this.persons[i].health !== Health.DEAD) {
        this.drawBall(this.persons[i], dimensions.scaleWidthRatio);
      }
    }

    // draw chart
    this.chart.draw();
  }

  private drawOutline(): { width: number, height: number, scaleWidthRatio: number } {
    const dimensions = {
      width: this.canvasContainer.nativeElement.offsetWidth,
      height: this.canvasContainer.nativeElement.offsetHeight,
      scaleWidthRatio: this.canvas.nativeElement.offsetWidth / WIDTH
    };

    // update dimensions and clear canvas
    // the canvas is cleared when a new value is attached to dimensions (no matter if a same value)
    this.canvas.nativeElement.width = dimensions.width;
    this.canvas.nativeElement.height = dimensions.height;
    dimensions.scaleWidthRatio = this.canvas.nativeElement.offsetWidth / WIDTH;

    // draw borders
    this.drawBorder(this.leftBorder, dimensions);
    this.drawBorder(this.rightBorder, dimensions);

    // draw canvas boundaries
    this.drawCanvasBoundaries(dimensions);
    return dimensions;
  }

  private drawLine(color: string, position: number, dimensions: { width: number, height: number, scaleWidthRatio: number }): void {
    const scaledPosition = position * dimensions.scaleWidthRatio;

    this.ctx.beginPath();
    this.ctx.moveTo(scaledPosition, 0);
    this.ctx.lineTo(scaledPosition, dimensions.height);
    this.ctx.closePath();

    this.ctx.strokeStyle = color;
    this.ctx.stroke();
  }

  private drawBorder(border: Border, dimensions: { width: number, height: number, scaleWidthRatio: number }): void {
    this.drawLine(border.color, border.leftWall, dimensions);
    this.drawLine(border.color, border.rightWall, dimensions);
  }

  private drawCanvasBoundaries(dimensions: { width: number, height: number, scaleWidthRatio: number }): void {
    this.ctx.strokeStyle = colors.canvasBoundary;
    this.ctx.strokeRect(0, 0, dimensions.width, dimensions.height);
  }

  private drawBall(ball: Person, scaleWidthRatio: number): void {
    const scaledX = ball.position.x * scaleWidthRatio;
    const scaledY = ball.position.y * scaleWidthRatio;
    const scaledRadius = PERSON_RADIUS * scaleWidthRatio;

    this.ctx.beginPath();
    this.ctx.arc(scaledX, scaledY, scaledRadius, 0, FULL_ANGLE);
    this.ctx.closePath();

    this.ctx.fillStyle = colors.states[ball.health];
    this.ctx.fill();
  }

  private simulationEnd(): void {
    // hide(borderBtnsContainer);
    // show(simulationEndBtnsContainer);
  }
}
