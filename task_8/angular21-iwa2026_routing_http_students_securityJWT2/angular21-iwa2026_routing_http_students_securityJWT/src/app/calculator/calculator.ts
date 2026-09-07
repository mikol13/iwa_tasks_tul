import {Component, computed, signal} from '@angular/core';
import {form, FormField} from '@angular/forms/signals';

@Component({
  selector: 'app-calculator',
  imports: [FormField],
  templateUrl: './calculator.html',
  styleUrl: './calculator.css',
})
export class Calculator {

  //Angular signals approach
  operationDataInputsModel = signal({
    a: 0,
    b: 0
  });

  operationDataInputsForm = form(this.operationDataInputsModel);

  protected readonly additionResult = computed(() => {
    const data = this.operationDataInputsModel();
    return data.a + data.b;
  });

  //RxJS approach
  result = 0;

  addition (c: number, d: number): void {
    this.result = c + d;
    console.log("addition operation: result=" + this.result)
  }

}


