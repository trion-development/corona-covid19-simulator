import { Component, Input, ViewChild } from '@angular/core';
import { ChartComponent } from '../chart/chart.component';
import { borderWidthHalf, colors, FULL_ANGLE, lightGrayColor, oneThirdWidth, PERSON_RADIUS, TOTAL_FRAMES, twoThirdsWidth, updateIntervallMs, WIDTH } from '../models/constants';
import { Health } from '../models/health.enum';
import { Person } from '../models/person';
import * as i0 from "@angular/core";
import * as i1 from "../chart/chart.component";
var _c0 = ["canvasElement"];
var _c1 = ["container"];
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
    SimulationComponent.ɵcmp = i0.ɵɵdefineComponent({ type: SimulationComponent, selectors: [["cosi-simulation"]], viewQuery: function SimulationComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, true);
            i0.ɵɵviewQuery(_c1, true);
            i0.ɵɵviewQuery(ChartComponent, true);
        } if (rf & 2) {
            var _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.canvas = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.canvasContainer = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.chart = _t.first);
        } }, inputs: { simulatorParams: "simulatorParams", randomNumberGenerator: "randomNumberGenerator" }, decls: 11, vars: 0, consts: [[1, "button-container"], [1, "secondary-button", 3, "click"], ["id", "simulation-dimensions", 1, "simulation-container"], ["container", ""], ["canvasElement", ""]], template: function SimulationComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div");
            i0.ɵɵelementStart(1, "div", 0);
            i0.ɵɵelementStart(2, "button", 1);
            i0.ɵɵlistener("click", function SimulationComponent_Template_button_click_2_listener() { return ctx.toggleLeftBorder(); });
            i0.ɵɵtext(3, "Border Left");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "button", 1);
            i0.ɵɵlistener("click", function SimulationComponent_Template_button_click_4_listener() { return ctx.toggleRightBorder(); });
            i0.ɵɵtext(5, "Border Right");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "div", 2, 3);
            i0.ɵɵelement(8, "canvas", null, 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(10, "cosi-chart");
            i0.ɵɵelementEnd();
        } }, directives: [i1.ChartComponent], styles: [".button-container[_ngcontent-%COMP%]{display:flex;justify-content:space-around;margin-top:20px}.secondary-button[_ngcontent-%COMP%]{background-color:#fff;border:1px solid #616161;color:#212121;padding:5px}@media screen and (max-width:480px){#simulation-dimensions[_ngcontent-%COMP%]{margin:20px auto 0;width:300px;height:200px}}@media screen and (min-width:481px) and (max-width:630px){#simulation-dimensions[_ngcontent-%COMP%]{margin:20px auto 0;width:400px;height:266px}}@media screen and (min-width:631px) and (max-width:1500px){#simulation-dimensions[_ngcontent-%COMP%]{margin:25px auto 0;width:600px;height:399px}}@media only screen and (min-width:1501px){#simulation-dimensions[_ngcontent-%COMP%]{margin:30px auto 0;width:750px;height:500px}}"] });
    return SimulationComponent;
}());
export { SimulationComponent };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SimulationComponent, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltdWxhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wYW5kZW1pYy1zaW11bGF0b3ItbGliLyIsInNvdXJjZXMiOlsibGliL3NpbXVsYXRpb24vc2ltdWxhdGlvbi5jb21wb25lbnQudHMiLCJsaWIvc2ltdWxhdGlvbi9zaW11bGF0aW9uLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFjLEtBQUssRUFBVSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0YsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRTFELE9BQU8sRUFDTCxlQUFlLEVBQ2YsTUFBTSxFQUNOLFVBQVUsRUFDVixjQUFjLEVBQ2QsYUFBYSxFQUNiLGFBQWEsRUFDYixZQUFZLEVBQ1osY0FBYyxFQUNkLGlCQUFpQixFQUNqQixLQUFLLEVBQ04sTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDL0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7OztBQUcxQztJQUFBO1FBY1UsZ0JBQVcsR0FBVztZQUM1QixRQUFRLEVBQUUsY0FBYztZQUN4QixRQUFRLEVBQUUsY0FBYyxHQUFHLGVBQWU7WUFDMUMsU0FBUyxFQUFFLGNBQWMsR0FBRyxlQUFlO1lBQzNDLGdCQUFnQixFQUFFLGNBQWMsR0FBRyxlQUFlLEdBQUcsYUFBYTtZQUNsRSxpQkFBaUIsRUFBRSxjQUFjLEdBQUcsZUFBZSxHQUFHLGFBQWE7WUFDbkUsTUFBTSxFQUFFLEtBQUs7WUFDYixLQUFLLEVBQUUsY0FBYztTQUN0QixDQUFDO1FBQ00sZUFBVSxHQUFXO1lBQzNCLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFFBQVEsRUFBRSxhQUFhLEdBQUcsZUFBZTtZQUN6QyxTQUFTLEVBQUUsYUFBYSxHQUFHLGVBQWU7WUFDMUMsZ0JBQWdCLEVB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WUFDdEYsaUJBQU07WUFDTixpQ0FDRTtZQUFBLGtDQUFnQztZQUNsQyxpQkFBTTtZQUNOLDhCQUF5QjtZQUMzQixpQkFBTTs7OEJEVE47Q0E0UUMsQUF6UEQsSUF5UEM7U0FwUFksbUJBQW1CO2tEQUFuQixtQkFBbUI7Y0FML0IsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFdBQVcsRUFBRSw2QkFBNkI7Z0JBQzFDLFNBQVMsRUFBRSxDQUFDLDZCQUE2QixDQUFDO2FBQzNDOztrQkFHRSxTQUFTO21CQUFDLGVBQWU7O2tCQUN6QixTQUFTO21CQUFDLFdBQVc7O2tCQUNyQixTQUFTO21CQUFDLGNBQWM7O2tCQUV4QixLQUFLOztrQkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENoYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi4vY2hhcnQvY2hhcnQuY29tcG9uZW50JztcbmltcG9ydCB7IEJvcmRlciB9IGZyb20gJy4uL21vZGVscy9ib3JkZXInO1xuaW1wb3J0IHtcbiAgYm9yZGVyV2lkdGhIYWxmLFxuICBjb2xvcnMsXG4gIEZVTExfQU5HTEUsXG4gIGxpZ2h0R3JheUNvbG9yLFxuICBvbmVUaGlyZFdpZHRoLFxuICBQRVJTT05fUkFESVVTLFxuICBUT1RBTF9GUkFNRVMsXG4gIHR3b1RoaXJkc1dpZHRoLFxuICB1cGRhdGVJbnRlcnZhbGxNcyxcbiAgV0lEVEhcbn0gZnJvbSAnLi4vbW9kZWxzL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBIZWFsdGggfSBmcm9tICcuLi9tb2RlbHMvaGVhbHRoLmVudW0nO1xuaW1wb3J0IHsgUGVyc29uIH0gZnJvbSAnLi4vbW9kZWxzL3BlcnNvbic7XG5pbXBvcnQgeyBTaW11bGF0b3JQYXJhbXMgfSBmcm9tICcuLi9tb2RlbHMvc2ltdWxhdG9yLXBhcmFtcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nvc2ktc2ltdWxhdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9zaW11bGF0aW9uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2ltdWxhdGlvbi5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNpbXVsYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuXG4gIEBWaWV3Q2hpbGQoJ2NhbnZhc0VsZW1lbnQnKSBjYW52YXM6IEVsZW1lbnRSZWY8SFRNTENhbnZhc0VsZW1lbnQ+O1xuICBAVmlld0NoaWxkKCdjb250YWluZXInKSBjYW52YXNDb250YWluZXI6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICBAVmlld0NoaWxkKENoYXJ0Q29tcG9uZW50KSBjaGFydDogQ2hhcnRDb21wb25lbnQ7XG5cbiAgQElucHV0KCkgc2ltdWxhdG9yUGFyYW1zOiBTaW11bGF0b3JQYXJhbXM7XG4gIEBJbnB1dCgpIHJhbmRvbU51bWJlckdlbmVyYXRvcj86ICgpID0+IG51bWJlcjtcblxuICBwcml2YXRlIHJpZ2h0Qm9yZGVyOiBCb3JkZXIgPSB7XG4gICAgcG9zaXRpb246IHR3b1RoaXJkc1dpZHRoLFxuICAgIGxlZnRXYWxsOiB0d29UaGlyZHNXaWR0aCAtIGJvcmRlcldpZHRoSGFsZixcbiAgICByaWdodFdhbGw6IHR3b1RoaXJkc1dpZHRoICsgYm9yZGVyV2lkdGhIYWxmLFxuICAgIGJhbGxMZWZ0UG9zaXRpb246IHR3b1RoaXJkc1dpZHRoIC0gYm9yZGVyV2lkdGhIYWxmIC0gUEVSU09OX1JBRElVUyxcbiAgICBiYWxsUmlnaHRQb3NpdGlvbjogdHdvVGhpcmRzV2lkdGggKyBib3JkZXJXaWR0aEhhbGYgKyBQRVJTT05fUkFESVVTLFxuICAgIGNsb3NlZDogZmFsc2UsXG4gICAgY29sb3I6IGxpZ2h0R3JheUNvbG9yXG4gIH07XG4gIHByaXZhdGUgbGVmdEJvcmRlcjogQm9yZGVyID0ge1xuICAgIHBvc2l0aW9uOiBvbmVUaGlyZFdpZHRoLFxuICAgIGxlZnRXYWxsOiBvbmVUaGlyZFdpZHRoIC0gYm9yZGVyV2lkdGhIYWxmLFxuICAgIHJpZ2h0V2FsbDogb25lVGhpcmRXaWR0aCArIGJvcmRlcldpZHRoSGFsZixcbiAgICBiYWxsTGVmdFBvc2l0aW9uOiBvbmVUaGlyZFdpZHRoIC0gYm9yZGVyV2lkdGhIYWxmIC0gUEVSU09OX1JBRElVUyxcbiAgICBiYWxsUmlnaHRQb3NpdGlvbjogb25lVGhpcmRXaWR0aCArIGJvcmRlcldpZHRoSGFsZiArIFBFUlNPTl9SQURJVVMsXG4gICAgY2xvc2VkOiBmYWxzZSxcbiAgICBjb2xvcjogbGlnaHRHcmF5Q29sb3JcbiAgfTtcblxuICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICBwcml2YXRlIHBlcnNvbnM6IFBlcnNvbltdID0gW107XG4gIHByaXZhdGUgY3VycmVudEZyYW1lID0gMDtcbiAgcHJpdmF0ZSB1cGRhdGVJbnRlcnZhbDogbnVtYmVyO1xuICBwcml2YXRlIHJlc2l6ZVRpbWVvdXQ6IG51bWJlcjtcblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBjdHggPSB0aGlzLmNhbnZhcy5uYXRpdmVFbGVtZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgaWYgKGN0eCkge1xuICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICB0aGlzLmRyYXdPdXRsaW5lKCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlUmlnaHRCb3JkZXIoKTogdm9pZCB7XG4gICAgdGhpcy5yaWdodEJvcmRlci5jbG9zZWQgPSAhdGhpcy5yaWdodEJvcmRlci5jbG9zZWQ7XG4gICAgdGhpcy5yaWdodEJvcmRlci5jb2xvciA9IHRoaXMucmlnaHRCb3JkZXIuY2xvc2VkID8gY29sb3JzLmJvcmRlci5jbG9zZWQgOiBjb2xvcnMuYm9yZGVyLm9wZW5lZDtcbiAgfVxuXG4gIHRvZ2dsZUxlZnRCb3JkZXIoKTogdm9pZCB7XG4gICAgdGhpcy5sZWZ0Qm9yZGVyLmNsb3NlZCA9ICF0aGlzLmxlZnRCb3JkZXIuY2xvc2VkO1xuICAgIHRoaXMubGVmdEJvcmRlci5jb2xvciA9IHRoaXMubGVmdEJvcmRlci5jbG9zZWQgPyBjb2xvcnMuYm9yZGVyLmNsb3NlZCA6IGNvbG9ycy5ib3JkZXIub3BlbmVkO1xuICB9XG5cbiAgc3RhcnQoKTogdm9pZCB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLnVwZGF0ZUludGVydmFsKTtcblxuICAgIHRoaXMuY2hhcnQuaW5pdCh0aGlzLnNpbXVsYXRvclBhcmFtcy5wb3B1bGF0aW9uKTtcblxuICAgIC8vIGNsZWFuIHNpbXVsYXRpb24gc3RhdGVzXG4gICAgdGhpcy5wZXJzb25zID0gW107XG4gICAgdGhpcy5jdXJyZW50RnJhbWUgPSAwO1xuXG4gICAgLy8gY3JlYXRlIHNpY2sgYW5kIGhlYWx0aHkgYmFsbHNcbiAgICBsZXQgYmFsbElkeCA9IDA7XG4gICAgd2hpbGUgKGJhbGxJZHggPCAxKSB7XG4gICAgICBpZiAodGhpcy5yYW5kb21OdW1iZXJHZW5lcmF0b3IpIHtcbiAgICAgICAgdGhpcy5wZXJzb25zLnB1c2gobmV3IFBlcnNvbihIZWFsdGguU0lDSywgdGhpcy5yYW5kb21OdW1iZXJHZW5lcmF0b3IpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGVyc29ucy5wdXNoKG5ldyBQZXJzb24oSGVhbHRoLlNJQ0spKTtcbiAgICAgIH1cbiAgICAgIGJhbGxJZHgrKztcbiAgICB9XG4gICAgd2hpbGUgKGJhbGxJZHggPCB0aGlzLnNpbXVsYXRvclBhcmFtcy5wb3B1bGF0aW9uKSB7XG4gICAgICBpZiAodGhpcy5yYW5kb21OdW1iZXJHZW5lcmF0b3IpIHtcbiAgICAgICAgdGhpcy5wZXJzb25zLnB1c2gobmV3IFBlcnNvbihIZWFsdGguSEVBTFRIWSwgdGhpcy5yYW5kb21OdW1iZXJHZW5lcmF0b3IpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGVyc29ucy5wdXNoKG5ldyBQZXJzb24oSGVhbHRoLkhFQUxUSFkpKTtcbiAgICAgIH1cbiAgICAgIGJhbGxJZHgrKztcbiAgICB9XG5cbiAgICAvLyBzaHVmZmxlIGJhbGxzXG4gICAgdGhpcy5zaHVmZmxlQmFsbHMoKTtcblxuICAgIGNvbnN0IHNvY2lhbERpc3RhbmNpbmdUb3RhbCA9IE1hdGguZmxvb3IodGhpcy5zaW11bGF0b3JQYXJhbXMucG9wdWxhdGlvbiAqIHRoaXMuc2ltdWxhdG9yUGFyYW1zLmRpc3RhbmNpbmcpO1xuICAgIC8vIG1ha2Ugc29jaWFsRGlzdGFuY2luZyBiYWxsc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc29jaWFsRGlzdGFuY2luZ1RvdGFsOyBpKyspIHtcbiAgICAgIHRoaXMucGVyc29uc1tpXS5zb2NpYWxEaXN0YW5jaW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBzdGFydCBjaGFydFxuICAgIC8vIHN0YXJ0IGNoYXJ0XG4gICAgdGhpcy5jaGFydC5zdGFydCgpO1xuXG4gICAgLy8gc2V0IGludGVydmFsXG4gICAgdGhpcy51cGRhdGVJbnRlcnZhbCA9IHNldEludGVydmFsKFxuICAgICAgKCkgPT4gdGhpcy51cGRhdGUodGhpcy5zaW11bGF0b3JQYXJhbXMuaW5mZWN0aW9uUmF0ZSwgdGhpcy5zaW11bGF0b3JQYXJhbXMuZGVhdGhSYXRlKSxcbiAgICAgIHVwZGF0ZUludGVydmFsbE1zXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgc2h1ZmZsZUJhbGxzKCk6IHZvaWQge1xuICAgIC8vIEZpc2hlcuKAk1lhdGVzIHNodWZmbGUgKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Zpc2hlciVFMiU4MCU5M1lhdGVzX3NodWZmbGUpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBlcnNvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHJhbmQgPSBNYXRoLmZsb29yKCh0aGlzLnJhbmRvbU51bWJlckdlbmVyYXRvciA/IHRoaXMucmFuZG9tTnVtYmVyR2VuZXJhdG9yKCkgOiBNYXRoLnJhbmRvbSgpKSAqIHRoaXMucGVyc29ucy5sZW5ndGgpO1xuICAgICAgY29uc3QgdGVtcCA9IHRoaXMucGVyc29uc1tpXTtcbiAgICAgIHRoaXMucGVyc29uc1tpXSA9IHRoaXMucGVyc29uc1tyYW5kXTtcbiAgICAgIHRoaXMucGVyc29uc1tyYW5kXSA9IHRlbXA7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGUoaW5mZWN0aW9uUmF0ZTogbnVtYmVyLCBkZWF0aHJhdGU6IG51bWJlcik6IHZvaWQge1xuICAgIC8vIFRoaXMgTyhOXjIpIG1ldGhvZCBjb3VsZCBiZSBmYXN0ZXIgdXNpbmdcbiAgICAvLyBCaW5hcnkgU3BhY2UgUGFydGl0aW9uaW5nIChodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9CaW5hcnlfc3BhY2VfcGFydGl0aW9uaW5nKVxuICAgIC8vIG9yIFF1YWR0cmVlcyAoaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvUXVhZHRyZWUpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBlcnNvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8IHRoaXMucGVyc29ucy5sZW5ndGg7IGorKykge1xuICAgICAgICAvLyBjaGVjayBjb2xsaXNpb24gYW5kIHVwZGF0ZSBzdGF0ZXMsIHBvc2l0aW9ucyAmIHZlbG9jaXRpZXNcbiAgICAgICAgdGhpcy5wZXJzb25zW2ldLmJhbGxzQ29sbGlzaW9uKHRoaXMucGVyc29uc1tqXSwgaW5mZWN0aW9uUmF0ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhdHNEYXRhID0ge1tIZWFsdGguU0lDS106IDAsIFtIZWFsdGguSEVBTFRIWV06IDAsIFtIZWFsdGguUkVDT1ZFUkVEXTogMCwgW0hlYWx0aC5ERUFEXTogMH07XG4gICAgdGhpcy5wZXJzb25zLmZvckVhY2gocGVyc29uID0+IHtcbiAgICAgIC8vIGNvdW50IHN0YXRzXG4gICAgICBzdGF0c0RhdGFbcGVyc29uLmhlYWx0aF0rKztcblxuICAgICAgLy8gdXBkYXRlIGJhbGwgcG9zaXRpb25zICYgdmVsb2NpdGllc1xuICAgICAgcGVyc29uLm1vdmUoKTtcbiAgICAgIHBlcnNvbi5jaGVja0hlYWx0aChkZWF0aHJhdGUpO1xuXG4gICAgICAvLyBjaGVjayBjYW52YXMgYm91bmRhcmllcyBjb2xsaXNpb25cbiAgICAgIHBlcnNvbi5jYW52YXNCb3VuZGFyaWVzQ29sbGlzaW9uKCk7XG5cbiAgICAgIC8vIGNoZWNrIGJvcmRlcnMgY29sbGlzaW9uXG4gICAgICBwZXJzb24uYm9yZGVyc0NvbGxpc2lvbih0aGlzLmxlZnRCb3JkZXIsIHRoaXMucmlnaHRCb3JkZXIpO1xuICAgIH0pO1xuXG4gICAgLy8gdXBkYXRlIGNoYXJ0XG4gICAgdGhpcy5jaGFydC51cGRhdGUoc3RhdHNEYXRhKTtcblxuICAgIC8vIGRyYXcgZXZlcnl0aGluZ1xuICAgIHRoaXMuZHJhdygpO1xuXG4gICAgLy8gc3RvcCBzaW11bGF0aW9uIGlmIG5lZWRlZFxuICAgIHRoaXMuY3VycmVudEZyYW1lKys7XG4gICAgaWYgKHRoaXMuY3VycmVudEZyYW1lID09PSBUT1RBTF9GUkFNRVMpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy51cGRhdGVJbnRlcnZhbCk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4gdGhpcy5yZXNpemVFdmVudEhhbmRsZXIoKSk7XG4gICAgICB0aGlzLnNpbXVsYXRpb25FbmQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlc2l6ZUV2ZW50SGFuZGxlcigpOiB2b2lkIHtcbiAgICAvLyB0aGlzIG1lY2hhbmlzbSBpcyB0byBwcmV2ZW50L2RlbGF5IG1hbnkgZHJhd2luZ3Mgb2YgdGhlIHNhbWUgdGhpbmdzIHdoZW4gcmVzaXppbmcgdGhlIGJyb3dzZXJcbiAgICBjbGVhclRpbWVvdXQodGhpcy5yZXNpemVUaW1lb3V0KTtcbiAgICB0aGlzLnJlc2l6ZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZHJhdygpO1xuICAgIH0sIHVwZGF0ZUludGVydmFsbE1zKTtcbiAgfVxuXG4gIHByaXZhdGUgZHJhdygpOiB2b2lkIHtcbiAgICBjb25zdCBkaW1lbnNpb25zID0gdGhpcy5kcmF3T3V0bGluZSgpO1xuXG4gICAgLy8gZHJhdyBkZWFkIGJhbGxzICh0aGV5IHNob3VsZCBiZSB1bmRlciBhbGwgb3RoZXIgYmFsbHMgaW4gdGhlIGNhbnZhcylcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGVyc29ucy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMucGVyc29uc1tpXS5oZWFsdGggPT09IEhlYWx0aC5ERUFEKSB7XG4gICAgICAgIHRoaXMuZHJhd0JhbGwodGhpcy5wZXJzb25zW2ldLCBkaW1lbnNpb25zLnNjYWxlV2lkdGhSYXRpbyk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGRyYXcgb3RoZXIgYmFsbHNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGVyc29ucy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMucGVyc29uc1tpXS5oZWFsdGggIT09IEhlYWx0aC5ERUFEKSB7XG4gICAgICAgIHRoaXMuZHJhd0JhbGwodGhpcy5wZXJzb25zW2ldLCBkaW1lbnNpb25zLnNjYWxlV2lkdGhSYXRpbyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZHJhdyBjaGFydFxuICAgIHRoaXMuY2hhcnQuZHJhdygpO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3T3V0bGluZSgpOiB7IHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBzY2FsZVdpZHRoUmF0aW86IG51bWJlciB9IHtcbiAgICBjb25zdCBkaW1lbnNpb25zID0ge1xuICAgICAgd2lkdGg6IHRoaXMuY2FudmFzQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGgsXG4gICAgICBoZWlnaHQ6IHRoaXMuY2FudmFzQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxuICAgICAgc2NhbGVXaWR0aFJhdGlvOiB0aGlzLmNhbnZhcy5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIC8gV0lEVEhcbiAgICB9O1xuXG4gICAgLy8gdXBkYXRlIGRpbWVuc2lvbnMgYW5kIGNsZWFyIGNhbnZhc1xuICAgIC8vIHRoZSBjYW52YXMgaXMgY2xlYXJlZCB3aGVuIGEgbmV3IHZhbHVlIGlzIGF0dGFjaGVkIHRvIGRpbWVuc2lvbnMgKG5vIG1hdHRlciBpZiBhIHNhbWUgdmFsdWUpXG4gICAgdGhpcy5jYW52YXMubmF0aXZlRWxlbWVudC53aWR0aCA9IGRpbWVuc2lvbnMud2lkdGg7XG4gICAgdGhpcy5jYW52YXMubmF0aXZlRWxlbWVudC5oZWlnaHQgPSBkaW1lbnNpb25zLmhlaWdodDtcbiAgICBkaW1lbnNpb25zLnNjYWxlV2lkdGhSYXRpbyA9IHRoaXMuY2FudmFzLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggLyBXSURUSDtcblxuICAgIC8vIGRyYXcgYm9yZGVyc1xuICAgIHRoaXMuZHJhd0JvcmRlcih0aGlzLmxlZnRCb3JkZXIsIGRpbWVuc2lvbnMpO1xuICAgIHRoaXMuZHJhd0JvcmRlcih0aGlzLnJpZ2h0Qm9yZGVyLCBkaW1lbnNpb25zKTtcblxuICAgIC8vIGRyYXcgY2FudmFzIGJvdW5kYXJpZXNcbiAgICB0aGlzLmRyYXdDYW52YXNCb3VuZGFyaWVzKGRpbWVuc2lvbnMpO1xuICAgIHJldHVybiBkaW1lbnNpb25zO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3TGluZShjb2xvcjogc3RyaW5nLCBwb3NpdGlvbjogbnVtYmVyLCBkaW1lbnNpb25zOiB7IHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBzY2FsZVdpZHRoUmF0aW86IG51bWJlciB9KTogdm9pZCB7XG4gICAgY29uc3Qgc2NhbGVkUG9zaXRpb24gPSBwb3NpdGlvbiAqIGRpbWVuc2lvbnMuc2NhbGVXaWR0aFJhdGlvO1xuXG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHgubW92ZVRvKHNjYWxlZFBvc2l0aW9uLCAwKTtcbiAgICB0aGlzLmN0eC5saW5lVG8oc2NhbGVkUG9zaXRpb24sIGRpbWVuc2lvbnMuaGVpZ2h0KTtcbiAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcblxuICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gIH1cblxuICBwcml2YXRlIGRyYXdCb3JkZXIoYm9yZGVyOiBCb3JkZXIsIGRpbWVuc2lvbnM6IHsgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHNjYWxlV2lkdGhSYXRpbzogbnVtYmVyIH0pOiB2b2lkIHtcbiAgICB0aGlzLmRyYXdMaW5lKGJvcmRlci5jb2xvciwgYm9yZGVyLmxlZnRXYWxsLCBkaW1lbnNpb25zKTtcbiAgICB0aGlzLmRyYXdMaW5lKGJvcmRlci5jb2xvciwgYm9yZGVyLnJpZ2h0V2FsbCwgZGltZW5zaW9ucyk7XG4gIH1cblxuICBwcml2YXRlIGRyYXdDYW52YXNCb3VuZGFyaWVzKGRpbWVuc2lvbnM6IHsgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHNjYWxlV2lkdGhSYXRpbzogbnVtYmVyIH0pOiB2b2lkIHtcbiAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IGNvbG9ycy5jYW52YXNCb3VuZGFyeTtcbiAgICB0aGlzLmN0eC5zdHJva2VSZWN0KDAsIDAsIGRpbWVuc2lvbnMud2lkdGgsIGRpbWVuc2lvbnMuaGVpZ2h0KTtcbiAgfVxuXG4gIHByaXZhdGUgZHJhd0JhbGwoYmFsbDogUGVyc29uLCBzY2FsZVdpZHRoUmF0aW86IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHNjYWxlZFggPSBiYWxsLnBvc2l0aW9uLnggKiBzY2FsZVdpZHRoUmF0aW87XG4gICAgY29uc3Qgc2NhbGVkWSA9IGJhbGwucG9zaXRpb24ueSAqIHNjYWxlV2lkdGhSYXRpbztcbiAgICBjb25zdCBzY2FsZWRSYWRpdXMgPSBQRVJTT05fUkFESVVTICogc2NhbGVXaWR0aFJhdGlvO1xuXG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHguYXJjKHNjYWxlZFgsIHNjYWxlZFksIHNjYWxlZFJhZGl1cywgMCwgRlVMTF9BTkdMRSk7XG4gICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG5cbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBjb2xvcnMuc3RhdGVzW2JhbGwuaGVhbHRoXTtcbiAgICB0aGlzLmN0eC5maWxsKCk7XG4gIH1cblxuICBwcml2YXRlIHNpbXVsYXRpb25FbmQoKTogdm9pZCB7XG4gICAgLy8gaGlkZShib3JkZXJCdG5zQ29udGFpbmVyKTtcbiAgICAvLyBzaG93KHNpbXVsYXRpb25FbmRCdG5zQ29udGFpbmVyKTtcbiAgfVxufVxuIiwiPGRpdj5cbiAgPGRpdiBjbGFzcz1cImJ1dHRvbi1jb250YWluZXJcIj5cbiAgICA8YnV0dG9uIGNsYXNzPVwic2Vjb25kYXJ5LWJ1dHRvblwiIChjbGljayk9XCJ0b2dnbGVMZWZ0Qm9yZGVyKClcIj5Cb3JkZXIgTGVmdDwvYnV0dG9uPlxuICAgIDxidXR0b24gY2xhc3M9XCJzZWNvbmRhcnktYnV0dG9uXCIgKGNsaWNrKT1cInRvZ2dsZVJpZ2h0Qm9yZGVyKClcIj5Cb3JkZXIgUmlnaHQ8L2J1dHRvbj5cbiAgPC9kaXY+XG4gIDxkaXYgI2NvbnRhaW5lciBpZD1cInNpbXVsYXRpb24tZGltZW5zaW9uc1wiIGNsYXNzPVwic2ltdWxhdGlvbi1jb250YWluZXJcIj5cbiAgICA8Y2FudmFzICNjYW52YXNFbGVtZW50PjwvY2FudmFzPlxuICA8L2Rpdj5cbiAgPGNvc2ktY2hhcnQ+PC9jb3NpLWNoYXJ0PlxuPC9kaXY+XG4iXX0=