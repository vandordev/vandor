import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { LandingSection } from './landing-section'

describe('LandingSection', () => {
  it('applies the default responsive spacing and wraps content in a max-width container', () => {
    const { container } = render(
      <LandingSection className="custom-shell" contentClassName="custom-content">
        <div>Content</div>
      </LandingSection>,
    )

    expect(container.firstChild).toBeTruthy()
    expect((container.firstChild as HTMLDivElement).className).toContain('pt-16')
    expect((container.firstChild as HTMLDivElement).className).toContain('sm:pt-20')
    expect((container.firstChild as HTMLDivElement).className).toContain('lg:pt-28')
    expect((container.firstChild as HTMLDivElement).className).toContain('bg-background')
    expect((container.firstChild as HTMLDivElement).className).toContain('custom-shell')
    expect((container.firstChild as HTMLDivElement).firstChild).toBeTruthy()
    expect(
      ((container.firstChild as HTMLDivElement).firstChild as HTMLDivElement).className,
    ).toContain('mx-auto')
    expect(
      ((container.firstChild as HTMLDivElement).firstChild as HTMLDivElement).className,
    ).toContain('max-w-[1440px]')
    expect(
      ((container.firstChild as HTMLDivElement).firstChild as HTMLDivElement).className,
    ).toContain('custom-content')
  })
})
