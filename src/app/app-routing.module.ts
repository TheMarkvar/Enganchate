import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from './componentes/homepage/homepage.component';
import {LoginpageComponent} from './componentes/loginpage/loginpage.component';
import {RegisterpageComponent} from './componentes/registerpage/registerpage.component';
import {PrivadopageComponent} from './componentes/privadopage/privadopage.component';
import {NotfoundpageComponent} from './componentes/notfoundpage/notfoundpage.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login', component: LoginpageComponent},
  {path: 'register', component: RegisterpageComponent},
  {path: 'privado', component: PrivadopageComponent},
  {path: '**', component: NotfoundpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
