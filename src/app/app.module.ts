import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

//Componentes
import { AppComponent } from './app.component';
import { HomepageComponent } from './componentes/homepage/homepage.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { RegisterpageComponent } from './componentes/registerpage/registerpage.component';
import { LoginpageComponent } from './componentes/loginpage/loginpage.component';
import { PrivadopageComponent } from './componentes/privadopage/privadopage.component';
import { NotfoundpageComponent } from './componentes/notfoundpage/notfoundpage.component';
import {EditarperfilpageComponent} from './componentes/editarperfilpage/editarperfilpage.component';
import { PublishservicepageComponent } from './componentes/publishservicepage/publishservicepage.component';


//Firebase
import {FlashMessagesModule} from 'angular2-flash-messages';
import {FlashMessagesService} from 'angular2-flash-messages';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

//Environment
import { environment } from '../environments/environment';

//Servicios
import { AuthService } from './servicios/auth.service';
import { DatabaseService } from './servicios/database.service';
import {AuthGuard} from './guards/auth.guard';
import { AdvancedsearchpageComponent } from './componentes/advancedsearchpage/advancedsearchpage.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    RegisterpageComponent,
    LoginpageComponent,
    PrivadopageComponent,
    NotfoundpageComponent,
    EditarperfilpageComponent,
    PublishservicepageComponent,
    AdvancedsearchpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FlashMessagesModule
  ],
  providers: [AuthService,DatabaseService,AuthGuard,FlashMessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
