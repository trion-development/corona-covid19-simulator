import { NgIf, CommonModule } from '@angular/common';
import { ɵɵdirectiveInject, ChangeDetectorRef, ɵɵdefineComponent, ɵɵviewQuery, ɵɵqueryRefresh, ɵɵloadQuery, ɵɵelementStart, ɵɵtext, ɵɵelementEnd, ɵɵelement, ɵɵadvance, ɵɵtextInterpolate, ɵsetClassMetadata, Component, ViewChild, EventEmitter, ɵɵproperty, ChangeDetectionStrategy, Input, Output, ɵɵlistener, ɵɵgetCurrentView, ɵɵelementContainerStart, ɵɵrestoreView, ɵɵnextContext, ɵɵreference, ɵɵelementContainerEnd, ApplicationRef, ɵɵtemplate, ViewChildren, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { FormGroup, FormControl, ɵangular_packages_forms_forms_y, NgControlStatusGroup, FormGroupDirective, RangeValueAccessor, DefaultValueAccessor, NgControlStatus, FormControlName, ReactiveFormsModule } from '@angular/forms';
import seedrandom from 'seedrandom';

var Health;
(function (Health) {
    Health[Health["SICK"] = 0] = "SICK";
    Health[Health["HEALTHY"] = 1] = "HEALTHY";
    Health[Health["RECOVERED"] = 2] = "RECOVERED";
    Health[Health["DEAD"] = 3] = "DEAD";
})(Health || (Health = {}));

const fps = 60; // Note: if you change this, you'll need to addapt ball speed
const updateIntervallMs = 1000 / fps;
const simulationSeconds = 30; // the simulation lasts 30 seconds
const TOTAL_FRAMES = fps * simulationSeconds;
const safeLimitPercentage = 0.3; // that's 30 percents capacity
const chartSafeLimit = 1 - safeLimitPercentage;
// loval units
const WIDTH = 100;
const HEIGHT = 100 * 2 / 3; // the canvas ratio is always 3:2
const PERSON_RADIUS = 0.8;
const PERSON_SPEED = 0.2;
const PERSON_GAP = 0.001; // a small value used to create gaps between balls
const FULL_ANGLE = 2 * Math.PI;
const borderWidth = 1;
const oneThirdWidth = WIDTH / 3;
const twoThirdsWidth = 2 * oneThirdWidth;
const borderWidthHalf = borderWidth / 2;
// colors
const blackColor = '#000000';
const lightGrayColor = '#EEEEEE';
const healthyColor = '#a6db68';
const sickColor = '#E53935';
const recoveredColor = '#69a7db';
const dangerSickColor = '#B71C1C';
const colors = {
    border: {
        opened: lightGrayColor,
        closed: blackColor
    },
    states: {
        [Health.HEALTHY]: healthyColor,
        [Health.SICK]: sickColor,
        [Health.RECOVERED]: recoveredColor,
        [Health.DEAD]: blackColor
    },
    chart: {
        healthy: healthyColor,
        safeSick: sickColor,
        dangerSick: dangerSickColor,
        recovered: recoveredColor,
        dead: blackColor,
        empty: lightGrayColor,
        safeLine: lightGrayColor
    },
    canvasBoundary: blackColor
};
const INFECTION_RATE = 1;
const DEATH_RATE = 0.03;
const sicknessInterval = {
    from: 6 * fps,
    to: 8 * fps
};

const _c0 = ["canvasElement"];
const _c1 = ["container"];
class ChartComponent {
    constructor(cdRef) {
        this.cdRef = cdRef;
    }
    ngAfterViewInit() {
        const ctx = this.chartCanvas.nativeElement.getContext('2d');
        if (ctx) {
            this.context = ctx;
        }
    }
    init(value) {
        // init parameters
        this.maxValue = value;
    }
    start() {
        // clean chart states
        this.dangerSick = [];
        // this.safeSick = [];
        this.healthy = [];
        this.recovered = [];
        this.currentStep = 0;
    }
    update(data) {
        // save the values as percentages
        this.deadAbsolute = data[Health.DEAD];
        this.recoveredAbsolute = data[Health.RECOVERED];
        this.sickAbsolute = data[Health.SICK];
        this.healthyAbsolute = data[Health.HEALTHY];
        this.cdRef.detectChanges();
        let sickValue = this.maxValue - data[Health.SICK];
        let healthyValue = sickValue - data[Health.HEALTHY];
        let recoveredValue = healthyValue - data[Health.RECOVERED];
        sickValue /= this.maxValue;
        healthyValue /= this.maxValue;
        recoveredValue /= this.maxValue;
        this.dangerSick.push(sickValue);
        // this.safeSick.push(Math.max(sickValue, chartSafeLimit));
        this.healthy.push(healthyValue);
        this.recovered.push(recoveredValue);
    }
    draw() {
        // The chart canvas width and height can be found using offsetWidth and offsetHeight
        const width = this.containerElement.nativeElement.offsetWidth;
        const height = this.containerElement.nativeElement.offsetHeight;
        const stepSize = width / (TOTAL_FRAMES - 1); // minus the first frame/result, because that's the start of the chart
        const currentStepSize = this.currentStep * stepSize;
        // update dimensions and clear canvas
        // the canvas is cleared when a new value is attached to dimensions (no matter if a same value)
        this.chartCanvas.nativeElement.width = width;
        this.chartCanvas.nativeElement.height = height;
        // draw empty rect (the upcoming time)
        this.drawRect(colors.chart.empty, currentStepSize, 0, width - currentStepSize, height);
        // draw dead part (a whole rectangle, the elapsed time)
        this.drawRect(colors.chart.dead, 0, 0, currentStepSize, height);
        // draw recovered part
        this.drawPolygon(this.recovered, colors.chart.recovered, height, stepSize);
        // draw healthy part
        this.drawPolygon(this.healthy, colors.chart.healthy, height, stepSize);
        // draw danger sick part
        this.drawPolygon(this.dangerSick, colors.chart.dangerSick, height, stepSize);
        // draw "safe" sick part
        // this.drawPolygon(this.safeSick, colors.chart.safeSick, height, stepSize);
        // draw "safe" line
        // this.drawLine(height * chartSafeLimit, 0, currentStepSize);
        this.currentStep++;
    }
    drawLine(height, from, to) {
        this.context.beginPath();
        this.context.moveTo(from, height);
        this.context.lineTo(to, height);
        this.context.closePath();
        this.context.strokeStyle = colors.chart.safeLine;
        this.context.stroke();
    }
    drawRect(color, x, y, width, height) {
        this.context.fillStyle = color;
        this.context.fillRect(x, y, width, height);
    }
    drawPolygon(data, color, height, stepSize) {
        this.context.beginPath();
        this.context.moveTo(0, height);
        let step = -stepSize;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < data.length; i++) {
            step += stepSize;
            this.context.lineTo(step, data[i] * height);
        }
        this.context.lineTo(step, height);
        this.context.closePath();
        this.context.fillStyle = color;
        this.context.fill();
    }
    clear() {
        // clear canvas
        this.chartCanvas.nativeElement.width = this.chartCanvas.nativeElement.height = 0;
    }
}
ChartComponent.ɵfac = function ChartComponent_Factory(t) { return new (t || ChartComponent)(ɵɵdirectiveInject(ChangeDetectorRef)); };
ChartComponent.ɵcmp = ɵɵdefineComponent({ type: ChartComponent, selectors: [["cosi-chart"]], viewQuery: function ChartComponent_Query(rf, ctx) { if (rf & 1) {
        ɵɵviewQuery(_c0, true);
        ɵɵviewQuery(_c1, true);
    } if (rf & 2) {
        var _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.chartCanvas = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.containerElement = _t.first);
    } }, decls: 21, vars: 4, consts: [["id", "chart-stats"], [1, "border-on-right"], ["id", "healthy-number", 1, "number"], ["id", "sick-number", 1, "number"], ["id", "recovered-number", 1, "number"], ["id", "dead-number", 1, "number"], [1, "chart-container"], ["container", ""], ["canvasElement", ""]], template: function ChartComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵelementStart(1, "span", 1);
        ɵɵtext(2, " Healthy ");
        ɵɵelementStart(3, "span", 2);
        ɵɵtext(4);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(5, "span", 1);
        ɵɵtext(6, " Sick ");
        ɵɵelementStart(7, "span", 3);
        ɵɵtext(8);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(9, "span", 1);
        ɵɵtext(10, " Recovered ");
        ɵɵelementStart(11, "span", 4);
        ɵɵtext(12);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(13, "span");
        ɵɵtext(14, " Dead ");
        ɵɵelementStart(15, "span", 5);
        ɵɵtext(16);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(17, "div", 6, 7);
        ɵɵelement(19, "canvas", null, 8);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(4);
        ɵɵtextInterpolate(ctx.healthyAbsolute);
        ɵɵadvance(4);
        ɵɵtextInterpolate(ctx.sickAbsolute);
        ɵɵadvance(4);
        ɵɵtextInterpolate(ctx.recoveredAbsolute);
        ɵɵadvance(4);
        ɵɵtextInterpolate(ctx.deadAbsolute);
    } }, styles: [".chart-container[_ngcontent-%COMP%]{width:450px;height:45px;margin:20px auto}@media screen and (max-width:480px){.chart-container[_ngcontent-%COMP%]{width:250px;height:25px}}@media screen and (max-width:1000px){#chart-stats[_ngcontent-%COMP%]{text-align:center}}.number[_ngcontent-%COMP%], .parameters-text[_ngcontent-%COMP%], .parameters-title[_ngcontent-%COMP%]{font-weight:700}.border-on-right[_ngcontent-%COMP%]{border-right:2px solid gray}#healthy-number[_ngcontent-%COMP%]{color:#aed581}#sick-number[_ngcontent-%COMP%]{color:#e53935}#recovered-number[_ngcontent-%COMP%]{color:#ff9800}#dead-number[_ngcontent-%COMP%]{color:#000}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ChartComponent, [{
        type: Component,
        args: [{
                selector: 'cosi-chart',
                templateUrl: './chart.component.html',
                styleUrls: ['./chart.component.scss']
            }]
    }], function () { return [{ type: ChangeDetectorRef }]; }, { chartCanvas: [{
            type: ViewChild,
            args: ['canvasElement']
        }], containerElement: [{
            type: ViewChild,
            args: ['container']
        }] }); })();

