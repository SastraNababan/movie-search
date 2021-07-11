import SearchBox from '@modules/movies/containers/SearchBox'
import React from 'react'
import { render, screen, fireEvent } from './testUtils'

describe('Search Test', () => {
  test('smoke test', () => {
    render(<SearchBox />)
  })

  it('snapshot', () => {
    const { asFragment } = render(<SearchBox />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render inputbox', () => {
    render(<SearchBox />)
    const inputlEl = screen.getByRole('textbox')
    expect(inputlEl).toBeInTheDocument()
  })

  it('should show close button', () => {
    render(<SearchBox />)
    const inputlEl = screen.getByRole('textbox') as HTMLInputElement
    fireEvent.click(inputlEl)
    fireEvent.change(inputlEl, { target: { value: 'Bat' } })
    const buttonCloseEl = screen.getByRole('button') as HTMLInputElement
    expect(buttonCloseEl).toBeInTheDocument()
    expect(inputlEl.value).toBe('Bat')
  })

  it('should clear input button', () => {
    render(<SearchBox />)
    const inputlEl = screen.getByRole('textbox') as HTMLInputElement
    fireEvent.click(inputlEl)
    fireEvent.change(inputlEl, { target: { value: 'Bat' } })
    const buttonCloseEl = screen.getByRole('button') as HTMLInputElement
    fireEvent.click(buttonCloseEl)
    expect(inputlEl.value).toBe('')
  })
})
