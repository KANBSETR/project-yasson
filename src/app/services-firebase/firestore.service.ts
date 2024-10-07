import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore){}

  createDoc(data: any, path: string, id: string){
    const collection = this.firestore.collection('usuarios');
    return collection.doc(id).set(data);
  }

  getCollection(){
    console.log('Prueba coleccionnnnnnnnnnnnnnnnn');
    this.firestore.collection('usuarios').valueChanges().subscribe( (data) => {
      console.log('data ->', data);
    });
  }


}