class ParamsComponent {
    constructor() {
        this.paramsChanged = new EventEmitter();
        this.paramsForm = new FormGroup({
            population: new FormControl(),
            distancing: new FormControl(),
            infectionRate: new FormControl(),
            deathRate: new FormControl()
        });
    }
    ngOnInit() {
        if (this.initialParams) {
            this.paramsForm.setValue({
                population: this.initialParams.population,
                distancing: this.initialParams.distancing * 100,
                deathRate: this.initialParams.deathRate * 100,
                infectionRate: this.initialParams.infectionRate * 100
            }, { emitEvent: false });
        }
        this.paramsSubs = this.paramsForm.valueChanges
            .subscribe(val => {
            const params = {
                population: val.population,
                distancing: val.distancing / 100,
                deathRate: val.deathRate / 100,
                infectionRate: val.infectionRate / 100
            };
            this.paramsChanged.emit(params);
        });
    }
    ngOnDestroy() {
        this.paramsSubs.unsubscribe();
    }
}
ParamsComponent.ɵfac = function ParamsComponent_Factory(t) { return new (t || ParamsComponent)(); };
ParamsComponent.ɵcmp = ɵɵdefineComponent({ type: ParamsComponent, selectors: [["cosi-params"]], inputs: { initialParams: "initialParams" }, outputs: { paramsChanged: "paramsChanged" }, decls: 17, vars: 1, consts: [[3, "formGroup"], ["for", "population"], ["id", "population", "type", "range", "min", "100", "max", "500", "formControlName", "population"], ["for", "distancing"], ["id", "distancing", "type", "range", "min", "0", "max", "100", "formControlName", "distancing"], ["for", "deathRate"], ["id", "deathRate", "type", "range", "min", "0", "max", "100", "formControlName", "deathRate"], ["for", "infectionRate"], ["id", "infectionRate", "type", "range", "min", "0", "max", "100", "formControlName", "infectionRate"]], template: function ParamsComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "form", 0);
        ɵɵelementStart(1, "div");
        ɵɵelementStart(2, "label", 1);
        ɵɵtext(3, "Population ");
        ɵɵelementEnd();
        ɵɵelement(4, "input", 2);
        ɵɵelementEnd();
        ɵɵelementStart(5, "div");
        ɵɵelementStart(6, "label", 3);
        ɵɵtext(7, "Social Distancing ");
        ɵɵelementEnd();
        ɵɵelement(8, "input", 4);
        ɵɵelementEnd();
        ɵɵelementStart(9, "div");
        ɵɵelementStart(10, "label", 5);
        ɵɵtext(11, "Death Rate ");
        ɵɵelementEnd();
        ɵɵelement(12, "input", 6);
        ɵɵelementEnd();
        ɵɵelementStart(13, "div");
        ɵɵelementStart(14, "label", 7);
        ɵɵtext(15, "Infection Rate ");
        ɵɵelementEnd();
        ɵɵelement(16, "input", 8);
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵproperty("formGroup", ctx.paramsForm);
    } }, directives: [ɵangular_packages_forms_forms_y, NgControlStatusGroup, FormGroupDirective, RangeValueAccessor, DefaultValueAccessor, NgControlStatus, FormControlName], styles: ["div[_ngcontent-%COMP%]{margin-bottom:20px}label[_ngcontent-%COMP%]{display:block}@media screen and (max-width:480px){input[type=range][_ngcontent-%COMP%]{width:200px}}@media screen and (min-width:481px) and (max-width:630px){input[type=range][_ngcontent-%COMP%]{width:300px}}@media screen and (min-width:631px) and (max-width:1500px){input[type=range][_ngcontent-%COMP%]{width:350px}}@media only screen and (min-width:1501px){input[type=range][_ngcontent-%COMP%]{width:400px}}"], changeDetection: 0 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ParamsComponent, [{
        type: Component,
        args: [{
                selector: 'cosi-params',
                templateUrl: './params.component.html',
                styleUrls: ['./params.component.scss'],
                changeDetection: ChangeDetectionStrategy.OnPush
            }]
    }], null, { initialParams: [{
            type: Input
        }], paramsChanged: [{
            type: Output
        }] }); })();

