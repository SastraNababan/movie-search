import qs from 'qs'
import { useInfiniteQuery } from 'react-query'
import { API_URL } from '@modules/shared/config'
import { APISearchResponse } from '@type/api-search-response'
import axios from 'axios'

const fetchMovies = async ({ queryKey, pageParam = 1 }) => {
  const queryString = qs.stringify(queryKey[1])
  let url = `${API_URL}&p=${pageParam}`
  url = `${url}&${queryString}`

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

const useQueryMovies = (search) => {
  // const queryClient = useQueryClient()
  return useInfiniteQuery<APISearchResponse>(
    ['searchMovie', search],
    fetchMovies,
    {
      getNextPageParam: (lastPage, pages) => {
        const totalResults = lastPage.totalResults
        const pageSize = pages.length
        if (parseInt(totalResults) / 10 > pageSize) {
          return pageSize + 1
        }
      },
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
    }
  )
}

export default useQueryMovies
