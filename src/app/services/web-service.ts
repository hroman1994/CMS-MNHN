import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WebService {
  
  public url = ''   //URL del servicio WEB
  constructor(private http: HttpClient) { }
  

  IniciarSesion(body:any){
    return this.http.post<any>(this.url + 'IniciarSesion', body , {responseType: 'json'})
  }

  ValidarUsuario(body:any){
    return this.http.post<any>(this.url + 'ValidarUsuario', body , {responseType: 'json'})
  }

  CrearUsuario(body:any){
    return this.http.post<any>(this.url + 'CrearUsuario', body , {responseType: 'json'})
  } 

  SubirArchivoHelechos(body:any){
    return this.http.post<any>(this.url + 'SubirArchivoHelechos', body , {responseType: 'json'})
  } 

  ComprobarPass(body:any){
    return this.http.post<any>(this.url + 'ComprobarPass' ,body, {responseType: 'json'})
  } 

  CambiarPass(body:any){
    return this.http.post<any>(this.url + 'CambiarPass' ,body, {responseType: 'json'})
  } 

  ObtenerUsuarios(){
    return this.http.post<any>(this.url + 'ObtenerUsuarios' , {responseType: 'json'})
  } 

  TraerDatosUser(body:any){
    return this.http.post<any>(this.url + 'TraerDatosUser' ,body , {responseType: 'json'})
  } 

  ObtenerGrupos(){
    return this.http.post<any>(this.url + 'ObtenerGrupos' , {responseType: 'json'})
  }

  TraerDatosGrupo(body:any){
    return this.http.post<any>(this.url + 'TraerDatosGrupo' ,body, {responseType: 'json'})
  }

  TraerHelechos(){
    return this.http.post<any>(this.url + 'TraerHelechos' , {responseType: 'json'})
  }


  TraerPublicacionesAdm(){
    return this.http.post<any>(this.url + 'TraerPublicacionesAdm' , {responseType: 'json'})
  }

  TokenSinUser(){
    return this.http.post<any>(this.url + 'TokenSinUser' , {responseType: 'json'})
  }


  TraerDetalleHelecho(body:any){
    return this.http.post<any>(this.url + 'TraerDetalleHelecho' ,body, {responseType: 'json'})
  }

  TraerHelechosAdm(){
    return this.http.post<any>(this.url + 'TraerHelechosAdm', {responseType: 'json'})
  }

  CambiarEstadoHelecho(body:any){
    return this.http.post<any>(this.url + 'CambiarEstadoHelecho',body, {responseType: 'json'})
  }

  CrearGrupo(body:any){
    return this.http.post<any>(this.url + 'CrearGrupo',body, {responseType: 'json'})
  }

  EditarNombreGrupo(body:any){
    return this.http.post<any>(this.url + 'EditarNombreGrupo',body, {responseType: 'json'})
  }

  EditarUsuarioAdm(body:any){
    return this.http.post<any>(this.url + 'EditarUsuarioAdm',body, {responseType: 'json'})
  }

  CrearUsuarioAdm(body:any){
    return this.http.post<any>(this.url + 'CrearUsuarioAdm',body, {responseType: 'json'})
  }

  EliminarUsuario(body:any){
    return this.http.post<any>(this.url + 'EliminarUsuario',body, {responseType: 'json'})
  }

  RestituirUsuario(body:any){
    return this.http.post<any>(this.url + 'RestituirUsuario',body, {responseType: 'json'})
  }


  TraerMenus(){
    return this.http.post<any>(this.url + 'TraerMenus', {responseType: 'json'})
  }

  TraerGruposHelecho(body:any){
    return this.http.post<any>(this.url + 'TraerGruposHelecho',body, {responseType: 'json'})
  }

  EditarHelecho(body:any){
    return this.http.post<any>(this.url + 'EditarHelecho',body, {responseType: 'json'})
  }

  TraerDatosMapa(body:any){
    return this.http.post<any>(this.url + 'TraerDatosMapa',body, {responseType: 'json'})
  }

  TraerUsuariosHabilitados(){
    return this.http.post<any>(this.url + 'TraerUsuariosHabilitados', {responseType: 'json'})
  }

  TraerUsuariosDesHabilitados(){
    return this.http.post<any>(this.url + 'TraerUsuariosDesHabilitados', {responseType: 'json'})
  }

  BuscarHelechosCategorias(body:any){
    return this.http.post<any>(this.url + 'BuscarHelechosCategorias',body, {responseType: 'json'})
  }

  EvaluarToken(){
    return this.http.post<any>(this.url + 'EvaluarToken', {responseType: 'json'})
  }

  VerificarSesion(){
    return this.http.post<any>(this.url + 'VerificarSesion', {responseType: 'json'})
  }

  TraerDatosUserActu(){
    return this.http.post<any>(this.url + 'TraerDatosUserActu', {responseType: 'json'})
  }

  GuardarCambiosInfo(body:any){
    return this.http.post<any>(this.url + 'GuardarCambiosInfo',body, {responseType: 'json'})
  }

  TraerDetalleHelechoAdm(body:any){
    return this.http.post<any>(this.url + 'TraerDetalleHelechoAdm',body, {responseType: 'json'})
  }

  
  preUpload(body:any){
    return this.http.post<any>(this.url + 'preUpload',body, {responseType: 'json'})
  }

  traerImagenHelecho(body:any){
    return this.http.post<any>(this.url + 'traerImagenHelecho',body, {responseType: 'json'})
  }

  cargarImagen(body:any){
    return this.http.post<any>(this.url + 'cargarImagen',body, {responseType: 'json'})
  }

  RecuperarPass(body:any){
    return this.http.post<any>(this.url + 'RecuperarPass',body, {responseType: 'json'})
  }

  UpdatePass(body:any){
    return this.http.post<any>(this.url + 'UpdatePass',body, {responseType: 'json'})
  }

  verificarURL(body:any){
    return this.http.post<any>(this.url + 'verificarURL',body, {responseType: 'json'})
  }
  

  
}