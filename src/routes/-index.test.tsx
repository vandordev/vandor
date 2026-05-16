import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { HomeLanding } from '../components/home-landing'

describe('Home route', () => {
  it('renders the Tailark hero section on the homepage', () => {
    render(<HomeLanding />)

    expect(screen.getAllByText('Vandor').length).toBeGreaterThan(0)
    expect(
      screen.getByRole('heading', {
        name: /open-source tools for structured go backends\./i,
      }),
    ).toBeTruthy()
    expect(screen.getAllByRole('link', { name: /install vx/i }).length).toBeGreaterThan(0)
    expect(screen.getByText(/vandor builds vx, a cli/i)).toBeTruthy()
    expect(screen.getByText(/generating domain core/i)).toBeTruthy()
    expect(screen.getByRole('button', { name: /read the vx docs/i })).toBeTruthy()
  })
})
