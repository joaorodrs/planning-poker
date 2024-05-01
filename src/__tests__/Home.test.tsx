import { describe, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import Home from '../pages'
import { DatabaseProvider } from '@/contexts/database'

describe('App', () => {
  it('renders the Home page', () => {
    render(
      <DatabaseProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </DatabaseProvider>
    )
  })
})
