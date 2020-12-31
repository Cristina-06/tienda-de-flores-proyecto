import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  getFlores(){
    return this.firestore.collection("flores").snapshotChanges();
  }

  createFlor(flores:any){
    return this.firestore.collection("flores").add(flores);
  }

  updateFlor(id:any, flores:any){
    return this.firestore.collection("flores").doc(id).update(flores);
  }

  deleteFlor(id:any){
    return this.firestore.collection("flores").doc(id).delete();
  }
}
