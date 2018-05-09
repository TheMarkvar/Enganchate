import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { DatabaseService } from '../../servicios/database.service';
import { UploadService } from '../../servicios/upload.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Usuario } from '../../modelos/usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isLogin:boolean;
  public tieneFotoExterna:boolean;
  public tieneImagen:boolean;
  public username:string;
  public iniciales:string;
  public email:string;
  public fotoUsuario:string;
  public buscar:string;


  constructor(
    public authService: AuthService,
    public databaseService: DatabaseService,
    public router:Router,
    public flashMensaje: FlashMessagesService,
    private uploadService:UploadService,
  ) { }

  ngOnInit() {
    this.buscar="";

    this.authService.getAuth().subscribe(auth=>{
      if(auth){
        this.isLogin = true;
        //this.username = auth.displayName;
        var user = this.databaseService.getUsuario(auth.uid).then(
          function(snapshot) {
           var res = (snapshot.val() && snapshot.val().displayName);
           //console.log(x);
           return res;
        });
        user.then((msg: string) => {
          this.username = msg;
          if(this.username!=null){
            let aux = this.username.split(" ");
            this.iniciales = aux[0].toUpperCase().charAt(0) + aux[1].toUpperCase().charAt(0);
          }
        });

        var userTI = this.databaseService.getUsuario(auth.uid).then(
          function(snapshot) {
           var res = (snapshot.val() && snapshot.val().tieneImagen);
           return res;
        });
        userTI.then((msg: boolean) => {
          this.tieneImagen = msg;

          if(this.tieneImagen){
            this.uploadService.downloadFile('usuarios/'+auth.uid).subscribe(URL=>{
              this.fotoUsuario = URL;
            });
          }
          else if(auth.photoURL != null){
              this.fotoUsuario = auth.photoURL;
              this.tieneFotoExterna = true;
          }else{
              this.tieneFotoExterna = false;
          }

        });

        this.email = auth.email;



      }else{
        this.isLogin = false;
        this.tieneFotoExterna = false;
      }
    })
  }

  onClickSearch(){

    if(this.buscar.length>0){
      this.router.navigate(['/advancedSearch'], { queryParams: { search: this.buscar } });
      this.buscar = "";
    }
    else{
      this.flashMensaje.show('Ingrese un valor válido en la barra de búsqueda',
      {cssClass: 'alert-danger', timeout: 4000});
    }
  }

  onClickLogout(){
    this.authService.logout();
  }

}
