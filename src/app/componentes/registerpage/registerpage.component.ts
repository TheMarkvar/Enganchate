import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.scss']
})
export class RegisterpageComponent implements OnInit {

  public email:string;
  public password:string;

  constructor(
    public authService: AuthService,
    public router:Router
  ) { }

  ngOnInit() {
  }

  onSubmitRegisterUser(){
    this.authService.registerUser(this.email,this.password)
    .then((res)=>{
      this.router.navigate(['/privado']);
    }).catch((err)=>{
      console.log(err);
    });
  }

}
