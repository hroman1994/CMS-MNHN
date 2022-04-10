import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { WebService } from '../services/web-service';

import {JwtHelperService} from '@auth0/angular-jwt';
import {NgxPermissionsService, NgxRolesService} from 'ngx-permissions';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-adm-helechos',
  templateUrl: './adm-helechos.component.html',
  styleUrls: ['./adm-helechos.component.scss']
})
export class AdmHelechosComponent implements OnInit {

  constructor(private ws: WebService, private router: Router,private ss: StorageService, private sanitizer: DomSanitizer) {
    this.VerificarSesion()
    this.TraerHelechosAdm()
    this.TraerGrupos()
  }

  alerta:any;
  pageActual:number = 1;
  lista_helechos:boolean = true;
  helechos:any = [];
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

    //Datos Helecho
    recordNumber:any;
    InstitutionCode:any;
    PersonName:any;
    DateSupplied:any;
    Collectors:any;
    DateLastModified:any;
    UnitTypeStatus:any;
    CountryName:any;
    Locality:any;
    RelatedUnitID:any;
    Altitude:any;
    Notes:any;
    Family:any;
    Genus:any;
    GenusQualifier:any;
    Species:any;
    Author:any;
    InfraSpecificRank:any;
    InfraSpecificEpithet:any;
    InfraSpecificAuthor:any;
    PlantNameCode:any;
    Identifier:any;
    TypeStatus:any;
    Categorias:any;
    Project:any;
    Hd_loc:any;
    lat:any;
    lon:any;

      //Filtro
    txtrecordNumber:any;
    txtPersonName:any;
    txtDateSupplied:any;
    txtCollectors:any;
    txtCountryName:any;
    txtLocality:any;
    txtFamily:any;
    txtGenus:any;
    txtSpecies:any;
    Helechos_Filtro:any;


    FiltrarRango(){
      let datos = this.helechos;
      if (this.txtrecordNumber != '' && this.txtrecordNumber !=undefined && this.txtrecordNumber !=null) {
        datos = datos.filter((fil: { recordNumber: { toString: () => string; }; }) => (fil.recordNumber.toString() || "").toLowerCase().includes(this.txtrecordNumber.toLowerCase()));
      }
      if (this.txtPersonName != ''  && this.txtPersonName !=undefined && this.txtPersonName !=null ) {
        datos = datos.filter((fil: { PersonName: { toString: () => string; }; }) => (fil.PersonName.toString() || "").toLowerCase().includes(this.txtPersonName.toLowerCase()));
      }
      if (this.txtDateSupplied != ''  && this.txtDateSupplied !=undefined && this.txtDateSupplied !=null ) {
        datos = datos.filter((fil: { DateSupplied: { toString: () => string; }; }) => (fil.DateSupplied.toString() || "").toLowerCase().includes(this.txtDateSupplied.toLowerCase()));
      }
      if (this.txtCollectors != ''  && this.txtCollectors !=undefined && this.txtCollectors !=null ) {
        datos = datos.filter((fil: { Collectors: { toString: () => string; }; }) => (fil.Collectors.toString() || "").toLowerCase().includes(this.txtCollectors.toLowerCase()));
      }
      if (this.txtCountryName != ''  && this.txtCountryName !=undefined && this.txtCountryName !=null ) {
        datos = datos.filter((fil: { CountryName: { toString: () => string; }; }) => (fil.CountryName.toString() || "").toLowerCase().includes(this.txtCountryName.toLowerCase()));
      }
      if (this.txtLocality != ''  && this.txtLocality !=undefined && this.txtLocality !=null ) {
        datos = datos.filter((fil: { Locality: { toString: () => string; }; }) => (fil.Locality.toString() || "").toLowerCase().includes(this.txtLocality.toLowerCase()));
      }
      if (this.txtFamily != ''  && this.txtFamily !=undefined && this.txtFamily !=null ) {
        datos = datos.filter((fil: { Family: { toString: () => string; }; }) => (fil.Family.toString() || "").toLowerCase().includes(this.txtFamily.toLowerCase()));
      }
      if (this.txtGenus != ''  && this.txtGenus !=undefined && this.txtGenus !=null ) {
        datos = datos.filter((fil: { Genus: { toString: () => string; }; }) => (fil.Genus.toString() || "").toLowerCase().includes(this.txtGenus.toLowerCase()));
      }
      if (this.txtSpecies != ''  && this.txtSpecies !=undefined && this.txtSpecies !=null ) {
        datos = datos.filter((fil: { Species: { toString: () => string; }; }) => (fil.Species.toString() || "").toLowerCase().includes(this.txtSpecies.toLowerCase()));
      }
      this.pageActual=1;
      this.Helechos_Filtro = datos;
    }
  

