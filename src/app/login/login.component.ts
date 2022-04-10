import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebService } from '../services/web-service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { Session } from '../models/session.models';
import { DataService } from '../services/menu';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit , OnDestroy {

  constructor(private ws: WebService, private router: Router, private ss: StorageService, private dt: DataService) { }


  ngOnInit(): void {
  }

  ngOnDestroy(){
  
  }

  user_actual:any;
  pass_actual:any;
  pass_incorrecta:boolean = false;
  validar_usuario:boolean = false;
  validar_pass:boolean = false;
  validar_user:boolean = false;
  session!: Session;
  alerta:any;
  

  ComprobarUserPass(){
    this.pass_incorrecta = false;
    if (!this.user_actual && !this.pass_actual){
      this.validar_usuario = true
    }
    if(!this.pass_actual && this.user_actual){
      this.validar_pass = true
      this.validar_usuario = false
    }
    if(this.pass_actual && !this.user_actual){
      this.validar_usuario = true
      this.validar_pass = false
    }
    if(this.user_actual && this.pass_actual){
      this.validar_usuario = false
      this.validar_pass = false
      let body = {
        User: this.user_actual,
        Pass: this.pass_actual
      }
      this.ss.removeCurrentSession();
      this.ws.IniciarSesion(body).subscribe(data =>{
        let datos = JSON.parse(data)
        if (datos.CodigoRespuesta == "S"){
          console.log(datos.Datos)
          if(datos.Datos[0].Mensaje == "S"){
            this.session = {token: datos.Token , user: datos.Datos[0].ID_USER, user_nombre: datos.Datos[0].USER_USUARIO}
            this.ss.setCurrentSession(this.session);
            this.dt.VerificarSesion();
            this.router.navigate(["/helechos"])
          }
          else if (datos.Datos[0].Mensaje == "N"){
            this.pass_incorrecta = true;
          }
          else if(datos.Datos[0].Mensaje == "E"){
            this.validar_user = true;
          }
          else if (datos.Datos[0].Mensaje == "B"){
            this.AbrirModalAlert("El usuario ingresado se encuentra inactivo.")
          }
          
        }
        else{
          this.AbrirModalAlert("Error, intentar mas tarde.")
        }
      })
      

    }

  }

  CerrarModalAlert(){
    document.getElementById("ModalAlert")!.style.display = "none"
  }

  AbrirModalAlert(msg: any){
    this.alerta = msg
    document.getElementById("ModalAlert")!.style.display = "block"
  }

  Registro(){
    this.router.navigate(["/registro"])
  }

  nav_recpass(){
    this.router.navigate(['/recuperar-pass'])
  }
}
