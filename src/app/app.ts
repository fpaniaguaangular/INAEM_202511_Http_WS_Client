import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieComponent } from "./components/movie-component/movie-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MovieComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('INAEM_202511_Http_WS_Client');
}
