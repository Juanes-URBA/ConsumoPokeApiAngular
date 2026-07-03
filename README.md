# Pokédex 


## Tecnologías

- Angular 17 (NgModules, sin standalone components)
- TypeScript
- RxJS
- SCSS

## Funcionamiento

1. `PokemonService.getPokemonList()` consulta el endpoint de lista (`/pokemon?limit=&offset=`), que solo devuelve `name` y `url` por cada Pokémon.
2. Con `switchMap` se toma esa respuesta y se dispara un `forkJoin` con las peticiones de detalle de cada Pokémon en paralelo.
3. Con `map` se transforma el arreglo de respuestas crudas de la API al modelo `Pokemon` que usa la vista.
4. `catchError` captura cualquier fallo de red o de la API y lo convierte en un mensaje visible para el usuario.
5. `PokemonListComponent` se suscribe al observable en `ngOnInit`, mostrando un estado de carga mientras la petición está en curso y un mensaje de error si algo falla.

## Cómo ejecutar el proyecto

1. Clonar el repositorio:

   git clone https://github.com/Juanes-URBA/ConsumoPokeApiAngular.git
   cd ConsumoPokeApiAngular
 

2. Instalar las dependencias:
  
   npm install
   

3. Levantar el servidor de desarrollo:
   
   ng serve
   

4. Abrir el navegador en `http://localhost:4200`

