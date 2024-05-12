import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const felhasznalo = JSON.parse(localStorage.getItem('felhasznalo') as string);
    if(felhasznalo) {
      if (state.url.includes('/profil')) {
        return true;
      }
      this.router.navigate(['/kezdolap']);
      return false;
    } else {
      if (state.url.includes('/profil')) {
        this.router.navigate(['/kezdolap']);
        return false;
      }
      return true;
    }
  }
}
