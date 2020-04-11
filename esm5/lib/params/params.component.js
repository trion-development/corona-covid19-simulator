import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
var ParamsComponent = /** @class */ (function () {
    function ParamsComponent() {
        this.paramsChanged = new EventEmitter();
        this.paramsForm = new FormGroup({
            population: new FormControl(),
            distancing: new FormControl(),
            infectionRate: new FormControl(),
            deathRate: new FormControl()
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
    ParamsComponent.ɵcmp = i0.ɵɵdefineComponent({ type: ParamsComponent, selectors: [["cosi-params"]], inputs: { initialParams: "initialParams" }, outputs: { paramsChanged: "paramsChanged" }, decls: 17, vars: 1, consts: [[3, "formGroup"], ["for", "population"], ["id", "population", "type", "range", "min", "100", "max", "500", "formControlName", "population"], ["for", "distancing"], ["id", "distancing", "type", "range", "min", "0", "max", "100", "formControlName", "distancing"], ["for", "deathRate"], ["id", "deathRate", "type", "range", "min", "0", "max", "100", "formControlName", "deathRate"], ["for", "infectionRate"], ["id", "infectionRate", "type", "range", "min", "0", "max", "100", "formControlName", "infectionRate"]], template: function ParamsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "form", 0);
            i0.ɵɵelementStart(1, "div");
            i0.ɵɵelementStart(2, "label", 1);
            i0.ɵɵtext(3, "Population ");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(4, "input", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div");
            i0.ɵɵelementStart(6, "label", 3);
            i0.ɵɵtext(7, "Social Distancing ");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(8, "input", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "div");
            i0.ɵɵelementStart(10, "label", 5);
            i0.ɵɵtext(11, "Death Rate ");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(12, "input", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "div");
            i0.ɵɵelementStart(14, "label", 7);
            i0.ɵɵtext(15, "Infection Rate ");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(16, "input", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("formGroup", ctx.paramsForm);
        } }, directives: [i1.ɵangular_packages_forms_forms_y, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.RangeValueAccessor, i1.DefaultValueAccessor, i1.NgControlStatus, i1.FormControlName], styles: ["div[_ngcontent-%COMP%]{margin-bottom:20px}label[_ngcontent-%COMP%]{display:block}@media screen and (max-width:480px){input[type=range][_ngcontent-%COMP%]{width:200px}}@media screen and (min-width:481px) and (max-width:630px){input[type=range][_ngcontent-%COMP%]{width:300px}}@media screen and (min-width:631px) and (max-width:1500px){input[type=range][_ngcontent-%COMP%]{width:350px}}@media only screen and (min-width:1501px){input[type=range][_ngcontent-%COMP%]{width:400px}}"], changeDetection: 0 });
    return ParamsComponent;
}());
export { ParamsComponent };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ParamsComponent, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW1zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3BhbmRlbWljLXNpbXVsYXRvci1saWIvIiwic291cmNlcyI6WyJsaWIvcGFyYW1zL3BhcmFtcy5jb21wb25lbnQudHMiLCJsaWIvcGFyYW1zL3BhcmFtcy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuSCxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFJeEQ7SUFBQTtRQVNZLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFFOUQsZUFBVSxHQUFHLElBQUksU0FBUyxDQUFDO1lBQ3pCLFVBQVUsRUFBRSxJQUFJLFdBQVcsRUFBRTtZQUM3QixVQUFVLEVBQUUsSUFBSSxXQUFXLEVBQUU7WUFDN0IsYUFBYSxFQUFFLElBQUksV0FBVyxFQUFFO1lBQ2hDLFNBQVMsRUFBRSxJQUFJLFdBQVcsRUFBRTtTQUM3QixDQUFDLENBQUM7S0E4Qko7SUEzQkMsa0NBQVEsR0FBUjtRQUFBLGlCQXNCQztRQXJCQyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQ3RCO2dCQUNFLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVU7Z0JBQ3pDLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsR0FBRyxHQUFHO2dCQUMvQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsR0FBRztnQkFDN0MsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxHQUFHLEdBQUc7YUFDdEQsRUFDRCxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsQ0FDbkIsQ0FBQztTQUNIO1FBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVk7YUFDM0MsU0FBUyxDQUFDLFVBQUEsR0FBRztZQUNaLElBQU0sTUFBTSxHQUFHO2dCQUNiLFVBQVUsRUFBRSxHQUFHLENBQUMsVUFBVTtnQkFDMUIsVUFBVSxFQUFFLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRztnQkFDaEMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxTQUFTLEdBQUcsR0FBRztnQkFDOUIsYUFBYSxFQUFFLEdBQUcsQ0FBQyxhQUFhLEdBQUcsR0FBRzthQUN2QyxDQUFDO1lBQ0YsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQscUNBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDaEMsQ0FBQztrRkF2Q1UsZUFBZTt3REFBZixlQUFlO1lDWDVCLCtCQUNFO1lBQUEsMkJBQ0U7WUFBQSxnQ0FBd0I7WUFBQSwyQkFBVztZQUFBLGlCQUFRO1lBQzNDLDJCQUNGO1lBQUEsaUJBQU07WUFDTiwyQkFDRTtZQUFBLGdDQUF3QjtZQUFBLGtDQUFrQjtZQUFBLGlCQUFRO1lBQ2xELDJCQUNGO1lBQUEsaUJBQU07WUFDTiwyQkFDRTtZQUFBLGlDQUF1QjtZQUFBLDRCQUFXO1lBQUEsaUJBQVE7WUFDMUMsNEJBQ0Y7WUFBQSxpQkFBTTtZQUNOLDRCQUNFO1lBQUEsaUNBQTJCO1lBQUEsZ0NBQWU7WUFBQSxpQkFBUTtZQUNsRCw0QkFDRjtZQUFBLGlCQUFNO1lBQ1IsaUJBQU87O1lBakJELDBDQUF3Qjs7MEJEQTlCO0NBbURDLEFBOUNELElBOENDO1NBeENZLGVBQWU7a0RBQWYsZUFBZTtjQU4zQixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFdBQVcsRUFBRSx5QkFBeUI7Z0JBQ3RDLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO2dCQUN0QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7a0JBR0UsS0FBSzs7a0JBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFNpbXVsYXRvclBhcmFtcyB9IGZyb20gJy4uL21vZGVscy9zaW11bGF0b3ItcGFyYW1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY29zaS1wYXJhbXMnLFxuICB0ZW1wbGF0ZVVybDogJy4vcGFyYW1zLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcGFyYW1zLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFBhcmFtc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSBpbml0aWFsUGFyYW1zOiBTaW11bGF0b3JQYXJhbXM7XG4gIEBPdXRwdXQoKSBwYXJhbXNDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxTaW11bGF0b3JQYXJhbXM+KCk7XG5cbiAgcGFyYW1zRm9ybSA9IG5ldyBGb3JtR3JvdXAoe1xuICAgIHBvcHVsYXRpb246IG5ldyBGb3JtQ29udHJvbCgpLFxuICAgIGRpc3RhbmNpbmc6IG5ldyBGb3JtQ29udHJvbCgpLFxuICAgIGluZmVjdGlvblJhdGU6IG5ldyBGb3JtQ29udHJvbCgpLFxuICAgIGRlYXRoUmF0ZTogbmV3IEZvcm1Db250cm9sKClcbiAgfSk7XG4gIHByaXZhdGUgcGFyYW1zU3ViczogU3Vic2NyaXB0aW9uO1xuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmluaXRpYWxQYXJhbXMpIHtcbiAgICAgIHRoaXMucGFyYW1zRm9ybS5zZXRWYWx1ZShcbiAgICAgICAge1xuICAgICAgICAgIHBvcHVsYXRpb246IHRoaXMuaW5pdGlhbFBhcmFtcy5wb3B1bGF0aW9uLFxuICAgICAgICAgIGRpc3RhbmNpbmc6IHRoaXMuaW5pdGlhbFBhcmFtcy5kaXN0YW5jaW5nICogMTAwLFxuICAgICAgICAgIGRlYXRoUmF0ZTogdGhpcy5pbml0aWFsUGFyYW1zLmRlYXRoUmF0ZSAqIDEwMCxcbiAgICAgICAgICBpbmZlY3Rpb25SYXRlOiB0aGlzLmluaXRpYWxQYXJhbXMuaW5mZWN0aW9uUmF0ZSAqIDEwMFxuICAgICAgICB9LFxuICAgICAgICB7ZW1pdEV2ZW50OiBmYWxzZX1cbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMucGFyYW1zU3VicyA9IHRoaXMucGFyYW1zRm9ybS52YWx1ZUNoYW5nZXNcbiAgICAgIC5zdWJzY3JpYmUodmFsID0+IHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICAgIHBvcHVsYXRpb246IHZhbC5wb3B1bGF0aW9uLFxuICAgICAgICAgIGRpc3RhbmNpbmc6IHZhbC5kaXN0YW5jaW5nIC8gMTAwLFxuICAgICAgICAgIGRlYXRoUmF0ZTogdmFsLmRlYXRoUmF0ZSAvIDEwMCxcbiAgICAgICAgICBpbmZlY3Rpb25SYXRlOiB2YWwuaW5mZWN0aW9uUmF0ZSAvIDEwMFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnBhcmFtc0NoYW5nZWQuZW1pdChwYXJhbXMpO1xuICAgICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnBhcmFtc1N1YnMudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIiwiPGZvcm0gW2Zvcm1Hcm91cF09XCJwYXJhbXNGb3JtXCI+XG4gIDxkaXY+XG4gICAgPGxhYmVsIGZvcj1cInBvcHVsYXRpb25cIj5Qb3B1bGF0aW9uIDwvbGFiZWw+XG4gICAgPGlucHV0IGlkPVwicG9wdWxhdGlvblwiIHR5cGU9XCJyYW5nZVwiIG1pbj1cIjEwMFwiIG1heD1cIjUwMFwiIGZvcm1Db250cm9sTmFtZT1cInBvcHVsYXRpb25cIj5cbiAgPC9kaXY+XG4gIDxkaXY+XG4gICAgPGxhYmVsIGZvcj1cImRpc3RhbmNpbmdcIj5Tb2NpYWwgRGlzdGFuY2luZyA8L2xhYmVsPlxuICAgIDxpbnB1dCBpZD1cImRpc3RhbmNpbmdcIiB0eXBlPVwicmFuZ2VcIiBtaW49XCIwXCIgbWF4PVwiMTAwXCIgZm9ybUNvbnRyb2xOYW1lPVwiZGlzdGFuY2luZ1wiPlxuICA8L2Rpdj5cbiAgPGRpdj5cbiAgICA8bGFiZWwgZm9yPVwiZGVhdGhSYXRlXCI+RGVhdGggUmF0ZSA8L2xhYmVsPlxuICAgIDxpbnB1dCBpZD1cImRlYXRoUmF0ZVwiIHR5cGU9XCJyYW5nZVwiIG1pbj1cIjBcIiBtYXg9XCIxMDBcIiBmb3JtQ29udHJvbE5hbWU9XCJkZWF0aFJhdGVcIj5cbiAgPC9kaXY+XG4gIDxkaXY+XG4gICAgPGxhYmVsIGZvcj1cImluZmVjdGlvblJhdGVcIj5JbmZlY3Rpb24gUmF0ZSA8L2xhYmVsPlxuICAgIDxpbnB1dCBpZD1cImluZmVjdGlvblJhdGVcIiB0eXBlPVwicmFuZ2VcIiBtaW49XCIwXCIgbWF4PVwiMTAwXCIgZm9ybUNvbnRyb2xOYW1lPVwiaW5mZWN0aW9uUmF0ZVwiPlxuICA8L2Rpdj5cbjwvZm9ybT5cbiJdfQ==