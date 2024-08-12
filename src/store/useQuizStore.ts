import { defineStore } from 'pinia'
import { fetchQuestions } from '../services/triviaServicee'

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    questions: [] as any[],
    currentQuestionIndex: 0,
    answers: {} as Record<number, string>,
    startTime: null as number | null,
    times: [] as number[],
    previousResults: [] as { correct: number; incorrect: number; times: number[] }[]
  }),
  actions: {
    async fetchQuestions() {
      try {
        const questions = await fetchQuestions(10, 18, 'hard')
        this.questions = questions
        this.currentQuestionIndex = 0
        this.answers = {}
        this.times = []
        this.startTime = Date.now()
      } catch (error) {
        console.error('Failed to fetch questions:', error)
        this.questions = []
      }
    },
    setAnswer(index: number, answer: string) {
      this.answers[index] = answer
    },

    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        if (this.startTime !== null) {
          const timeSpent = Date.now() - this.startTime
          this.times.push(timeSpent)
        }
        this.currentQuestionIndex++
        this.startTime = Date.now()
      }
    },
    previousQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--
      }
    },
    finishQuiz() {
      if (this.startTime !== null) {
        const timeSpent = Date.now() - this.startTime
        this.times.push(timeSpent)
      }

      const correct = this.correctAnswersCount
      const incorrect = this.questions.length - correct
      this.previousResults.push({
        correct,
        incorrect,
        times: [...this.times]
      })
    }
  },
  getters: {
    currentQuestion: (state) => state.questions[state.currentQuestionIndex],
    quizFinished: (state) =>
      state.questions.length > 0 && state.currentQuestionIndex >= state.questions.length,
    correctAnswersCount: (state) => {
      return Object.keys(state.answers).reduce((count, key) => {
        const index = Number(key)
        const question = state.questions[index]
        if (state.answers[index] === question.correct_answer) {
          count++
        }
        return count
      }, 0)
    },
    incorrectAnswersCount: (state) => {
      return state.questions.length - state.correctAnswersCount
    }
  }
})
