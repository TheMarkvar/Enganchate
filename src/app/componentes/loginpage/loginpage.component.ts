import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { DatabaseService } from '../../servicios/database.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {
  private email:string;
  private password:string;

  constructor(
    public authService: AuthService,
    public databaseService: DatabaseService,
    public router:Router,
    public flashMensaje: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onSubmitLogin(){
    this.authService.loginEmail(this.email,this.password)
    .then((res)=>{
      this.flashMensaje.show('Inicio de sesion satisfactorio',
      {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/privado']);
    }).catch((err)=>{
      this.flashMensaje.show(err.message,
      {cssClass: 'alert-danger', timeout: 4000});
      this.router.navigate(['/home']);
    });
  }
  onClickGoogleLogin(){
    this.authService.loginGoogle().
    then((res)=>{
      this.insertUser();
      this.router.navigate(['./privado']);
    }).catch( err => console.log(err.message));
  }

  onClickFacebookLogin(){
    this.authService.loginFacebook().
    then((res)=>{
      this.insertUser();
      this.router.navigate(['./privado']);
    }).catch( err => console.log(err.message));
  }

  onClickTwitterLogin(){
    this.authService.loginTwitter().
    then((res)=>{
      this.insertUser();
      this.router.navigate(['./privado']);
    }).catch( err => console.log(err.message));
  }

  insertUser(){
    let id = this.authService.afAuth.auth.currentUser.uid;
    let email = this.authService.afAuth.auth.currentUser.email;
    let displayName = this.authService.afAuth.auth.currentUser.displayName;
    this.databaseService.insertUserDatabaseLogin(id,email, displayName);
  }


}
