// import { render } from '@testing-library/react'
import { render, screen } from '../../../../test/testUtils'
import PageShell from '../PageShell'

describe('Page Shell', () => {
  it('snapshot', () => {
    const { asFragment } = render(<PageShell />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render header', () => {
    render(<PageShell title="Page Title" />)
    const headingElement = screen.getByRole('heading')
    expect(headingElement).toBeInTheDocument()
    expect(headingElement).toHaveTextContent('Page Title')
  })
})
