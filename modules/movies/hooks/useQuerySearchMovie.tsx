import { useQuery } from 'react-query'
import qs from 'qs'
import { API_URL } from '@modules/shared/config'
import { APISearchResponse } from '@type/api-search-response'
import axios from 'axios'

const searchMovies = async (q) => {
  const queryString = qs.stringify(q)
  let url = `${API_URL}`
  url = `${url}&${queryString}&page=1`

  // axios.get(url).then((response) => response.data)

  try {
    const response = await axios.get(url)

    if (response.data.Response === 'False') {
      throw new Error(response.data.Error)
    }
    return response.data
  } catch (error) {
    throw new Error(error.message)
  }
}

const useQuerySearchMovies = (search) => {
  return useQuery<APISearchResponse>(
    ['searchMovieAutoSuggestion', search.s],
    // 'searchMovieAutoSuggestion',
    () => searchMovies(search),
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
    }
  )
}

export default useQuerySearchMovies
