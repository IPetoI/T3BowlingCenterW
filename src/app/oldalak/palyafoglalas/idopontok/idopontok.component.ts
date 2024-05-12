import { Component, Input } from '@angular/core';
import { PipesPipe } from '../pipes/pipe';

@Component({
  selector: 'app-idopontok',
  templateUrl: './idopontok.component.html',
  styleUrls: ['./idopontok.component.scss']
})
export class IdopontokComponent {

  constructor(private pipesPipe: PipesPipe) {
    this.jelenlegiOra = this.pipesPipe.transform(this.jelenlegiOra, 'HH');
    this.observeMasiknapIdopontok();
  }

  jelenlegiOra: any = Date();

  @Input() hetfoInp: any;
  @Input() keddInp: any;
  @Input() szerdaInp: any;
  @Input() csutortokInp: any;
  @Input() pentekInp: any;
  @Input() szombatInp: any;
  @Input() vasarnapInp: any;

  static benyomva10: boolean = false;
  benyomva10NS: boolean = IdopontokComponent.benyomva10;
  static benyomva11: boolean = false;
  benyomva11NS: boolean = IdopontokComponent.benyomva11;
  static benyomva12: boolean = false;
  benyomva12NS: boolean = IdopontokComponent.benyomva12;
  static benyomva13: boolean = false;
  benyomva13NS: boolean = IdopontokComponent.benyomva13;
  static benyomva14: boolean = false;
  benyomva14NS: boolean = IdopontokComponent.benyomva14;
  static benyomva15: boolean = false;
  benyomva15NS: boolean = IdopontokComponent.benyomva15;
  static benyomva16: boolean = false;
  benyomva16NS: boolean = IdopontokComponent.benyomva16;
  static benyomva17: boolean = false;
  benyomva17NS: boolean = IdopontokComponent.benyomva17;
  static benyomva18: boolean = false;
  benyomva18NS: boolean = IdopontokComponent.benyomva18;
  static benyomva19: boolean = false;
  benyomva19NS: boolean = IdopontokComponent.benyomva19;
  static benyomva20: boolean = false;
  benyomva20NS: boolean = IdopontokComponent.benyomva20;
  static benyomva21: boolean = false;
  benyomva21NS: boolean = IdopontokComponent.benyomva21;
  static benyomva22: boolean = false;
  benyomva22NS: boolean = IdopontokComponent.benyomva22;
  static benyomva23: boolean = false;
  benyomva23NS: boolean = IdopontokComponent.benyomva23;

  static vanHely10: boolean = true;
  vanHely10NS: boolean = IdopontokComponent.vanHely10;
  static vanHely11: boolean = true;
  vanHely11NS: boolean = IdopontokComponent.vanHely11;
  static vanHely12: boolean = true;
  vanHely12NS: boolean = IdopontokComponent.vanHely12;
  static vanHely13: boolean = true;
  vanHely13NS: boolean = IdopontokComponent.vanHely13;
  static vanHely14: boolean = true;
  vanHely14NS: boolean = IdopontokComponent.vanHely14;
  static vanHely15: boolean = true;
  vanHely15NS: boolean = IdopontokComponent.vanHely15;
  static vanHely16: boolean = true;
  vanHely16NS: boolean = IdopontokComponent.vanHely16;
  static vanHely17: boolean = true;
  vanHely17NS: boolean = IdopontokComponent.vanHely17;
  static vanHely18: boolean = true;
  vanHely18NS: boolean = IdopontokComponent.vanHely18;
  static vanHely19: boolean = true;
  vanHely19NS: boolean = IdopontokComponent.vanHely19;
  static vanHely20: boolean = true;
  vanHely20NS: boolean = IdopontokComponent.vanHely20;
  static vanHely21: boolean = true;
  vanHely21NS: boolean = IdopontokComponent.vanHely21;
  static vanHely22: boolean = true;
  vanHely22NS: boolean = IdopontokComponent.vanHely22;
  static vanHely23: boolean = true;
  vanHely23NS: boolean = IdopontokComponent.vanHely23;

  static masiknapErteke: boolean;
  masiknap: boolean = IdopontokComponent.masiknapErteke;

  ujratoltes(): void { }

