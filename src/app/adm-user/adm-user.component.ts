import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { WebService } from '../services/web-service';

@Component({
  selector: 'app-adm-user',
  templateUrl: './adm-user.component.html',
  styleUrls: ['./adm-user.component.scss']
})
export class AdmUserComponent implements OnInit {

  constructor(private ws: WebService, private router: Router, private ss: StorageService) { 
    this.VerificarSesion()
    this.ObtenerUsuarios()
  }

  ngOnInit(): void {}

  //variables Editar
  opt1_usuarios:any = [];
  opt1_user_actual:any = -1;
  opt1_nombre_actual:any;
  opt1_usuario_actual:any;
  opt1_email_actual:any;
  opt1_tipo_user:any = -1;
  opt1_user_act:any;

  //variables Crar
  opt2_user_actual:any;
  opt2_user_nombre:any;
  opt2_usuario_actual:any;
  opt2_email_actual:any;
  opt2_tipo_user:any = -1;
  opt2_pass_actual: any;
  opt2_pass_confirmar: any;
  

  //variable Eliminar
  opt3_user_actual:any =-1;
  usuarios_activos:any=[];

  //variables Restituir
  opt4_user_actual:any = -1;
  usuarios_inactivos:any=[];

  //variables globales
  alerta:any;
  editar:boolean = false;
  crear:boolean = false;
  eliminar:boolean = false;
  restituir:boolean = false;



  validar_email: boolean = false;
  validar_usuario: boolean = false;
  validar_pass: boolean = false;
  validar_pass2: boolean = false;
  validar_datos: boolean =false;

  limpiarDatosOpt1(){
    this.opt1_usuarios = ""
    this.opt1_user_actual = ""
    this.opt1_nombre_actual = ""
    this.opt1_usuario_actual = ""
    this.opt1_email_actual = ""
    this.opt1_tipo_user = ""
    this.opt1_user_act = ""
  }

  limpiarDatosOpt2(){
    this.opt2_user_actual = ""
    this.opt2_user_nombre = ""
    this.opt2_usuario_actual = ""
    this.opt2_email_actual = ""
    this.opt2_tipo_user = ""
    this.opt2_pass_actual = ""
    this.opt2_pass_confirmar = ""
  }

  menuEditar(){
    this.editar = true;
    this.crear = false;
    this.eliminar = false;
    this.restituir = false;
  }

  menuCrear(){
    this.editar = false;
    this.crear = true;
    this.eliminar = false;
    this.restituir = false;
  }

  menuEliminar(){
    this.TraerUsuariosHabilitados()
    this.editar = false;
    this.crear = false;
    this.eliminar = true;
    this.restituir = false;
    
  }

  menuRestituir(){
    this.TraerUsuariosDesHabilitados()
    this.editar = false;
    this.crear = false;
    this.eliminar = false;
    this.restituir = true;
  }

  ObtenerUsuarios(){
    this.ws.ObtenerUsuarios().subscribe(data=>{
      let datos = JSON.parse(data)
      if(datos.CodigoRespuesta == "S"){
        datos.Datos.forEach((element: any) => {
          this.opt1_usuarios.push(element)
        });
      }
      else{
        this.AbrirModalAlert("Error, Intentar mas tarde.")
      } 
      
    }, error =>{
      this.AbrirModalAlert("Error, Intentar mas tarde.")
    })
  }

  TraerDatosUser(){
    if(this.opt1_user_actual!=-1){
      let body = {
        id_user: this.opt1_user_actual
      }
      this.ws.TraerDatosUser(body).subscribe(data=>{
        let datos = JSON.parse(data)
        if(datos.CodigoRespuesta == "S"){
          this.opt1_nombre_actual = datos.Datos[0].USER_NOMBRE
          this.opt1_usuario_actual = datos.Datos[0].USER_USUARIO
          this.opt1_email_actual = datos.Datos[0].USER_EMAIL
          this.opt1_tipo_user =  datos.Datos[0].USER_TIPO
          this.opt1_user_act = true
        }
        else{
          this.AbrirModalAlert("Error, Intentar mas tarde.")
        } 
        
      }, error =>{
        this.AbrirModalAlert("Error, Intentar mas tarde.")
      })
    }
    else{
      this.opt1_user_act = false
    }
  }


  
  EditarUsuarioAdm(){
    let body = {
      ID_USER : this.opt1_user_actual,
      NOMBRE: this.opt1_nombre_actual,
      EMAIL: this.opt1_email_actual,
      USUARIO: this.opt1_usuario_actual,
      TIPO: this.opt1_tipo_user
    }
    this.ws.EditarUsuarioAdm(body).subscribe(data =>{
      let datos = JSON.parse(data)
      if (datos.CodigoRespuesta == "S"){
        if(datos.Datos[0].Mensaje == "S"){
          this.AbrirModalAlert("Datos cambiados con éxito")
          this.TraerDatosUser()
         
        }
        else if(datos.Datos[0].Mensaje == "U"){
          this.AbrirModalAlert("El usuario ingresado ya existe")
        }
        else if(datos.Datos[0].Mensaje == "E"){
          this.AbrirModalAlert("El correo ingresado ya existe")
        }
      }
      else{
        this.AbrirModalAlert("Error, Intentar mas tarde.")
      }
    }, error=>{
      this.AbrirModalAlert("Error, Intentar mas tarde.")
    })
  }

