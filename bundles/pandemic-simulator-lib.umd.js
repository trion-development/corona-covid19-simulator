(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@angular/forms'), require('seedrandom')) :
    typeof define === 'function' && define.amd ? define('pandemic-simulator-lib', ['exports', '@angular/common', '@angular/core', '@angular/forms', 'seedrandom'], factory) :
    (global = global || self, factory(global['pandemic-simulator-lib'] = {}, global.ng.common, global.ng.core, global.ng.forms, global.seedrandom));
}(this, (function (exports, common, core, forms, seedrandom) { 'use strict';

    seedrandom = seedrandom && Object.prototype.hasOwnProperty.call(seedrandom, 'default') ? seedrandom['default'] : seedrandom;

    var Health;
    (function (Health) {
        Health[Health["SICK"] = 0] = "SICK";
        Health[Health["HEALTHY"] = 1] = "HEALTHY";
        Health[Health["RECOVERED"] = 2] = "RECOVERED";
        Health[Health["DEAD"] = 3] = "DEAD";
    })(Health || (Health = {}));

    var _a;
    var fps = 60; // Note: if you change this, you'll need to addapt ball speed
    var updateIntervallMs = 1000 / fps;
    var simulationSeconds = 30; // the simulation lasts 30 seconds
    var TOTAL_FRAMES = fps * simulationSeconds;
    var safeLimitPercentage = 0.3; // that's 30 percents capacity
    var chartSafeLimit = 1 - safeLimitPercentage;
    // loval units
    var WIDTH = 100;
    var HEIGHT = 100 * 2 / 3; // the canvas ratio is always 3:2
    var PERSON_RADIUS = 0.8;
    var PERSON_SPEED = 0.2;
    var PERSON_GAP = 0.001; // a small value used to create gaps between balls
    var FULL_ANGLE = 2 * Math.PI;
    var borderWidth = 1;
    var oneThirdWidth = WIDTH / 3;
    var twoThirdsWidth = 2 * oneThirdWidth;
    var borderWidthHalf = borderWidth / 2;
    // colors
    var blackColor = '#000000';
    var lightGrayColor = '#EEEEEE';
    var healthyColor = '#a6db68';
    var sickColor = '#E53935';
    var recoveredColor = '#69a7db';
    var dangerSickColor = '#B71C1C';
    var colors = {
        border: {
            opened: lightGrayColor,
            closed: blackColor
        },
        states: (_a = {},
            _a[Health.HEALTHY] = healthyColor,
            _a[Health.SICK] = sickColor,
            _a[Health.RECOVERED] = recoveredColor,
            _a[Health.DEAD] = blackColor,
            _a),
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
    var INFECTION_RATE = 1;
    var DEATH_RATE = 0.03;
    var sicknessInterval = {
        from: 6 * fps,
        to: 8 * fps
    };

    var _c0 = ["canvasElement"];
    var _c1 = ["container"];
    var ChartComponent = /** @class */ (function () {
        function ChartComponent(cdRef) {
            this.cdRef = cdRef;
        }
        ChartComponent.prototype.ngAfterViewInit = function () {
            var ctx = this.chartCanvas.nativeElement.getContext('2d');
            if (ctx) {
                this.context = ctx;
            }
        };
        ChartComponent.prototype.init = function (value) {
            // init parameters
            this.maxValue = value;
        };
        ChartComponent.prototype.start = function () {
            // clean chart states
            this.dangerSick = [];
            // this.safeSick = [];
            this.healthy = [];
            this.recovered = [];
            this.currentStep = 0;
        };
        ChartComponent.prototype.update = function (data) {
            // save the values as percentages
            this.deadAbsolute = data[Health.DEAD];
            this.recoveredAbsolute = data[Health.RECOVERED];
            this.sickAbsolute = data[Health.SICK];
            this.healthyAbsolute = data[Health.HEALTHY];
            this.cdRef.detectChanges();
            var sickValue = this.maxValue - data[Health.SICK];
            var healthyValue = sickValue - data[Health.HEALTHY];
            var recoveredValue = healthyValue - data[Health.RECOVERED];
            sickValue /= this.maxValue;
            healthyValue /= this.maxValue;
            recoveredValue /= this.maxValue;
            this.dangerSick.push(sickValue);
            // this.safeSick.push(Math.max(sickValue, chartSafeLimit));
            this.healthy.push(healthyValue);
            this.recovered.push(recoveredValue);
        };
        ChartComponent.prototype.draw = function () {
            // The chart canvas width and height can be found using offsetWidth and offsetHeight
            var width = this.containerElement.nativeElement.offsetWidth;
            var height = this.containerElement.nativeElement.offsetHeight;
            var stepSize = width / (TOTAL_FRAMES - 1); // minus the first frame/result, because that's the start of the chart
            var currentStepSize = this.currentStep * stepSize;
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
        };
        ChartComponent.prototype.drawLine = function (height, from, to) {
            this.context.beginPath();
            this.context.moveTo(from, height);
            this.context.lineTo(to, height);
            this.context.closePath();
            this.context.strokeStyle = colors.chart.safeLine;
            this.context.stroke();
        };
        ChartComponent.prototype.drawRect = function (color, x, y, width, height) {
            this.context.fillStyle = color;
            this.context.fillRect(x, y, width, height);
        };
        ChartComponent.prototype.drawPolygon = function (data, color, height, stepSize) {
            this.context.beginPath();
            this.context.moveTo(0, height);
            var step = -stepSize;
            // tslint:disable-next-line:prefer-for-of
            for (var i = 0; i < data.length; i++) {
                step += stepSize;
                this.context.lineTo(step, data[i] * height);
            }
            this.context.lineTo(step, height);
            this.context.closePath();
            this.context.fillStyle = color;
            this.context.fill();
        };
        ChartComponent.prototype.clear = function () {
            // clear canvas
            this.chartCanvas.nativeElement.width = this.chartCanvas.nativeElement.height = 0;
        };
        ChartComponent.ɵfac = function ChartComponent_Factory(t) { return new (t || ChartComponent)(core["ɵɵdirectiveInject"](core.ChangeDetectorRef)); };
        ChartComponent.ɵcmp = core["ɵɵdefineComponent"]({ type: ChartComponent, selectors: [["cosi-chart"]], viewQuery: function ChartComponent_Query(rf, ctx) { if (rf & 1) {
                core["ɵɵviewQuery"](_c0, true);
                core["ɵɵviewQuery"](_c1, true);
            } if (rf & 2) {
                var _t;
                core["ɵɵqueryRefresh"](_t = core["ɵɵloadQuery"]()) && (ctx.chartCanvas = _t.first);
                core["ɵɵqueryRefresh"](_t = core["ɵɵloadQuery"]()) && (ctx.containerElement = _t.first);
            } }, decls: 21, vars: 4, consts: [["id", "chart-stats"], [1, "border-on-right"], ["id", "healthy-number", 1, "number"], ["id", "sick-number", 1, "number"], ["id", "recovered-number", 1, "number"], ["id", "dead-number", 1, "number"], [1, "chart-container"], ["container", ""], ["canvasElement", ""]], template: function ChartComponent_Template(rf, ctx) { if (rf & 1) {
                core["ɵɵelementStart"](0, "div", 0);
                core["ɵɵelementStart"](1, "span", 1);
                core["ɵɵtext"](2, " Healthy ");
                core["ɵɵelementStart"](3, "span", 2);
                core["ɵɵtext"](4);
                core["ɵɵelementEnd"]();
                core["ɵɵelementEnd"]();
                core["ɵɵelementStart"](5, "span", 1);
                core["ɵɵtext"](6, " Sick ");
                core["ɵɵelementStart"](7, "span", 3);
                core["ɵɵtext"](8);
                core["ɵɵelementEnd"]();
                core["ɵɵelementEnd"]();
                core["ɵɵelementStart"](9, "span", 1);
                core["ɵɵtext"](10, " Recovered ");
                core["ɵɵelementStart"](11, "span", 4);
                core["ɵɵtext"](12);
                core["ɵɵelementEnd"]();
                core["ɵɵelementEnd"]();
                core["ɵɵelementStart"](13, "span");
                core["ɵɵtext"](14, " Dead ");
                core["ɵɵelementStart"](15, "span", 5);
                core["ɵɵtext"](16);
                core["ɵɵelementEnd"]();
                core["ɵɵelementEnd"]();
                core["ɵɵelementEnd"]();
                core["ɵɵelementStart"](17, "div", 6, 7);
                core["ɵɵelement"](19, "canvas", null, 8);
                core["ɵɵelementEnd"]();
            } if (rf & 2) {
                core["ɵɵadvance"](4);
                core["ɵɵtextInterpolate"](ctx.healthyAbsolute);
                core["ɵɵadvance"](4);
                core["ɵɵtextInterpolate"](ctx.sickAbsolute);
                core["ɵɵadvance"](4);
                core["ɵɵtextInterpolate"](ctx.recoveredAbsolute);
                core["ɵɵadvance"](4);
                core["ɵɵtextInterpolate"](ctx.deadAbsolute);
            } }, styles: [".chart-container[_ngcontent-%COMP%]{width:450px;height:45px;margin:20px auto}@media screen and (max-width:1000px){#chart-stats[_ngcontent-%COMP%]{text-align:center}}.number[_ngcontent-%COMP%], .parameters-text[_ngcontent-%COMP%], .parameters-title[_ngcontent-%COMP%]{font-weight:700}.border-on-right[_ngcontent-%COMP%]{border-right:2px solid gray}#healthy-number[_ngcontent-%COMP%]{color:#aed581}#sick-number[_ngcontent-%COMP%]{color:#e53935}#recovered-number[_ngcontent-%COMP%]{color:#ff9800}#dead-number[_ngcontent-%COMP%]{color:#000}"] });
        return ChartComponent;
    }());
    /*@__PURE__*/ (function () { core["ɵsetClassMetadata"](ChartComponent, [{
            type: core.Component,
            args: [{
                    selector: 'cosi-chart',
                    templateUrl: './chart.component.html',
                    styleUrls: ['./chart.component.scss']
                }]
        }], function () { return [{ type: core.ChangeDetectorRef }]; }, { chartCanvas: [{
                type: core.ViewChild,
                args: ['canvasElement']
            }], containerElement: [{
                type: core.ViewChild,
                args: ['container']
            }] }); })();

    var ParamsComponent = /** @class */ (function () {
        function ParamsComponent() {
            this.paramsChanged = new core.EventEmitter();
            this.paramsForm = new forms.FormGroup({
                population: new forms.FormControl(),
                distancing: new forms.FormControl(),
                infectionRate: new forms.FormControl(),
                deathRate: new forms.FormControl()
            });
        }
        ParamsComponent.prototype.ngOnInit = function () {
            var _this = this;
            if (this.initialParams) {
                this.paramsForm.setValue({
                    population: this.initialParams.population,
                    distancing: this.initialParams.distancing * 100,
                    deathRate: this.initialParams.deathRate * 100,
                    infectionRate: this.initialParams.infectionRate * 100
                }, { emitEvent: false });
            }
            this.paramsSubs = this.paramsForm.valueChanges
                .subscribe(function (val) {
                var params = {
                    population: val.population,
                    distancing: val.distancing / 100,
                    deathRate: val.deathRate / 100,
                    infectionRate: val.infectionRate / 100
                };
                _this.paramsChanged.emit(params);
            });
        };
        ParamsComponent.prototype.ngOnDestroy = function () {
            this.paramsSubs.unsubscribe();
        };
        ParamsComponent.ɵfac = function ParamsComponent_Factory(t) { return new (t || ParamsComponent)(); };
        ParamsComponent.ɵcmp = core["ɵɵdefineComponent"]({ type: ParamsComponent, selectors: [["cosi-params"]], inputs: { initialParams: "initialParams" }, outputs: { paramsChanged: "paramsChanged" }, decls: 17, vars: 1, consts: [[3, "formGroup"], ["for", "population"], ["id", "population", "type", "range", "min", "100", "max", "500", "formControlName", "population"], ["for", "distancing"], ["id", "distancing", "type", "range", "min", "0", "max", "100", "formControlName", "distancing"], ["for", "deathRate"], ["id", "deathRate", "type", "range", "min", "0", "max", "100", "formControlName", "deathRate"], ["for", "infectionRate"], ["id", "infectionRate", "type", "range", "min", "0", "max", "100", "formControlName", "infectionRate"]], template: function ParamsComponent_Template(rf, ctx) { if (rf & 1) {
                core["ɵɵelementStart"](0, "form", 0);
                core["ɵɵelementStart"](1, "div");
                core["ɵɵelementStart"](2, "label", 1);
                core["ɵɵtext"](3, "Population ");
                core["ɵɵelementEnd"]();
                core["ɵɵelement"](4, "input", 2);
                core["ɵɵelementEnd"]();
                core["ɵɵelementStart"](5, "div");
                core["ɵɵelementStart"](6, "label", 3);
                core["ɵɵtext"](7, "Social Distancing ");
                core["ɵɵelementEnd"]();
                core["ɵɵelement"](8, "input", 4);
                core["ɵɵelementEnd"]();
                core["ɵɵelementStart"](9, "div");
                core["ɵɵelementStart"](10, "label", 5);
                core["ɵɵtext"](11, "Death Rate ");
                core["ɵɵelementEnd"]();
                core["ɵɵelement"](12, "input", 6);
                core["ɵɵelementEnd"]();
                core["ɵɵelementStart"](13, "div");
                core["ɵɵelementStart"](14, "label", 7);
                core["ɵɵtext"](15, "Infection Rate ");
                core["ɵɵelementEnd"]();
                core["ɵɵelement"](16, "input", 8);
                core["ɵɵelementEnd"]();
                core["ɵɵelementEnd"]();
            } if (rf & 2) {
                core["ɵɵproperty"]("formGroup", ctx.paramsForm);
            } }, directives: [forms["ɵangular_packages_forms_forms_y"], forms.NgControlStatusGroup, forms.FormGroupDirective, forms.RangeValueAccessor, forms.DefaultValueAccessor, forms.NgControlStatus, forms.FormControlName], styles: ["div[_ngcontent-%COMP%]{margin-bottom:20px}label[_ngcontent-%COMP%]{display:block}@media screen and (max-width:480px){input[type=range][_ngcontent-%COMP%]{width:200px}}@media screen and (min-width:481px) and (max-width:630px){input[type=range][_ngcontent-%COMP%]{width:300px}}@media screen and (min-width:631px) and (max-width:1500px){input[type=range][_ngcontent-%COMP%]{width:350px}}@media only screen and (min-width:1501px){input[type=range][_ngcontent-%COMP%]{width:400px}}"], changeDetection: 0 });
        return ParamsComponent;
    }());
    /*@__PURE__*/ (function () { core["ɵsetClassMetadata"](ParamsComponent, [{
            type: core.Component,
            args: [{
                    selector: 'cosi-params',
                    templateUrl: './params.component.html',
                    styleUrls: ['./params.component.scss'],
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                }]
        }], null, { initialParams: [{
                type: core.Input
            }], paramsChanged: [{
                type: core.Output
            }] }); })();

    var Vector2D = /** @class */ (function () {
        function Vector2D(x, y) {
            this.x = x;
            this.y = y;
        }
        Vector2D.random = function (randomNumberGenerator) {
            // static function for a random vector
            if (randomNumberGenerator) {
                return new Vector2D(randomNumberGenerator(), randomNumberGenerator());
            }
            return new Vector2D(Math.random(), Math.random());
        };
        Vector2D.prototype.set = function (v) {
            this.x = v.x;
            this.y = v.y;
            return this;
        };
        Vector2D.prototype.add = function (v) {
            // add 'v' to this vector
            this.x += v.x;
            this.y += v.y;
            return this;
        };
        Vector2D.prototype.sub = function (v) {
            // substract 'v' from this vector (direction from this to 'v' vector)
            this.x -= v.x;
            this.y -= v.y;
            return this;
        };
        Vector2D.prototype.mult = function (factor) {
            // multiply this vector by constant 'factor'
            this.x *= factor;
            this.y *= factor;
            return this;
        };
        Vector2D.prototype.div = function (factor) {
            // divide this vector by constant 'factor'
            if (!factor) {
                return new Vector2D(0, 0);
            }
            this.x /= factor;
            this.y /= factor;
            return this;
        };
        Vector2D.prototype.normalize = function () {
            // convert to unit vector, vector with length of 1 (distance between origin and this vector)
            // NOTE: unsafe normalize (if length is zero)!
            return this.div(this.length());
        };
        Vector2D.prototype.length = function () {
            // lenght of this vector (Pythagorean theorem)
            return Math.sqrt(this.x * this.x + this.y * this.y);
        };
        Vector2D.prototype.dot = function (v) {
            // dot product between this and 'v' vector
            return this.x * v.x + this.y * v.y;
        };
        Vector2D.prototype.negate = function () {
            // opposite from this vector
            return new Vector2D(-this.x, -this.y);
        };
        return Vector2D;
    }());

    var Person = /** @class */ (function () {
        function Person(health, randomNumberGenerator) {
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
        Person.applySpeed = function (velocity) {
            return velocity.normalize().mult(PERSON_SPEED);
        };
        Person.reflectBall = function (ball, direction, distanceDiff) {
            direction.normalize();
            // move the ball outside of collision
            var diff = distanceDiff + PERSON_GAP / 2;
            ball.position = ball.position.add(direction.mult(diff));
            direction.normalize();
            // reflect ball, solution: r=d−2(d*n)n (https://math.stackexchange.com/questions/13261/how-to-get-a-reflection-vector)
            ball.velocity = ball.velocity.sub(direction.mult(2 * ball.velocity.dot(direction)));
        };
        Person.separateBalls = function (ballA, ballB, positionSub, distanceDiff) {
            // move balls outside of collision
            var diff = distanceDiff / 2 + PERSON_GAP;
            var adjustment = positionSub.normalize().mult(diff);
            ballA.position = ballA.position.add(adjustment);
            ballB.position = ballB.position.add(adjustment.negate());
            positionSub.normalize();
        };
        Person.ellasticCollision = function (ballA, ballB, direction, distance) {
            // Elastic collision, but the ball speed is reverted after the collision (no energy lost in this case)
            // The formula can be found here: https://en.wikipedia.org/wiki/Elastic_collision
            var adjustment = direction.mult(ballA.velocity.sub(ballB.velocity).dot(direction) / (distance * distance));
            ballA.velocity = Person.applySpeed(ballA.velocity.sub(adjustment));
            ballB.velocity = Person.applySpeed(ballB.velocity.sub(adjustment.negate()));
        };
        Person.borderCollision = function (border, ball) {
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
        };
        Person.prototype.canvasBoundariesCollision = function () {
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
        };
        Person.prototype.bordersCollision = function (leftBorder, rightBorder) {
            Person.borderCollision(leftBorder, this);
            Person.borderCollision(rightBorder, this);
        };
        Person.prototype.ballsCollision = function (ball, infectionRate) {
            if (this.health === Health.DEAD || ball.health === Health.DEAD) {
                return;
            }
            this.positionDiff.set(this.position);
            this.positionDiff.sub(ball.position);
            var distance = this.positionDiff.length();
            var distanceDiff = (2 * PERSON_RADIUS) - distance; // 2* ballradius === minDistance
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
        };
        Person.prototype.move = function () {
            if (!this.socialDistancing && this.health !== Health.DEAD) 
            // move the ball using velocities if not social distancing or dead
            {
                this.position = this.position.add(this.velocity);
            }
        };
        Person.prototype.checkHealth = function (deathRate) {
            if (this.health === Health.SICK && (--this.timeToRecovery) === 0) 
            // check if this ball is dead or recovered
            {
                this.health = (this.rng() < deathRate) ? Health.DEAD : Health.RECOVERED;
            }
        };
        Person.LEFT_BOUNDARY = PERSON_RADIUS;
        Person.RIGHT_BOUNDARY = WIDTH - PERSON_RADIUS;
        Person.TOP_BOUNDARY = PERSON_RADIUS;
        Person.BOTTOM_BOUNDARY = HEIGHT - PERSON_RADIUS;
        return Person;
    }());

    var _c0$1 = ["canvasElement"];
    var _c1$1 = ["container"];
    var SimulationComponent = /** @class */ (function () {
        function SimulationComponent() {
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
        SimulationComponent.prototype.ngOnInit = function () {
        };
        SimulationComponent.prototype.ngAfterViewInit = function () {
            var ctx = this.canvas.nativeElement.getContext('2d');
            if (ctx) {
                this.ctx = ctx;
                this.drawOutline();
            }
        };
        SimulationComponent.prototype.toggleRightBorder = function () {
            this.rightBorder.closed = !this.rightBorder.closed;
            this.rightBorder.color = this.rightBorder.closed ? colors.border.closed : colors.border.opened;
        };
        SimulationComponent.prototype.toggleLeftBorder = function () {
            this.leftBorder.closed = !this.leftBorder.closed;
            this.leftBorder.color = this.leftBorder.closed ? colors.border.closed : colors.border.opened;
        };
        SimulationComponent.prototype.start = function () {
            var _this = this;
            clearInterval(this.updateInterval);
            this.chart.init(this.simulatorParams.population);
            // clean simulation states
            this.persons = [];
            this.currentFrame = 0;
            // create sick and healthy balls
            var ballIdx = 0;
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
            var socialDistancingTotal = Math.floor(this.simulatorParams.population * this.simulatorParams.distancing);
            // make socialDistancing balls
            for (var i = 0; i < socialDistancingTotal; i++) {
                this.persons[i].socialDistancing = true;
            }
            // start chart
            // start chart
            this.chart.start();
            // set interval
            this.updateInterval = setInterval(function () { return _this.update(_this.simulatorParams.infectionRate, _this.simulatorParams.deathRate); }, updateIntervallMs);
        };
        SimulationComponent.prototype.shuffleBalls = function () {
            // Fisher–Yates shuffle (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
            for (var i = 0; i < this.persons.length; i++) {
                var rand = Math.floor((this.randomNumberGenerator ? this.randomNumberGenerator() : Math.random()) * this.persons.length);
                var temp = this.persons[i];
                this.persons[i] = this.persons[rand];
                this.persons[rand] = temp;
            }
        };
        SimulationComponent.prototype.update = function (infectionRate, deathrate) {
            var _a;
            var _this = this;
            // This O(N^2) method could be faster using
            // Binary Space Partitioning (https://en.wikipedia.org/wiki/Binary_space_partitioning)
            // or Quadtrees (https://en.wikipedia.org/wiki/Quadtree)
            for (var i = 0; i < this.persons.length; i++) {
                for (var j = i + 1; j < this.persons.length; j++) {
                    // check collision and update states, positions & velocities
                    this.persons[i].ballsCollision(this.persons[j], infectionRate);
                }
            }
            var statsData = (_a = {}, _a[Health.SICK] = 0, _a[Health.HEALTHY] = 0, _a[Health.RECOVERED] = 0, _a[Health.DEAD] = 0, _a);
            this.persons.forEach(function (person) {
                // count stats
                statsData[person.health]++;
                // update ball positions & velocities
                person.move();
                person.checkHealth(deathrate);
                // check canvas boundaries collision
                person.canvasBoundariesCollision();
                // check borders collision
                person.bordersCollision(_this.leftBorder, _this.rightBorder);
            });
            // update chart
            this.chart.update(statsData);
            // draw everything
            this.draw();
            // stop simulation if needed
            this.currentFrame++;
            if (this.currentFrame === TOTAL_FRAMES) {
                clearInterval(this.updateInterval);
                window.addEventListener('resize', function () { return _this.resizeEventHandler(); });
                this.simulationEnd();
            }
        };
        SimulationComponent.prototype.resizeEventHandler = function () {
            var _this = this;
            // this mechanism is to prevent/delay many drawings of the same things when resizing the browser
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(function () {
                _this.draw();
            }, updateIntervallMs);
        };
        SimulationComponent.prototype.draw = function () {
            var dimensions = this.drawOutline();
            // draw dead balls (they should be under all other balls in the canvas)
            for (var i = 0; i < this.persons.length; i++) {
                if (this.persons[i].health === Health.DEAD) {
                    this.drawBall(this.persons[i], dimensions.scaleWidthRatio);
                }
            }
            // draw other balls
            for (var i = 0; i < this.persons.length; i++) {
                if (this.persons[i].health !== Health.DEAD) {
                    this.drawBall(this.persons[i], dimensions.scaleWidthRatio);
                }
            }
            // draw chart
            this.chart.draw();
        };
        SimulationComponent.prototype.drawOutline = function () {
            var dimensions = {
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
        };
        SimulationComponent.prototype.drawLine = function (color, position, dimensions) {
            var scaledPosition = position * dimensions.scaleWidthRatio;
            this.ctx.beginPath();
            this.ctx.moveTo(scaledPosition, 0);
            this.ctx.lineTo(scaledPosition, dimensions.height);
            this.ctx.closePath();
            this.ctx.strokeStyle = color;
            this.ctx.stroke();
        };
        SimulationComponent.prototype.drawBorder = function (border, dimensions) {
            this.drawLine(border.color, border.leftWall, dimensions);
            this.drawLine(border.color, border.rightWall, dimensions);
        };
        SimulationComponent.prototype.drawCanvasBoundaries = function (dimensions) {
            this.ctx.strokeStyle = colors.canvasBoundary;
            this.ctx.strokeRect(0, 0, dimensions.width, dimensions.height);
        };
        SimulationComponent.prototype.drawBall = function (ball, scaleWidthRatio) {
            var scaledX = ball.position.x * scaleWidthRatio;
            var scaledY = ball.position.y * scaleWidthRatio;
            var scaledRadius = PERSON_RADIUS * scaleWidthRatio;
            this.ctx.beginPath();
            this.ctx.arc(scaledX, scaledY, scaledRadius, 0, FULL_ANGLE);
            this.ctx.closePath();
            this.ctx.fillStyle = colors.states[ball.health];
            this.ctx.fill();
        };
        SimulationComponent.prototype.simulationEnd = function () {
            // hide(borderBtnsContainer);
            // show(simulationEndBtnsContainer);
        };
        SimulationComponent.ɵfac = function SimulationComponent_Factory(t) { return new (t || SimulationComponent)(); };
        SimulationComponent.ɵcmp = core["ɵɵdefineComponent"]({ type: SimulationComponent, selectors: [["cosi-simulation"]], viewQuery: function SimulationComponent_Query(rf, ctx) { if (rf & 1) {
                core["ɵɵviewQuery"](_c0$1, true);
                core["ɵɵviewQuery"](_c1$1, true);
                core["ɵɵviewQuery"](ChartComponent, true);
            } if (rf & 2) {
                var _t;
                core["ɵɵqueryRefresh"](_t = core["ɵɵloadQuery"]()) && (ctx.canvas = _t.first);
                core["ɵɵqueryRefresh"](_t = core["ɵɵloadQuery"]()) && (ctx.canvasContainer = _t.first);
                core["ɵɵqueryRefresh"](_t = core["ɵɵloadQuery"]()) && (ctx.chart = _t.first);
            } }, inputs: { simulatorParams: "simulatorParams", randomNumberGenerator: "randomNumberGenerator" }, decls: 11, vars: 0, consts: [[1, "button-container"], [1, "secondary-button", 3, "click"], ["id", "simulation-dimensions", 1, "simulation-container"], ["container", ""], ["canvasElement", ""]], template: function SimulationComponent_Template(rf, ctx) { if (rf & 1) {
                core["ɵɵelementStart"](0, "div");
                core["ɵɵelementStart"](1, "div", 0);
                core["ɵɵelementStart"](2, "button", 1);
                core["ɵɵlistener"]("click", function SimulationComponent_Template_button_click_2_listener() { return ctx.toggleLeftBorder(); });
                core["ɵɵtext"](3, "Border Left");
                core["ɵɵelementEnd"]();
                core["ɵɵelementStart"](4, "button", 1);
                core["ɵɵlistener"]("click", function SimulationComponent_Template_button_click_4_listener() { return ctx.toggleRightBorder(); });
                core["ɵɵtext"](5, "Border Right");
                core["ɵɵelementEnd"]();
                core["ɵɵelementEnd"]();
                core["ɵɵelementStart"](6, "div", 2, 3);
                core["ɵɵelement"](8, "canvas", null, 4);
                core["ɵɵelementEnd"]();
                core["ɵɵelement"](10, "cosi-chart");
                core["ɵɵelementEnd"]();
            } }, directives: [ChartComponent], styles: [".button-container[_ngcontent-%COMP%]{display:flex;justify-content:space-around;margin-top:20px}.secondary-button[_ngcontent-%COMP%]{background-color:#fff;border:1px solid #616161;color:#212121;padding:5px}@media screen and (max-width:480px){#simulation-dimensions[_ngcontent-%COMP%]{margin:20px auto 0;width:300px;height:200px}}@media screen and (min-width:481px) and (max-width:630px){#simulation-dimensions[_ngcontent-%COMP%]{margin:20px auto 0;width:400px;height:266px}}@media screen and (min-width:631px) and (max-width:1500px){#simulation-dimensions[_ngcontent-%COMP%]{margin:25px auto 0;width:600px;height:399px}}@media only screen and (min-width:1501px){#simulation-dimensions[_ngcontent-%COMP%]{margin:30px auto 0;width:750px;height:500px}}"] });
        return SimulationComponent;
    }());
    /*@__PURE__*/ (function () { core["ɵsetClassMetadata"](SimulationComponent, [{
            type: core.Component,
            args: [{
                    selector: 'cosi-simulation',
                    templateUrl: './simulation.component.html',
                    styleUrls: ['./simulation.component.scss']
                }]
        }], null, { canvas: [{
                type: core.ViewChild,
                args: ['canvasElement']
            }], canvasContainer: [{
                type: core.ViewChild,
                args: ['container']
            }], chart: [{
                type: core.ViewChild,
                args: [ChartComponent]
            }], simulatorParams: [{
                type: core.Input
            }], randomNumberGenerator: [{
                type: core.Input
            }] }); })();

    function SimulatorComponent_ng_container_13_Template(rf, ctx) { if (rf & 1) {
        var _r19 = core["ɵɵgetCurrentView"]();
        core["ɵɵelementContainerStart"](0);
        core["ɵɵelementStart"](1, "div", 1);
        core["ɵɵelementStart"](2, "cosi-params", 2);
        core["ɵɵlistener"]("paramsChanged", function SimulatorComponent_ng_container_13_Template_cosi_params_paramsChanged_2_listener($event) { core["ɵɵrestoreView"](_r19); var ctx_r18 = core["ɵɵnextContext"](); return ctx_r18.changeSecondParams($event); });
        core["ɵɵelementEnd"]();
        core["ɵɵelementStart"](3, "div", 3);
        core["ɵɵelementStart"](4, "button", 4);
        core["ɵɵlistener"]("click", function SimulatorComponent_ng_container_13_Template_button_click_4_listener() { core["ɵɵrestoreView"](_r19); var ctx_r20 = core["ɵɵnextContext"](); var _r15 = core["ɵɵreference"](9); return ctx_r20.start(_r15); });
        core["ɵɵtext"](5, "(Re)Start Simulation");
        core["ɵɵelementEnd"]();
        core["ɵɵelementEnd"]();
        core["ɵɵelementEnd"]();
        core["ɵɵelementStart"](6, "div");
        core["ɵɵelement"](7, "cosi-simulation", 8);
        core["ɵɵelementEnd"]();
        core["ɵɵelementContainerEnd"]();
    } if (rf & 2) {
        var ctx_r17 = core["ɵɵnextContext"]();
        core["ɵɵadvance"](2);
        core["ɵɵproperty"]("initialParams", ctx_r17.secondParams);
        core["ɵɵadvance"](5);
        core["ɵɵproperty"]("simulatorParams", ctx_r17.secondParams)("randomNumberGenerator", ctx_r17.rng2);
    } }
    var SimulatorComponent = /** @class */ (function () {
        function SimulatorComponent(appRef) {
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
        SimulatorComponent.prototype.start = function (simulator1) {
            this.randomSeed = Math.random();
            this.rng1 = seedrandom(this.randomSeed);
            this.rng2 = seedrandom(this.randomSeed);
            this.charts.forEach(function (chart) { return chart.start(); });
            simulator1.scrollIntoView();
            this.appRef.tick();
        };
        SimulatorComponent.prototype.show2nd = function (simulator2) {
            this.is2ndVisible = !this.is2ndVisible;
            if (this.is2ndVisible) {
                simulator2.scrollIntoView({ block: 'center' });
            }
            this.appRef.tick();
        };
        SimulatorComponent.prototype.changeMainParams = function ($event) {
            this.mainParams = $event;
            this.appRef.tick();
        };
        SimulatorComponent.prototype.changeSecondParams = function ($event) {
            this.secondParams = $event;
            this.appRef.tick();
        };
        SimulatorComponent.ɵfac = function SimulatorComponent_Factory(t) { return new (t || SimulatorComponent)(core["ɵɵdirectiveInject"](core.ApplicationRef)); };
        SimulatorComponent.ɵcmp = core["ɵɵdefineComponent"]({ type: SimulatorComponent, selectors: [["cosi-simulator"]], viewQuery: function SimulatorComponent_Query(rf, ctx) { if (rf & 1) {
                core["ɵɵviewQuery"](SimulationComponent, true);
            } if (rf & 2) {
                var _t;
                core["ɵɵqueryRefresh"](_t = core["ɵɵloadQuery"]()) && (ctx.charts = _t);
            } }, decls: 14, vars: 4, consts: [[1, "flex"], [1, "param-container"], [3, "initialParams", "paramsChanged"], [1, "flex", "column"], [1, "start-button", 3, "click"], [1, "secondary-button", 3, "click"], ["tabindex", "1"], ["simulator1", ""], [3, "simulatorParams", "randomNumberGenerator"], ["tabindex", "1", 1, "flex"], ["simulator2", ""], [4, "ngIf"]], template: function SimulatorComponent_Template(rf, ctx) { if (rf & 1) {
                var _r21 = core["ɵɵgetCurrentView"]();
                core["ɵɵelementStart"](0, "div", 0);
                core["ɵɵelementStart"](1, "div", 1);
                core["ɵɵelementStart"](2, "cosi-params", 2);
                core["ɵɵlistener"]("paramsChanged", function SimulatorComponent_Template_cosi_params_paramsChanged_2_listener($event) { return ctx.changeMainParams($event); });
                core["ɵɵelementEnd"]();
                core["ɵɵelementStart"](3, "div", 3);
                core["ɵɵelementStart"](4, "button", 4);
                core["ɵɵlistener"]("click", function SimulatorComponent_Template_button_click_4_listener() { core["ɵɵrestoreView"](_r21); var _r15 = core["ɵɵreference"](9); return ctx.start(_r15); });
                core["ɵɵtext"](5, "(Re)Start Simulation");
                core["ɵɵelementEnd"]();
                core["ɵɵelementStart"](6, "button", 5);
                core["ɵɵlistener"]("click", function SimulatorComponent_Template_button_click_6_listener() { core["ɵɵrestoreView"](_r21); var _r16 = core["ɵɵreference"](12); return ctx.show2nd(_r16); });
                core["ɵɵtext"](7, "Show Second Simulation");
                core["ɵɵelementEnd"]();
                core["ɵɵelementEnd"]();
                core["ɵɵelementEnd"]();
                core["ɵɵelementStart"](8, "div", 6, 7);
                core["ɵɵelement"](10, "cosi-simulation", 8);
                core["ɵɵelementEnd"]();
                core["ɵɵelementEnd"]();
                core["ɵɵelementStart"](11, "div", 9, 10);
                core["ɵɵtemplate"](13, SimulatorComponent_ng_container_13_Template, 8, 3, "ng-container", 11);
                core["ɵɵelementEnd"]();
            } if (rf & 2) {
                core["ɵɵadvance"](2);
                core["ɵɵproperty"]("initialParams", ctx.mainParams);
                core["ɵɵadvance"](8);
                core["ɵɵproperty"]("simulatorParams", ctx.mainParams)("randomNumberGenerator", ctx.rng1);
                core["ɵɵadvance"](3);
                core["ɵɵproperty"]("ngIf", ctx.is2ndVisible);
            } }, directives: [ParamsComponent, SimulationComponent, common.NgIf], styles: ["[_nghost-%COMP%]{font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\";font-size:14px;color:#333;box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.flex[_ngcontent-%COMP%]{display:flex}.flex.column[_ngcontent-%COMP%]{flex-direction:column}.flex.column[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-bottom:15px}.param-container[_ngcontent-%COMP%]{margin:79px 20px 20px}@media screen and (max-width:1000px){.flex[_ngcontent-%COMP%]{flex-direction:column}.flex[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin:30px}.param-container[_ngcontent-%COMP%]{display:flex;margin:20px;align-items:center;justify-content:space-around}}.start-button[_ngcontent-%COMP%]{background-color:#eef7ff;border:1px solid #1976d2;color:#093692;padding:5px}.secondary-button[_ngcontent-%COMP%]{background-color:#fff;border:1px solid #616161;color:#212121;padding:5px}"] });
        return SimulatorComponent;
    }());
    /*@__PURE__*/ (function () { core["ɵsetClassMetadata"](SimulatorComponent, [{
            type: core.Component,
            args: [{
                    selector: 'cosi-simulator',
                    templateUrl: './simulator.component.html',
                    styleUrls: ['./simulator.component.scss']
                }]
        }], function () { return [{ type: core.ApplicationRef }]; }, { charts: [{
                type: core.ViewChildren,
                args: [SimulationComponent]
            }] }); })();

    var PandemicSimulatorLibModule = /** @class */ (function () {
        function PandemicSimulatorLibModule() {
        }
        PandemicSimulatorLibModule.ɵmod = core["ɵɵdefineNgModule"]({ type: PandemicSimulatorLibModule });
        PandemicSimulatorLibModule.ɵinj = core["ɵɵdefineInjector"]({ factory: function PandemicSimulatorLibModule_Factory(t) { return new (t || PandemicSimulatorLibModule)(); }, imports: [[
                    common.CommonModule,
                    forms.ReactiveFormsModule
                ]] });
        return PandemicSimulatorLibModule;
    }());
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && core["ɵɵsetNgModuleScope"](PandemicSimulatorLibModule, { declarations: [ParamsComponent,
            SimulatorComponent,
            ChartComponent,
            SimulationComponent], imports: [common.CommonModule,
            forms.ReactiveFormsModule], exports: [SimulatorComponent] }); })();
    /*@__PURE__*/ (function () { core["ɵsetClassMetadata"](PandemicSimulatorLibModule, [{
            type: core.NgModule,
            args: [{
                    declarations: [
                        ParamsComponent,
                        SimulatorComponent,
                        ChartComponent,
                        SimulationComponent
                    ],
                    imports: [
                        common.CommonModule,
                        forms.ReactiveFormsModule
                    ],
                    exports: [SimulatorComponent]
                }]
        }], null, null); })();

    exports.PandemicSimulatorLibModule = PandemicSimulatorLibModule;
    exports.SimulatorComponent = SimulatorComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pandemic-simulator-lib.umd.js.map
