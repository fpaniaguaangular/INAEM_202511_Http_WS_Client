import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { HttpOmdbService } from '../../services/http-omdb-service';
import { IMovie } from '../../interfaces/imovie';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-component',
  imports: [FormsModule],
  templateUrl: './movie-component.html',
  styleUrl: './movie-component.css',
})
export class MovieComponent {
  private httpOmdbService = inject(HttpOmdbService);
  public movieTitle: string = "";
  public loading: boolean = false;
  private cdr = inject(ChangeDetectorRef);
  private defaultMovie = {
    Title : 'No disponible',
    Director : 'No disponible',
    Year : 'No disponible',
    Genre : 'No disponible',
    Poster : 'https://image.tmdb.org/t/p/original/vhyKUnAAXNpcs1K2IAv2mzC2l7s.jpg'
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
        if (data.Response) {
          this.movie = data;
        } else {
          this.movie = this.defaultMovie;
        }
        this.movieTitle = "";
          this.cdr.detectChanges();//Forzando el refresco de la interfaz
          this.loading = false;
      },
      error: e => {
        this.movie = this.defaultMovie;
        this.loading = false;
        this.cdr.detectChanges();//Forzando el refresco de la interfaz
        console.error("Error:", e)
      },
      complete: () => console.log("Listo")
    });
  }
}
