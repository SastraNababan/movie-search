import { Box, HStack, chakra, Image, Text } from '@chakra-ui/react'
import Link from 'next/link'

const MovieListItem = ({ page, selectMovie }) => {
  return (
    <Box>
      {page?.Search?.map((movie, i) => {
        return (
          <HStack py={4} key={i}>
            <Image
              src={movie.Poster}
              alt={movie.Title}
              boxSize="50px"
              objectFit="cover"
              fallbackSrc="https://via.placeholder.com/50"
              onClick={() => selectMovie(movie)}
            />
            <Link href={`/movies/${movie.imdbID}`} passHref>
              <chakra.a
                _hover={{
                  color: 'teal.500',
                }}
              >
                <Box ml={4}>
                  <Text as="h3" fontSize="lg" fontWeight="bold">
                    {movie.Title}
                  </Text>
                  <HStack>
                    <Text
                      fontSize="sm"
                      color="GrayText"
                    >{`Year: ${movie.Year}`}</Text>
                    <Text
                      fontSize="sm"
                      color="GrayText"
                    >{`Type: ${movie.Type}`}</Text>
                  </HStack>
                </Box>
              </chakra.a>
            </Link>
          </HStack>
        )
      })}
    </Box>
  )
}

export default MovieListItem
