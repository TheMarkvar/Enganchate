import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, NgForm } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

//Firebase
import {FlashMessagesModule} from 'angular2-flash-messages';
import {FlashMessagesService} from 'angular2-flash-messages';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';

//Environment
import { environment } from '../environments/environment';

//Servicios
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { AuthService } from './servicios/auth.service';
import { DatabaseService } from './servicios/database.service';
import { UploadService } from './servicios/upload.service';
import { OptionsService } from './servicios/options.service';
import { DatabaseServicioService } from './servicios/database-servicio.service';


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
    NgMultiSelectDropDownModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    FlashMessagesModule
  ],
  providers: [AuthService,DatabaseService,DatabaseServicioService,UploadService,
              OptionsService,AuthGuard,LoginGuard,FlashMessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
