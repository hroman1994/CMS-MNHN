import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from '../services/web-service';

@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.component.html',
  styleUrls: ['./recuperar-pass.component.scss']
})
export class RecuperarPassComponent implements OnInit {

  constructor(private ws: WebService, private router: Router) { }

  ngOnInit(): void {
  }

  correo:any;
  alerta:any;
  regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  
  RecuperarPass(){
    let test = this.regexp.test(this.correo);
    if(!test){
      this.AbrirModalAlert("Debe ingresar un correo válido.")
    }
    else{
      let body = {
        email: this.correo
      }
      this.ws.RecuperarPass(body).subscribe(data =>{
        let datos = JSON.parse(data)
        if(datos.CodigoRespuesta == "S"){
          this.AbrirModalAlert("Se ha enviado un correo a la dirección indicada para reestablecer la contraseña.")
          
        }
        else{
          this.AbrirModalAlert("Error, Intentar mas tarde.")
        } 
        
      }, error =>{
        this.AbrirModalAlert("Error, Intentar mas tarde.")
  
      })
    }


  }



  AbrirModalAlert(msg:any){
    this.alerta = msg
    document.getElementById("ModalAlert")!.style.display = 'block'
  }


  CerrarModalAlert(){
    document.getElementById("ModalAlert")!.style.display = 'none'
  }

}
