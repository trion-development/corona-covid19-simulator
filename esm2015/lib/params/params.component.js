import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
export class ParamsComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW1zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3BhbmRlbWljLXNpbXVsYXRvci1saWIvIiwic291cmNlcyI6WyJsaWIvcGFyYW1zL3BhcmFtcy5jb21wb25lbnQudHMiLCJsaWIvcGFyYW1zL3BhcmFtcy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuSCxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFVeEQsTUFBTSxPQUFPLGVBQWU7SUFONUI7UUFTWSxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBRTlELGVBQVUsR0FBRyxJQUFJLFNBQVMsQ0FBQztZQUN6QixVQUFVLEVBQUUsSUFBSSxXQUFXLEVBQUU7WUFDN0IsVUFBVSxFQUFFLElBQUksV0FBVyxFQUFFO1lBQzdCLGFBQWEsRUFBRSxJQUFJLFdBQVcsRUFBRTtZQUNoQyxTQUFTLEVBQUUsSUFBSSxXQUFXLEVBQUU7U0FDN0IsQ0FBQyxDQUFDO0tBOEJKO0lBM0JDLFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQ3RCO2dCQUNFLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVU7Z0JBQ3pDLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsR0FBRyxHQUFHO2dCQUMvQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsR0FBRztnQkFDN0MsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxHQUFHLEdBQUc7YUFDdEQsRUFDRCxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsQ0FDbkIsQ0FBQztTQUNIO1FBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVk7YUFDM0MsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2YsTUFBTSxNQUFNLEdBQUc7Z0JBQ2IsVUFBVSxFQUFFLEdBQUcsQ0FBQyxVQUFVO2dCQUMxQixVQUFVLEVBQUUsR0FBRyxDQUFDLFVBQVUsR0FBRyxHQUFHO2dCQUNoQyxTQUFTLEVBQUUsR0FBRyxDQUFDLFNBQVMsR0FBRyxHQUFHO2dCQUM5QixhQUFhLEVBQUUsR0FBRyxDQUFDLGFBQWEsR0FBRyxHQUFHO2FBQ3ZDLENBQUM7WUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNoQyxDQUFDOzs4RUF2Q1UsZUFBZTtvREFBZixlQUFlO1FDWDVCLCtCQUNFO1FBQUEsMkJBQ0U7UUFBQSxnQ0FBd0I7UUFBQSwyQkFBVztRQUFBLGlCQUFRO1FBQzNDLDJCQUNGO1FBQUEsaUJBQU07UUFDTiwyQkFDRTtRQUFBLGdDQUF3QjtRQUFBLGtDQUFrQjtRQUFBLGlCQUFRO1FBQ2xELDJCQUNGO1FBQUEsaUJBQU07UUFDTiwyQkFDRTtRQUFBLGlDQUF1QjtRQUFBLDRCQUFXO1FBQUEsaUJBQVE7UUFDMUMsNEJBQ0Y7UUFBQSxpQkFBTTtRQUNOLDRCQUNFO1FBQUEsaUNBQTJCO1FBQUEsZ0NBQWU7UUFBQSxpQkFBUTtRQUNsRCw0QkFDRjtRQUFBLGlCQUFNO1FBQ1IsaUJBQU87O1FBakJELDBDQUF3Qjs7a0REV2pCLGVBQWU7Y0FOM0IsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixXQUFXLEVBQUUseUJBQXlCO2dCQUN0QyxTQUFTLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztnQkFDdEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7O2tCQUdFLEtBQUs7O2tCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTaW11bGF0b3JQYXJhbXMgfSBmcm9tICcuLi9tb2RlbHMvc2ltdWxhdG9yLXBhcmFtcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nvc2ktcGFyYW1zJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3BhcmFtcy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3BhcmFtcy5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBQYXJhbXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KCkgaW5pdGlhbFBhcmFtczogU2ltdWxhdG9yUGFyYW1zO1xuICBAT3V0cHV0KCkgcGFyYW1zQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8U2ltdWxhdG9yUGFyYW1zPigpO1xuXG4gIHBhcmFtc0Zvcm0gPSBuZXcgRm9ybUdyb3VwKHtcbiAgICBwb3B1bGF0aW9uOiBuZXcgRm9ybUNvbnRyb2woKSxcbiAgICBkaXN0YW5jaW5nOiBuZXcgRm9ybUNvbnRyb2woKSxcbiAgICBpbmZlY3Rpb25SYXRlOiBuZXcgRm9ybUNvbnRyb2woKSxcbiAgICBkZWF0aFJhdGU6IG5ldyBGb3JtQ29udHJvbCgpXG4gIH0pO1xuICBwcml2YXRlIHBhcmFtc1N1YnM6IFN1YnNjcmlwdGlvbjtcblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pbml0aWFsUGFyYW1zKSB7XG4gICAgICB0aGlzLnBhcmFtc0Zvcm0uc2V0VmFsdWUoXG4gICAgICAgIHtcbiAgICAgICAgICBwb3B1bGF0aW9uOiB0aGlzLmluaXRpYWxQYXJhbXMucG9wdWxhdGlvbixcbiAgICAgICAgICBkaXN0YW5jaW5nOiB0aGlzLmluaXRpYWxQYXJhbXMuZGlzdGFuY2luZyAqIDEwMCxcbiAgICAgICAgICBkZWF0aFJhdGU6IHRoaXMuaW5pdGlhbFBhcmFtcy5kZWF0aFJhdGUgKiAxMDAsXG4gICAgICAgICAgaW5mZWN0aW9uUmF0ZTogdGhpcy5pbml0aWFsUGFyYW1zLmluZmVjdGlvblJhdGUgKiAxMDBcbiAgICAgICAgfSxcbiAgICAgICAge2VtaXRFdmVudDogZmFsc2V9XG4gICAgICApO1xuICAgIH1cbiAgICB0aGlzLnBhcmFtc1N1YnMgPSB0aGlzLnBhcmFtc0Zvcm0udmFsdWVDaGFuZ2VzXG4gICAgICAuc3Vic2NyaWJlKHZhbCA9PiB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgICBwb3B1bGF0aW9uOiB2YWwucG9wdWxhdGlvbixcbiAgICAgICAgICBkaXN0YW5jaW5nOiB2YWwuZGlzdGFuY2luZyAvIDEwMCxcbiAgICAgICAgICBkZWF0aFJhdGU6IHZhbC5kZWF0aFJhdGUgLyAxMDAsXG4gICAgICAgICAgaW5mZWN0aW9uUmF0ZTogdmFsLmluZmVjdGlvblJhdGUgLyAxMDBcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5wYXJhbXNDaGFuZ2VkLmVtaXQocGFyYW1zKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5wYXJhbXNTdWJzLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiIsIjxmb3JtIFtmb3JtR3JvdXBdPVwicGFyYW1zRm9ybVwiPlxuICA8ZGl2PlxuICAgIDxsYWJlbCBmb3I9XCJwb3B1bGF0aW9uXCI+UG9wdWxhdGlvbiA8L2xhYmVsPlxuICAgIDxpbnB1dCBpZD1cInBvcHVsYXRpb25cIiB0eXBlPVwicmFuZ2VcIiBtaW49XCIxMDBcIiBtYXg9XCI1MDBcIiBmb3JtQ29udHJvbE5hbWU9XCJwb3B1bGF0aW9uXCI+XG4gIDwvZGl2PlxuICA8ZGl2PlxuICAgIDxsYWJlbCBmb3I9XCJkaXN0YW5jaW5nXCI+U29jaWFsIERpc3RhbmNpbmcgPC9sYWJlbD5cbiAgICA8aW5wdXQgaWQ9XCJkaXN0YW5jaW5nXCIgdHlwZT1cInJhbmdlXCIgbWluPVwiMFwiIG1heD1cIjEwMFwiIGZvcm1Db250cm9sTmFtZT1cImRpc3RhbmNpbmdcIj5cbiAgPC9kaXY+XG4gIDxkaXY+XG4gICAgPGxhYmVsIGZvcj1cImRlYXRoUmF0ZVwiPkRlYXRoIFJhdGUgPC9sYWJlbD5cbiAgICA8aW5wdXQgaWQ9XCJkZWF0aFJhdGVcIiB0eXBlPVwicmFuZ2VcIiBtaW49XCIwXCIgbWF4PVwiMTAwXCIgZm9ybUNvbnRyb2xOYW1lPVwiZGVhdGhSYXRlXCI+XG4gIDwvZGl2PlxuICA8ZGl2PlxuICAgIDxsYWJlbCBmb3I9XCJpbmZlY3Rpb25SYXRlXCI+SW5mZWN0aW9uIFJhdGUgPC9sYWJlbD5cbiAgICA8aW5wdXQgaWQ9XCJpbmZlY3Rpb25SYXRlXCIgdHlwZT1cInJhbmdlXCIgbWluPVwiMFwiIG1heD1cIjEwMFwiIGZvcm1Db250cm9sTmFtZT1cImluZmVjdGlvblJhdGVcIj5cbiAgPC9kaXY+XG48L2Zvcm0+XG4iXX0=