import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from '../services/web-service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  constructor(private ws: WebService, private router: Router ) { }

  ngOnInit(): void {
  }

  email_actual: any;
  user_actual: any;
  pass_actual: any;
  pass_confirmar: any;
  user_nombre:any;

  validar_email: boolean = false;
  validar_usuario: boolean = false;
  validar_pass: boolean = false;
  validar_pass2: boolean = false;
  validar_datos: boolean =false;
  alerta:any;


  ComprobarRegistro(){
    this.validar_email = false
    this.validar_usuario = false
    this.validar_pass = false
    this.validar_pass2 = false
    this.validar_datos = false

    if (!this.email_actual || !this.user_actual || !this.pass_actual || !this.pass_confirmar){
      this.validar_datos = true;
    }
    else if(this.user_actual.trim == ""){
      this.validar_usuario = true;
    }
    else if (this.pass_actual.length >16 || this.pass_actual.length < 8){
      this.validar_pass = true
    }
    else if(this.pass_actual != this.pass_confirmar){
      this.validar_pass2 = true;
    }
    else{
      let body = {
        USER: this.user_actual,
        EMAIL: this.email_actual
      }
      this.ws.ValidarUsuario(body).subscribe(data =>{
        let datos = JSON.parse(data)
        if(datos.CodigoRespuesta = "S"){
          if(datos.Datos[0].USUARIO == "S" && datos.Datos[0].CORREO == "S"){
            let body = {
              NOMBRE: this.user_nombre,
              USER: this.user_actual,
              PASS: this.pass_actual,
              EMAIL: this.email_actual
            }
            this.ws.CrearUsuario(body).subscribe(data =>{
              let datos2 = JSON.parse(data)
              if (datos2.CodigoRespuesta == "S"){
                this.AbrirModalAlert("Registro exitoso")
              
              }
              else{
                this.AbrirModalAlert("Error, Intentar mas tarde.")
              }
            })
          }
          else if(datos.Datos[0].CORREO == "N"){
            this.validar_email = true
          }
          else if(datos.Datos[0].USUARIO == "N"){
            this.validar_usuario = true
          }
        }
        else{
          this.AbrirModalAlert("Error, Intentar mas tarde.")
        }
      })
    }

  }


  CerrarModalAlert(){
    document.getElementById("ModalAlert")!.style.display = "none"
    this.router.navigate(["/login"])
  }

  AbrirModalAlert(msg: any){
    this.alerta = msg
    document.getElementById("ModalAlert")!.style.display = "block"
  }
}
