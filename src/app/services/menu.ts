import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { WebService } from './web-service';
import { StorageService } from './storage.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '../models/session.models';

@Injectable()

export class DataService implements OnInit {

  constructor(private ws: WebService, private ss: StorageService , private router: Router) {
    this.EvaluarToken()
    this.ngOnInit() 
  }
  
  session!: Session;
  alerta:any;
  public loged = new BehaviorSubject<boolean>(false);
  public usu_actual =  new BehaviorSubject<string>("");
  public menus:any = [];

  ngOnInit(){
    this.EvaluarToken()
  }

  EvaluarToken(){
    this.ws.EvaluarToken().subscribe(data =>{
      let datos = JSON.parse(data)
      if(datos.estadoToken == false){
        this.ss.removeCurrentSession()
        this.TokenSinUser()
        this.VerificarSesion()
      }
      else{
        this.VerificarSesion()
        this.TraerMenu()
      }
    },error=>{
      this.ss.removeCurrentSession()
      this.TokenSinUser()
      this.VerificarSesion()
    })

  }


  TokenSinUser(){
    this.ss.removeCurrentSession();
    this.ws.TokenSinUser().subscribe(data =>{
      let datos = JSON.parse(data)
      if (datos.CodigoRespuesta == "S"){
          let ssa = {
            token: datos.Token, 
            user: undefined, 
            user_nombre: undefined
          }
          this.ss.setCurrentSession(ssa);

          this.router.navigate(["/helechos"])
      }
      else{
          this.AbrirModalAlert("Error, intentar mas tarde.")
      }
    }, error=>{
      this.AbrirModalAlert("Error, intentar mas tarde.")
    })
  }

  TraerMenu(){
    this.ws.TraerMenus().subscribe(data =>{
      let datos = JSON.parse(data)
      if(datos.CodigoRespuesta == "S"){
        this.menus = []
        if(datos.Datos){
          datos.Datos.forEach((element: any) => {
            this.menus.push(element)
        });
        }
      }
      else{
        this.AbrirModalAlert("Error, Intentar mas tarde.")
        this.ss.removeCurrentSession()
      } 
      
    }, error =>{
      this.AbrirModalAlert("Error, Intentar mas tarde.")

    })

  }

 


  VerificarSesion(){
    let usuario = this.ss.getCurrentSession()
    if (usuario.user_nombre != undefined){
      this.loged.next(true)
      this.usu_actual.next(usuario.user_nombre)
      this.TraerMenu()
    }
    else{
      this.loged.next(false)
      this.usu_actual.next("")
    }
  }

  getDataLoged(){
    return this.loged.asObservable()
  }
  getDataUsu(){
    return this.usu_actual.asObservable() 
  }

  getMenu(){
    return this.menus
  }

  CerrarModalAlert(){
    document.getElementById("ModalAlertHeader")!.style.display = "none"
  }

  AbrirModalAlert(msg: any){
    this.alerta = msg
    document.getElementById("ModalAlertHeader")!.style.display = "block"
  }
}