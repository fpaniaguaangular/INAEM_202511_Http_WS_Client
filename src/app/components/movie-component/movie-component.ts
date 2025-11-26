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
  public movie : IMovie | any;
  public movieTitle : string = "";
  private cdr = inject(ChangeDetectorRef);
  constructor() {
  }
  public getMovieByTitle(){
    this.httpOmdbService.getMovieByTitle(this.movieTitle).subscribe((data)=>{
      this.movie=data;
      this.movieTitle="";
      this.cdr.detectChanges();//Forzando el refresco de la interfaz
      console.log(data);
    });
  }
}
