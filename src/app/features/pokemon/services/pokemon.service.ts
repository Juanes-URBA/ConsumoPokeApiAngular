import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, forkJoin, throwError } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

import {
  PokemonListResponse,
  PokemonDetailResponse,
  Pokemon
} from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  // Total de Pokémon que existen en la API, se usa para calcular el número de páginas
  totalItems = 0;

  constructor(private http: HttpClient) { }

  getPokemonList(limit: number = 20, offset: number = 0): Observable<Pokemon[]> {
    return this.http.get<PokemonListResponse>(`${this.baseUrl}?limit=${limit}&offset=${offset}`)
      .pipe(
        tap(listResponse => this.totalItems = listResponse.count),
        // La lista solo trae name y url, hay que pedir el detalle de cada uno
        switchMap(listResponse => {
          const detailRequests = listResponse.results.map(item =>
            this.http.get<PokemonDetailResponse>(item.url)
          );
          return forkJoin(detailRequests);
        }),
        map(details => details.map(detail => this.mapToPokemon(detail))),
        catchError(this.handleError)
      );
  }

  private mapToPokemon(detail: PokemonDetailResponse): Pokemon {
    return {
      id: detail.id,
      name: detail.name,
      image: detail.sprites.front_default,
      height: detail.height,
      weight: detail.weight,
      baseExperience: detail.base_experience,
      types: detail.types.map(t => t.type.name),
      abilities: detail.abilities.map(a => a.ability.name)
    };
  }

  private handleError(error: HttpErrorResponse) {
    const mensaje = error.status === 0
      ? 'No fue posible conectarse con el servidor. Verifica tu conexión.'
      : `Ocurrió un error al consultar la PokéAPI (código ${error.status}).`;

    return throwError(() => new Error(mensaje));
  }
}