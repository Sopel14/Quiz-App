import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useQuizStore } from '@/store/useQuizStore'
import { fetchQuestions } from '@/services/triviaServicee'

vi.mock('@/services/triviaServicee', () => ({
  fetchQuestions: vi.fn()
}))

describe('useQuizStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('fetches questions and initializes the quiz', async () => {
    const store = useQuizStore()

    const mockQuestions = [
      { question: 'What is 2+2?', correct_answer: '4', incorrect_answers: ['1', '2', '3'] },
      {
        question: 'What is the capital of France?',
        correct_answer: 'Paris',
        incorrect_answers: ['London', 'Berlin', 'Rome']
      }
    ]
    ;(fetchQuestions as any).mockResolvedValueOnce(mockQuestions)

    await store.fetchQuestions()

    expect(store.questions).toHaveLength(mockQuestions.length)
    expect(store.currentQuestionIndex).toBe(0)
    expect(store.answers).toEqual({})
    expect(store.times).toEqual([])
  })

  it('sets an answer correctly', () => {
    const store = useQuizStore()
    store.setAnswer(0, '4')
    expect(store.answers[0]).toBe('4')
  })

  it('moves to the next question correctly', () => {
    const store = useQuizStore()
    store.questions = [{}, {}]
    store.nextQuestion()
    expect(store.currentQuestionIndex).toBe(1)
  })

  it('does not move past the last question', () => {
    const store = useQuizStore()
    store.questions = [{}, {}]
    store.currentQuestionIndex = 1
    store.nextQuestion()
    expect(store.currentQuestionIndex).toBe(1)
  })

  it('calculates correct answers count', () => {
    const store = useQuizStore()
    store.questions = [{ correct_answer: '4' }, { correct_answer: 'Paris' }]
    store.answers = {
      0: '4',
      1: 'Berlin'
    }

    expect(store.correctAnswersCount).toBe(1)
    expect(store.incorrectAnswersCount).toBe(1)
  })

  it('finishes the quiz and records the result', () => {
    const store = useQuizStore()
    store.questions = [{ correct_answer: '4' }, { correct_answer: 'Paris' }]
    store.answers = {
      0: '4',
      1: 'Berlin'
    }
    store.finishQuiz()
    expect(store.previousResults).toHaveLength(1)
    expect(store.previousResults[0].correct).toBe(1)
    expect(store.previousResults[0].incorrect).toBe(1)
  })
})
