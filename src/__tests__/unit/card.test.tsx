import { describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Card from '@/components/card'

describe('Card Component', () => {
  it('renders the card in the screen', () => {
    const props = {
      isSelected: false,
      onSelectCard: () => undefined,
      isDisabled: false
    }

    const card = render(
      <Card {...props} />
    ).baseElement

    expect(card).toBeVisible()
  })

  it('renders card with passed value prop', () => {
    const cardValue = 3

    const props = {
      isSelected: false,
      onSelectCard: () => undefined,
      isDisabled: false,
      value: cardValue
    }

    const card = render(
      <Card {...props} />
    ).baseElement

    expect(card).toBeVisible()
    expect(card).toHaveTextContent(String(cardValue))
  })

  it('renders card as disabled', () => {
    const props = {
      isSelected: false,
      onSelectCard: () => undefined,
      isDisabled: true
    }

    const card = render(
      <Card {...props} />
    ).queryByRole('button')

    expect(card).toBeVisible()
    expect(card).toHaveAttribute('data-is-disabled', 'true')
  })

  it('renders card as selected', () => {
    const props = {
      isSelected: true,
      onSelectCard: () => undefined,
      isDisabled: false
    }

    const card = render(
      <Card {...props} />
    ).queryByRole('button')

    expect(card).toBeVisible()
    expect(card).toHaveAttribute('data-is-selected', 'true')
  })

  it('calls callback function on click', async () => {
    const user = userEvent.setup()
    const selectCallback = vi.fn()

    const props = {
      isSelected: false,
      onSelectCard: selectCallback,
      isDisabled: false
    }

    const card = render(
      <Card {...props} />
    ).queryByRole('button')

    expect(card).not.toBe(null)

    await user.click(card as HTMLElement)

    expect(selectCallback.mock.calls.length).toBe(1)
  })
})
