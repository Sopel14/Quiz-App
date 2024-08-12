<template>
  <div class="question-container" v-if="currentQuestion">
    <div class="progress-container">
      <div class="progress-bar" :style="{ width: progressPercentage + '%' }"></div>
      <p class="progress-text">{{ currentIndex + 1 }} / {{ totalQuestions }} Questions</p>
    </div>

    <h2>{{ currentQuestion.question }}</h2>
    <ul>
      <li v-for="(answer, index) in shuffledAnswers" :key="index">
        <label>
          <input
            type="radio"
            :name="`question-${currentIndex}`"
            :value="answer"
            v-model="selectedAnswer"
            @change="submitAnswer"
          />
          {{ answer }}
        </label>
      </li>
    </ul>
    <div class="navigation-buttons">
      <button @click="previousQuestion" :disabled="isFirstQuestion">Previous</button>
      <button v-if="!isLastQuestion" @click="nextQuestion" :disabled="!selectedAnswer">Next</button>
      <button v-else @click="submitQuiz" :disabled="!selectedAnswer">Submit Quiz</button>
    </div>
  </div>
  <div v-else>
    <p>Loading question...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '../store/useQuizStore'

export default defineComponent({
  name: 'QuestionComponent',
  setup() {
    const quizStore = useQuizStore()
    const router = useRouter()
    const selectedAnswer = ref('')

    const currentQuestion = computed(() => quizStore.currentQuestion)

    const shuffledAnswers = computed(() => {
      if (!currentQuestion.value) return []
      const answers = [
        ...currentQuestion.value.incorrect_answers,
        currentQuestion.value.correct_answer
      ]
      return answers.sort(() => Math.random() - 0.5)
    })

    const currentIndex = computed(() => quizStore.currentQuestionIndex)
    const totalQuestions = computed(() => quizStore.questions.length)
    const isFirstQuestion = computed(() => currentIndex.value === 0)
    const isLastQuestion = computed(() => currentIndex.value === totalQuestions.value - 1)

    const progressPercentage = computed(() => {
      return totalQuestions.value ? ((currentIndex.value + 1) / totalQuestions.value) * 100 : 0
    })

    const submitAnswer = () => {
      quizStore.setAnswer(currentIndex.value, selectedAnswer.value)
    }

    const nextQuestion = () => {
      submitAnswer()
      if (!isLastQuestion.value) {
        quizStore.nextQuestion()
        selectedAnswer.value = quizStore.answers[quizStore.currentQuestionIndex] || ''
      }
    }

    const previousQuestion = () => {
      quizStore.previousQuestion()
      selectedAnswer.value = quizStore.answers[quizStore.currentQuestionIndex] || ''
    }

    const submitQuiz = () => {
      submitAnswer()
      quizStore.finishQuiz()
      router.push('/summary')
    }

    return {
      currentQuestion,
      shuffledAnswers,
      selectedAnswer,
      currentIndex,
      totalQuestions,
      isFirstQuestion,
      isLastQuestion,
      progressPercentage,
      submitAnswer,
      nextQuestion,
      previousQuestion,
      submitQuiz
    }
  }
})
</script>

<style scoped>
.question-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.progress-container {
  width: 100%;
  background-color: #f3f3f3;
  border-radius: 5px;
  margin-bottom: 20px;
  position: relative;
}

.progress-bar {
  height: 10px;
  background-color: #4caf50;
  border-radius: 5px;
  transition: width 0.3s ease;
}

.progress-text {
  position: absolute;
  top: -35px;
  right: 0;
  left: 0;
  font-size: 14px;
  color: #333;
  text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

label {
  cursor: pointer;
  display: block;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  transition: background-color 0.3s ease;
}

label:hover {
  background-color: #e6f7ff;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

button:disabled {
  background-color: #cccccc;
}

button:hover:enabled {
  background-color: #0056b3;
}
</style>
