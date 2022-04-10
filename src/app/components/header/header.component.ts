import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Observable, of } from 'rxjs';
import { DataService } from 'src/app/services/menu';
import { WebService } from 'src/app/services/web-service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private ss: StorageService, private router: Router, private ws: WebService, public _emp: DataService) {
    this.loged  = _emp.getDataLoged()
    this.usu_actual = _emp.getDataUsu()
    _emp.getDataLoged().subscribe(val=>this.log = val)
  }

  alerta:any;
  public loged: Observable<boolean>
  public usu_actual:Observable<string>
  log:any;
  search = faSearch;

  ngOnInit(): void { }
  
  CerrarSesion(){
    this.ss.logout();
    this._emp.ngOnInit();
    this.router.navigate(["/helechos"])
  }

  CerrarModalAlert(){
    document.getElementById("ModalAlertHeader")!.style.display = "none"
  }

  AbrirModalAlert(msg: any){
    this.alerta = msg
    document.getElementById("ModalAlertHeader")!.style.display = "block"
  }

  nav_cambiopass(){
    this.router.navigate(["/cambio-pass"])
  }

  nav_migrar(){
    this.router.navigate(["/migracion"])
  }

  nav_admuser(){
    this.router.navigate(["/adm-user"])
  }

  nav_admgrupos(){
    this.router.navigate(["/adm-grupos"])
  }

  nav_admhelechos(){
    this.router.navigate(["/adm-helechos"])
  }

  nav_editarinfo(){
    this.router.navigate(["/editar-info"])
  }

  nav_helechos(){
    this.router.navigate(["/helechos"])
  }

  nav_login(){
    this.router.navigate(["/login"])
  }

  nav_menu(x:any){

    if(x == "cambio-pass"){ 
      this.nav_cambiopass()
    }
    else if(x == "migracion"){
      console.log(this.ss.getCurrentToken())
      this.nav_migrar()
    }
    else if(x == "adm-user"){
      this.nav_admuser()
    }
    else if(x == "adm-grupos"){
      this.nav_admgrupos()
    }
    else if(x == "adm-helechos"){
      this.nav_admhelechos()
    }
    else if(x == "editar-info"){
      this.nav_editarinfo()
    }
    else if(x == "helechos"){
      this.nav_helechos()
    }
    else if(x == "login"){
      this.nav_login()
    }
  }


  

}