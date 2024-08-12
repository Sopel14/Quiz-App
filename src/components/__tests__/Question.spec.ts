import { render, screen } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import Question from '@/components/Question.vue'
import { createTestingPinia } from '@pinia/testing'

describe('Question', () => {
  it('renders the question text', async () => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      initialState: {
        quiz: {
          currentQuestionIndex: 0,
          questions: [
            {
              question: 'What is 2 + 2?',
              correct_answer: '4',
              incorrect_answers: ['1', '2', '3']
            }
          ],
          answers: {}
        }
      }
    })

    render(Question, {
      global: {
        plugins: [pinia]
      }
    })

    const questionElement = await screen.findByText('What is 2 + 2?')
    expect(questionElement).not.toBeNull()
  })
})
