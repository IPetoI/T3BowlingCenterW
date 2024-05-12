import { Component, AfterViewInit } from '@angular/core';
import { AuthService } from './nyilvanos/service/auth.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit  {

  constructor(private router: Router, private authService: AuthService) {}

  title = 'T3_Bowling_Center';
  beJelolve : any;
  bejelentkezetFelhasznalo?: firebase.default.User | null;

  ngAfterViewInit(): void {
    this.authService.felhasznaloBejelentkezve().subscribe(user => {
      this.bejelentkezetFelhasznalo = user;
      localStorage.setItem("felhasznalo", JSON.stringify(this.bejelentkezetFelhasznalo));
    }, error => {
      console.error(error);
      localStorage.setItem("felhasznalo", JSON.stringify('null'));
    });
  }

  alapAllapot() {
    this.beJelolve = document.getElementById('csukas');
    this.beJelolve.checked = false;

    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  kijelentkezes() {
    this.authService.kijelentkezes().then(() =>{
      console.log("Sikeres kijelentkezes!");
      localStorage.removeItem('felhasznalo');
      this.router.navigateByUrl('/kezdolap');
    }).catch(error => {
      console.error(error);
    });
  }

  oldalsavKatt(oldalsav: MatSidenav) {
    oldalsav.toggle();
  }

  oldalsavBezaras(event: any, oldalsav: MatSidenav) {
    if(event === true) {
      oldalsav.close();
    }
  }
}