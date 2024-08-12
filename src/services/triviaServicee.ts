import axios from 'axios'

const API_URL = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=hard&type=multiple'

export const fetchQuestions = async (amount: number, category: number, difficulty: string) => {
  const response = await axios.get(API_URL, {
    params: {
      amount,
      category,
      difficulty,
      type: 'multiple'
    }
  })
  return response.data.results
}
