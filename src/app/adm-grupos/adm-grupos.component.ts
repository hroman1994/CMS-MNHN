import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { WebService } from '../services/web-service';

@Component({
  selector: 'app-adm-grupos',
  templateUrl: './adm-grupos.component.html',
  styleUrls: ['./adm-grupos.component.scss']
})
export class AdmGruposComponent implements OnInit {

  constructor(private ws: WebService, private router: Router, private ss: StorageService) {
    this.VerificarSesion();
    this.ObtenerGrupos()
   }

  ngOnInit(): void {
  }

  VerificarSesion(){
    this.ws.VerificarSesion().subscribe(data=>{
      let datos = JSON.parse(data)
      if(datos.CodigoRespuesta == "S"){
        if(datos.Datos.length  == 0 || datos.Datos[0].TipoUser != 0 ){
          this.router.navigate(["/helechos"])
        }
        
      }
      else{
        this.router.navigate(["/helechos"])
        this.AbrirModalAlert("Error, Intentar mas tarde.")
      } 
      
    }, error =>{
      this.AbrirModalAlert("Error, Intentar mas tarde.")
    })

  }


  alerta:any;
  editar:boolean = false;
  crear:boolean = false;
  grupos:any = [];
  grupo_actual:any = -1;
  nombre_grupo:any;


  

  menuEditar(){
    this.editar = true;
    this.crear = false;
    this.grupo_actual = -1
    this.nombre_grupo = ""
    this.ObtenerGrupos();
  }

  menuCrear(){
    this.editar = false;
    this.crear = true;
    this.grupo_actual = -1
    this.nombre_grupo = ""
  }

  ObtenerGrupos(){
    this.grupos = []
    this.ws.ObtenerGrupos().subscribe(data=>{
      let datos = JSON.parse(data)
      if(datos.CodigoRespuesta == "S"){
        console.log(datos.Datos)
        datos.Datos.forEach((element: any) => {
          this.grupos.push(element)
        });
      }
      else{
        this.AbrirModalAlert("Error, Intentar mas tarde.")
      } 
      
    }, error =>{
      this.AbrirModalAlert("Error, Intentar mas tarde.")
    })
  }


  TraerDatosGrupo(){
    if(this.grupo_actual!=-1){
      let body = {
        id_grupo: this.grupo_actual
      }
      this.ws.TraerDatosGrupo(body).subscribe(data=>{
        let datos = JSON.parse(data)
        if(datos.CodigoRespuesta == "S"){
          this.nombre_grupo = datos.Datos[0].GRUPO_NOMBRE
          
        }
        else{
          this.AbrirModalAlert("Error, Intentar mas tarde.")
        } 
        
      }, error =>{
        this.AbrirModalAlert("Error, Intentar mas tarde.")
      })
    }
    else{
      
    }
  }

  EditarNombreGrupo(){
    let id_grupox = this.grupo_actual
    if(!this.nombre_grupo){
      this.AbrirModalAlert("Debe ingresar un nombre de grupo")
    }
    else if(this.nombre_grupo.trim() == ''){
      this.AbrirModalAlert("Debe ingresar un nombre de grupo")
    }
    else{
      let body = {
        ID_GRUPO: this.grupo_actual,
        NOM_GRUPO: this.nombre_grupo
        }
      this.ws.EditarNombreGrupo(body).subscribe(data=>{
        let datos = JSON.parse(data)
        if(datos.CodigoRespuesta == "S"){
          if (datos.Datos[0].Mensaje == "S"){
            this.AbrirModalAlert("Datos editados con exito")
            this.ObtenerGrupos()
            this.grupo_actual = id_grupox
          }
          else if(datos.Datos[0].Mensaje == "E"){
            this.AbrirModalAlert("El nombre ingresado ya existe")
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

  CrearGrupo(){
    if(!this.nombre_grupo){
      this.AbrirModalAlert("Debe ingresar un nombre de grupo")
    }
    else if(this.nombre_grupo.trim() == ''){
      this.AbrirModalAlert("Debe ingresar un nombre de grupo")
    }
    else{
      let body = {
        NOM_GRUPO: this.nombre_grupo
        }
      this.ws.CrearGrupo(body).subscribe(data=>{
        let datos = JSON.parse(data)
        if(datos.CodigoRespuesta == "S"){
          if (datos.Datos[0].Mensaje == "S"){
            this.nombre_grupo = ""
            this.AbrirModalAlert("Grupo creado con exito")
          }
          else if(datos.Datos[0].Mensaje == "E"){
            this.AbrirModalAlert("El nombre ingresado ya existe")
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
    document.getElementById("ModalAlert")!.style.display = 'none'
  }

  AbrirModalAlert(msg:any){
    this.alerta = msg
    document.getElementById("ModalAlert")!.style.display = 'block'
  }
  

}
