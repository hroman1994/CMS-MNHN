import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { WebService } from '../services/web-service';

@Component({
  selector: 'app-migracion',
  templateUrl: './migracion.component.html',
  styleUrls: ['./migracion.component.scss']
})
export class MigracionComponent implements OnInit {

  constructor(private ss: StorageService, 
              private router: Router,
              private ws: WebService
              ) {console.log(this.ss.getCurrentToken()) }

  ngOnInit(): void {
    this.VerificarSesion()
  }
  
  archivo:any;
  alerta:any;
  datos_duplicados:any = [];
  pageActual:number = 0;
  ruta:any = ""
  mostrar:boolean = false;


  @ViewChild('archivo_helechos', { static: false }) archivo_helechos!: ElementRef;
  CargandoArchivo(event: any) {
    this.archivo = null;
    if (event.target.files.length !== 0) {
      let archivo = null;
      archivo = event.target.files[0];
      if (archivo != null) {
        if (archivo.name.split('.').pop().toLocaleLowerCase() === 'xls'.toLocaleLowerCase()) {
          this.archivo = archivo;
        } else if (archivo.name.split('.').pop().toLocaleLowerCase() === 'xlsx'.toLocaleLowerCase()) {
          this.archivo = archivo;
        } else {
          this.archivo_helechos.nativeElement.value = ""
          this.archivo = null;
          this.AbrirModalAlert('El archivo a subir debe ser Excel');
        }
      }
    }
  }

  SpinnerLoad(){
    if(!this.archivo){
      this.AbrirModalAlert("Debe seleccionar un archivo")
    }
    else{
      document.getElementById("SubirArchivo")!.style.display = "none"
      document.getElementById("Loading")!.style.display = "block"
      this.SubirArchivoHelechos()
    }

  }

  

  SubirArchivoHelechos(){
    const body = new FormData();
    body.append('archivo',this.archivo)
    body.append('path_o', "C:\\Users\\Humberto\\Desktop\\ArchivosProyecto")
    this.ws.SubirArchivoHelechos(body).subscribe(data=>{
      let datos = JSON.parse(data)
      if(!datos.estadoToken){
        this.ss.removeCurrentSession()
        this.router.navigate(['/login'])
      }
      else if (datos.CodigoRespuesta == "N"){
        this.AbrirModalAlert("Error, favor intentar mas tarde.")
      }
      else if (datos.CodigoRespuesta == "S"){
        if(datos.Datos.length>0){
          this.datos_duplicados = datos.Datos
          document.getElementById("SubirArchivo")!.style.display = "block"
          document.getElementById("Loading")!.style.display = "none"
          document.getElementById("ModalElementosDuplicados")!.style.display = "block"
        }
        else{
          document.getElementById("SubirArchivo")!.style.display = "block"
          document.getElementById("Loading")!.style.display = "none"
          this.AbrirModalAlert("Registros cargados con éxito.")
        }
      }
    })
  this.mostrar = false;

  }

  CerrarModal(modal:string){
    document.getElementById(modal)!.style.display = "none"
  }

  CerrarModalAlert(){
    document.getElementById("ModalAlert")!.style.display = "none"
  }

  AbrirModalAlert(msg: any){
    this.alerta = msg
    document.getElementById("ModalAlert")!.style.display = "block"
  }

  VerificarSesion(){
    this.ws.VerificarSesion().subscribe(data=>{
      let datos = JSON.parse(data)
      if(datos.CodigoRespuesta == "S"){
        if(datos.Datos.length  == 0 || datos.Datos[0].TipoUser != 1 ){
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
}
