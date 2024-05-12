import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, Query } from '@angular/fire/compat/firestore';
import { Palyafoglalas } from '../models/palyafoglalas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoglalasService {

  collectionNev = 'Foglalasok';

  constructor(private afs: AngularFirestore) { }


  create(foglalas: Palyafoglalas) {
    foglalas.foglalas_id = this.afs.createId();
    return this.afs.collection<Palyafoglalas>(this.collectionNev).doc(foglalas.foglalas_id).set(foglalas);
  }

  getAll(felhasznaloEmailcim: string): Observable<Palyafoglalas[]> {
    const collectionRef: AngularFirestoreCollection<Palyafoglalas> = this.afs.collection<Palyafoglalas>(this.collectionNev, ref =>
      (ref as Query).orderBy('melyik_nap').orderBy('melyik_ora').where('felhasznalo_email', '==', felhasznaloEmailcim)
    );
    return collectionRef.valueChanges();
  }

  getById(id: string) {
    return this.afs.collection<Palyafoglalas>(this.collectionNev).doc(id).valueChanges();
  }

  update(foglalas: Palyafoglalas) {
    return this.afs.collection<Palyafoglalas>(this.collectionNev).doc(foglalas.foglalas_id).set(foglalas);
  }

  delete(id: string) {
    return this.afs.collection<Palyafoglalas>(this.collectionNev).doc(id).delete();
  }
}
