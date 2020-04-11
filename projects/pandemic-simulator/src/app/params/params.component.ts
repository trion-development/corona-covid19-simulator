import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SimulatorParams } from '../models/simulator-params';

@Component({
  selector: 'cosi-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParamsComponent implements OnInit, OnDestroy {

  @Input() initialParams: SimulatorParams;
  @Output() paramsChanged = new EventEmitter<SimulatorParams>();

  paramsForm = new FormGroup({
    population: new FormControl(),
    distancing: new FormControl(),
    infectionRate: new FormControl(),
    deathRate: new FormControl()
  });
  private paramsSubs: Subscription;

  ngOnInit(): void {
    if (this.initialParams) {
      this.paramsForm.setValue(
        {
          population: this.initialParams.population,
          distancing: this.initialParams.distancing * 100,
          deathRate: this.initialParams.deathRate * 100,
          infectionRate: this.initialParams.infectionRate * 100
        },
        {emitEvent: false}
      );
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

  ngOnDestroy(): void {
    this.paramsSubs.unsubscribe();
  }
}
