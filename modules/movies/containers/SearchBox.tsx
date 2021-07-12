import { SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  CloseButton,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  ListItem,
  UnorderedList,
  useColorModeValue,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { RootDispatch, RootState } from 'store'
import { useDebounce } from 'use-debounce'
import useQuerySearchMovies from '../hooks/useQuerySearchMovie'

const SearchBox = (props) => {
  const [input, setInput] = useState('')
  const inputRef = React.useRef<HTMLInputElement>()
  // const [keyword] = useDebounce(inputRef?.current?.value, 500)
  const [keyword] = useDebounce(input, 500)
  // const keyword = input
  const [showSearchSuggestion, setShowSearchSuggestion] = useState(false)

  const onSubmit = () => {
    props.load({ s: keyword })
    props.updateMovies([])
    setShowSearchSuggestion(false)
  }
  const handleSubmit = (e) => {
    const keyword = input //inputRef?.current?.value || ''
    if (keyword) {
      onSubmit()
    }
    e.preventDefault()
  }

  const onSelectItem = (item) => {
    setInput(item)
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box position="relative">
        <HStack>
          <InputGroup size="lg">
            <InputLeftElement
              pointerEvents="none"
              // eslint-disable-next-line react/no-children-prop
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              placeholder="Search movies ..."
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setShowSearchSuggestion(true)}
              onBlur={() => setShowSearchSuggestion(false)}
              value={input}
            />
            {inputRef && (
              <InputRightElement width="4.5rem">
                <CloseButton
                  onClick={() => {
                    setInput('')
                  }}
                />
              </InputRightElement>
            )}
          </InputGroup>
        </HStack>
        {showSearchSuggestion && keyword && (
          <SearchSuggestion q={{ s: keyword }} onSelectItem={onSelectItem} />
        )}
      </Box>
    </form>
  )
}

export const SearchSuggestion = ({ q, onSelectItem }) => {
  const { data } = useQuerySearchMovies(q)
  return (
    <Box
      data-testid="search-suggestion"
      position="absolute"
      bg={useColorModeValue('white', 'gray.700')}
      p={4}
      shadow="md"
      width="100%"
      zIndex="100"
      visibility={data ? 'visible' : 'hidden'}
    >
      <UnorderedList>
        {data &&
          data.Search.map((movie, i) => (
            <ListItem
              key={i}
              cursor="pointer"
              _hover={{
                color: 'teal.500',
              }}
              onMouseDown={() => onSelectItem(movie.Title)}
              name={movie.Title}
              listStyleType="none"
              p={1}
            >
              {movie.Title}
            </ListItem>
          ))}
      </UnorderedList>
    </Box>
  )
}

const mapProps = (state: RootState) => ({
  search: state.search,
})

const mapDispatch = (dispatch: RootDispatch) => ({
  load: dispatch.search.load,
  updateMovies: dispatch.movies.load,
})

export default connect(mapProps, mapDispatch)(SearchBox)
