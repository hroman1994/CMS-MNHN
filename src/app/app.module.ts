//Servicios
import { WebService } from './services/web-service';
import { StorageService } from './services/storage.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { DataService } from './services/menu';

//Componentes
import { AdmGruposComponent } from './adm-grupos/adm-grupos.component';
import { AdmHelechosComponent } from './adm-helechos/adm-helechos.component';
import { AdmUserComponent } from './adm-user/adm-user.component';
import { CambioPassComponent } from './cambio-pass/cambio-pass.component';
import { HelechosComponent } from './helechos/helechos.component';
import { LoginComponent } from './login/login.component';
import { MigracionComponent } from './migracion/migracion.component';
import { RegistroComponent } from './registro/registro.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Modulos
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPopper } from 'angular-popper';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditInfoComponent } from './edit-info/edit-info.component';
import { RecuperarPassComponent } from './recuperar-pass/recuperar-pass.component';
import { RecuperacionComponent } from './recuperacion/recuperacion.component';




@NgModule({
  declarations: [
    AppComponent,
    AdmGruposComponent,
    AdmHelechosComponent,
    AdmUserComponent,
    CambioPassComponent,
    HelechosComponent,
    LoginComponent,
    MigracionComponent,
    RegistroComponent,
    HeaderComponent,
    FooterComponent,
    EditInfoComponent,
    RecuperarPassComponent,
    RecuperacionComponent,
    
  ],
  imports: [
    BrowserModule,
    NgSelectModule,
    AppRoutingModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    NgxPopper,
    NgxPaginationModule,
    NgxImageZoomModule,
    LeafletModule,
    FontAwesomeModule,    
  ],
  providers: [WebService,StorageService,DataService
    ,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthInterceptor
    ],
  bootstrap: [AppComponent],

})
export class AppModule { }