  CrearUsuarioAdm(){
    let body = {
      NOMBRE: this.opt2_user_nombre,
      EMAIL: this.opt2_email_actual,
      USUARIO: this.opt2_user_actual,
      TIPO: this.opt2_tipo_user,
      PASS: this.opt2_pass_actual
    }
    this.ws.CrearUsuarioAdm(body).subscribe(data =>{
      let datos = JSON.parse(data)
      if (datos.CodigoRespuesta == "S"){
        if(datos.Datos[0].Mensaje == "S"){
          this.AbrirModalAlert("Usuario registrado con exito.")
          this.limpiarDatosOpt2()
        }
        else if(datos.Datos[0].Mensaje == "U"){
          this.AbrirModalAlert("El usuario ingresado ya existe")
        }
        else if(datos.Datos[0].Mensaje == "E"){
          this.AbrirModalAlert("El correo ingresado ya existe")
        }
      }
      else{
        this.AbrirModalAlert("Error, Intentar mas tarde.")
      }
    }, error=>{
      this.AbrirModalAlert("Error, Intentar mas tarde.")
    })

  }

  EliminarUsuario(){
    if(!this.opt3_user_actual){
      this.AbrirModalAlert("Debe seleccionar un usuario")
    }
    else{
      let body = {
        id_user:this.opt3_user_actual
      }
      this.ws.EliminarUsuario(body).subscribe(data=>{
        let datos = JSON.parse(data)
        if(datos.CodigoRespuesta == "S"){
          this.AbrirModalAlert("Usuario eliminado con exito.")
          this.TraerUsuariosHabilitados()
          this.opt3_user_actual = -1
        }
        else{
          this.AbrirModalAlert("Error, Intentar mas tarde.")
        } 
        
      }, error =>{
        this.AbrirModalAlert("Error, Intentar mas tarde.")
      })
    }
  }

  RestituirUsuario(){
    if(!this.opt4_user_actual){
      this.AbrirModalAlert("Debe seleccionar un usuario")
    }
    else{
      let body = {
        id_user:this.opt4_user_actual
      }
      console.log(body)
      this.ws.RestituirUsuario(body).subscribe(data=>{
        let datos = JSON.parse(data)
        if(datos.CodigoRespuesta == "S"){
          this.AbrirModalAlert("Usuario Restituido con exito.")
          this.TraerUsuariosHabilitados()
          this.TraerUsuariosDesHabilitados()
          this.opt4_user_actual = -1
        }
        else{
          this.AbrirModalAlert("Error, Intentar mas tarde.")
        } 
        
      }, error =>{
        this.AbrirModalAlert("Error, Intentar mas tarde.")
      })

    }
    

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

  TraerUsuariosHabilitados(){
    this.usuarios_activos = []
    this.ws.TraerUsuariosHabilitados().subscribe(data=>{
      let datos = JSON.parse(data)
      if(datos.CodigoRespuesta == "S"){
        datos.Datos.forEach((element: any) => {
          this.usuarios_activos.push(element)
          
        });
      }
      else{
        this.AbrirModalAlert("Error, Intentar mas tarde.")
      } 
      
    }, error =>{
      this.AbrirModalAlert("Error, Intentar mas tarde.")
    })

  }

  TraerUsuariosDesHabilitados(){
    this.usuarios_inactivos = []
    this.ws.TraerUsuariosDesHabilitados().subscribe(data=>{
      let datos = JSON.parse(data)
      if(datos.CodigoRespuesta == "S"){
        datos.Datos.forEach((element: any) => {
          this.usuarios_inactivos.push(element)
          
        });
      }
      else{
        this.AbrirModalAlert("Error, Intentar mas tarde.")
      } 
      
    }, error =>{
      this.AbrirModalAlert("Error, Intentar mas tarde.")
    })

  }

  CerrarModalAlert(){
    document.getElementById("ModalAlert")!.style.display = 'none'
  }

  AbrirModalAlert(msg:any){
    this.alerta = msg
    document.getElementById("ModalAlert")!.style.display = 'block'
  }

}
