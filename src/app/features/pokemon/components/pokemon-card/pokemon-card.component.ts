import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {

  @Input() pokemon!: Pokemon;

  mostrarDetalle = false;

  toggleDetalle(): void {
    this.mostrarDetalle = !this.mostrarDetalle;
  }

}