import { Box, Center, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { InfoOutlineIcon } from '@chakra-ui/icons'
const MovieNotFound = ({ error, load }) => {
  useEffect(() => {
    load([])
  }, [])

  return (
    <Center m={10}>
      <Box maxW="md" bg={useColorModeValue('white', 'gray.700')} p={10}>
        <InfoOutlineIcon w={20} h={20} color="red.400" />
        <Heading as="h3" fontWeight="medium">
          Sorry, no result found
        </Heading>
        <Text>{error.message}</Text>
      </Box>
    </Center>
  )
}

export default MovieNotFound