  mapa:any=[
    {
    id:0, desc:"No Mostrar"
    },
    {
    id:1, desc: "Mostrar"
    }];

  estados:any=[
    {
    id:0, desc:"No Publicado"
    },
    {
    id:1, desc: "Publicado"
    }];

  categorias:any=[];
  categorias_b:any=[];
  categorias_ids:any=[];
  cat:any = -1;
  

  TraerGrupos(){
    this.categorias_b = []
    this.ws.ObtenerGrupos().subscribe(data=>{
      let datos = JSON.parse(data)
      if(datos.CodigoRespuesta = "S"){
        this.categorias_b = datos.Datos
      }
      else{
        this.AbrirModalAlert("Error, Intentar mas tarde.")
      } 
    }, error =>{
      this.AbrirModalAlert("Error, Intentar mas tarde.")
    })
  }

  TraerGruposHelecho(recordNumber:any){
    this.categorias = []
    let body = {
      recordNumber: recordNumber
    }
    this.ws.TraerGruposHelecho(body).subscribe(data=>{
      let datos = JSON.parse(data)
      if(datos.CodigoRespuesta == "S"){
        this.categorias = datos.Datos
      }
      else{
        this.AbrirModalAlert("Error, Intentar mas tarde.")
      } 
      
    }, error =>{
      this.AbrirModalAlert("Error, Intentar mas tarde.")
    })
    
  }

  
  Agregar(){
    let validar = 0
    if(this.cat == -1 || this.cat == null || this.cat == undefined){
      this.AbrirModalAlert("Debe seleccionar una categoria")
    }
    else{
      this.categorias.forEach((element: { GRUPO_ID: any; }) => {
        if (element.GRUPO_ID == this.cat.GRUPO_ID){
          validar = 1
        }
      });
      if (validar == 1){
        this.AbrirModalAlert("La categoria ya se encuentra en la lista")
      }
      else{
        this.categorias.push(this.cat)
      }
    }
  }

  Eliminar(x:any){
    this.removeItemFromArr(this.categorias, x)
  }

  removeItemFromArr ( arr: any[], item: any ) {
    var i = arr.indexOf( item );
 
    if ( i !== -1 ) {
        arr.splice( i, 1 );
    }
  }
  

  TraerHelechosAdm(){
    this.ws.TraerHelechosAdm().subscribe(data=>{
      let datos = JSON.parse(data)
      if(datos.CodigoRespuesta == "S"){
        datos.Datos.forEach((element: any) => {
          this.helechos.push(element)
          this.Helechos_Filtro = this.helechos
        });
      }
      else{
        this.AbrirModalAlert("Error, Intentar mas tarde.")
      } 
      
    }, error =>{
      this.AbrirModalAlert("Error, Intentar mas tarde.")
    })

  }

  CambiarEstadoHelecho(recordNumber:any, Estado:any, imagen:any){
    if(imagen == 1){
      let body = {
        recordNumber: recordNumber,
        Estado: Estado
      }
      this.ws.CambiarEstadoHelecho(body).subscribe(data=>{
        let datos = JSON.parse(data)
        if(datos.CodigoRespuesta == "S"){
          this.helechos = []
          this.TraerHelechosAdm()
          this.AbrirModalAlert("Información editada con exito.")
        }
        else{
          this.AbrirModalAlert("Error, Intentar mas tarde.")
        } 
        
      }, error =>{
        this.AbrirModalAlert("Error, Intentar mas tarde.")
      })
    }
    else{
      this.AbrirModalAlert("Antes de publicar debe subir una imagen.")
    }
    

  }
  archivo:any;
  @ViewChild('archivo_helechos', { static: false }) archivo_helechos!: ElementRef;
  CargandoArchivo(event: any) {
    this.archivo = null;
    if (event.target.files.length !== 0) {
      let archivo = null;
      archivo = event.target.files[0];
      if (archivo != null) {
        if (archivo.name.split('.').pop().toLocaleLowerCase() === 'tif'.toLocaleLowerCase()) {
          this.archivo = archivo;
          // this.preUpload()
        } else {
          this.archivo_helechos.nativeElement.value = ""
          this.archivo = null;
          this.AbrirModalAlert('El archivo a subir debe ser formato tif.');
        }
      }
    }
  }

