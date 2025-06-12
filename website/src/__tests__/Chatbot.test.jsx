import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { describe, test, expect } from 'vitest'

// jsdom doesn't implement scrollIntoView
window.HTMLElement.prototype.scrollIntoView = () => {}
import Chatbot from '../Chatbot'

describe('Chatbot', () => {
  test('renders initial bot message', () => {
    render(<Chatbot />)
    expect(
      screen.getByText(/secureShield claims assistant/i)
    ).toBeInTheDocument()
  })
})
