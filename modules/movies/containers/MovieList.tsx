import {
  Box,
  Button,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import useOnScreen from '@modules/shared/hooks/useOnScreen'
import { formatNumber } from '@modules/shared/utils'
import { Search } from '@type/api-search-response'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RootDispatch, RootState } from 'store'
import MovieListItem from '../components/MovieListItem'
import MovieNotFound from '../components/MovieNotFound'
import useQueryMovies from '../hooks/useQueryMovies'

const MovieList = ({ movies, load, search, updateKeyword }) => {
  if (JSON.stringify(search) === '{}') {
    return null
  } else {
    return MovieListContainer(movies, load, search, updateKeyword)
  }
}

const MovieListContainer = (movies, load, search, updateKeyword) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const loadMoreButtonRef = React.useRef()
  const totalItems = React.useRef(1)

  const [selectedMovie, setSelectedMovie] = useState<Search>(null)

  const onSelectMovie = (movie) => {
    setSelectedMovie(movie)
    onOpen()
  }
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useQueryMovies(search)

  useEffect(() => {
    if (data) {
      load(data.pages)
    }
  }, [data, search])

  const onScreen = useOnScreen(loadMoreButtonRef)

  useEffect(() => {
    if (onScreen === true) {
      if (hasNextPage) {
        fetchNextPage()
      }
    }
  }, [onScreen, hasNextPage])

  return (
    <>
      {/* {isFetching && <Spinner color="red.500" />} */}

      <Box>
        <Box py={2}>
          {isFetching && (
            <HStack>
              <Spinner color="red.500" size="sm" />{' '}
              <Text fontSize="sm" color="gray.500" py={1}>
                Searching Movie ...{' '}
              </Text>
            </HStack>
          )}
          {totalItems.current > 0 && movies.length > 0 && (
            <Text fontSize="sm" color="gray.500" py={1}>
              About {formatNumber(totalItems.current)} results
            </Text>
          )}
        </Box>
        {movies.map((page, index) => {
          totalItems.current = page.totalResults
          return (
            <MovieListItem
              key={index}
              page={page}
              selectMovie={onSelectMovie}
            />
          )
        })}
      </Box>

      <Box>
        {status == 'error' && (
          <>
            <MovieNotFound
              error={error}
              load={load}
              updateKeyword={updateKeyword}
            />
          </>
        )}
      </Box>

      <div ref={loadMoreButtonRef}>
        {status !== 'error' && movies.length > 0 && (
          <Button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? 'Loading ...'
              : hasNextPage
              ? 'Load Newer'
              : 'Nothing more to load'}
          </Button>
        )}
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedMovie?.Title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
              src={selectedMovie?.Poster}
              alt={selectedMovie?.Title}
              boxSize="100%"
              objectFit="cover"
              fallbackSrc="https://via.placeholder.com/150"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

const mapProps = (state: RootState) => ({
  movies: state.movies,
  search: state.search,
})

const mapDispatch = (dispatch: RootDispatch) => ({
  load: dispatch.movies.load,
  updateKeyword: dispatch.search.load,
})

export default connect(mapProps, mapDispatch)(MovieList)
