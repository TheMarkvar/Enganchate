import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { DatabaseService } from '../servicios/database.service';
import 'rxjs/add/operator/map';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/throttleTime';

@Injectable()
export class AuthService {

  userId: string; // current user uid
  mouseEvents:  Subscription
  timer: Subscription;
  maxTime: number = 5000;

  constructor(
    public afAuth: AngularFireAuth,
    public databaseService: DatabaseService

  ) {
    /// Subscribe to auth state in firebase
      this.afAuth.authState
          .do(user => {
            if (user) {
              this.userId = user.uid;
               this.updateOnConnect();
               this.updateOnDisconnect();
               this.updateOnIdle() ;
            }

          })
      .subscribe();
      //this.maxTime = 300000; //Tiempo para contar como ausente
  }

    /// Helper to perform the update in Firebase
    private updateStatus(status: string) {
        if (!this.userId) return

        this.databaseService.afDatabase.object(`usuarios/` + this.userId).update({ status: status });
      }


    /// Updates status when connection to Firebase starts
    private updateOnConnect() {
      return this.databaseService.afDatabase.object('.info/connected').valueChanges()
                    .do(connected => {
                        let status = connected ? 'online' : 'offline'
                        this.updateStatus(status)
                    })
                    .subscribe()
    }

    /// Updates status when connection to Firebase ends
   private updateOnDisconnect() {
     firebase.database().ref().child('usuarios/'+this.userId)
             .onDisconnect()
             .update({status: 'offline'});
   }

   /// Listen for mouse events to update status
   private updateOnIdle() {

     this.mouseEvents = Observable
                          .fromEvent(document, 'mousemove')
                          .throttleTime(5000)
                          .do(() => {
                             this.updateStatus('online')
                             this.resetTimer()
                          })
                          .subscribe()
   }

   /// Reset the timer
   private resetTimer() {
     if (this.timer) this.timer.unsubscribe()

     this.timer = Observable.timer(this.maxTime)
                     .do(() => {
                       this.updateStatus('away')
                     })
                     .subscribe();
   }


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

  getVerficationAccount(){
    return this.afAuth.auth.currentUser.emailVerified;
  }

  getEmail(){
    return this.afAuth.auth.currentUser.email;
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

  updateProfile(photoURL:string, displayName:string){

    //this.afAuth.auth.currentUser.photoURL = photoURL;
    this.afAuth.auth.currentUser.updateProfile({
      displayName: displayName,
      photoURL: photoURL
    });
  }

  logout() {
    this.updateStatus('offline');
    this.mouseEvents.unsubscribe();
    this.timer.unsubscribe();

  return this.afAuth.auth.signOut();
}

}