  kijelolve(jelenlegi: any) {
    IdopontokComponent.benyomva10 = false;
    IdopontokComponent.benyomva11 = false;
    IdopontokComponent.benyomva12 = false;
    IdopontokComponent.benyomva13 = false;
    IdopontokComponent.benyomva14 = false;
    IdopontokComponent.benyomva15 = false;
    IdopontokComponent.benyomva16 = false;
    IdopontokComponent.benyomva17 = false;
    IdopontokComponent.benyomva18 = false;
    IdopontokComponent.benyomva19 = false;
    IdopontokComponent.benyomva20 = false;
    IdopontokComponent.benyomva21 = false;
    IdopontokComponent.benyomva22 = false;
    IdopontokComponent.benyomva23 = false;

    if (jelenlegi == 'benyomva10') {
      IdopontokComponent.benyomva10 = true;
    } else if (jelenlegi == 'benyomva11') {
      IdopontokComponent.benyomva11 = true;
    } else if (jelenlegi == 'benyomva12') {
      IdopontokComponent.benyomva12 = true;
    } else if (jelenlegi == 'benyomva13') {
      IdopontokComponent.benyomva13 = true;
    } else if (jelenlegi == 'benyomva14') {
      IdopontokComponent.benyomva14 = true;
    } else if (jelenlegi == 'benyomva15') {
      IdopontokComponent.benyomva15 = true;
    } else if (jelenlegi == 'benyomva16') {
      IdopontokComponent.benyomva16 = true;
    } else if (jelenlegi == 'benyomva17') {
      IdopontokComponent.benyomva17 = true;
    } else if (jelenlegi == 'benyomva18') {
      IdopontokComponent.benyomva18 = true;
    } else if (jelenlegi == 'benyomva19') {
      IdopontokComponent.benyomva19 = true;
    } else if (jelenlegi == 'benyomva20') {
      IdopontokComponent.benyomva20 = true;
    } else if (jelenlegi == 'benyomva21') {
      IdopontokComponent.benyomva21 = true;
    } else if (jelenlegi == 'benyomva22') {
      IdopontokComponent.benyomva22 = true;
    } else if (jelenlegi == 'benyomva23') {
      IdopontokComponent.benyomva23 = true;
    }
  }

  public static nincsIdopontValasztva() {
    IdopontokComponent.benyomva10 = false;
    IdopontokComponent.benyomva11 = false;
    IdopontokComponent.benyomva12 = false;
    IdopontokComponent.benyomva13 = false;
    IdopontokComponent.benyomva14 = false;
    IdopontokComponent.benyomva15 = false;
    IdopontokComponent.benyomva16 = false;
    IdopontokComponent.benyomva17 = false;
    IdopontokComponent.benyomva18 = false;
    IdopontokComponent.benyomva19 = false;
    IdopontokComponent.benyomva20 = false;
    IdopontokComponent.benyomva21 = false;
    IdopontokComponent.benyomva22 = false;
    IdopontokComponent.benyomva23 = false;
  }

  public static mindenIdopontSzabad() {
    IdopontokComponent.vanHely10 = true;
    IdopontokComponent.vanHely11 = true;
    IdopontokComponent.vanHely12 = true;
    IdopontokComponent.vanHely13 = true;
    IdopontokComponent.vanHely14 = true;
    IdopontokComponent.vanHely15 = true;
    IdopontokComponent.vanHely16 = true;
    IdopontokComponent.vanHely17 = true;
    IdopontokComponent.vanHely18 = true;
    IdopontokComponent.vanHely19 = true;
    IdopontokComponent.vanHely20 = true;
    IdopontokComponent.vanHely21 = true;
    IdopontokComponent.vanHely22 = true;
    IdopontokComponent.vanHely23 = true;
  }

  public static JelenlegiIdopontok(oraja: string) {
    if (oraja == "10") {
      IdopontokComponent.vanHely10 = false;
    } else if (oraja == "11") {
      IdopontokComponent.vanHely11 = false;
    } else if (oraja == "12") {
      IdopontokComponent.vanHely12 = false;
    } else if (oraja == "13") {
      IdopontokComponent.vanHely13 = false;
    } else if (oraja == "14") {
      IdopontokComponent.vanHely14 = false;
    } else if (oraja == "15") {
      IdopontokComponent.vanHely15 = false;
    } else if (oraja == "16") {
      IdopontokComponent.vanHely16 = false;
    } else if (oraja == "17") {
      IdopontokComponent.vanHely17 = false;
    } else if (oraja == "18") {
      IdopontokComponent.vanHely18 = false;
    } else if (oraja == "19") {
      IdopontokComponent.vanHely19 = false;
    } else if (oraja == "20") {
      IdopontokComponent.vanHely20 = false;
    } else if (oraja == "21") {
      IdopontokComponent.vanHely21 = false;
    } else if (oraja == "22") {
      IdopontokComponent.vanHely22 = false;
    } else if (oraja == "23") {
      IdopontokComponent.vanHely23 = false;
    }
  }

