import { Component, OnInit , AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '../models/session.models';
import { StorageService } from '../services/storage.service';
import { WebService } from '../services/web-service';
import * as L from 'leaflet';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-helechos',
  templateUrl: './helechos.component.html',
  styleUrls: ['./helechos.component.scss']
})
export class HelechosComponent implements OnInit, AfterViewInit{

  constructor(private ws: WebService, private router: Router,private ss: StorageService, private sanitizer: DomSanitizer) {
    this.TraerHelechos();
    this.TraerGrupos();
  
  }

  pageActual:number = 1;
  helechos:any = [];
  alerta:any = "";
  lista:boolean = true;

  //Imagen
  path_img:any = "";
  imagen:any="";
  fullimg:any;
  thumbnail:any;

  //Mapa

  private map: L.Map | undefined;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ this.lat, this.lon],
      zoom: 3
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
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
  cat:any = -1;
  categorias_b:any = [];
  categorias:any = [];


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
      }
      else{
        this.categorias.push(this.cat)
      }
    }
  }
  categorias_he:any  = []
  TraerGruposHelecho(recordNumber:any){
    this.categorias_he = []
    let body = {
      recordNumber: recordNumber
    }
    this.ws.TraerGruposHelecho(body).subscribe(data=>{
      let datos = JSON.parse(data)
      if(datos.CodigoRespuesta == "S"){
        this.categorias_he = datos.Datos
        console.log(this.categorias_he)
      }
      else{
        this.AbrirModalAlert("Error, Intentar mas tarde.")
      } 
      
    }, error =>{
      this.AbrirModalAlert("Error, Intentar mas tarde.")
    })
    
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

  TraerGrupos(){
    this.categorias_b = []
    this.ws.ObtenerGrupos().subscribe(data=>{
      let datos = JSON.parse(data)
      if(datos.CodigoRespuesta == "S"){
        this.categorias_b = datos.Datos
      }
      else{
        this.AbrirModalAlert("Error, Intentar mas tarde.")
      } 
    }, error =>{
      this.AbrirModalAlert("Error, Intentar mas tarde.")
    })
  }

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

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    

  }

  
  LimpiarHelechos(){
    this.helechos = []
    this.Helechos_Filtro = []
    this.txtCollectors = ""
    this.txtCountryName = ""
    this.txtDateSupplied = ""
    this.txtFamily = ""
    this.txtGenus = ""
    this.txtLocality = ""
    this.txtPersonName = ""
    this.txtSpecies = ""
    this.txtrecordNumber = ""
  }

  TraerHelechos(){
    this.LimpiarHelechos()
    this.ws.TraerHelechos().subscribe(data=>{
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

  lat:any;
  lon:any;

  greenIcon = L.icon({
    iconUrl: 'assets/leaf-green.png',
    shadowUrl: 'assets/leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  MostrarMapa(){
    if(this.lon != null && this.lat != null){
      document.getElementById("ModalMapa")!.style.display = "block"
      this.initMap();
      L.marker([this.lat,this.lon], {icon: this.greenIcon}).addTo(this.map!);
      this.map!.setView(L.latLng(this.lat,this.lon),10)
      this.map!.flyTo(L.latLng(this.lat,this.lon),12)
      
    }
    else{
      this.AbrirModalAlert("Helecho sin ubicación en la base de datos.")
    }
  }
  

  AbrirDetalle(){
    document.getElementById("DetalleHelecho")!.style.display = "block"
    this.mostrar=false
  }

  mostrar:boolean = false
  TraerDetalleHelecho(record:any){
    this.TraerGruposHelecho(record)
    this.mostrar=true
    this.lista = false
    let body = {
      recordNumber: record
    }
    this.ws.TraerDetalleHelecho(body).subscribe(data =>{
      let datos = JSON.parse(data)
      if(datos.CodigoRespuesta == "S"){
        //Imagen base 64
        this.thumbnail ="data:image/png;base64, "+ datos.Imagen
        this.imagen = datos.Imagen
        let sanImage = this.sanitizer.bypassSecurityTrustUrl(this.thumbnail);
        this.thumbnail=sanImage
        //Datos Helecho
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
      }
      else{
        this.AbrirModalAlert("Error, Intentar mas tarde.")
      } 
      
    }, error =>{
      this.AbrirModalAlert("Error, Intentar mas tarde.")

    })
  }

  TraerDatosMapa(){
    let body = {
      recordNumber: this.recordNumber
    }
    this.ws.TraerDatosMapa(body).subscribe(data =>{
      let datos = JSON.parse(data)
      if(datos.CodigoRespuesta == "S"){
        this.lat = datos.Datos[0].LATITUDE
        this.lon = datos.Datos[0].LONGITUDE
        this.MostrarMapa()

        
      }
      else{
        this.AbrirModalAlert("Error, Intentar mas tarde.")
      } 
      
    }, error =>{
      this.AbrirModalAlert("Error, Intentar mas tarde.")

    })

  }

  getSafeUrl(){
    return this.thumbnail
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
    this.lista = true
    this.lat = null
    this.lon = null
    document.getElementById("ModalMapa")!.style.display= "none";
    document.getElementById("ModalImagen")!.style.display= "none";
    document.getElementById("DetalleHelecho")!.style.display = "none";
  }


  BuscarHelechosCategorias(){
    let categorias_t = ""
    this.categorias.forEach((element: { GRUPO_ID: any; }) => {
      categorias_t = categorias_t + element.GRUPO_ID + "-"
    });
    let body = {
      categorias: categorias_t.substring(0,categorias_t.length -1 )
    }
    this.ws.BuscarHelechosCategorias(body).subscribe(data =>{
      let datos = JSON.parse(data)
      if(datos.CodigoRespuesta == "S"){
        this.helechos = datos.Datos
        this.Helechos_Filtro = this.helechos
        document.getElementById("ModalFiltro")!.style.display = "none"

      }
      else{
        this.AbrirModalAlert("Error, Intentar mas tarde.")
      } 
      
    }, error =>{
      this.AbrirModalAlert("Error, Intentar mas tarde.")

    })

  }

  MostrarHelecho(){
    document.getElementById("ModalImagen")!.style.display = 'block'
  }


  CerrarModalAlert(){
    document.getElementById("ModalAlert")!.style.display = 'none'
  }

  CerrarModalImagen(){
    document.getElementById("ModalImagen")!.style.display = 'none'
  }

  AbrirModalAlert(msg:any){
    this.alerta = msg
    document.getElementById("ModalAlert")!.style.display = 'block'
  }


  AbrirModal(modal:any){
    document.getElementById(modal)!.style.display = 'block'
  }

  CerrarModal(modal:any){
    document.getElementById(modal)!.style.display = 'none'
  }




}
