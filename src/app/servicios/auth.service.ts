import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { DatabaseService } from '../servicios/database.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {



  constructor(
    public afAuth: AngularFireAuth,
    public databaseService: DatabaseService

  ) { }

  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then( userData =>  resolve(userData),
      err => reject (err));
    });
  }

  sendEmailVerification(){
    this.afAuth.auth.currentUser.sendEmailVerification();
  }

  loginEmail(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, pass)
      .then( userData =>  resolve(userData),
      err => reject (err));
    });
  }
  loginGoogle(){
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  loginFacebook(){
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  loginTwitter(){
    return this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
  }


  //retornar si hay algún usuario conectado
  getAuth(){
    return this.afAuth.authState.map(auth => auth);
  }

  resetPassword(email:string){
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  updateProfilePicture(photoURL){
    this.afAuth.auth.currentUser.photoURL = photoURL;
  }

  logout() {
  return this.afAuth.auth.signOut();
}

}