  private observeMasiknapIdopontok() {
    Object.defineProperty(IdopontokComponent, 'masiknapErteke', {
      get: () => this.masiknap,
      set: (value) => { this.masiknap = value; }, configurable: true, enumerable: true,
    });

    Object.defineProperties(IdopontokComponent, {
      benyomva10: { get: () => this.benyomva10NS, set: (value) => { this.benyomva10NS = value; }, configurable: true, enumerable: true },
      benyomva11: { get: () => this.benyomva11NS, set: (value) => { this.benyomva11NS = value; }, configurable: true, enumerable: true },
      benyomva12: { get: () => this.benyomva12NS, set: (value) => { this.benyomva12NS = value; }, configurable: true, enumerable: true },
      benyomva13: { get: () => this.benyomva13NS, set: (value) => { this.benyomva13NS = value; }, configurable: true, enumerable: true },
      benyomva14: { get: () => this.benyomva14NS, set: (value) => { this.benyomva14NS = value; }, configurable: true, enumerable: true },
      benyomva15: { get: () => this.benyomva15NS, set: (value) => { this.benyomva15NS = value; }, configurable: true, enumerable: true },
      benyomva16: { get: () => this.benyomva16NS, set: (value) => { this.benyomva16NS = value; }, configurable: true, enumerable: true },
      benyomva17: { get: () => this.benyomva17NS, set: (value) => { this.benyomva17NS = value; }, configurable: true, enumerable: true },
      benyomva18: { get: () => this.benyomva18NS, set: (value) => { this.benyomva18NS = value; }, configurable: true, enumerable: true },
      benyomva19: { get: () => this.benyomva19NS, set: (value) => { this.benyomva19NS = value; }, configurable: true, enumerable: true },
      benyomva20: { get: () => this.benyomva20NS, set: (value) => { this.benyomva20NS = value; }, configurable: true, enumerable: true },
      benyomva21: { get: () => this.benyomva21NS, set: (value) => { this.benyomva21NS = value; }, configurable: true, enumerable: true },
      benyomva22: { get: () => this.benyomva22NS, set: (value) => { this.benyomva22NS = value; }, configurable: true, enumerable: true },
      benyomva23: { get: () => this.benyomva23NS, set: (value) => { this.benyomva23NS = value; }, configurable: true, enumerable: true },

      vanHely10: { get: () => this.vanHely10NS, set: (value) => { this.vanHely10NS = value; }, configurable: true, enumerable: true },
      vanHely11: { get: () => this.vanHely11NS, set: (value) => { this.vanHely11NS = value; }, configurable: true, enumerable: true },
      vanHely12: { get: () => this.vanHely12NS, set: (value) => { this.vanHely12NS = value; }, configurable: true, enumerable: true },
      vanHely13: { get: () => this.vanHely13NS, set: (value) => { this.vanHely13NS = value; }, configurable: true, enumerable: true },
      vanHely14: { get: () => this.vanHely14NS, set: (value) => { this.vanHely14NS = value; }, configurable: true, enumerable: true },
      vanHely15: { get: () => this.vanHely15NS, set: (value) => { this.vanHely15NS = value; }, configurable: true, enumerable: true },
      vanHely16: { get: () => this.vanHely16NS, set: (value) => { this.vanHely16NS = value; }, configurable: true, enumerable: true },
      vanHely17: { get: () => this.vanHely17NS, set: (value) => { this.vanHely17NS = value; }, configurable: true, enumerable: true },
      vanHely18: { get: () => this.vanHely18NS, set: (value) => { this.vanHely18NS = value; }, configurable: true, enumerable: true },
      vanHely19: { get: () => this.vanHely19NS, set: (value) => { this.vanHely19NS = value; }, configurable: true, enumerable: true },
      vanHely20: { get: () => this.vanHely20NS, set: (value) => { this.vanHely20NS = value; }, configurable: true, enumerable: true },
      vanHely21: { get: () => this.vanHely21NS, set: (value) => { this.vanHely21NS = value; }, configurable: true, enumerable: true },
      vanHely22: { get: () => this.vanHely22NS, set: (value) => { this.vanHely22NS = value; }, configurable: true, enumerable: true },
      vanHely23: { get: () => this.vanHely23NS, set: (value) => { this.vanHely23NS = value; }, configurable: true, enumerable: true }
    });
  }
}