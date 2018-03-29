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
  public edad:number;


  constructor(
    public authService: AuthService,
    public databaseService: DatabaseService,
    public router:Router,
    public flashMensaje: FlashMessagesService
  ) { }

  ngOnInit() {
  }
  onSubmitRegisterUser(){
    if(this.verificarFormulario()){
      let displayName = this.nombres+" "+this.apellidos;
      this.authService.registerUser(this.email,this.password)
      .then((res)=>{
        this.flashMensaje.show('Usuario creado correctamente',
        {cssClass: 'alert-success', timeout: 4000});
        this.databaseService.insertUserDatabase(this.authService.afAuth.auth.currentUser.uid,
          this.email, displayName, this.edad);
        this.router.navigate(['/privado']);
      }).catch((err)=>{
        this.flashMensaje.show(err.message,
        {cssClass: 'alert-danger', timeout: 4000});
        this.router.navigate(['/register']);
      });
    }
  }

  //Se debe implementar el método para que datos sean coherentes
  verificarFormulario(){
    return true;
  }

}
