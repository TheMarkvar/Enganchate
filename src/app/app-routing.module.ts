import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomepageComponent} from './componentes/homepage/homepage.component';
import {LoginpageComponent} from './componentes/loginpage/loginpage.component';
import {RegisterpageComponent} from './componentes/registerpage/registerpage.component';
import {PrivadopageComponent} from './componentes/privadopage/privadopage.component';
import {EditarperfilpageComponent} from './componentes/editarperfilpage/editarperfilpage.component';
import {PublishservicepageComponent} from './componentes/publishservicepage/publishservicepage.component';
import {AdvancedsearchpageComponent} from './componentes/advancedsearchpage/advancedsearchpage.component';
import {ServicepageComponent} from './componentes/servicepage/servicepage.component';
import { PublishedservicesuserpageComponent } from './componentes/publishedservicesuserpage/publishedservicesuserpage.component';
import { ChatpageComponent } from './componentes/chatpage/chatpage.component';
import { PaymentspageComponent } from './componentes/paymentspage/paymentspage.component';
import { PurchasedservicespageComponent } from './componentes/purchasedservicespage/purchasedservicespage.component';
import { UserprofilepageComponent } from './componentes/userprofilepage/userprofilepage.component';


import {NotfoundpageComponent} from './componentes/notfoundpage/notfoundpage.component';

import {AuthGuard} from './guards/auth.guard';
import {LoginGuard} from './guards/login.guard';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'home', component: HomepageComponent},
  {path: 'login', component: LoginpageComponent, canActivate: [LoginGuard]},
  {path: 'register', component: RegisterpageComponent, canActivate: [LoginGuard]},
  {path: 'editProfile', component: EditarperfilpageComponent, canActivate: [AuthGuard]},
  {path: 'publishService', component: PublishservicepageComponent, canActivate: [AuthGuard]},
  {path: 'advancedSearch', component: AdvancedsearchpageComponent, runGuardsAndResolvers: 'always'},
  {path: 'advancedSearch/:id', component: AdvancedsearchpageComponent, runGuardsAndResolvers: 'always'},
  {path: 'service', component: ServicepageComponent, runGuardsAndResolvers: 'always'},
  {path: 'service/:id', component: ServicepageComponent, runGuardsAndResolvers: 'always'},
  {path: 'userProfile', component: UserprofilepageComponent, canActivate: [AuthGuard]},
  {path: 'userProfile/:id', component: UserprofilepageComponent, canActivate: [AuthGuard]},
  {path: 'chat', component: ChatpageComponent, canActivate: [AuthGuard]},
  {path: 'payment', component: PaymentspageComponent, canActivate: [AuthGuard]},
  {path: 'purchasedServices', component: PurchasedservicespageComponent, canActivate: [AuthGuard]},
  {path: 'publishedServices', component: PublishedservicesuserpageComponent, canActivate: [AuthGuard]},
  {path: 'privado', component: PrivadopageComponent , canActivate: [AuthGuard]},
  {path: '**', component: NotfoundpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
