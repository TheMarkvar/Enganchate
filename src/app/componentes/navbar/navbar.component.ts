import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { DatabaseService } from '../../servicios/database.service';
import { Router } from '@angular/router';
import { Usuario } from '../../modelos/usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isLogin:boolean;
  public tieneFotoExterna:boolean;
  public username:string;
  public email:string;
  public fotoUsuario:string;
  public buscar:string;


  constructor(
    public authService: AuthService,
    public databaseService: DatabaseService,
    public router:Router
  ) { }

  ngOnInit() {
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
        user.then((msg: string) => { this.username = msg; });

        this.email = auth.email;

        if(auth.photoURL != null){
            this.fotoUsuario = auth.photoURL;
            this.tieneFotoExterna = true;
        }else{
            this.tieneFotoExterna = false;
        }
        //console.log(auth);
      }else{
        this.isLogin = false;
        this.tieneFotoExterna = false;
      }
    })
  }

  onClickLogout(){
    this.authService.logout();
  }

}
