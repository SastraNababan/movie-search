import { DataType } from './data-type'
import { GenreType } from './genre-type'
import { RatingType } from './rating-type'

interface Rating {
  Source: string
  Value: string
}

export interface APIFetchResponse {
  Title: string
  Year: string
  Rated: RatingType
  Released: string
  Runtime: string
  Genre: GenreType
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Rating[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: DataType
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}
