import { Component } from '@angular/core';

@Component({
  selector: 'app-palyafoglalas',
  templateUrl: './palyafoglalas.component.html',
  styleUrls: ['./palyafoglalas.component.scss']
})

export class PalyafoglalasComponent {

  hetfoInput: any ;
  keddInput: any ;
  szerdaInput: any ;
  csutortokInput: any ;
  pentekInput: any ;
  szombatInput: any ;
  vasarnapInput: any ;

  napInput: any;
  honapInput: any;
  evInput: any;

  benyomva10Input: boolean = false;
  benyomva11Input: boolean = false;
  benyomva12Input: boolean = false;
  benyomva13Input: boolean = false;
  benyomva14Input: boolean = false;
  benyomva15Input: boolean = false;
  benyomva16Input: boolean = false;
  benyomva17Input: boolean = false;
  benyomva18Input: boolean = false;
  benyomva19Input: boolean = false;
  benyomva20Input: boolean = false;
  benyomva21Input: boolean = false;
  benyomva22Input: boolean = false;
  benyomva23Input: boolean = false;

  hetfoAtadas(ertek: any) {
    this.hetfoInput = ertek;
  }

  keddAtadas(ertek: any) {
    this.keddInput = ertek;
  }

  szerdaAtadas(ertek: any) {
    this.szerdaInput = ertek;
  }

  csutortokAtadas(ertek: any) {
    this.csutortokInput = ertek;
  }

  pentekAtadas(ertek: any) {
    this.pentekInput = ertek;
  }

  szombatAtadas(ertek: any) {
    this.szombatInput = ertek;
  }

  vasarnapAtadas(ertek: any) {
    this.vasarnapInput = ertek;
  }

  napAtadas(ertek: any) {
    this.napInput = ertek;
  }

  honapAtadas(ertek: any) {
    this.honapInput = ertek;
  }

  evAtadas(ertek: any) {
    this.evInput = ertek;
  }
}