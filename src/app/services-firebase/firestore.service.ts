import { inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { IUsuario } from '../models/IUsuarios';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  auth = inject(AngularFireAuth);

  constructor(private firestore: AngularFirestore){}

  createDoc(data: any, path: string, id: string){
    const collection = this.firestore.collection('usuarios');
    return collection.doc(id).set(data);
  }

  getCollection(){
    console.log('Prueba coleccion');
    this.firestore.collection('usuarios').valueChanges().subscribe( (data) => {
      console.log('data ->', data);
    });
  }

  // Login con firebase
  login(user: IUsuario){
    console.log(user)
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Registro con firebase
  register(user: IUsuario){
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Actualizar perfil
  updateName(displayName: string){
    const user = getAuth().currentUser;
    if(!user) return;
    return updateProfile(user, {displayName});
  }
}
