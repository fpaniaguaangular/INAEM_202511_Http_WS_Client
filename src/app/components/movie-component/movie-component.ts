import { Component, inject } from '@angular/core';
import { HttpOmdbService } from '../../services/http-omdb-service';

@Component({
  selector: 'app-movie-component',
  imports: [],
  templateUrl: './movie-component.html',
  styleUrl: './movie-component.css',
})
export class MovieComponent {
  private httpOmdbService = inject(HttpOmdbService);
  constructor() {
    this.httpOmdbService.getMovieByTitle('Star Wars').subscribe((data)=>{
      console.log(data);
    });
  }
}
