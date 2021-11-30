import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent{

  get historial() {
    return this.gifsServce.historial;
  }

  constructor(private gifsServce: GifsService) { }

  Buscar(termino: string){
    console.log(termino);
    this.gifsServce.BuscarGifs(termino);
  }

}
