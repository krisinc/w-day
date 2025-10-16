<template>
  <div id="Quest">
    
    <el-dialog
      v-model="dialogVisible"
      :title="currentQuiz.title"
      width="500"
      :before-close="handleClose"
    >
      <span>{{ currentQuiz.content }}</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="showAnswer = true">
            Tell me why.
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const quizItems = ref([
  {
    title: '歷史',
    content: '古巴比倫王頒布了漢摩拉比法典，刻在黑色的玄武岩，所以請問愛在西元前是指西元前幾年？',
    answer: '西元前1699年，2001年發布范特西專輯，故應用2001年-3700年。'
  }
])

const dialogVisible = ref(false)
const showAnswer = ref(false)
const currentQuiz = ref({
  title: '',
  content: '',
  answer: ''
})

const handleClose = () => {
  dialogVisible.value = false
  showAnswer.value = false
}

onMounted(() => {
  // 初始化用，如果要預設開場動畫可以放這裡
})
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lobster');

</style>
