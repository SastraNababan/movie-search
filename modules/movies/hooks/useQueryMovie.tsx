import { API_URL } from '@modules/shared/config'
import { APIError } from '@type/api-error'
import { APIFetchResponse } from '@type/api-fetch-response'
import axios from 'axios'
import { useQuery } from 'react-query'

const fetchMovie = async (id) => {
  const url = `${API_URL}&i=${id}`

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

const useQueryMovie = (id) => {
  // const queryClient = useQueryClient()
  return useQuery<APIFetchResponse, APIError>(['movie', id], () =>
    fetchMovie(id)
  )
}

export default useQueryMovie
