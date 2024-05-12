import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GalleriaComponent } from './oldalak/galleria/galleria.component';
import { KezdolapComponent } from './oldalak/kezdolap/kezdolap.component';
import { RolunkComponent } from './oldalak/rolunk/rolunk.component';
import { PalyafoglalasComponent } from './oldalak/palyafoglalas/palyafoglalas.component';
import { BejelentkezesComponent } from './oldalak/bejelentkezes/bejelentkezes.component';
import { RegisztracioComponent } from './oldalak/regisztracio/regisztracio.component';
import { NaptarComponent } from './oldalak/palyafoglalas/naptar/naptar.component';
import { AdatokComponent } from './oldalak/palyafoglalas/adatok/adatok.component';
import { IdopontokComponent } from './oldalak/palyafoglalas/idopontok/idopontok.component';
import { PipesPipe } from './oldalak/palyafoglalas/pipes/pipe';
import { MenuComponent } from './nyilvanos/menu/menu.component';
import { ProfilComponent } from './oldalak/profil/profil.component';
import { AuthGuard } from './nyilvanos/service/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input' ;
import { MatButtonModule } from '@angular/material/button' ;
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { environment } from '../environments/environments';
//import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

@NgModule({
  declarations: [
    AppComponent,
    KezdolapComponent,
    GalleriaComponent,
    RolunkComponent,
    PalyafoglalasComponent,
    BejelentkezesComponent,
    RegisztracioComponent,
    NaptarComponent,
    AdatokComponent,
    IdopontokComponent,
    PipesPipe,
    MenuComponent,
    ProfilComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatListModule,
    AngularFireModule.initializeApp(environment.firebase),
    //provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    ],
  providers: [ 
    AuthGuard,
    AngularFireAuth,
    IdopontokComponent,
    AdatokComponent,
    PipesPipe ],
  bootstrap: [AppComponent]
})
export class AppModule { }
