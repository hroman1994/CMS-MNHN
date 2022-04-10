import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebService } from '../services/web-service';

@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.component.html',
  styleUrls: ['./recuperacion.component.scss']
})
export class RecuperacionComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private ws: WebService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (typeof params['email'] !== 'undefined') {
          this.email = params['email'];
      } else {
          this.email = '';
      }
      if (typeof params['token'] !== 'undefined') {
          this.token_pass = params['token'];
      } else {
          this.token_pass = '';
      }
      
  });
  this.verificarURL()
  }


  email:any;
  token_pass:any;
  password_1:any = "";
  password_2:any = "";
  alerta:any;
  mensaje_d:boolean = false;
  mensaje:any;
  mensaje_2:any;

  UpdatePass(){
    try{
      this.password_1 = this.password_1.trim()
      this.password_2 = this.password_2.trim()
    }
    catch{
      this.password_1 = ""
      this.password_2 = ""
    }
    if(this.password_1.length <8 || this.password_1.length >16){
      document.getElementById("mensaje")!.style.display = "block"
      document.getElementById("mensaje")!.innerHTML = "La contraseña debe tener entre 8 y 16 digitos"
    }
    else if (this.password_1 != this.password_2){
      document.getElementById("mensaje")!.style.display = "block"
      document.getElementById("mensaje")!.innerHTML = "Las contraseñas no coinciden."
    }
    else{
      let body = {
        pass: this.password_1,
        email: this.email,
        token: this.token_pass
      }
      this.ws.UpdatePass(body).subscribe(data =>{
        let datos = JSON.parse(data)
        if(datos.CodigoRespuesta == "S"){
          if(datos.Datos[0].Mensaje == "S"){
            this.AbrirModal("Contraseña cambiada con éxito.", "ModalMensaje")
            //navigate login
          }
          else{
            this.AbrirModalAlert("Error, Intentar mas tarde.")
          }
        }
        else{
          this.AbrirModalAlert("Error, Intentar mas tarde.")
        } 
        
      }, error =>{
        this.AbrirModalAlert("Error, Intentar mas tarde.")
  
      })
    }
  }

  verificarURL(){
    let body = {
      email:this.email
    }
    this.ws.verificarURL(body).subscribe(data =>{
      let datos = JSON.parse(data)
      if(datos.CodigoRespuesta == "S"){
        if(datos.Datos[0].Mensaje == "E"){
          this.AbrirModal("El link para reestablecer la contraseña ha expirado.", "ModalMensaje")
        }

      }
      else{
        this.AbrirModalAlert("Error, Intentar mas tarde.")
      } 
      
    }, error =>{
      this.AbrirModalAlert("Error, Intentar mas tarde.")

    })

  }

  AbrirModalAlert(msg:any){
    this.alerta = msg
    document.getElementById("ModalAlert")!.style.display = 'block'
  }


  CerrarModalAlert(){
    document.getElementById("ModalAlert")!.style.display = 'none'
  }

  AbrirModal(msg:any, modal:any){
    this.mensaje_2 = msg
    document.getElementById(modal)!.style.display = 'block'
  }

  CerrarModalMensaje(){
    this.router.navigate(["/login"])
  }

}