class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static random(randomNumberGenerator) {
        // static function for a random vector
        if (randomNumberGenerator) {
            return new Vector2D(randomNumberGenerator(), randomNumberGenerator());
        }
        return new Vector2D(Math.random(), Math.random());
    }
    set(v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    }
    add(v) {
        // add 'v' to this vector
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    sub(v) {
        // substract 'v' from this vector (direction from this to 'v' vector)
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    mult(factor) {
        // multiply this vector by constant 'factor'
        this.x *= factor;
        this.y *= factor;
        return this;
    }
    div(factor) {
        // divide this vector by constant 'factor'
        if (!factor) {
            return new Vector2D(0, 0);
        }
        this.x /= factor;
        this.y /= factor;
        return this;
    }
    normalize() {
        // convert to unit vector, vector with length of 1 (distance between origin and this vector)
        // NOTE: unsafe normalize (if length is zero)!
        return this.div(this.length());
    }
    length() {
        // lenght of this vector (Pythagorean theorem)
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    dot(v) {
        // dot product between this and 'v' vector
        return this.x * v.x + this.y * v.y;
    }
    negate() {
        // opposite from this vector
        return new Vector2D(-this.x, -this.y);
    }
}

class Person {
    constructor(health, randomNumberGenerator) {
        this.health = health;
        this.positionDiff = new Vector2D(0, 0);
        this.rng = randomNumberGenerator || Math.random;
        this.position = Vector2D.random(this.rng);
        this.position.x *= WIDTH;
        this.position.y *= HEIGHT;
        this.velocity = Person.applySpeed(Vector2D.random(this.rng).sub(new Vector2D(0.5, 0.5)));
        this.socialDistancing = false;
        this.timeToRecovery = Math.floor(sicknessInterval.from + this.rng() * (sicknessInterval.to - sicknessInterval.from));
    }
    static applySpeed(velocity) {
        return velocity.normalize().mult(PERSON_SPEED);
    }
    static reflectBall(ball, direction, distanceDiff) {
        direction.normalize();
        // move the ball outside of collision
        const diff = distanceDiff + PERSON_GAP / 2;
        ball.position = ball.position.add(direction.mult(diff));
        direction.normalize();
        // reflect ball, solution: r=d−2(d*n)n (https://math.stackexchange.com/questions/13261/how-to-get-a-reflection-vector)
        ball.velocity = ball.velocity.sub(direction.mult(2 * ball.velocity.dot(direction)));
    }
    static separateBalls(ballA, ballB, positionSub, distanceDiff) {
        // move balls outside of collision
        const diff = distanceDiff / 2 + PERSON_GAP;
        const adjustment = positionSub.normalize().mult(diff);
        ballA.position = ballA.position.add(adjustment);
        ballB.position = ballB.position.add(adjustment.negate());
        positionSub.normalize();
    }
    static ellasticCollision(ballA, ballB, direction, distance) {
        // Elastic collision, but the ball speed is reverted after the collision (no energy lost in this case)
        // The formula can be found here: https://en.wikipedia.org/wiki/Elastic_collision
        const adjustment = direction.mult(ballA.velocity.sub(ballB.velocity).dot(direction) / (distance * distance));
        ballA.velocity = Person.applySpeed(ballA.velocity.sub(adjustment));
        ballB.velocity = Person.applySpeed(ballB.velocity.sub(adjustment.negate()));
    }
    static borderCollision(border, ball) {
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
    canvasBoundariesCollision() {
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
    bordersCollision(leftBorder, rightBorder) {
        Person.borderCollision(leftBorder, this);
        Person.borderCollision(rightBorder, this);
    }
    ballsCollision(ball, infectionRate) {
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
            }
            else if (ball.socialDistancing) {
                Person.reflectBall(this, this.positionDiff, distanceDiff);
            }
            else {
                Person.separateBalls(this, ball, this.positionDiff, distanceDiff);
                if (!ball.socialDistancing || !this.socialDistancing) {
                    Person.ellasticCollision(this, ball, this.positionDiff, distance);
                }
            }
            if ((this.health === Health.SICK || ball.health === Health.SICK) &&
                (this.health === Health.HEALTHY || ball.health === Health.HEALTHY) &&
                (this.rng() < infectionRate)) {
                this.health = ball.health = Health.SICK;
            } // both will be sick if at least one is infected in the collision
        }
    }
    move() {
        if (!this.socialDistancing && this.health !== Health.DEAD) 
        // move the ball using velocities if not social distancing or dead
        {
            this.position = this.position.add(this.velocity);
        }
    }
    checkHealth(deathRate) {
        if (this.health === Health.SICK && (--this.timeToRecovery) === 0) 
        // check if this ball is dead or recovered
        {
            this.health = (this.rng() < deathRate) ? Health.DEAD : Health.RECOVERED;
        }
    }
}
Person.LEFT_BOUNDARY = PERSON_RADIUS;
Person.RIGHT_BOUNDARY = WIDTH - PERSON_RADIUS;
Person.TOP_BOUNDARY = PERSON_RADIUS;
Person.BOTTOM_BOUNDARY = HEIGHT - PERSON_RADIUS;

const _c0$1 = ["canvasElement"];
const _c1$1 = ["container"];
class SimulationComponent {
    constructor() {
        this.rightBorder = {
            position: twoThirdsWidth,
            leftWall: twoThirdsWidth - borderWidthHalf,
            rightWall: twoThirdsWidth + borderWidthHalf,
            ballLeftPosition: twoThirdsWidth - borderWidthHalf - PERSON_RADIUS,
            ballRightPosition: twoThirdsWidth + borderWidthHalf + PERSON_RADIUS,
            closed: false,
            color: lightGrayColor
        };
        this.leftBorder = {
            position: oneThirdWidth,
            leftWall: oneThirdWidth - borderWidthHalf,
            rightWall: oneThirdWidth + borderWidthHalf,
            ballLeftPosition: oneThirdWidth - borderWidthHalf - PERSON_RADIUS,
            ballRightPosition: oneThirdWidth + borderWidthHalf + PERSON_RADIUS,
            closed: false,
            color: lightGrayColor
        };
        this.persons = [];
        this.currentFrame = 0;
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        const ctx = this.canvas.nativeElement.getContext('2d');
        if (ctx) {
            this.ctx = ctx;
            this.drawOutline();
        }
    }
    toggleRightBorder() {
        this.rightBorder.closed = !this.rightBorder.closed;
        this.rightBorder.color = this.rightBorder.closed ? colors.border.closed : colors.border.opened;
    }
    toggleLeftBorder() {
        this.leftBorder.closed = !this.leftBorder.closed;
        this.leftBorder.color = this.leftBorder.closed ? colors.border.closed : colors.border.opened;
    }
    start() {
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
            }
            else {
                this.persons.push(new Person(Health.SICK));
            }
            ballIdx++;
        }
        while (ballIdx < this.simulatorParams.population) {
            if (this.randomNumberGenerator) {
                this.persons.push(new Person(Health.HEALTHY, this.randomNumberGenerator));
            }
            else {
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
        this.updateInterval = setInterval(() => this.update(this.simulatorParams.infectionRate, this.simulatorParams.deathRate), updateIntervallMs);
    }
    shuffleBalls() {
        // Fisher–Yates shuffle (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
        for (let i = 0; i < this.persons.length; i++) {
            const rand = Math.floor((this.randomNumberGenerator ? this.randomNumberGenerator() : Math.random()) * this.persons.length);
            const temp = this.persons[i];
            this.persons[i] = this.persons[rand];
            this.persons[rand] = temp;
        }
    }
    update(infectionRate, deathrate) {
        // This O(N^2) method could be faster using
        // Binary Space Partitioning (https://en.wikipedia.org/wiki/Binary_space_partitioning)
        // or Quadtrees (https://en.wikipedia.org/wiki/Quadtree)
        for (let i = 0; i < this.persons.length; i++) {
            for (let j = i + 1; j < this.persons.length; j++) {
                // check collision and update states, positions & velocities
                this.persons[i].ballsCollision(this.persons[j], infectionRate);
            }
        }
        const statsData = { [Health.SICK]: 0, [Health.HEALTHY]: 0, [Health.RECOVERED]: 0, [Health.DEAD]: 0 };
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
    resizeEventHandler() {
        // this mechanism is to prevent/delay many drawings of the same things when resizing the browser
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.draw();
        }, updateIntervallMs);
    }
    draw() {
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
    drawOutline() {
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
    drawLine(color, position, dimensions) {
        const scaledPosition = position * dimensions.scaleWidthRatio;
        this.ctx.beginPath();
        this.ctx.moveTo(scaledPosition, 0);
        this.ctx.lineTo(scaledPosition, dimensions.height);
        this.ctx.closePath();
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }
    drawBorder(border, dimensions) {
        this.drawLine(border.color, border.leftWall, dimensions);
        this.drawLine(border.color, border.rightWall, dimensions);
    }
    drawCanvasBoundaries(dimensions) {
        this.ctx.strokeStyle = colors.canvasBoundary;
        this.ctx.strokeRect(0, 0, dimensions.width, dimensions.height);
    }
    drawBall(ball, scaleWidthRatio) {
        const scaledX = ball.position.x * scaleWidthRatio;
        const scaledY = ball.position.y * scaleWidthRatio;
        const scaledRadius = PERSON_RADIUS * scaleWidthRatio;
        this.ctx.beginPath();
        this.ctx.arc(scaledX, scaledY, scaledRadius, 0, FULL_ANGLE);
        this.ctx.closePath();
        this.ctx.fillStyle = colors.states[ball.health];
        this.ctx.fill();
    }
    simulationEnd() {
        // hide(borderBtnsContainer);
        // show(simulationEndBtnsContainer);
    }
}
SimulationComponent.ɵfac = function SimulationComponent_Factory(t) { return new (t || SimulationComponent)(); };
SimulationComponent.ɵcmp = ɵɵdefineComponent({ type: SimulationComponent, selectors: [["cosi-simulation"]], viewQuery: function SimulationComponent_Query(rf, ctx) { if (rf & 1) {
        ɵɵviewQuery(_c0$1, true);
        ɵɵviewQuery(_c1$1, true);
        ɵɵviewQuery(ChartComponent, true);
    } if (rf & 2) {
        var _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.canvas = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.canvasContainer = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.chart = _t.first);
    } }, inputs: { simulatorParams: "simulatorParams", randomNumberGenerator: "randomNumberGenerator" }, decls: 11, vars: 0, consts: [[1, "button-container"], [1, "secondary-button", 3, "click"], ["id", "simulation-dimensions", 1, "simulation-container"], ["container", ""], ["canvasElement", ""]], template: function SimulationComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div");
        ɵɵelementStart(1, "div", 0);
        ɵɵelementStart(2, "button", 1);
        ɵɵlistener("click", function SimulationComponent_Template_button_click_2_listener() { return ctx.toggleLeftBorder(); });
        ɵɵtext(3, "Border Left");
        ɵɵelementEnd();
        ɵɵelementStart(4, "button", 1);
        ɵɵlistener("click", function SimulationComponent_Template_button_click_4_listener() { return ctx.toggleRightBorder(); });
        ɵɵtext(5, "Border Right");
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(6, "div", 2, 3);
        ɵɵelement(8, "canvas", null, 4);
        ɵɵelementEnd();
        ɵɵelement(10, "cosi-chart");
        ɵɵelementEnd();
    } }, directives: [ChartComponent], styles: [".button-container[_ngcontent-%COMP%]{display:flex;justify-content:space-around;margin-top:20px}.secondary-button[_ngcontent-%COMP%]{background-color:#fff;border:1px solid #616161;color:#212121;padding:5px}@media screen and (max-width:480px){#simulation-dimensions[_ngcontent-%COMP%]{margin:20px auto 0;width:300px;height:200px}}@media screen and (min-width:481px) and (max-width:630px){#simulation-dimensions[_ngcontent-%COMP%]{margin:20px auto 0;width:400px;height:266px}}@media screen and (min-width:631px) and (max-width:1500px){#simulation-dimensions[_ngcontent-%COMP%]{margin:25px auto 0;width:600px;height:399px}}@media only screen and (min-width:1501px){#simulation-dimensions[_ngcontent-%COMP%]{margin:30px auto 0;width:750px;height:500px}}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(SimulationComponent, [{
        type: Component,
        args: [{
                selector: 'cosi-simulation',
                templateUrl: './simulation.component.html',
                styleUrls: ['./simulation.component.scss']
            }]
    }], null, { canvas: [{
            type: ViewChild,
            args: ['canvasElement']
        }], canvasContainer: [{
            type: ViewChild,
            args: ['container']
        }], chart: [{
            type: ViewChild,
            args: [ChartComponent]
        }], simulatorParams: [{
            type: Input
        }], randomNumberGenerator: [{
            type: Input
        }] }); })();

