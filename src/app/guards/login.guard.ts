import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import {AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from '../servicios/auth.service';


@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      var isLogin=true;
      this.authService.getAuth().subscribe(auth=>{
        if(auth){
          this.router.navigate(['/home']);
          isLogin = false;
        }
      });
      return isLogin;
  }

}
