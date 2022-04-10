import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AdmGruposComponent } from './adm-grupos/adm-grupos.component';
import { AdmHelechosComponent } from './adm-helechos/adm-helechos.component';
import { AdmUserComponent } from './adm-user/adm-user.component';
import { CambioPassComponent } from './cambio-pass/cambio-pass.component';
import { EditInfoComponent } from './edit-info/edit-info.component';
import { HelechosComponent } from './helechos/helechos.component';
import { LoginComponent } from './login/login.component';
import { MigracionComponent } from './migracion/migracion.component';
import { RecuperacionComponent } from './recuperacion/recuperacion.component';
import { RecuperarPassComponent } from './recuperar-pass/recuperar-pass.component';
import { RegistroComponent } from './registro/registro.component';


const routes: Routes = [
  {
    path: '',
    component: HelechosComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'migracion',
    component: MigracionComponent
  },
  {
    path: 'cambio-pass',
    component: CambioPassComponent
  },
  {
    path: 'adm-user',
    component: AdmUserComponent
  },
  {
    path: 'adm-grupos',
    component: AdmGruposComponent
  }
  ,
  {
    path: 'helechos',
    component: HelechosComponent
  },
  {
    path: 'adm-helechos',
    component: AdmHelechosComponent
  },
  {
    path: 'editar-info',
    component: EditInfoComponent
  },
  {
    path: 'recuperar-pass',
    component: RecuperarPassComponent
  },
  {
    path: 'recuperacion/:token/:email',
    component: RecuperacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
