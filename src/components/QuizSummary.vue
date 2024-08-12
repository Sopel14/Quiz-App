<template>
  <div class="summary-container">
    <h2>Quiz Summary</h2>
    <p>Correct Answers: {{ correctAnswersCount }}</p>
    <p>Incorrect Answers: {{ incorrectAnswersCount }}</p>
    <ChartComponent
      :data="[correctAnswersCount, incorrectAnswersCount]"
      :labels="['Correct', 'Incorrect']"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useQuizStore } from '../store/useQuizStore'
import ChartComponent from './ChartComponent.vue'

export default defineComponent({
  name: 'QuizSummary',
  components: {
    ChartComponent
  },
  setup() {
    const quizStore = useQuizStore()

    const correctAnswersCount = computed(() => {
      return Object.keys(quizStore.answers).reduce((count, key) => {
        const index = Number(key)
        const question = quizStore.questions[index]
        if (quizStore.answers[index] === question.correct_answer) {
          count++
        }
        return count
      }, 0)
    })

    const incorrectAnswersCount = computed(() => {
      return quizStore.questions.length - correctAnswersCount.value
    })

    return {
      correctAnswersCount,
      incorrectAnswersCount
    }
  }
})
</script>

<style scoped>
.summary-container {
  padding: 20px;
  text-align: center;
}
</style>
