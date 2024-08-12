<template>
  <div class="summary-view">
    <h1>Quiz Summary</h1>
    <div class="chart-container">
      <ChartComponent
        :data="[correctAnswersCount, incorrectAnswersCount]"
        :labels="['Correct', 'Incorrect']"
      />
    </div>
    <div class="results">
      <p><strong>Correct Answers:</strong> {{ correctAnswersCount }}</p>
      <p><strong>Incorrect Answers:</strong> {{ incorrectAnswersCount }}</p>
    </div>
    <div class="times" v-if="formattedTimes.length">
      <h2>Time Spent on Each Question</h2>
      <ul>
        <li v-for="(time, index) in formattedTimes" :key="index">
          Question {{ index + 1 }}: {{ time }} seconds
        </li>
      </ul>
    </div>
    <div class="previous-results" v-if="previousResults.length">
      <h2>Previous Quiz Results</h2>
      <ul>
        <li v-for="(result, index) in previousResults" :key="index">
          Quiz {{ index + 1 }} - Correct: {{ result.correct }}, Incorrect: {{ result.incorrect }}
        </li>
      </ul>
    </div>
    <router-link to="/">Start the quiz again</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useQuizStore } from '@/store/useQuizStore'
import ChartComponent from '@/components/ChartComponent.vue'

export default defineComponent({
  name: 'SummaryView',
  components: {
    ChartComponent
  },
  setup() {
    const quizStore = useQuizStore()

    const correctAnswersCount = computed(() => quizStore.correctAnswersCount)
    const incorrectAnswersCount = computed(() => quizStore.incorrectAnswersCount)
    const times = computed(() => quizStore.times || [])

    const formattedTimes = computed(() => times.value.map((time) => (time / 1000).toFixed(2)))

    const previousResults = computed(() => quizStore.previousResults || [])

    return {
      correctAnswersCount,
      incorrectAnswersCount,
      formattedTimes,
      previousResults
    }
  }
})
</script>

<style scoped>
.summary-view {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.chart-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto 20px auto;
}

.results,
.times,
.previous-results {
  width: 100%;
  max-width: 500px;
  margin-bottom: 20px;
}

.results p,
.times li,
.previous-results li {
  font-size: 1.2rem;
  margin: 5px 0;
}

.times ul,
.previous-results ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.times li,
.previous-results li {
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

router-link {
  font-size: 1.2rem;
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s;
  margin-top: 20px;
}

router-link:hover {
  color: #0056b3;
}
</style>
