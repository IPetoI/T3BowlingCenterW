import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  bejelentkezes(email: any, jelszo: any) {
    return this.auth.signInWithEmailAndPassword(email, jelszo);
  }

  regisztracio(email: any, jelszo: any) {
    return this.auth.createUserWithEmailAndPassword(email, jelszo);
  }

  felhasznaloBejelentkezve() {
    return this.auth.user;
  }

  kijelentkezes() {
    return this.auth.signOut();
  }

}
