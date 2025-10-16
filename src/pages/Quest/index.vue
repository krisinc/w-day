<template>
  <div id="Quest">
    <section>
      <ul>
        <li v-for="(item, index) in quizItems" :key="index">
          <div class="hexagon">
            {{ item.title }}
          </div>
        </li>
        <li><div class="hexagon"></div></li>
        <li><div class="hexagon"></div></li>
      </ul>
    </section>
    <section>
      <ul>
        <li><div class="hexagon"></div></li>
        <li><div class="hexagon"></div></li>
      </ul>
    </section>
    <el-dialog
      v-model="dialogVisible"
      :title="currentQuiz.title"
      width="500"
      :before-close="handleClose"
    >
      <span>{{ currentQuiz.content }}</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="showAnswer = true"> Tell me why. </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"

const quizItems = ref([
  {
    title: "歷史",
    content:
      "古巴比倫王頒布了漢摩拉比法典，刻在黑色的玄武岩，所以請問愛在西元前是指西元前幾年？",
    answer: "西元前1699年，2001年發布范特西專輯，故應用2001年-3700年。",
  },
])

const dialogVisible = ref(false)
const showAnswer = ref(false)
const currentQuiz = ref({
  title: "",
  content: "",
  answer: "",
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
@import url("https://fonts.googleapis.com/css?family=Lobster");
.hexagon {
  width: 250px;
  height: 138px;
  background: #1e1e1e;
  position: relative;
  overflow: visible;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
}
.hexagon:before {
  content: "";
  position: absolute;
  left: 0;
  width: 0;
  height: 0;
  top: -78px;
  border-left: 125px solid transparent;
  border-right: 125px solid transparent;
  border-bottom: 78px solid #1e1e1e;
}
.hexagon:after {
  content: "";
  position: absolute;
  left: 0;
  width: 0;
  height: 0;
  bottom: -78px;
  border-left: 125px solid transparent;
  border-right: 125px solid transparent;
  border-top: 78px solid #1e1e1e;
}
section {
  padding: 100px 0 0 0;
  display: block;
  text-align: center;
  margin: 0 auto;
}
ul {
  padding: 0;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 10px;
  list-style: none;
  display: inline-block;
}
ul li {
  float: left;
  margin: 0;
  padding: 0 15px;
}
@media (max-width: 980px) {
  .hexagon {
    width: 200px;
    height: 115px;
    padding: 0;
  }
  .hexagon::before {
    top: -68px;
    border-left: 100px solid transparent;
    border-right: 100px solid transparent;
    border-bottom: 68px solid #1e1e1e;
  }
  .hexagon::after {
    bottom: -68px;
    border-left: 100px solid transparent;
    border-right: 100px solid transparent;
    border-top: 68px solid #1e1e1e;
  }
}
@media (max-width: 767px) {
  .hexagon {
    width: 300px;
    height: 175px;
    display: inline-block;
  }
  .hexagon::before {
    top: -86px;
    border-left: 150px solid transparent;
    border-right: 150px solid transparent;
    border-bottom: 87px solid #1e1e1e;
  }
  .hexagon::after {
    bottom: -86px;
    border-left: 150px solid transparent;
    border-right: 150px solid transparent;
    border-top: 87px solid #1e1e1e;
  }
  ul li {
    margin-bottom: 200px;
  }
}
</style>
