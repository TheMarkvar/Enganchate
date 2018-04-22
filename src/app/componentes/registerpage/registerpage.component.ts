import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { DatabaseService } from '../../servicios/database.service';
import { Router } from '@angular/router';
import { FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.scss']
})
export class RegisterpageComponent implements OnInit {

  public email:string;
  public password:string;
  public password2:string;
  public nombres:string;
  public apellidos:string;
  public mayoriaEdad:number=18;
  public edad:Date;
  public maxDate;


  constructor(
    public authService: AuthService,
    public databaseService: DatabaseService,
    public router:Router,
    public flashMensaje: FlashMessagesService
  ) { }

  ngOnInit() {
    var today = new Date();
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
    console.log(this.maxDate);
  }

  onSubmitRegisterUser(){
    if(this.verificarFormulario()){
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

  //Se debe implementar el método para que datos sean coherentes
  verificarFormulario(){
    var res = true;
    if(this.password!=this.password2){
      res = false;
    }



    return res;
  }



}
