import { DataType } from './data-type';
import { RatingType } from './rating-type';
import { GenreType } from './genre-type';

interface Rating {
  source: string;
  value: string;
}

export interface FetchResponse {
  title: string;
  year: number;
  rated: RatingType;
  released: string;
  runtime: string;
  genre: GenreType[];
  director: string;
  writers: string[];
  actors: string[];
  plot: string;
  language: string;
  country: string;
  awards: string;
  poster: string | null;
  ratings: Rating[];
  metascore: number;
  imdbRating: number;
  imdbVotes: number;
  imdbId: string;
  type: DataType;
  dvd: string | null;
  boxOffice: string | null;
  production: string | null;
  website: string | null;
}
