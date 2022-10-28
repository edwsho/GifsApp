import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private servicioUrl : string = "https://api.giphy.com/v1/gifs"
  private _historial : string[] = [];
  private apiKeyGif: string = "9jjZNfVg7XymCmrpsejwWRKgHvsMojpE";


  public resultados: Gif[] = [];

  get getHistorial(){
    return [...this._historial];
  }

  constructor( private http: HttpClient ){

    if( localStorage.getItem("historial") ){ // Pregunto si es LocalStorage es nulo 
      this._historial = JSON.parse( localStorage.getItem("historial")! );
      
      this.resultados = JSON.parse( localStorage.getItem("resultados")! );
    }

  }


  buscarGifs(query : string ){

    query = query.trim().toLowerCase(); // Pongo todo en minusculas

    if( !this._historial.includes(query)){ // Includes busca dentro del arreglo si existe la palabra qu quiero agregar!
      
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10); // Aca recorta el arreglo, y solo mostrara solo 10 posiciones
      
      localStorage.setItem("historial", JSON.stringify(this._historial) );

    }

    const params = new HttpParams()
                .set("api_key",this.apiKeyGif)
                .set("limit","30")
                .set("q", query);
    console.log(params)

    // Hago la llamada al Api de Gifs
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search?`,{ params })
    .subscribe( ( resp ) => {
      console.log(resp.data);
      this.resultados = resp.data;

      localStorage.setItem("resultados", JSON.stringify(this.resultados) );

    } )


    
  }

}
