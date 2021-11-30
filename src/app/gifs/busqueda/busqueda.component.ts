import { Component, ElementRef, ViewChild} from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent{

  // El signo de admiracion indica que estamos seguros que no vendra null
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService){ }

  Buscar() {
    const valor = this.txtBuscar.nativeElement.value;
    if(valor.trim().length === 0){
      return;
    }
    this.gifsService.BuscarGifs(valor);
    this.txtBuscar.nativeElement.value = '';
  }

}
