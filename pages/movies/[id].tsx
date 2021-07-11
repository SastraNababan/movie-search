import {
  Box,
  HStack,
  Image,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import useQueryMovie from '@modules/movies/hooks/useQueryMovie'
import PageShell from '@modules/shared/components/PageShell'
import { API_URL } from '@modules/shared/config'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'

const SimpleList = ({ title, detail }) => {
  return (
    <Box>
      <Box as="span" textColor="gray.500">
        {title}:
      </Box>
      <Box as="span"> {detail}</Box>
    </Box>
  )
}

const MovieDetail = ({ id }: { id: string }): JSX.Element => {
  const { data, isLoading, isFetching, isError, error } = useQueryMovie(id)
  if (isError) {
    return (
      <Text fontSize="xl" fontWeight="md">
        {error.message}
      </Text>
    )
  }
  if (!data) {
    return (
      <Text fontSize="xl" fontWeight="md">
        Movie not found
      </Text>
    )
  }
  return (
    <>
      <Box>
        {(isLoading || isFetching) && <Spinner position="absolute" />}
        <SimpleGrid columns={2} minChildWidth="120px">
          <Box>
            <Image
              src={data?.Poster}
              fallbackSrc="https://via.placeholder.com/300"
            />
          </Box>
          <Box>
            <Box borderBottom="1px" borderBottomColor="gray.300" pb={2} mb={2}>
              <Text fontWeight="bold" fontSize="2xl">
                {data?.Title}
              </Text>
              <HStack spacing={4}>
                <Text>Rating: {data?.imdbRating}</Text>
                <Text>Votes: {data?.imdbVotes}</Text>
              </HStack>
            </Box>

            <VStack spacing={0} align="flex-start">
              <SimpleList title="Genre" detail={data.Genre} />
              <SimpleList title="Released" detail={data.Released} />
              <SimpleList title="Director" detail={data.Director} />
              <SimpleList title="Language" detail={data.Language} />
              <SimpleList title="Country" detail={data.Country} />
              <SimpleList title="Writer" detail={data.Writer} />
            </VStack>
            <Text my={4}>{data.Plot}</Text>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  )
}

const MovieDetailPage = (props) => {
  const { id } = props
  return (
    <PageShell>
      <MovieDetail id={id} />
    </PageShell>
  )
}

export default MovieDetailPage

const fetchMovie = async (id) => {
  const url = `${API_URL}&i=${id}`

  try {
    const request = await fetch(url)

    if (!request.ok) {
      throw new Error('Error')
    }
    const response = await request.json()
    if (response.Response === 'False') {
      throw new Error(response.Error)
    }
    return response
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context?.params?.id
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['movie', id], () => fetchMovie(id))

  return {
    props: {
      id: id,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  }
}
