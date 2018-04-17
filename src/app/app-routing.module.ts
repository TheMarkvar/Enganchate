import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomepageComponent} from './componentes/homepage/homepage.component';
import {LoginpageComponent} from './componentes/loginpage/loginpage.component';
import {RegisterpageComponent} from './componentes/registerpage/registerpage.component';
import {PrivadopageComponent} from './componentes/privadopage/privadopage.component';
import {EditarperfilpageComponent} from './componentes/editarperfilpage/editarperfilpage.component';
import {PublishservicepageComponent} from './componentes/publishservicepage/publishservicepage.component';
import {AdvancedsearchpageComponent} from './componentes/advancedsearchpage/advancedsearchpage.component';
import {NotfoundpageComponent} from './componentes/notfoundpage/notfoundpage.component';

import {AuthGuard} from './guards/auth.guard';
const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'home', component: HomepageComponent},
  {path: 'login', component: LoginpageComponent},
  {path: 'register', component: RegisterpageComponent},
  {path: 'editProfile', component: EditarperfilpageComponent, canActivate: [AuthGuard]},
  {path: 'publishService', component: PublishservicepageComponent, canActivate: [AuthGuard]},
  {path: 'advancedSearch', component: AdvancedsearchpageComponent},
  {path: 'privado', component: PrivadopageComponent , canActivate: [AuthGuard]},
  {path: '**', component: NotfoundpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
