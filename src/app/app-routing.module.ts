import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { KezdolapComponent } from './oldalak/kezdolap/kezdolap.component';
import { GalleriaComponent } from './oldalak/galleria/galleria.component';
import { RolunkComponent } from './oldalak/rolunk/rolunk.component';
import { PalyafoglalasComponent } from './oldalak/palyafoglalas/palyafoglalas.component';
import { RegisztracioComponent } from './oldalak/regisztracio/regisztracio.component';
import { BejelentkezesComponent } from './oldalak/bejelentkezes/bejelentkezes.component';
import { AuthGuard } from './nyilvanos/service/auth.guard';
import { ProfilComponent } from './oldalak/profil/profil.component';

const routes: Routes = [
  { path: 'kezdolap', component: KezdolapComponent },
  { path: 'galleria', component: GalleriaComponent },
  { path: 'palyafoglalas', component: PalyafoglalasComponent },
  { path: 'rolunk', component: RolunkComponent },
  { path: 'bejelentkezes', component: BejelentkezesComponent, canActivate: [AuthGuard] },
  { path: 'regisztracio', component: RegisztracioComponent, canActivate: [AuthGuard] },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'kezdolap', pathMatch: 'full'},
  { path: '**', redirectTo: 'kezdolap'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
