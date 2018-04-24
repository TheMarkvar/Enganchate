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

  onSubmitLogin(loginForm){

    if(loginForm.valid){
      this.email = loginForm.controls.email.value;
      this.password = loginForm.controls.password.value;
      this.authService.loginEmail(this.email,this.password)
      .then((res)=>{

        this.flashMensaje.show('Inicio de sesion satisfactorio',
        {cssClass: 'alert-success', timeout: 4000});
        this.router.navigate(['/privado']);
      }).catch((err)=>{
        this.flashMensaje.show(err.message,
        {cssClass: 'alert-danger', timeout: 4000});
      });
    }else{
      this.flashMensaje.show("Formulario tiene campos incompletos o inválidos",
      {cssClass: 'alert-danger', timeout: 4000});
    }

  }
  onClickGoogleLogin(){
    this.authService.loginGoogle().
    then((res)=>{
      this.insertUser();
      this.router.navigate(['./privado']);
    }).catch((err)=>{
      this.flashMensaje.show(err.message,
      {cssClass: 'alert-danger', timeout: 4000});
    })
  }

  onClickFacebookLogin(){
    this.authService.loginFacebook().
    then((res)=>{
      this.insertUser();
      this.router.navigate(['./privado']);
    }).catch((err)=>{
      this.flashMensaje.show(err.message,
      {cssClass: 'alert-danger', timeout: 4000});
    })
  }

  onClickTwitterLogin(){
    this.authService.loginTwitter().
    then((res)=>{
      this.insertUser();
      this.router.navigate(['./privado']);
    }).catch((err)=>{
      this.flashMensaje.show(err.message,
      {cssClass: 'alert-danger', timeout: 4000});
    })
  }
  onClickRegister(){
    this.router.navigate(['./register']);
  }

  onClickResetPassword(loginForm){
    this.email = loginForm.controls.email.value;
    this.authService.resetPassword(this.email).
    then((res)=>{
      this.flashMensaje.show('Se ha enviado un enlace al correo: '+
      this.email +
      ". La clave debe contener al menos un número, una mayúscula, una minúscula y al menos 8 caracteres o más",
      {cssClass: 'alert-success', timeout: 4000});
    }).catch((err)=>{
      this.flashMensaje.show(err.message,
      {cssClass: 'alert-danger', timeout: 4000});
    })
  }

  insertUser(){
    let id = this.authService.afAuth.auth.currentUser.uid;
    let email = this.authService.afAuth.auth.currentUser.email;
    let displayName = this.authService.afAuth.auth.currentUser.displayName;
    this.databaseService.insertUserDatabaseLogin(id,email, displayName);
  }


}
