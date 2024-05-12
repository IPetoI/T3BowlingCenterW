import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PipesPipe } from '../pipes/pipe';
import { DateAdapter } from '@angular/material/core';
import { AuthService } from 'src/app/nyilvanos/service/auth.service';
import { AdatokComponent } from '../adatok/adatok.component';
import { IdopontokComponent } from '../idopontok/idopontok.component';
import { HelyService } from 'src/app/nyilvanos/service/hely.service';
import { Hely } from 'src/app/nyilvanos/models/hely';

@Component({
  selector: 'app-naptar',
  templateUrl: './naptar.component.html',
  styleUrls: ['./naptar.component.scss'],
})
export class NaptarComponent implements OnInit {

  constructor(private PipesPipe: PipesPipe, private dateAdapter: DateAdapter<Date>, private authService: AuthService
    , private helyService: HelyService) {
    this.jelenlegiNap = this.PipesPipe.transform(this.jelenlegiNap, 'dd');
    this.jelenlegiHonap = this.PipesPipe.transform(this.jelenlegiHonap, 'MM');
    this.jelenlegiEv = this.PipesPipe.transform(this.jelenlegiEv, 'yyyy');
  }
  @Output() hetfoEmitter = new EventEmitter<any>();
  @Output() keddEmitter = new EventEmitter<any>();
  @Output() szerdaEmitter = new EventEmitter<any>();
  @Output() csutortokEmitter = new EventEmitter<any>();
  @Output() pentekEmitter = new EventEmitter<any>();
  @Output() szombatEmitter = new EventEmitter<any>();
  @Output() vasarnapEmitter = new EventEmitter<any>();

  @Output() napEmitter = new EventEmitter<any>();
  @Output() honapEmitter = new EventEmitter<any>();
  @Output() evEmitter = new EventEmitter<any>();

  hetfo: boolean = false;
  kedd: boolean = false;
  szerda: boolean = false;
  csutortok: boolean = false;
  pentek: boolean = false;
  szombat: boolean = false;
  vasarnap: boolean = false;

  nincsSzabadIdopont: boolean = false;

  kivalasztott: Date | null | undefined;
  jelenlegiDate: Date = new Date();
  maxDate: Date = new Date();

  jelenlegiNap: any = Date();
  jelenlegiHonap: any = Date();
  jelenlegiEv: any = Date();
  jelenlegiOra: number = new Date().getHours();

  nap: any;
  honap: any;
  ev: any;

  jelenlegiNapSzama!: number;

  arSzam: number = 4500;
  bejelentkezetFelhasznalo?: firebase.default.User | null;

  ngOnInit(): void {
    this.kivalasztott = new Date(this.jelenlegiEv, this.jelenlegiHonap - 1, this.jelenlegiNap);

    this.dateAdapter.setLocale('hu-HU');
    this.dateAdapter.getFirstDayOfWeek = () => 1;
    this.maxDate.setMonth(this.maxDate.getMonth() + 6);

    this.authService.felhasznaloBejelentkezve().subscribe(user => {
      this.bejelentkezetFelhasznalo = user;

      this.kivalasztottNapIndex();
    }, error => {
      console.error(error);
    });
  }

