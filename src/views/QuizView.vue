<template>
  <div class="quiz-view">
    <QuestionComponent v-if="!quizFinished" />
    <div v-else class="quiz-finished-message">
      <p>Quiz Completed!</p>
      <router-link to="/summary">View Summary</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/store/useQuizStore'
import QuestionComponent from '@/components/Question.vue'

export default defineComponent({
  name: 'QuizView',
  components: {
    QuestionComponent
  },
  setup() {
    const quizStore = useQuizStore()
    const router = useRouter()

    const quizFinished = computed(() => quizStore.quizFinished)

    onMounted(() => {
      quizStore.fetchQuestions()
    })

    const submitQuiz = () => {
      quizStore.finishQuiz()
      router.push('/summary')
    }

    return {
      quizFinished,
      submitQuiz
    }
  }
})
</script>

<style scoped>
.quiz-view {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}
</style>
