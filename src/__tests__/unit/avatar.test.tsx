import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'

import Avatar from '@/components/poker-desk/avatar'

describe('Avatar Component', () => {
  it('renders the avatar in the screen', () => {
    const props = {
      user: { id: 'string', name: 'João Paulo' },
      showCards: false
    }

    const card = render(
      <Avatar {...props} />
    ).baseElement

    expect(card).toBeVisible()
  })

  it('should not show user vote', () => {
    const voteValue = 4

    const props = {
      user: { id: 'string', name: 'João Paulo' },
      vote: voteValue,
      showCards: false
    }

    const card = render(
      <Avatar {...props} />
    ).baseElement

    expect(card).toBeVisible()
    expect(card).not.toHaveTextContent(String(voteValue))
  })

  it('should show user vote', () => {
    const voteValue = 4

    const props = {
      user: { id: 'string', name: 'João Paulo' },
      vote: voteValue,
      showCards: true
    }

    const card = render(
      <Avatar {...props} />
    ).baseElement

    expect(card).toBeVisible()
    expect(card).toHaveTextContent(String(voteValue))
  })
})
