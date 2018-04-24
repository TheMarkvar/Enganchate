import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { DatabaseService } from '../../servicios/database.service';
import { Router } from '@angular/router';
import { FlashMessagesService} from 'angular2-flash-messages';

import { NgControl } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.scss']
})
export class RegisterpageComponent implements OnInit {
  private email:string;
  public password:string;
  public password2:string;
  public nombres:string;
  public apellidos:string;
  public edad:Date;
  public maxDate;

  constructor(
    public authService: AuthService,
    public databaseService: DatabaseService,
    public router:Router,
    public flashMensaje: FlashMessagesService
  ) { }



  ngOnInit() {

    /*var today = new Date();
    var aux, day, month, year, format;


    day = today.getDate();
    month = today.getMonth()+1;
    year = today.getFullYear() - this.mayoriaEdad;

    if(day.toString().length < 2){
      aux = day;
      day = "0" + aux;
    }
    if(month.toString().length < 2){
      aux = month;
      month = "0" + aux;
    }


    format = ""+year+"-"+month+"-"+day;

    //this.maxDate = format;
    this.maxDate = "2000-12-05";
    //console.log(this.maxDate);
    */

  }

  onSubmitRegisterUser(registerForm){

    console.log(registerForm.value);


    if(registerForm.valid){

      var valor = true;

      if(!this.verficarClave(registerForm.controls.password.value,
                            registerForm.controls.password2.value)){
        valor = false;
        this.flashMensaje.show("Contraseñas no coinciden",
        {cssClass: 'alert-danger', timeout: 4000});
      }
      if((valor) && (!this.verificarFecha(new Date(registerForm.controls.fecha_nac.value),
      new Date())) ){

        this.flashMensaje.show("Debe ser mayor de 18 años y menor de 70 años",
        {cssClass: 'alert-danger', timeout: 4000});
      }

      if(valor){
        this.nombres = registerForm.controls.nombres.value;
        this.apellidos = registerForm.controls.apellidos.value;
        this.email = registerForm.controls.email.value;
        this.password = registerForm.controls.password.value;
        this.edad = new Date(registerForm.controls.fecha_nac.value);

        let displayName = this.nombres+" "+this.apellidos;
        this.authService.registerUser(this.email,this.password)
        .then((res)=>{


          this.authService.sendEmailVerification();
          this.databaseService.insertUserDatabase(this.authService.afAuth.auth.currentUser.uid,
          this.email, displayName, this.edad);
          this.flashMensaje.show('Revisar correo para validar la cuenta',
          {cssClass: 'alert-success', timeout: 4000});

          this.router.navigate(['/home']);
        }).catch((err)=>{
          this.flashMensaje.show(err.message,
          {cssClass: 'alert-danger', timeout: 4000});
          this.router.navigate(['/register']);
        });
      }

    }
    else if(registerForm.invalid){
      this.flashMensaje.show("Formulario tiene campos incompletos",
      {cssClass: 'alert-danger', timeout: 4000});
    }

  }

  verficarClave(pass1, pass2){
    if(pass1.toString()===pass2.toString()){
        return true;
    }
    return false;
  }

  verificarFecha(date1, date2){
    var res = false;


    if( (date2.getFullYear() - date1.getFullYear() -1)  > 18 &&
        (date2.getFullYear() - date1.getFullYear() -1 )  < 70){
      res = true
    }
    return res;

  }


}