function SimulatorComponent_ng_container_13_Template(rf, ctx) { if (rf & 1) {
    const _r8 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "div", 1);
    ɵɵelementStart(2, "cosi-params", 2);
    ɵɵlistener("paramsChanged", function SimulatorComponent_ng_container_13_Template_cosi_params_paramsChanged_2_listener($event) { ɵɵrestoreView(_r8); const ctx_r7 = ɵɵnextContext(); return ctx_r7.changeSecondParams($event); });
    ɵɵelementEnd();
    ɵɵelementStart(3, "div", 3);
    ɵɵelementStart(4, "button", 4);
    ɵɵlistener("click", function SimulatorComponent_ng_container_13_Template_button_click_4_listener() { ɵɵrestoreView(_r8); const ctx_r9 = ɵɵnextContext(); const _r4 = ɵɵreference(9); return ctx_r9.start(_r4); });
    ɵɵtext(5, "(Re)Start Simulation");
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementStart(6, "div");
    ɵɵelement(7, "cosi-simulation", 8);
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r6 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵproperty("initialParams", ctx_r6.secondParams);
    ɵɵadvance(5);
    ɵɵproperty("simulatorParams", ctx_r6.secondParams)("randomNumberGenerator", ctx_r6.rng2);
} }
class SimulatorComponent {
    constructor(appRef) {
        this.appRef = appRef;
        this.randomSeed = Math.random();
        this.rng1 = seedrandom(this.randomSeed);
        this.rng2 = seedrandom(this.randomSeed);
        this.initialState = {
            population: 200,
            distancing: 0,
            deathRate: DEATH_RATE,
            infectionRate: INFECTION_RATE
        };
        this.mainParams = this.initialState;
        this.secondParams = this.initialState;
    }
    start(simulator1) {
        this.randomSeed = Math.random();
        this.rng1 = seedrandom(this.randomSeed);
        this.rng2 = seedrandom(this.randomSeed);
        this.charts.forEach(chart => chart.start());
        simulator1.scrollIntoView();
        this.appRef.tick();
    }
    show2nd(simulator2) {
        this.is2ndVisible = !this.is2ndVisible;
        if (this.is2ndVisible) {
            simulator2.scrollIntoView({ block: 'center' });
        }
        this.appRef.tick();
    }
    changeMainParams($event) {
        this.mainParams = $event;
        this.appRef.tick();
    }
    changeSecondParams($event) {
        this.secondParams = $event;
        this.appRef.tick();
    }
}
SimulatorComponent.ɵfac = function SimulatorComponent_Factory(t) { return new (t || SimulatorComponent)(ɵɵdirectiveInject(ApplicationRef)); };
SimulatorComponent.ɵcmp = ɵɵdefineComponent({ type: SimulatorComponent, selectors: [["cosi-simulator"]], viewQuery: function SimulatorComponent_Query(rf, ctx) { if (rf & 1) {
        ɵɵviewQuery(SimulationComponent, true);
    } if (rf & 2) {
        var _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.charts = _t);
    } }, decls: 14, vars: 4, consts: [[1, "flex"], [1, "param-container"], [3, "initialParams", "paramsChanged"], [1, "flex", "column"], [1, "start-button", 3, "click"], [1, "secondary-button", 3, "click"], ["tabindex", "1"], ["simulator1", ""], [3, "simulatorParams", "randomNumberGenerator"], ["tabindex", "1", 1, "flex"], ["simulator2", ""], [4, "ngIf"]], template: function SimulatorComponent_Template(rf, ctx) { if (rf & 1) {
        const _r10 = ɵɵgetCurrentView();
        ɵɵelementStart(0, "div", 0);
        ɵɵelementStart(1, "div", 1);
        ɵɵelementStart(2, "cosi-params", 2);
        ɵɵlistener("paramsChanged", function SimulatorComponent_Template_cosi_params_paramsChanged_2_listener($event) { return ctx.changeMainParams($event); });
        ɵɵelementEnd();
        ɵɵelementStart(3, "div", 3);
        ɵɵelementStart(4, "button", 4);
        ɵɵlistener("click", function SimulatorComponent_Template_button_click_4_listener() { ɵɵrestoreView(_r10); const _r4 = ɵɵreference(9); return ctx.start(_r4); });
        ɵɵtext(5, "(Re)Start Simulation");
        ɵɵelementEnd();
        ɵɵelementStart(6, "button", 5);
        ɵɵlistener("click", function SimulatorComponent_Template_button_click_6_listener() { ɵɵrestoreView(_r10); const _r5 = ɵɵreference(12); return ctx.show2nd(_r5); });
        ɵɵtext(7, "Show Second Simulation");
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(8, "div", 6, 7);
        ɵɵelement(10, "cosi-simulation", 8);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(11, "div", 9, 10);
        ɵɵtemplate(13, SimulatorComponent_ng_container_13_Template, 8, 3, "ng-container", 11);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(2);
        ɵɵproperty("initialParams", ctx.mainParams);
        ɵɵadvance(8);
        ɵɵproperty("simulatorParams", ctx.mainParams)("randomNumberGenerator", ctx.rng1);
        ɵɵadvance(3);
        ɵɵproperty("ngIf", ctx.is2ndVisible);
    } }, directives: [ParamsComponent, SimulationComponent, NgIf], styles: ["[_nghost-%COMP%]{font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\";font-size:14px;color:#333;box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.flex[_ngcontent-%COMP%]{display:flex}.flex.column[_ngcontent-%COMP%]{flex-direction:column}.flex.column[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-bottom:15px}.param-container[_ngcontent-%COMP%]{margin:79px 20px 20px}@media screen and (max-width:1000px){.flex[_ngcontent-%COMP%]{flex-direction:column}.flex[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin:30px}.param-container[_ngcontent-%COMP%]{display:flex;margin:20px;align-items:center;justify-content:space-around}}.start-button[_ngcontent-%COMP%]{background-color:#eef7ff;border:1px solid #1976d2;color:#093692;padding:5px}.secondary-button[_ngcontent-%COMP%]{background-color:#fff;border:1px solid #616161;color:#212121;padding:5px}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(SimulatorComponent, [{
        type: Component,
        args: [{
                selector: 'cosi-simulator',
                templateUrl: './simulator.component.html',
                styleUrls: ['./simulator.component.scss']
            }]
    }], function () { return [{ type: ApplicationRef }]; }, { charts: [{
            type: ViewChildren,
            args: [SimulationComponent]
        }] }); })();

class PandemicSimulatorLibModule {
}
PandemicSimulatorLibModule.ɵmod = ɵɵdefineNgModule({ type: PandemicSimulatorLibModule });
PandemicSimulatorLibModule.ɵinj = ɵɵdefineInjector({ factory: function PandemicSimulatorLibModule_Factory(t) { return new (t || PandemicSimulatorLibModule)(); }, imports: [[
            CommonModule,
            ReactiveFormsModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(PandemicSimulatorLibModule, { declarations: [ParamsComponent,
        SimulatorComponent,
        ChartComponent,
        SimulationComponent], imports: [CommonModule,
        ReactiveFormsModule], exports: [SimulatorComponent] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(PandemicSimulatorLibModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    ParamsComponent,
                    SimulatorComponent,
                    ChartComponent,
                    SimulationComponent
                ],
                imports: [
                    CommonModule,
                    ReactiveFormsModule
                ],
                exports: [SimulatorComponent]
            }]
    }], null, null); })();

/*
 * Public API Surface of pandemic-simulator-lib
 */

/**
 * Generated bundle index. Do not edit.
 */

export { PandemicSimulatorLibModule, SimulatorComponent };
//# sourceMappingURL=pandemic-simulator-lib.js.map