  kivalasztottNapIndex() {
    if (this.kivalasztott) {
      const selectedDate = new Date(this.kivalasztott);
      const dayIndex = this.dateAdapter.getDayOfWeek(selectedDate);

      this.ev = this.kivalasztott?.getFullYear();
      if (this.kivalasztott) {
        this.honap = this.kivalasztott?.getMonth() + 1;
      }
      this.nap = this.kivalasztott?.getDate();

      let honapInpMasolat = this.honap;
      if (this.honap < 10) {
        honapInpMasolat = "0" + honapInpMasolat;
      }

      this.evEmitter.emit(this.ev);
      this.honapEmitter.emit(this.honap);
      this.napEmitter.emit(this.nap);

      this.hetfo = false;
      this.kedd = false;
      this.szerda = false;
      this.csutortok = false;
      this.pentek = false;
      this.szombat = false;
      this.vasarnap = false;

      if (dayIndex % 7 == 1) {
        this.hetfo = true;
      } else if (dayIndex % 7 == 2) {
        this.kedd = true;
      } else if (dayIndex % 7 == 3) {
        this.szerda = true;
      } else if (dayIndex % 7 == 4) {
        this.csutortok = true;
      } else if (dayIndex % 7 == 5) {
        this.pentek = true;
      } else if (dayIndex % 7 == 6) {
        this.szombat = true;
      } else if (dayIndex % 7 == 0) {
        this.vasarnap = true;
      }

      this.hetfoEmitter.emit(this.hetfo);
      this.keddEmitter.emit(this.kedd);
      this.szerdaEmitter.emit(this.szerda);
      this.csutortokEmitter.emit(this.csutortok);
      this.pentekEmitter.emit(this.pentek);
      this.szombatEmitter.emit(this.szombat);
      this.vasarnapEmitter.emit(this.vasarnap);

      this.melyikNap();
      this.arSzamitasa();
      AdatokComponent.arMegadasa(this.arSzam);
      IdopontokComponent.nincsIdopontValasztva();

      this.helyService.getAll().subscribe(
        (helyek: Hely[]) => {
          IdopontokComponent.mindenIdopontSzabad();
          helyek.forEach(h => {
            if (h.foglalas_datuma === (this.ev + "." + honapInpMasolat + "." + this.nap + ".")) {
              if (h.alkalom_szama === 6) {
                const foglalas_ora_reszek = h.foglalas_ora.split(":");
                const foglalas_oraja = foglalas_ora_reszek[0];

                IdopontokComponent.JelenlegiIdopontok(foglalas_oraja);
              }
            }
          });
          const nincsSzabadHely10 = (this.vasarnap && this.jelenlegiOra < 10 && IdopontokComponent.vanHely10) || (IdopontokComponent.vanHely10 && IdopontokComponent.masiknapErteke && this.vasarnap);
          const nincsSzabadHely11 = (this.vasarnap && this.jelenlegiOra < 11 && IdopontokComponent.vanHely11) || (IdopontokComponent.vanHely11 && IdopontokComponent.masiknapErteke && this.vasarnap);
          const nincsSzabadHely12 = (this.vasarnap && this.jelenlegiOra < 12 && IdopontokComponent.vanHely12) || (IdopontokComponent.vanHely12 && IdopontokComponent.masiknapErteke && this.vasarnap);
          const nincsSzabadHely13 = (this.vasarnap && this.jelenlegiOra < 13 && IdopontokComponent.vanHely13) || (IdopontokComponent.vanHely13 && IdopontokComponent.masiknapErteke && this.vasarnap);
          const nincsSzabadHely14 = ((this.vasarnap || this.hetfo || this.kedd || this.szerda || this.csutortok || this.pentek || this.szombat) && this.jelenlegiOra < 14 && IdopontokComponent.vanHely14) || (IdopontokComponent.vanHely14 && IdopontokComponent.masiknapErteke && (this.vasarnap || this.hetfo || this.kedd || this.szerda || this.csutortok || this.pentek || this.szombat));
          const nincsSzabadHely15 = ((this.vasarnap || this.hetfo || this.kedd || this.szerda || this.csutortok || this.pentek || this.szombat) && this.jelenlegiOra < 15 && IdopontokComponent.vanHely15) || (IdopontokComponent.vanHely15 && IdopontokComponent.masiknapErteke && (this.vasarnap || this.hetfo || this.kedd || this.szerda || this.csutortok || this.pentek || this.szombat));
          const nincsSzabadHely16 = ((this.vasarnap || this.hetfo || this.kedd || this.szerda || this.csutortok || this.pentek || this.szombat) && this.jelenlegiOra < 16 && IdopontokComponent.vanHely16) || (IdopontokComponent.vanHely16 && IdopontokComponent.masiknapErteke && (this.vasarnap || this.hetfo || this.kedd || this.szerda || this.csutortok || this.pentek || this.szombat));
          const nincsSzabadHely17 = ((this.vasarnap || this.hetfo || this.kedd || this.szerda || this.csutortok || this.pentek || this.szombat) && this.jelenlegiOra < 17 && IdopontokComponent.vanHely17) || (IdopontokComponent.vanHely17 && IdopontokComponent.masiknapErteke && (this.vasarnap || this.hetfo || this.kedd || this.szerda || this.csutortok || this.pentek || this.szombat));
          const nincsSzabadHely18 = ((this.vasarnap || this.hetfo || this.kedd || this.szerda || this.csutortok || this.pentek || this.szombat) && this.jelenlegiOra < 18 && IdopontokComponent.vanHely18) || (IdopontokComponent.vanHely18 && IdopontokComponent.masiknapErteke && (this.vasarnap || this.hetfo || this.kedd || this.szerda || this.csutortok || this.pentek || this.szombat));
          const nincsSzabadHely19 = ((this.vasarnap || this.hetfo || this.kedd || this.szerda || this.csutortok || this.pentek || this.szombat) && this.jelenlegiOra < 19 && IdopontokComponent.vanHely19) || (IdopontokComponent.vanHely19 && IdopontokComponent.masiknapErteke && (this.vasarnap || this.hetfo || this.kedd || this.szerda || this.csutortok || this.pentek || this.szombat));
          const nincsSzabadHely20 = (this.szombat && this.jelenlegiOra < 20 && IdopontokComponent.vanHely20) || (IdopontokComponent.vanHely20 && IdopontokComponent.masiknapErteke && this.szombat);
          const nincsSzabadHely21 = (this.szombat && this.jelenlegiOra < 21 && IdopontokComponent.vanHely21) || (IdopontokComponent.vanHely21 && IdopontokComponent.masiknapErteke && this.szombat);
          const nincsSzabadHely22 = (this.szombat && this.jelenlegiOra < 22 && IdopontokComponent.vanHely22) || (IdopontokComponent.vanHely22 && IdopontokComponent.masiknapErteke && this.szombat);
          const nincsSzabadHely23 = (this.szombat && this.jelenlegiOra < 23 && IdopontokComponent.vanHely23) || (IdopontokComponent.vanHely23 && IdopontokComponent.masiknapErteke && this.szombat);

          if (!nincsSzabadHely10 && !nincsSzabadHely11 && !nincsSzabadHely12 && !nincsSzabadHely13 && !nincsSzabadHely14 && !nincsSzabadHely15 && !nincsSzabadHely16 && !nincsSzabadHely17 && !nincsSzabadHely18 && !nincsSzabadHely19 && !nincsSzabadHely20 && !nincsSzabadHely21 && !nincsSzabadHely22 && !nincsSzabadHely23) {
            this.nincsSzabadIdopont = true;
          } else {
            this.nincsSzabadIdopont = false;
          }
        });
    }
  }

  arSzamitasa() {
    let napiAr = 4000;

    if (this.hetfo || this.kedd || this.szerda || this.csutortok) {
      napiAr = 4000;
    } else if (this.pentek || this.szombat || this.vasarnap) {
      napiAr = 5000;
    }

    if (this.bejelentkezetFelhasznalo != null) {
      this.arSzam = Math.round(napiAr - (napiAr * 0.05));
    } else {
      this.arSzam = napiAr;
    }
  }

  melyikNap() {
    IdopontokComponent.masiknapErteke = false;

    if (this.ev == this.jelenlegiEv) {
      if (this.honap == this.jelenlegiHonap) {
        if (this.nap == this.jelenlegiNap) {
          IdopontokComponent.masiknapErteke = false;
        } else {
          IdopontokComponent.masiknapErteke = true;
        }
      } else {
        IdopontokComponent.masiknapErteke = true;
      }
    } else {
      IdopontokComponent.masiknapErteke = true;
    }
  }
}