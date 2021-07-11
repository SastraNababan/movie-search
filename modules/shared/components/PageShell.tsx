import {
  Box,
  Container,
  Flex,
  Heading,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react'
import Head from 'next/head'
import React, { ReactNode } from 'react'
import ColorModeSwitcher from './ColorModeSwitcher'

type Props = {
  children?: ReactNode
  title?: string
}

const PageShell = ({ children, title = 'Movie Search' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.700')}
        borderBottom="1px"
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        alignItems="center"
        shadow="sm"
        position="fixed"
        width="100%"
        top={0}
        zIndex={100}
      >
        <Box px={5}>
          <Heading
            fontSize="lg"
            bgGradient="linear(to-l, #7928CA,#FF0080)"
            bgClip="text"
          >
            {title}
          </Heading>
        </Box>

        <Spacer />
        <ColorModeSwitcher />
      </Flex>
    </Box>
    <Container maxW="container.md" h="100vh">
      <Box pt={20}>{children}</Box>
    </Container>
  </div>
)

export default PageShell
