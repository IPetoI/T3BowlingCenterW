import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/nyilvanos/service/auth.service';

@Component({
  selector: 'app-bejelentkezes',
  templateUrl: './bejelentkezes.component.html',
  styleUrls: ['./bejelentkezes.component.scss']
})
export class BejelentkezesComponent {

  constructor(private router: Router, private authService: AuthService
    ,private afAuth: AngularFireAuth) {}

  ujratoltes(): void {}

  email = new FormControl('');
  jelszo = new FormControl('');

  hiba: boolean = false;

  async bejelentkezes() {
    this.authService.bejelentkezes(this.email.value, this.jelszo.value).then(_ => {
      console.log("Sikeres bejelentkezes!");
      this.hiba = false;
      this.router.navigateByUrl('/kezdolap');
    }).catch(error => {
      this.hiba = true;
      console.error(error);
    });
  }
}