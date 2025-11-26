import { HttpClient } from '@angular/common/http';//IMPORT
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { API_KEY } from '../constantes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpOmdbService {
  contadorPeticiones : WritableSignal<number> = signal(0) //Declaración e inicialización
  private httpClient = inject(HttpClient);//INJECT
  public getMovieByTitle(title: string) : Observable<any> {
    this.contadorPeticiones.set(this.contadorPeticiones()+1);//Modificación
    const URL = `http://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`;
    console.info(URL);
    return this.httpClient.get(URL);
  }
}
