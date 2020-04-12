import { Component, ViewChildren } from '@angular/core';
import seedrandom from 'seedrandom';
import { DEATH_RATE, INFECTION_RATE } from './models/constants';
import { SimulationComponent } from './simulation/simulation.component';
import * as i0 from "@angular/core";
import * as i1 from "./params/params.component";
import * as i2 from "./simulation/simulation.component";
import * as i3 from "@angular/common";
function SimulatorComponent_ng_container_13_Template(rf, ctx) { if (rf & 1) {
    var _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 1);
    i0.ɵɵelementStart(2, "cosi-params", 2);
    i0.ɵɵlistener("paramsChanged", function SimulatorComponent_ng_container_13_Template_cosi_params_paramsChanged_2_listener($event) { i0.ɵɵrestoreView(_r19); var ctx_r18 = i0.ɵɵnextContext(); return ctx_r18.changeSecondParams($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 3);
    i0.ɵɵelementStart(4, "button", 4);
    i0.ɵɵlistener("click", function SimulatorComponent_ng_container_13_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r19); var ctx_r20 = i0.ɵɵnextContext(); var _r15 = i0.ɵɵreference(9); return ctx_r20.start(_r15); });
    i0.ɵɵtext(5, "(Re)Start simulation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div");
    i0.ɵɵelement(7, "cosi-simulation", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    var ctx_r17 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("initialParams", ctx_r17.secondParams);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("simulatorParams", ctx_r17.secondParams)("randomNumberGenerator", ctx_r17.rng2);
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
    SimulatorComponent.ɵfac = function SimulatorComponent_Factory(t) { return new (t || SimulatorComponent)(i0.ɵɵdirectiveInject(i0.ApplicationRef)); };
    SimulatorComponent.ɵcmp = i0.ɵɵdefineComponent({ type: SimulatorComponent, selectors: [["cosi-simulator"]], viewQuery: function SimulatorComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(SimulationComponent, true);
        } if (rf & 2) {
            var _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.charts = _t);
        } }, decls: 14, vars: 4, consts: [[1, "flex"], [1, "param-container"], [3, "initialParams", "paramsChanged"], [1, "flex", "column"], [1, "start-button", 3, "click"], [1, "secondary-button", 3, "click"], ["tabindex", "1"], ["simulator1", ""], [3, "simulatorParams", "randomNumberGenerator"], ["tabindex", "1", 1, "flex"], ["simulator2", ""], [4, "ngIf"]], template: function SimulatorComponent_Template(rf, ctx) { if (rf & 1) {
            var _r21 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelementStart(1, "div", 1);
            i0.ɵɵelementStart(2, "cosi-params", 2);
            i0.ɵɵlistener("paramsChanged", function SimulatorComponent_Template_cosi_params_paramsChanged_2_listener($event) { return ctx.changeMainParams($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "div", 3);
            i0.ɵɵelementStart(4, "button", 4);
            i0.ɵɵlistener("click", function SimulatorComponent_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r21); var _r15 = i0.ɵɵreference(9); return ctx.start(_r15); });
            i0.ɵɵtext(5, "(Re)Start simulation");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "button", 5);
            i0.ɵɵlistener("click", function SimulatorComponent_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r21); var _r16 = i0.ɵɵreference(12); return ctx.show2nd(_r16); });
            i0.ɵɵtext(7, "Toggle second simulation");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "div", 6, 7);
            i0.ɵɵelement(10, "cosi-simulation", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "div", 9, 10);
            i0.ɵɵtemplate(13, SimulatorComponent_ng_container_13_Template, 8, 3, "ng-container", 11);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("initialParams", ctx.mainParams);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("simulatorParams", ctx.mainParams)("randomNumberGenerator", ctx.rng1);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.is2ndVisible);
        } }, directives: [i1.ParamsComponent, i2.SimulationComponent, i3.NgIf], styles: ["[_nghost-%COMP%]{font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\";font-size:14px;color:#333;box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.flex[_ngcontent-%COMP%]{display:flex}.flex.column[_ngcontent-%COMP%]{flex-direction:column}.flex.column[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-bottom:15px}.param-container[_ngcontent-%COMP%]{margin:79px 20px 20px}@media screen and (max-width:1000px){.flex[_ngcontent-%COMP%]{flex-direction:column}.flex[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin:30px}.param-container[_ngcontent-%COMP%]{display:flex;margin:20px;align-items:center;justify-content:space-around}}.start-button[_ngcontent-%COMP%]{background-color:#eef7ff;border:1px solid #1976d2;color:#093692;padding:5px}.secondary-button[_ngcontent-%COMP%]{background-color:#fff;border:1px solid #616161;color:#212121;padding:5px}"] });
    return SimulatorComponent;
}());
export { SimulatorComponent };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SimulatorComponent, [{
        type: Component,
        args: [{
                selector: 'cosi-simulator',
                templateUrl: './simulator.component.html',
                styleUrls: ['./simulator.component.scss']
            }]
    }], function () { return [{ type: i0.ApplicationRef }]; }, { charts: [{
            type: ViewChildren,
            args: [SimulationComponent]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltdWxhdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3BhbmRlbWljLXNpbXVsYXRvci1saWIvIiwic291cmNlcyI6WyJsaWIvc2ltdWxhdG9yLmNvbXBvbmVudC50cyIsImxpYi9zaW11bGF0b3IuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFrQixTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXhFLE9BQU8sVUFBVSxNQUFNLFlBQVksQ0FBQztBQUNwQyxPQUFPLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWhFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7Ozs7O0lDVXRFLDZCQUNFO0lBQUEsOEJBQ0U7SUFBQSxzQ0FBdUc7SUFBM0QsME9BQTRDO0lBQUMsaUJBQWM7SUFDdkcsOEJBQ0U7SUFBQSxpQ0FBeUQ7SUFBNUIsOE5BQTJCO0lBQUMsb0NBQW9CO0lBQUEsaUJBQVM7SUFDeEYsaUJBQU07SUFDUixpQkFBTTtJQUNOLDJCQUNFO0lBQUEscUNBRWtCO0lBQ3BCLGlCQUFNO0lBQ1IsMEJBQWU7OztJQVZFLGVBQThCO0lBQTlCLG9EQUE4QjtJQU0xQixlQUFnQztJQUFoQyxzREFBZ0MsdUNBQUE7O0FEaEJ2RDtJQXNCRSw0QkFBb0IsTUFBc0I7UUFBdEIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFiMUMsZUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMzQixTQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuQyxTQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVsQixpQkFBWSxHQUFHO1lBQzlCLFVBQVUsRUFBRSxHQUFHO1lBQ2YsVUFBVSxFQUFFLENBQUM7WUFDYixTQUFTLEVBQUUsVUFBVTtZQUNyQixhQUFhLEVBQUUsY0FBYztTQUM5QixDQUFDO1FBQ0YsZUFBVSxHQUFvQixJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ2hELGlCQUFZLEdBQW9CLElBQUksQ0FBQyxZQUFZLENBQUM7SUFHbEQsQ0FBQztJQUVELGtDQUFLLEdBQUwsVUFBTSxVQUEwQjtRQUM5QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFiLENBQWEsQ0FBQyxDQUFDO1FBQzVDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxvQ0FBTyxHQUFQLFVBQVEsVUFBMEI7UUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDdkMsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLFVBQVUsQ0FBQyxjQUFjLENBQUMsRUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQztTQUM5QztRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELDZDQUFnQixHQUFoQixVQUFpQixNQUF1QjtRQUN0QyxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCwrQ0FBa0IsR0FBbEIsVUFBbUIsTUFBdUI7UUFDeEMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDO3dGQTdDVSxrQkFBa0I7MkRBQWxCLGtCQUFrQjsyQkFFZixtQkFBbUI7Ozs7OztZQ2RuQyw4QkFDRTtZQUFBLDhCQUNFO1lBQUEsc0NBQW1HO1lBQXpELDBIQUFpQiw0QkFBd0IsSUFBQztZQUFDLGlCQUFjO1lBQ25HLDhCQUNFO1lBQUEsaUNBQXlEO1lBQTVCLHFKQUFTLGVBQWlCLElBQUM7WUFBQyxvQ0FBb0I7WUFBQSxpQkFBUztZQUN0RixpQ0FBK0Q7WUFBOUIsc0pBQVMsaUJBQW1CLElBQUM7WUFBQyx3Q0FBd0I7WUFBQSxpQkFBUztZQUNsRyxpQkFBTTtZQUNSLGlCQUFNO1lBQ04saUNBQ0U7WUFBQSxzQ0FFa0I7WUFDcEIsaUJBQU07WUFDUixpQkFBTTtZQUNOLG1DQUNFO1lBQUEsd0ZBQ0U7WUFZSixpQkFBTTs7WUExQlcsZUFBNEI7WUFBNUIsOENBQTRCO1lBT3hCLGVBQThCO1lBQTlCLGdEQUE4QixtQ0FBQTtZQU1uQyxlQUFvQjtZQUFwQix1Q0FBb0I7OzZCRGZwQztDQTBEQyxBQW5ERCxJQW1EQztTQTlDWSxrQkFBa0I7a0RBQWxCLGtCQUFrQjtjQUw5QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsV0FBVyxFQUFFLDRCQUE0QjtnQkFDekMsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7YUFDMUM7O2tCQUdFLFlBQVk7bUJBQUMsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwbGljYXRpb25SZWYsIENvbXBvbmVudCwgVmlld0NoaWxkcmVuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCBzZWVkcmFuZG9tIGZyb20gJ3NlZWRyYW5kb20nO1xuaW1wb3J0IHsgREVBVEhfUkFURSwgSU5GRUNUSU9OX1JBVEUgfSBmcm9tICcuL21vZGVscy9jb25zdGFudHMnO1xuaW1wb3J0IHsgU2ltdWxhdG9yUGFyYW1zIH0gZnJvbSAnLi9tb2RlbHMvc2ltdWxhdG9yLXBhcmFtcyc7XG5pbXBvcnQgeyBTaW11bGF0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9zaW11bGF0aW9uL3NpbXVsYXRpb24uY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY29zaS1zaW11bGF0b3InLFxuICB0ZW1wbGF0ZVVybDogJy4vc2ltdWxhdG9yLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2ltdWxhdG9yLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2ltdWxhdG9yQ29tcG9uZW50IHtcblxuICBAVmlld0NoaWxkcmVuKFNpbXVsYXRpb25Db21wb25lbnQpIGNoYXJ0czogU2ltdWxhdGlvbkNvbXBvbmVudFtdO1xuXG4gIHJhbmRvbVNlZWQgPSBNYXRoLnJhbmRvbSgpO1xuICBybmcxID0gc2VlZHJhbmRvbSh0aGlzLnJhbmRvbVNlZWQpO1xuICBybmcyID0gc2VlZHJhbmRvbSh0aGlzLnJhbmRvbVNlZWQpO1xuICBpczJuZFZpc2libGU6IGJvb2xlYW47XG4gIHByaXZhdGUgcmVhZG9ubHkgaW5pdGlhbFN0YXRlID0ge1xuICAgIHBvcHVsYXRpb246IDIwMCxcbiAgICBkaXN0YW5jaW5nOiAwLFxuICAgIGRlYXRoUmF0ZTogREVBVEhfUkFURSxcbiAgICBpbmZlY3Rpb25SYXRlOiBJTkZFQ1RJT05fUkFURVxuICB9O1xuICBtYWluUGFyYW1zOiBTaW11bGF0b3JQYXJhbXMgPSB0aGlzLmluaXRpYWxTdGF0ZTtcbiAgc2Vjb25kUGFyYW1zOiBTaW11bGF0b3JQYXJhbXMgPSB0aGlzLmluaXRpYWxTdGF0ZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYpIHtcbiAgfVxuXG4gIHN0YXJ0KHNpbXVsYXRvcjE6IEhUTUxEaXZFbGVtZW50KTogdm9pZCB7XG4gICAgdGhpcy5yYW5kb21TZWVkID0gTWF0aC5yYW5kb20oKTtcbiAgICB0aGlzLnJuZzEgPSBzZWVkcmFuZG9tKHRoaXMucmFuZG9tU2VlZCk7XG4gICAgdGhpcy5ybmcyID0gc2VlZHJhbmRvbSh0aGlzLnJhbmRvbVNlZWQpO1xuICAgIHRoaXMuY2hhcnRzLmZvckVhY2goY2hhcnQgPT4gY2hhcnQuc3RhcnQoKSk7XG4gICAgc2ltdWxhdG9yMS5zY3JvbGxJbnRvVmlldygpO1xuICAgIHRoaXMuYXBwUmVmLnRpY2soKTtcbiAgfVxuXG4gIHNob3cybmQoc2ltdWxhdG9yMjogSFRNTERpdkVsZW1lbnQpOiB2b2lkIHtcbiAgICB0aGlzLmlzMm5kVmlzaWJsZSA9ICF0aGlzLmlzMm5kVmlzaWJsZTtcbiAgICBpZiAodGhpcy5pczJuZFZpc2libGUpIHtcbiAgICAgIHNpbXVsYXRvcjIuc2Nyb2xsSW50b1ZpZXcoe2Jsb2NrOiAnY2VudGVyJ30pO1xuICAgIH1cbiAgICB0aGlzLmFwcFJlZi50aWNrKCk7XG4gIH1cblxuICBjaGFuZ2VNYWluUGFyYW1zKCRldmVudDogU2ltdWxhdG9yUGFyYW1zKSB7XG4gICAgdGhpcy5tYWluUGFyYW1zID0gJGV2ZW50O1xuICAgIHRoaXMuYXBwUmVmLnRpY2soKTtcbiAgfVxuXG4gIGNoYW5nZVNlY29uZFBhcmFtcygkZXZlbnQ6IFNpbXVsYXRvclBhcmFtcykge1xuICAgIHRoaXMuc2Vjb25kUGFyYW1zID0gJGV2ZW50O1xuICAgIHRoaXMuYXBwUmVmLnRpY2soKTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImZsZXhcIj5cbiAgPGRpdiBjbGFzcz1cInBhcmFtLWNvbnRhaW5lclwiPlxuICAgIDxjb3NpLXBhcmFtcyBbaW5pdGlhbFBhcmFtc109XCJtYWluUGFyYW1zXCIgKHBhcmFtc0NoYW5nZWQpPVwiY2hhbmdlTWFpblBhcmFtcygkZXZlbnQpXCI+PC9jb3NpLXBhcmFtcz5cbiAgICA8ZGl2IGNsYXNzPVwiZmxleCBjb2x1bW5cIj5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJzdGFydC1idXR0b25cIiAoY2xpY2spPVwic3RhcnQoc2ltdWxhdG9yMSlcIj4oUmUpU3RhcnQgc2ltdWxhdGlvbjwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cInNlY29uZGFyeS1idXR0b25cIiAoY2xpY2spPVwic2hvdzJuZChzaW11bGF0b3IyKVwiPlRvZ2dsZSBzZWNvbmQgc2ltdWxhdGlvbjwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiAjc2ltdWxhdG9yMSB0YWJpbmRleD1cIjFcIj5cbiAgICA8Y29zaS1zaW11bGF0aW9uIFtzaW11bGF0b3JQYXJhbXNdPVwibWFpblBhcmFtc1wiXG4gICAgICAgICAgICAgICAgICAgICBbcmFuZG9tTnVtYmVyR2VuZXJhdG9yXT1cInJuZzFcIj5cbiAgICA8L2Nvc2ktc2ltdWxhdGlvbj5cbiAgPC9kaXY+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJmbGV4XCIgI3NpbXVsYXRvcjIgdGFiaW5kZXg9XCIxXCI+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJpczJuZFZpc2libGVcIj5cbiAgICA8ZGl2IGNsYXNzPVwicGFyYW0tY29udGFpbmVyXCI+XG4gICAgICA8Y29zaS1wYXJhbXMgW2luaXRpYWxQYXJhbXNdPVwic2Vjb25kUGFyYW1zXCIgKHBhcmFtc0NoYW5nZWQpPVwiY2hhbmdlU2Vjb25kUGFyYW1zKCRldmVudClcIj48L2Nvc2ktcGFyYW1zPlxuICAgICAgPGRpdiBjbGFzcz1cImZsZXggY29sdW1uXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJzdGFydC1idXR0b25cIiAoY2xpY2spPVwic3RhcnQoc2ltdWxhdG9yMSlcIj4oUmUpU3RhcnQgc2ltdWxhdGlvbjwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdj5cbiAgICAgIDxjb3NpLXNpbXVsYXRpb24gW3NpbXVsYXRvclBhcmFtc109XCJzZWNvbmRQYXJhbXNcIlxuICAgICAgICAgICAgICAgICAgICAgICBbcmFuZG9tTnVtYmVyR2VuZXJhdG9yXT1cInJuZzJcIj5cbiAgICAgIDwvY29zaS1zaW11bGF0aW9uPlxuICAgIDwvZGl2PlxuICA8L25nLWNvbnRhaW5lcj5cbjwvZGl2PlxuXG4iXX0=