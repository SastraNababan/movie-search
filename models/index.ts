import { Models } from '@rematch/core'
import { movies } from './movies'
import { search } from './search'

export interface RootModel extends Models<RootModel> {
  movies: typeof movies
  search: typeof search
}

export const models: RootModel = { movies, search }
