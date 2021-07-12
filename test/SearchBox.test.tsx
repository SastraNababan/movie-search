import SearchBox from '@modules/movies/containers/SearchBox'
import { act } from 'react-dom/test-utils'
import { fireEvent, render, screen, waitFor } from './testUtils'

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

  it('should show Search Suggestion ', async () => {
    const result = render(<SearchBox />)
    const inputEl = screen.getByRole('textbox') as HTMLInputElement
    act(() => {
      fireEvent.change(inputEl, { target: { value: 'Bat' } })
    })
    await waitFor(() => {
      fireEvent.change(inputEl, { target: { value: 'Bat' } })
      expect(inputEl.value).toBe('Bat')
    })

    await waitFor(() => {
      inputEl.focus()
    })
    expect(inputEl).toHaveFocus()

    await waitFor(() => {
      expect(
        result.getByTestId('search-suggestion') as HTMLDivElement
      ).toBeInTheDocument()
    })
    // screen.debug()
  })
})
