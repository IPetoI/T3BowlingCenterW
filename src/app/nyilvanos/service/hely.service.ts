import { Injectable } from '@angular/core';
import { Hely } from '../models/hely';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class HelyService {

  collectionNev = 'Helyek';

  constructor(private afs: AngularFirestore) { }

  

  create(hely: Hely) {
    return this.afs.collection<Hely>(this.collectionNev).add(hely);
  }

  getAll() {
    return this.afs.collection<Hely>(this.collectionNev).valueChanges();
  }

  update(hely: Hely) {
    return this.afs.collection<Hely>(this.collectionNev)
    .ref
    .where("foglalas_datuma", "==", hely.foglalas_datuma)
    .where("foglalas_ora", "==", hely.foglalas_ora)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.update(hely);
      });
    });
  }

  delete(hely: Hely) {
    return this.afs.collection<Hely>(this.collectionNev, ref => 
      ref.where('foglalas_datuma', '==', hely.foglalas_datuma)
         .where('foglalas_ora', '==', hely.foglalas_ora))
      .get()
      .toPromise()
      .then((querySnapshot) => {
        if (querySnapshot) {
          querySnapshot.forEach((doc) => {
            doc.ref.delete();
          });
        }
      });
  }
}