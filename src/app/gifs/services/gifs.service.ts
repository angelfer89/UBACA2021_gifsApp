import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial : string[] = [];
  private apiKey : string = 'x2zsJWHOe0KlcG9dfhuvqxdmd00j6MW8';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';

  public resultados : Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {

    if( localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!); // Eñ signo de admiracion nos permite aceptar nulos
    }

    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  
  }

  BuscarGifs(query: string = ''){

    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)) { // prgunta si ya existe en el arreglo
      this._historial.unshift( query ); // lo agrega al psincipio
      this._historial = this._historial.splice(0,10); // quedarme con 10

      // para grabar en el local storage
      localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query);

    //this.http.get<SearchGifsResponse>('/search?api_key=x2zsJWHOe0KlcG9dfhuvqxdmd00j6MW8&q=' + query + '&limit=20')
    this.http.get<SearchGifsResponse>( this.servicioUrl + '/search', { params: params })
    .subscribe( resp => {
      console.log( resp.data);
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    });

  }
}
