import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Felhasznalo } from 'src/app/nyilvanos/models/felhasznalo';
import { Palyafoglalas } from 'src/app/nyilvanos/models/palyafoglalas';
import { AuthService } from 'src/app/nyilvanos/service/auth.service';
import { FelhasznaloService } from 'src/app/nyilvanos/service/felhasznalo.service';
import { FoglalasService } from 'src/app/nyilvanos/service/foglalas.service';
import { HelyService } from 'src/app/nyilvanos/service/hely.service';
import { IdopontokComponent } from '../idopontok/idopontok.component';
import { Hely } from 'src/app/nyilvanos/models/hely';
import { take } from 'rxjs';

@Component({
  selector: 'app-adatok',
  templateUrl: './adatok.component.html',
  styleUrls: ['./adatok.component.scss']
})
export class AdatokComponent implements OnInit {

  constructor(private authService: AuthService, private felhasznaloService: FelhasznaloService,
     private foglalasService: FoglalasService, private helyService: HelyService) {}

  @Input() hetfoInp: any;
  @Input() keddInp: any;
  @Input() szerdaInp: any;
  @Input() csutortokInp: any;
  @Input() pentekInp: any;
  @Input() szombatInp: any;
  @Input() vasarnapInp: any;

  @Input() napInp: any; @Input() honapInp: any; @Input() evInp: any;

  ujratoltes(): void {}

  inputSzemelyEsOra: any; inputAr: any;
  static arSzam: number = 4000; 
  szemelySzoveg: string = " személy"; 
  szemelySzam: number = 2;

  static arInput: any;