  // preUpload(){
  //   const body = new FormData();
  //   body.append('archivo',this.archivo)
  //   this.ws.preUpload(body).subscribe(data=>{
  //     let datos = JSON.parse(data)
  //     if(!datos.estadoToken){
  //       this.ss.removeCurrentSession()
  //       this.router.navigate(['/login'])
  //     }
  //     else if (datos.CodigoRespuesta == "N"){
  //       this.AbrirModalAlert("Error, favor intentar mas tarde.")
  //     }
  //     else if (datos.CodigoRespuesta == "S"){
  //       this.thumbnail = datos.Datos[0].Imagen

  //     }
  //     else{
  //       document.getElementById("SubirArchivo")!.style.display = "block"
  //       document.getElementById("Loading")!.style.display = "none"
  //       this.AbrirModalAlert("Registros cargados con éxito.")
  //       }
  //     })
  // }


  thumbnail:any;
  getSafeUrl(){
    return this.thumbnail
  }



  TraerDetalleHelecho(record:any){
    this.lista_helechos = false
    this.TraerGruposHelecho(record)
    this.TraerGrupos()
    let body = {
      recordNumber: record
    }
    this.ws.TraerDetalleHelechoAdm(body).subscribe(data =>{
      let datos = JSON.parse(data)
      if(datos.CodigoRespuesta == "S"){
        this.recordNumber = datos.Datos[0].recordNumber
        this.InstitutionCode = datos.Datos[0].InstitutionCode
        this.PersonName = datos.Datos[0].PersonName
        this.DateSupplied = datos.Datos[0].DateSupplied
        this.Collectors = datos.Datos[0].Collectors
        this.DateLastModified = datos.Datos[0].DateLastModified
        this.UnitTypeStatus = datos.Datos[0].UnitTypeStatus
        this.CountryName = datos.Datos[0].CountryName
        this.Locality = datos.Datos[0].Locality
        this.RelatedUnitID = datos.Datos[0].RelatedUnitID
        this.Altitude = datos.Datos[0].Altitude
        this.Notes = datos.Datos[0].Notes
        this.Family = datos.Datos[0].Family
        this.Genus = datos.Datos[0].Genus
        this.GenusQualifier = datos.Datos[0].GenusQualifier
        this.Species = datos.Datos[0].Species
        this.Author = datos.Datos[0].Author
        this.InfraSpecificRank = datos.Datos[0].InfraSpecificRank
        this.InfraSpecificEpithet = datos.Datos[0].InfraSpecificEpithet
        this.InfraSpecificAuthor = datos.Datos[0].InfraSpecificAuthor
        this.PlantNameCode = datos.Datos[0].PlantNameCode
        this.Identifier = datos.Datos[0].Identifier
        this.TypeStatus = datos.Datos[0].TypeStatus
        this.Categorias = datos.Datos[0].Categorias
        this.Project = datos.Datos[0].Project
        this.Hd_loc = datos.Datos[0].Hd_loc
        this.lat = datos.Datos[0].Latitude
        this.lon = datos.Datos[0].Longitude

      }
      else{
        this.AbrirModalAlert("Error, Intentar mas tarde.")
      } 
      
    }, error =>{
      this.AbrirModalAlert("Error, Intentar mas tarde.")

    })
  }

  ReiniciarDetHelecho(){
    this.recordNumber = ""
    this.InstitutionCode = ""
    this.PersonName = ""
    this.DateSupplied = ""
    this.Collectors = ""
    this.DateLastModified = "" 
    this.UnitTypeStatus = ""
    this.CountryName = ""
    this.Locality = ""
    this.RelatedUnitID = ""
    this.Altitude = ""
    this.Notes = ""
    this.Family = ""
    this.Genus = ""
    this.GenusQualifier = "" 
    this.Species = ""
    this.Author = ""
    this.InfraSpecificRank = ""
    this.InfraSpecificEpithet = ""
    this.InfraSpecificAuthor = ""
    this.PlantNameCode = ""
    this.Identifier = ""
    this.TypeStatus = ""
    this.Categorias = ""
    this.Project = ""
    this.Hd_loc = ""
    this.lista_helechos = true
    this.lat = null
    this.lon = null  
    this.categorias = []
    this.categorias_b = []
    this.cat = -1
    this.lista_categorias = []
  }

