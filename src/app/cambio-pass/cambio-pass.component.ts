import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { WebService } from '../services/web-service';

@Component({
  selector: 'app-cambio-pass',
  templateUrl: './cambio-pass.component.html',
  styleUrls: ['./cambio-pass.component.scss']
})
export class CambioPassComponent implements OnInit {

  constructor(private ws: WebService, private router: Router,private ss: StorageService) { }

  ngOnInit(): void {
  }

  pass_actual:any;
  pass_nueva:any;
  pass_nueva_conf:any;
  pass_incorrecta:boolean = false;
  pass_coinciden:boolean = false;
  pass_validar:boolean = false;
  alerta:any;



  ComprobarPass(){
    this.pass_coinciden = false
    this.pass_validar = false
    this.pass_incorrecta = false
    if (this.pass_nueva.length >16 || this.pass_nueva.length < 8){
      this.pass_validar = true
    }
    else if(this.pass_nueva != this.pass_nueva_conf){
      this.pass_coinciden = true
    }
    else{
      let body = {
        pass_actual: this.pass_actual
      }
      this.ws.ComprobarPass(body).subscribe(data=>{
        let datos = JSON.parse(data)
        if (datos.CodigoRespuesta == "S"){
          if (datos.Datos[0].Mensaje == "S"){
            let body = {
              pass_nueva: this.pass_nueva
            }
            this.ws.CambiarPass(body).subscribe(data=>{
              let datoss = JSON.parse(data)
              if(datoss.CodigoRespuesta = "S"){
                this.AbrirModalAlert("Contraseña cambiada con exito.")
                this.ss.removeCurrentSession()
                this.router.navigate(["/index"])
                this.router.navigate(["/login"])
              }
              else if(datos.Datos[0].Mensaje == "N"){
                this.pass_incorrecta = true;
              }
              
            }, error =>{
              this.AbrirModalAlert("Error, Intentar mas tarde.")
            })
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

  CerrarModalAlert(){
    document.getElementById("ModalAlerta")!.style.display = "none"
  }

  AbrirModalAlert(msg: any){
    this.alerta = msg
    document.getElementById("ModalAlerta")!.style.display = "block"
  }

}
