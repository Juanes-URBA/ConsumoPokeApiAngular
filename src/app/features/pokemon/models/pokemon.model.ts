// Respuesta del endpoint GET /pokemon?limit=&offset=
export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

// Respuesta del endpoint GET /pokemon/:id_o_nombre (solo los campos que usamos)
export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
}

export interface PokemonSprites {
  front_default: string;
}

export interface PokemonDetailResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: PokemonSprites;
  types: PokemonType[];
  abilities: PokemonAbility[];
}

// Modelo final que consume la vista (mapeado a partir del detalle)
export interface Pokemon {
  id: number;
  name: string;
  image: string;
  height: number;
  weight: number;
  baseExperience: number;
  types: string[];
  abilities: string[];
}