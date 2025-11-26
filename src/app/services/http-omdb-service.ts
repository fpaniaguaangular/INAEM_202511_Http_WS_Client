import { HttpClient } from '@angular/common/http';//IMPORT
import { inject, Injectable } from '@angular/core';
import { API_KEY } from '../constantes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpOmdbService {
  private httpClient = inject(HttpClient);//INJECT
  public getMovieByTitle(title: string) : Observable<any> {
    return this.httpClient.get(`http://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`);
  }
}
