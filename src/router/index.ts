import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import QuizView from '../views/QuizView.vue'
import SummaryView from '../views/SummaryView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: QuizView
  },
  {
    path: '/summary',
    name: 'Summary',
    component: SummaryView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
