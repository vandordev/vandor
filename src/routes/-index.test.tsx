import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { HomeLanding } from '../components/home-landing'

describe('Home route', () => {
  it('renders the Tailark hero section on the homepage', () => {
    render(<HomeLanding />)

    expect(screen.getAllByText('Vandor').length).toBeGreaterThan(0)
    expect(
      screen.getByRole('heading', {
        name: /developer tools, documentation, and technical work kept in one open ecosystem\./i,
      }),
    ).toBeTruthy()
    expect(screen.getByRole('link', { name: /see the work/i })).toBeTruthy()
    expect(screen.getByRole('link', { name: /read the writing/i })).toBeTruthy()
    expect(screen.getByText(/news from vandor/i)).toBeTruthy()
    expect(screen.getByText(/the ecosystem stays legible as it expands\./i)).toBeTruthy()
  })
})