  lista_categorias:any = []
  EditarHelecho(){
    if(this.Hd_loc == null || this.Hd_loc == undefined){
      this.AbrirModalAlert("Debe seleccionar una opcion para el mapa")
    }
    else{
      this.categorias.forEach((element: { GRUPO_ID: any; }) => {
        this.lista_categorias.push(element.GRUPO_ID)
      });
      let body = {
        recordNumber:  this.recordNumber || "",
        InstitutionCode:  this.InstitutionCode  || "",
        PersonName:this.PersonName  || "",
        DateSupplied:this.DateSupplied  || "",
        Collectors:this.Collectors  || "",
        DateLastModified:this.DateLastModified  || "", 
        UnitTypeStatus:this.UnitTypeStatus  || "",
        CountryName:this.CountryName  || "",
        Locality:this.Locality  || "",
        RelatedUnitID:this.RelatedUnitID  || "",
        Altitude:this.Altitude  || "",
        Notes:this.Notes  || "",
        Family:this.Family  || "",
        Genus:this.Genus  || "",
        GenusQualifier:this.GenusQualifier  || "", 
        Species:this.Species  || "",
        Author:this.Author  || "",
        InfraSpecificRank:this.InfraSpecificRank  || "",
        InfraSpecificEpithet:this.InfraSpecificEpithet  || "",
        InfraSpecificAuthor:this.InfraSpecificAuthor  || "",
        PlantNameCode:this.PlantNameCode  || "",
        Identifier:this.Identifier  || "",
        TypeStatus:this.TypeStatus  || "",
        Project:this.Project  || "",
        Hd_loc:this.Hd_loc  || "",
        lat:this.lat  || "",
        lon: this.lon  || "",
        categorias: this.lista_categorias || ""

    }
    this.ws.EditarHelecho(body).subscribe(data =>{
      let datos = JSON.parse(data)
      if(datos.CodigoRespuesta = "S"){
        this.AbrirModalAlert("Helecho editado con éxito.")
        this.lista_helechos = true;
        this.ReiniciarDetHelecho();

      }
      else{
        this.AbrirModalAlert("Error, Intentar mas tarde.")
      } 
      
    }, error =>{
      this.AbrirModalAlert("Error, Intentar mas tarde.")

    })}

  }

  AbrirModalEditarImagen(recordNumber:any, estadoImagen:any){
    if(estadoImagen == 0){
      this.recordNumber = recordNumber
      this.thumbnail = null
      document.getElementById("TituloImagen")!.innerHTML = "Número de registro: " + recordNumber;
      document.getElementById("ModalImagen")!.style.display = 'block'
    }
    else{
      
      this.recordNumber = recordNumber
      this.TraerImagenHelecho(this.recordNumber)
      document.getElementById("TituloImagen")!.innerHTML = "Número de registro: " + recordNumber;
      document.getElementById("ModalImagen")!.style.display = 'block'
    }
    
  }

  traerImagenHelecho(){
    let body = {
      recordNumber: this.recordNumber
    }
    this.ws.traerImagenHelecho(body).subscribe(data =>{
      let datos = JSON.parse(data)
      if(datos.CodigoRespuesta == "S"){
        //Mostrar imagen
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

  CerrarModal(modal:any){
    document.getElementById(modal)!.style.display = 'none'
  }

  AbrirModalAlert(msg:any){
    this.alerta = msg
    document.getElementById("ModalAlert")!.style.display = 'block'
  }

  loading_imagen:boolean = false
  cargarImagen(){
    this.loading_imagen = true
    let body = new FormData();
    body.append("imagen",this.archivo)
    body.append("recordNumber",this.recordNumber)
    this.ws.cargarImagen(body).subscribe(data =>{
      let datos = JSON.parse(data)
      if(datos.CodigoRespuesta == "S"){
        
        this.helechos = [];
        this.TraerHelechosAdm()
        this.AbrirModalAlert("Imagen cargada con éxito.")
        this.CerrarModal("ModalImagen")
        this.loading_imagen = false
      }
      else{
        this.AbrirModalAlert("Error, Intentar mas tarde.")
        this.loading_imagen = false
      } 
      
    }, error =>{
      this.AbrirModalAlert("Error, Intentar mas tarde.")
      this.loading_imagen = false
    })
    
  }

  

  imagen:any;
  loading_imagen_2:boolean=false;
  TraerImagenHelecho(record:any){
    this.loading_imagen_2 = true
    let body = {
      recordNumber: record
    }
    this.ws.TraerDetalleHelecho(body).subscribe(data =>{
      let datos = JSON.parse(data)
      if(datos.CodigoRespuesta == "S"){
      
        
        this.thumbnail ="data:image/png;base64, "+ datos.Imagen
        this.imagen = datos.Imagen
        let sanImage = this.sanitizer.bypassSecurityTrustUrl(this.thumbnail);
        this.thumbnail=sanImage
        

        this.loading_imagen_2 = false
       

      }
      else{
        this.AbrirModalAlert("Error, Intentar mas tarde.")
        this.loading_imagen_2 = false
      } 
      
    }, error =>{
      this.AbrirModalAlert("Error, Intentar mas tarde.")
      this.loading_imagen_2 = false

    })
  }

}


