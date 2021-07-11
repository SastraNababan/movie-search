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
        // bg="white"
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
      {/* <Box
        position="fixed"
        bottom="0"
        left="0"
        zIndex="sticky"
        borderTop="1px"
        borderColor="gray.200"
        py={2}
        w="full"
      >
        <footer>
          <Container maxW={{ xl: '1200px' }}>
            <Flex>
              <Box>
                <span>React Query Example</span>
              </Box>
              <Spacer />
              <Box>
                <Link href="https://github.com/sastranababan" isExternal mx={4}>
                  <Icon as={FaGithub} w={6} h={6} color="#24292e" />
                </Link>
                <Link href="https://www.youtube.com/sastranababan" isExternal>
                  <Icon as={FaYoutube} w={6} h={6} color="#c4302b" />
                </Link>
                <Code ml={4}>Sastra Nababan</Code>
              </Box>
            </Flex>
          </Container>
        </footer>
      </Box> */}
    </Container>
  </div>
)

export default PageShell
