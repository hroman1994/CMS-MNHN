import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/menu';
import { StorageService } from '../services/storage.service';
import { WebService } from '../services/web-service';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.scss']
})
export class EditInfoComponent implements OnInit {

  constructor(private ws: WebService, private router: Router, private ss: StorageService, private dt: DataService) { 
    this.TraerDatosUserActu()
  }

  ngOnInit(): void {
  }

  alerta:any;
  nombre_actual:any;
  usuario_actual:any;
  email_actual:any;

  TraerDatosUserActu(){
    this.ws.TraerDatosUserActu().subscribe(data =>{
      let datos = JSON.parse(data)
      if (datos.CodigoRespuesta == "S"){
        this.nombre_actual = datos.Datos[0].USER_NOMBRE
        this.usuario_actual = datos.Datos[0].USER_USUARIO
        this.email_actual = datos.Datos[0].USER_EMAIL
      }
      else{
        this.AbrirModalAlert("Error, intentar mas tarde.")
      }
    }, error=>{
      this.AbrirModalAlert("Error, intentar mas tarde.")
    })
    
  }

  GuardarCambiosInfo(){
    let body = {
      nombre: this.nombre_actual,
      email: this.email_actual,
      usuario: this.usuario_actual
    }
    this.ws.GuardarCambiosInfo(body).subscribe(data =>{
      let datos = JSON.parse(data)
      if (datos.CodigoRespuesta == "S"){
        if (datos.Datos[0].Mensaje == "S"){
          this.AbrirModalAlert2("Datos guardados con exito, debe volver a iniciar sesion.")
          this.ss.removeCurrentSession();
        }
        else{
          this.AbrirModalAlert(datos.Datos[0].Mensaje)
        }
        
      }
      else{
        this.AbrirModalAlert("Error, intentar mas tarde.")
      }
    }, error=>{
      this.AbrirModalAlert("Error, intentar mas tarde.")
    })

  }


  CerrarModalAlert(){
    document.getElementById("ModalAlert")!.style.display = "none"
  }

  AbrirModalAlert(msg: any){
    this.alerta = msg
    document.getElementById("ModalAlert")!.style.display = "block"
  }

  AbrirModalAlert2(msg: any){
    this.alerta = msg
    document.getElementById("ModalAlert2")!.style.display = "block"
  }
  CerrarModalAlert2(){
    document.getElementById("ModalAlert2")!.style.display = "none"
    this.ss.logout();
    this.dt.ngOnInit();
  }

}
