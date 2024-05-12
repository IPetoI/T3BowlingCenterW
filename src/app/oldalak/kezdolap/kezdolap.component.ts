import { Component } from '@angular/core';

@Component({
  selector: 'app-kezdolap',
  templateUrl: './kezdolap.component.html',
  styleUrls: ['./kezdolap.component.scss']
})
export class KezdolapComponent {

  beJelolve : any;

  alapAllapot() {
    this.beJelolve = document.getElementById('cscukas');

    this.beJelolve.checked = false;
  }
}