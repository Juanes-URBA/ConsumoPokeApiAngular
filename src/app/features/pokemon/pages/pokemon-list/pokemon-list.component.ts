import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemons: Pokemon[] = [];
  cargando = false;
  mensajeError = '';

  // Paginación
  tamanosPagina = [20, 40, 60];
  pageSize = 20;
  currentPage = 1;
  totalItems = 0;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.cargarPokemones();
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalItems / this.pageSize));
  }

  // Muestra máximo 5 botones de página, centrados en la página actual
  get paginasVisibles(): number[] {
    const maxBotones = 5;
    let inicio = Math.max(1, this.currentPage - 2);
    const fin = Math.min(this.totalPages, inicio + maxBotones - 1);
    inicio = Math.max(1, fin - maxBotones + 1);

    const paginas: number[] = [];
    for (let i = inicio; i <= fin; i++) {
      paginas.push(i);
    }
    return paginas;
  }

  cambiarPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPages || pagina === this.currentPage) {
      return;
    }
    this.currentPage = pagina;
    this.cargarPokemones();
  }

  paginaAnterior(): void {
    this.cambiarPagina(this.currentPage - 1);
  }

  paginaSiguiente(): void {
    this.cambiarPagina(this.currentPage + 1);
  }

  cambiarTamanoPagina(tamano: number): void {
    this.pageSize = tamano;
    this.currentPage = 1;
    this.cargarPokemones();
  }

  private cargarPokemones(): void {
    this.cargando = true;
    this.mensajeError = '';

    const offset = (this.currentPage - 1) * this.pageSize;

    this.pokemonService.getPokemonList(this.pageSize, offset).subscribe({
      next: (pokemons) => {
        this.pokemons = pokemons;
        this.totalItems = this.pokemonService.totalItems;
        this.cargando = false;
      },
      error: (error: Error) => {
        this.mensajeError = error.message;
        this.cargando = false;
      }
    });
  }
}