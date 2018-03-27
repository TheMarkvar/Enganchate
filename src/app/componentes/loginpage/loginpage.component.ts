import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {
  public email:string;
  public password:string;

  constructor(
    public authService: AuthService,
    public router:Router
  ) { }

  ngOnInit() {
  }

  onSubmitLogin(){
    this.authService.loginEmail(this.email,this.password)
    .then((res)=>{
      this.router.navigate(['/privado']);
    }).catch((err)=>{
      console.log(err);
      this.router.navigate(['/login']);
    });
  }

}
