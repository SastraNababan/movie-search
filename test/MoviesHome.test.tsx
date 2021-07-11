import React from 'react'
import Movies from '../pages/movies'
import { render } from './testUtils'

describe('Movies Home page', () => {
  test('smoke test', () => {
    render(<Movies />)
  })

  it('snapshot', () => {
    const { asFragment } = render(<Movies />)
    expect(asFragment()).toMatchSnapshot()
  })
})
