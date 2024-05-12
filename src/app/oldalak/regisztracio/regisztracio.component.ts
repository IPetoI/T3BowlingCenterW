import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../nyilvanos/service/auth.service';
import { Felhasznalo } from '../../nyilvanos/models/felhasznalo';
import { FelhasznaloService } from '../../nyilvanos/service/felhasznalo.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';


let jelszoEgyezik: boolean = false; 
let jelszoHosszusaga: boolean = false; 

@Component({
  selector: 'app-regisztracio',
  templateUrl: './regisztracio.component.html',
  styleUrls: ['./regisztracio.component.scss']
})


export class RegisztracioComponent {
  
  constructor(private router: Router, private authService: AuthService, 
              private felhasznaloService: FelhasznaloService,private afAuth: AngularFireAuth) {}

  ujratoltes(): void {}

  regisztracioForm = new FormGroup({
    nevReg: new FormControl('', Validators.required),
    emailReg: new FormControl('', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    telefonReg: new FormControl('', [ Validators.required, Validators.pattern(/^\+36 (20|30|70) [0-9]{3} [0-9]{4}$/)]),
    jelszoReg: new FormControl('', Validators.required),
    jelszoUjraReg: new FormControl('', Validators.required)
  }, {
    validators: jelszavakEllenorzese('jelszoReg', 'jelszoUjraReg')
  });

 joJelszavak: boolean = true;
 jelszavakHossz: boolean = true;
 telefonszam: boolean = true;
 email: boolean = true;
 jelszo: boolean = true;
 valid: boolean = true;

  async regisztralok() {

    if (!this.regisztracioForm.get('emailReg')?.valid) {
      this.email = false;
    }else {
      this.email = true;
    }

    if (!this.regisztracioForm.get('telefonReg')?.valid) {
      this.telefonszam = false;
    }else {
      this.telefonszam = true;
    }

    if(!jelszoEgyezik) {
      this.jelszo = false;
    }else {
      this.jelszo = true;
    }

    if(!this.regisztracioForm.valid) {
      this.valid = false;
    }else {
      this.valid = true;
    } 

    this.joJelszavak = jelszoEgyezik;
    this.jelszavakHossz = jelszoHosszusaga;

    if(this.regisztracioForm.valid && jelszoEgyezik ) {
      this.authService.regisztracio(this.regisztracioForm.get('emailReg')?.value, this.regisztracioForm.get('jelszoReg')?.value).then(cred => {
        const felhasznalo: Felhasznalo = {
          id: cred.user?.uid as string,
          nev: this.regisztracioForm.get('nevReg')?.value as string,
          email: this.regisztracioForm.get('emailReg')?.value as string,
          telefonszam: this.regisztracioForm.get('telefonReg')?.value as string,
        };
        this.felhasznaloService.create(felhasznalo).then(_ => {
          console.log('Sikeres regisztrácio, felhasznalo bekerult az adatbazisba!');
          this.authService.bejelentkezes(this.regisztracioForm.get('emailReg')?.value, this.regisztracioForm.get('jelszoReg')?.value).then(_ => {
            console.log("Sikeres bejelentkezes!");
            this.router.navigateByUrl('/kezdolap');
          }).catch(error => {
            console.error(error);
          });
        }).catch(error => {
          console.error(error);
        }); 
      }).catch(error => {
        console.error(error);
      });
    }
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
      const telefonControl = this.regisztracioForm.get('telefonReg');
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

function jelszavakEllenorzese(elsoJelszo: string, masodikJelszo: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const jelszo = control.get(elsoJelszo);
    const jelszoUjra = control.get(masodikJelszo);

    if (jelszo?.value.length < 7 || jelszoUjra?.value.length < 7) {
      jelszoHosszusaga=false;
      return { passwordMismatch: true };
    }

    if (jelszo?.value !== jelszoUjra?.value) {
      jelszoEgyezik=false;
      return { passwordMismatch: true };
    }

    jelszoHosszusaga=true;
    jelszoEgyezik= true;
    return null;
  };
}