import { ChangeDetectorRef, Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpOmdbService } from '../../services/http-omdb-service';
import { IMovie } from '../../interfaces/imovie';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './movie-component.html',
  styleUrls: ['./movie-component.css'],
})
export class MovieComponent {
  public httpOmdbService = inject(HttpOmdbService);
  public movieTitle: string = "";
  public loading: boolean = false;
  private cdr = inject(ChangeDetectorRef);
  private defaultMovie = {
    Title: 'No disponible',
    Director: 'No disponible',
    Year: 'No disponible',
    Genre: 'No disponible',
    Poster: 'https://image.tmdb.org/t/p/original/vhyKUnAAXNpcs1K2IAv2mzC2l7s.jpg'
  }
  public movie: IMovie | any = this.defaultMovie;

  constructor() {
  }
  public getMovieByTitle() {
    this.loading = true;
    /*
    this.httpOmdbService.getMovieByTitle(this.movieTitle).subscribe((data)=>{
      this.movie=data;
      this.movieTitle="";
      this.cdr.detectChanges();//Forzando el refresco de la interfaz
      this.loading=false;
    });
    */
    this.httpOmdbService.getMovieByTitle(this.movieTitle).subscribe({
      next: data => {
        console.log("next", data);
        this.movie = data.Response === 'True' ? data : this.defaultMovie;
      },
      error: e => {
        console.error("error", e);
        this.movie = this.defaultMovie;
      },
      complete: () => {
        console.log("complete");
        this.movieTitle = "";
        this.loading = false;
        this.cdr.markForCheck();//Forzando el refresco de la interfaz
      }
    });
  }
}
