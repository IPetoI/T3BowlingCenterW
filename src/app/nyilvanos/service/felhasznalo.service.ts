import { Injectable } from '@angular/core';
import { Felhasznalo } from '../models/felhasznalo';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FelhasznaloService {

  collectionNev = 'Felhasznalok';

  constructor(private afs: AngularFirestore) { }

  

  create(felhasznalo: Felhasznalo) {
    return this.afs.collection<Felhasznalo>(this.collectionNev).doc(felhasznalo.id).set(felhasznalo);
  }

  getAll() {
    return this.afs.collection<Felhasznalo>(this.collectionNev).valueChanges();
  }

  getById(id: string) {
    return this.afs.collection<Felhasznalo>(this.collectionNev).doc(id).valueChanges();
  }

  update(felhasznalo: Felhasznalo) {
    return this.afs.collection<Felhasznalo>(this.collectionNev).doc(felhasznalo.id).set(felhasznalo);
  }

  delete(id: string) {
    return this.afs.collection<Felhasznalo>(this.collectionNev).doc(id).delete();
  }

}
