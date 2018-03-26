import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomepageComponent } from './componentes/homepage/homepage.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { RegisterpageComponent } from './componentes/registerpage/registerpage.component';
import { LoginpageComponent } from './componentes/loginpage/loginpage.component';
import { PrivadopageComponent } from './componentes/privadopage/privadopage.component';
import { NotfoundpageComponent } from './componentes/notfoundpage/notfoundpage.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    RegisterpageComponent,
    LoginpageComponent,
    PrivadopageComponent,
    NotfoundpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
