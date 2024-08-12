<template>
  <canvas :id="chartId" ref="canvasRef"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { Chart, registerables } from 'chart.js'

export default defineComponent({
  name: 'ChartComponent',
  props: {
    data: {
      type: Array as () => number[],
      required: true
    },
    labels: {
      type: Array as () => string[],
      required: true
    },
    chartId: {
      type: String,
      default: 'resultChart'
    }
  },
  setup(props) {
    const canvasRef = ref<HTMLCanvasElement | null>(null)
    let chartInstance: Chart | null = null

    const initializeChart = () => {
      const canvasElement = canvasRef.value
      if (!canvasElement) {
        console.error('Canvas element is not available')
        return
      }

      const ctx = canvasElement.getContext('2d')
      if (!ctx) {
        console.error('Failed to get canvas context')
        return
      }

      if (chartInstance) {
        chartInstance.destroy()
      }

      chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: props.labels,
          datasets: [
            {
              data: props.data,
              backgroundColor: ['#4caf50', '#f44336']
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      })
    }

    onMounted(() => {
      Chart.register(...registerables)
      initializeChart()
    })

    return {
      canvasRef
    }
  }
})
</script>

<style scoped>
canvas {
  max-width: 100%;
  height: 300px;
}
</style>
