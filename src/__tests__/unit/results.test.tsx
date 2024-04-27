import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'

import votings from '@/__tests__/mock/votings.json'
import Results from '@/components/poker-desk/results'

describe('Results Component', () => {
  it('renders the results in the screen', () => {
    const props = {
      votings: []
    }

    const element = render(
      <Results {...props} />
    ).baseElement

    expect(element).toBeVisible()
  })

  it('should show the correct average value', () => {
    const votingsAverage =
      votings.reduce((prev, curr) => prev + curr.vote, 0)
      / votings.length

    const props = {
      votings: votings
    }

    const element = render(
      <Results {...props} />
    ).baseElement

    expect(element).toBeVisible()
    expect(element).toHaveTextContent(votingsAverage.toFixed(1))
  })

  it('should show the correct card vote amounts', () => {
    const uniqueVotings = votings.filter((item, idx, array) => array.findIndex(v => v.vote === item.vote) === idx)

    const props = {
      votings: votings
    }

    const element = render(
      <Results {...props} />
    ).getAllByTestId('vote-label')

    uniqueVotings.forEach((vote, index) => {
      const amount = uniqueVotings.filter(item => item.vote === vote.vote).length

      expect(element[index]).toHaveTextContent(String(amount))
    })
  })
})