  foglalasForm = new FormGroup({
    nevFog: new FormControl('', Validators.required),
    emailFog: new FormControl('', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    telefonFog: new FormControl('', [ Validators.required, Validators.pattern(/^\+36 (20|30|70) [0-9]{3} [0-9]{4}$/)])
  });

  bejelentkezetFelhasznalo?: firebase.default.User | null;
  felhasznalo?: Felhasznalo;
  felhasznaloId: any;
  nevHiba: boolean = false;
  emailHiba: boolean = false;
  telefonszamHiba: boolean = false;
  validHiba: boolean = false;
  melyikOraHiba: boolean = false;
  melyikOra: string = '';

  ngOnInit(): void {
    this.authService.felhasznaloBejelentkezve().subscribe(user => {
      this.bejelentkezetFelhasznalo = user;
      this.felhasznaloId = user?.uid;

      this.felhasznaloService.getById(this.felhasznaloId).subscribe(data => {
        this.felhasznalo = data;
        this.foglalasForm.get('nevFog')?.setValue(this.felhasznalo?.nev as string);
        this.foglalasForm.get('emailFog')?.setValue(this.felhasznalo?.email as string);
        this.foglalasForm.get('telefonFog')?.setValue(this.felhasznalo?.telefonszam as string);
      }, error => {
        console.error(error);
      });
    }, error => {
      console.error(error);
    });
  }
  beJelolve : any;

  alapAllapot() {
    this.beJelolve = document.getElementById('csukas');
    this.beJelolve.checked = false;
  }

  eloreHanyan() {
    this.inputSzemelyEsOra = document.getElementById("hanyan");
    if (this.szemelySzam < 6) {
      this.szemelySzam++;
      this.inputSzemelyEsOra.value = this.szemelySzam + this.szemelySzoveg;
    }
  }

  hatraHanyan() {
    this.inputSzemelyEsOra = document.getElementById("hanyan");
    if (this.szemelySzam > 1) {
      this.szemelySzam--;
      this.inputSzemelyEsOra.value = this.szemelySzam + this.szemelySzoveg;
    }
  }

  hanyOra() {
    if(IdopontokComponent.benyomva10) {
      this.melyikOra = "10:00";
    } else if(IdopontokComponent.benyomva11) {
      this.melyikOra = "11:00";
    } else if(IdopontokComponent.benyomva12) {
      this.melyikOra = "12:00";
    } else if(IdopontokComponent.benyomva13) {
      this.melyikOra = "13:00";
    } else if(IdopontokComponent.benyomva14) {
      this.melyikOra = "14:00";
    } else if(IdopontokComponent.benyomva15) {
      this.melyikOra = "15:00";
    } else if(IdopontokComponent.benyomva16) {
      this.melyikOra = "16:00";
    } else if(IdopontokComponent.benyomva17) {
      this.melyikOra = "17:00";
    } else if(IdopontokComponent.benyomva18) {
      this.melyikOra = "18:00";
    } else if(IdopontokComponent.benyomva19) {
      this.melyikOra = "19:00";
    } else if(IdopontokComponent.benyomva20) {
      this.melyikOra = "20:00";
    } else if(IdopontokComponent.benyomva21) {
      this.melyikOra = "21:00";
    } else if(IdopontokComponent.benyomva22) {
      this.melyikOra = "22:00";
    } else if(IdopontokComponent.benyomva23) {
      this.melyikOra = "23:00";
    } else {
      this.melyikOra = '';
    }
  }

  lefoglalom() {
    this.emailHiba = !this.foglalasForm.get('emailFog')?.valid;
    this.telefonszamHiba = !this.foglalasForm.get('telefonFog')?.valid;
    this.nevHiba = this.foglalasForm.get('nevFog')?.value === '';
    this.hanyOra();
    this.melyikOraHiba = this.melyikOra === '';
    this.evInp = typeof this.evInp === 'string' ? this.evInp.trim() : this.evInp;
    
    if (this.foglalasForm.valid && !this.melyikOraHiba) {
      let honapInpMasolat = this.honapInp;
      if (this.honapInp < 10) {
        honapInpMasolat = "0"+honapInpMasolat;
      }

      const foglalas: Palyafoglalas = {
        foglalas_id: '',
        melyik_nap: this.evInp + "." + honapInpMasolat + "." + this.napInp + ".",
        melyik_ora: this.melyikOra,
        hanyan_jonnek: this.szemelySzam as number,
        felhasznalo_neve: this.foglalasForm.get('nevFog')?.value as string,
        felhasznalo_email: this.foglalasForm.get('emailFog')?.value as string,
        felhasznalo_telefonszam: this.foglalasForm.get('telefonFog')?.value as string,
        ar: AdatokComponent.arSzam + " Ft" as string
      };
      const hely: Hely = {
        alkalom_szama: 1,
        foglalas_datuma: this.evInp + "." + honapInpMasolat + "." + this.napInp + ".",
        foglalas_ora: this.melyikOra
      };
    
      this.helyService.getAll().pipe(take(1)).subscribe(
        (helyek: Hely[]) => {
          const meglevoHely = helyek.find(h => h.foglalas_datuma === hely.foglalas_datuma && h.foglalas_ora === hely.foglalas_ora);
    
          if (meglevoHely) {
            if (meglevoHely.alkalom_szama < 6) {
              meglevoHely.alkalom_szama++;
              this.helyService.update(meglevoHely).then(() => {
                console.log('Sikeresen frissült a helyek adatbázisa!');
                return this.foglalasService.create(foglalas);
              }).then(() => {
                console.log('Sikeres idopontfoglalas!');
                confirm("Sikeresen lefoglaltad az időpontot!");
              }).catch(error => {
                console.error(error);
              });
            } else{
              console.log("már tele van ez az idopont "+meglevoHely.foglalas_datuma+" "+meglevoHely.foglalas_ora)
            }
          } else {
            this.helyService.create(hely).then(() => {
              console.log('Sikeres helyfoglalas!');
              return this.foglalasService.create(foglalas);
            }).then(() => {
              console.log('Sikeres idopontfoglalas!');
              confirm("Sikeresen lefoglaltad az időpontot!");
            }).catch(error => {
              console.error(error);
            });
          }
        },
        error => {
          console.error(error);
        }
      );
      IdopontokComponent.nincsIdopontValasztva();
    }
  }

  public static arMegadasa(ara: number) {
    this.arInput = document.getElementById('ar');
    this.arInput.value = ara + " Ft";
    this.arSzam = ara;
  }

  telefonszamEllenorzes(event: any) {
    if (event && event.target) {
      let telefon = event.target.value;
      let elozoTel = telefon.substring(0, telefon.length - 1);
  
      if (!telefon || telefon.trim() === '' || telefon.length < 4) {
        telefon = '+36 ';
      } else if (telefon.length === 5) {
        if (telefon.charAt(4) === '2' || telefon.charAt(4) === '3' || telefon.charAt(4) === '7') {
          telefon += '0 ';
        } else {
           telefon = telefon.substring(0, telefon.length - 1);
        }
      } else if (telefon.length === 6 || telefon.length === 10) {
        telefon += ' ';
      }
      const telefonControl = this.foglalasForm.get('telefonFog');
      if (telefon.length > 15) {
        telefonControl?.patchValue(elozoTel);
      }else {
        telefonControl?.patchValue(telefon);
      }
    }
  }

  onFocus(event: any) {
    let telefon = event.target.value;
    if (!telefon.startsWith('+36')) {
      telefon = '+36 ' + telefon;
      event.target.value = telefon;
    }
  }
}