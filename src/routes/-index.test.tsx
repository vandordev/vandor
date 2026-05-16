import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { HomeLanding } from '../components/home-landing'

describe('Home route', () => {
  it('renders the Tailark hero section on the homepage', () => {
    render(<HomeLanding />)

    expect(screen.getAllByText('Vandor').length).toBeGreaterThan(0)
    expect(
      screen.getByRole('heading', {
        name: /ship faster\. integrate smarter\./i,
      }),
    ).toBeTruthy()
    expect(screen.getByRole('link', { name: /start building/i })).toBeTruthy()
    expect(screen.getByText(/building components/i)).toBeTruthy()
    expect(screen.getByRole('button', { name: /switch to system theme/i })).toBeTruthy()
  })
})
