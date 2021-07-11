import MovieList from '@modules/movies/containers/MovieList'
import SearchBox from '@modules/movies/containers/SearchBox'
import PageShell from '@modules/shared/components/PageShell'
import React, { FC } from 'react'

export const Movies: FC = () => {
  return (
    <PageShell title="Movie Search">
      <SearchBox />
      <MovieList />
    </PageShell>
  )
}

export default Movies
