import { render } from '@testing-library/react'
import Header from '../../components/Header'

it('should render invoice manager heading', () => {
  const { getByText } = render(<Header />)
  expect(getByText('Invoice Manager')).toBeInTheDocument()
})