<template>
  <div class="progress-container">
    <div class="progress-bar" :style="{ width: progressPercentage + '%' }"></div>
    <p>{{ currentQuestionIndex + 1 }} / {{ totalQuestions }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useQuizStore } from '../store/useQuizStore'

export default defineComponent({
  name: 'QuizProgress',
  setup() {
    const quizStore = useQuizStore()

    const currentQuestionIndex = computed(() => quizStore.currentQuestionIndex)
    const totalQuestions = computed(() => quizStore.questions.length)

    const progressPercentage = computed(() => {
      return ((currentQuestionIndex.value + 1) / totalQuestions.value) * 100
    })

    return {
      currentQuestionIndex,
      totalQuestions,
      progressPercentage
    }
  }
})
</script>

<style scoped>
.progress-container {
  width: 100%;
  background-color: #f3f3f3;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.progress-bar {
  height: 10px;
  background-color: #4caf50;
  transition: width 0.3s;
}
</style>
