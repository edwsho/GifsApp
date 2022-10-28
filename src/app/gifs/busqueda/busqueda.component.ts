import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent  {

  @ViewChild('txtBuscar') txtBuscar !: ElementRef<HTMLInputElement>

  constructor( private gifServices : GifsService ){}

  buscar( contenido : string){
    console.log(this.txtBuscar.nativeElement.value);

    if(this.txtBuscar.nativeElement.value.trim().length === 0){
      return;
    }

    this.gifServices.buscarGifs(this.txtBuscar.nativeElement.value);

    this.txtBuscar.nativeElement.value = '';
  }

}
