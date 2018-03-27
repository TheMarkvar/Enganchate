import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './componentes/homepage/homepage.component';
import {LoginPageComponent} from './componentes/loginpage/loginpage.component';
import {RegisterPageComponent} from './componentes/registerpage/registerpage.component';
import {PrivadoPageComponent} from './componentes/privadopage/privadopage.component';
import {NotFoundPageComponent} from './componentes/notfoundpage/notfoundpage.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'privado', component: PrivadoPageComponent},
  {path: '**', component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
