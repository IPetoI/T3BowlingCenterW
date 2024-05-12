import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../nyilvanos/service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Output() oldalsavBezar: EventEmitter<boolean> = new EventEmitter();

  constructor(private router: Router, private authService: AuthService) {}

  close() {
    this.oldalsavBezar.emit(true);
  }

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

  kijelentkezes() {
    this.authService.kijelentkezes().then(() =>{
      console.log("Sikeres kijelentkezes!");
      localStorage.removeItem('felhasznalo');
      this.router.navigateByUrl('/kezdolap');
    }).catch(error => {
      console.error(error);
    });
  }
}
