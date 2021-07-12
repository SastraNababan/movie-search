// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { setLogger } from 'react-query'

const resp = {
  data: {
    Search: [
      {
        Title: 'The ABC Murders',
        Year: '2018',
        imdbID: 'tt8463714',
        Type: 'series',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BYmJmNzU0NTgtOGM5Ni00MWJiLTgwZmMtNDIyNjYzZDAzNzI5XkEyXkFqcGdeQXVyMjExMjk0ODk@._V1_SX300.jpg',
      },
      // {
      //   Title: 'ABC Afterschool Specials',
      //   Year: '1972–1997',
      //   imdbID: 'tt0202179',
      //   Type: 'series',
      //   Poster:
      //     'https://m.media-amazon.com/images/M/MV5BOTY2MmRiZjQtM2MyMC00MDViLThhMjUtYzZiN2JkYzA4NDE5XkEyXkFqcGdeQXVyMTY2MzYyNzA@._V1_SX300.jpg',
      // },
    ],
    totalResults: '311',
    Response: 'True',
  },
}

export const handlers = [
  rest.get('*', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(resp.data))
  }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// silence react-query errors
setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
})
