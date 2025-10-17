<template>
  <div id="Quest">
    <section>
      <ul>
        <li
          v-for="(item, index) in quizItems"
          :key="index"
          @click="showDialog(item)"
        >
          <div class="hexagon">
            {{ item.title }}
          </div>
        </li>
      </ul>
    </section>
    <section>
      <ul>
        <li
          v-for="(item, index) in quizItems2"
          :key="index"
          @click="showDialog(item)"
        >
          <div class="hexagon">
            {{ item.title }}
          </div>
        </li>
      </ul>
    </section>
    <el-dialog
      v-model="dialogVisible"
      :title="currentQuiz.title"
      width="500"
      :before-close="handleClose"
    >
      <div class="dialog__content" v-html="currentQuiz.qaPair[curQuizIndex].content"/>
      <div :class="['answer', {showAnswer}]">A: {{ currentQuiz.qaPair[curQuizIndex].answer }}</div>
      <template #footer>
        <div class="dialog-footer">
          <el-button v-if="!showAnswer" type="primary" @click="showAnswer = true"> Tell me why </el-button>
          <el-button v-if="curQuizIndex < currentQuiz.qaPair.length - 1" type="primary" @click="nextQuiz()"> Next Quiz </el-button>
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
    key: 'history',
    qaPair: [
      {
        content:
          '請問新郎新娘是在哪裡拍的照？',
        answer: '台南，前面放了兩個小時喔。',
      },
      {
        content:
          `
            請問自由鋼彈的駕駛員是誰？<br>
            Ａ· 煌·大和。<br>
            Ｂ· 阿斯蘭·薩拉。<br>
            Ｃ· 松井秀喜。<br>
            Ｄ· 川島茉樹代。<br>
          `,
        answer: 'Ａ·煌·大和。',
      },
      {
        content:
          `
            伊修瓦爾內亂發生於大陸曆1901年，因為一名亞美斯多利斯軍人茱麗葉·道格拉斯上尉無故槍殺當地女孩引起，實為人造人為製造藉口屠殺伊修瓦爾人，由恩維偽裝成一名反戰派軍官下手，挑起事端。暴動由最初的伊修瓦爾地區不斷擴大，之後蔓延至整個國家東部，並演變成為持續七年的消耗戰。請問由大總統金格·布拉德雷簽發的「大總統令3066號」，動用軍隊和國家鍊金術師對伊修瓦爾進行殲滅戰，於何年簽署？<br>
            Ａ· 大陸曆1904年。<br>
            Ｂ· 大陸曆1908年。<br>
            Ｃ· 大陸曆1914年。<br>
            Ｄ· 大陸曆1939年。<br>
          `,
        answer: 'Ｂ· 大陸曆1908年。',
      },
      {
        content:
          '古巴比倫王頒布了漢摩拉比法典，刻在黑色的玄武岩，所以請問愛在西元前是指西元前幾年？',
        answer: '西元前1699年，2001年發布范特西專輯，故應用2001年-3700年。',
      },
      {
        content:
          `
            請問輔大文學院的前任院長歷史系是哪一位知名 Youtuber 的家長？<br>
            Ａ· Hook。<br>
            Ｂ· 蒼藍鴿。<br>
            Ｃ· 愛莉莎莎。<br>
            Ｄ· 喬瑟夫Chillseph。<br>
          `,
        answer: 'Ｃ· 愛莉莎莎。',
      },
    ]
  },
  {
    title: '音樂',
    key: 'music',
    qaPair: [
      {
        content: '搶答題，接下來會播一小段前奏，請回答完整歌名與歌手為何，共十題，最後總分較高者獲勝。',
        answer: '',
      }
    ],
  },
  {
    title: '國文',
    key: 'chinses',
    qaPair: [
      {
        content:
          '請問咖啡因與咖啡果之間的因果關係為何？',
        answer: '咖啡因來自咖啡果，所以咖啡果是因，咖啡因是果。',
      },
      {
        content:
          '承上題，所以咖啡是不是一種豆漿？',
        answer: '慈慈說是就是。',
      },
      {
        content:
          '『用電鰻的電電電鰻電鰻會被電鰻的電電死嗎？』請問上列句子中作為動詞的電有幾個？',
        answer: '2，chatGPT說的。',
      },
      {
        content:
          '東市買駿馬，西市買鞍韉，南市買轡頭，北市？',
        answer: '買長鞭啦，才不是什麼正常上班上課。',
      },
      {
        content:
          `
            以下何者為錯誤的足球越位規則之敘述？<br>
            Ａ·當球員所在的位置比「球和站在最後第二位的對方球員更靠近對方底線」，就處於越位位置。<br>
            Ｂ·若此球員處於本方半場內，亦受此限制。<br>
            Ｃ·如果球員和最後第二名對方球員平行，則不算越位。<br>
            Ｄ·一名球員處在越位位置的定義是，該球員身體（不包括手臂）的任何部位，比對方站在最後第二位的球員的身體（不包括手臂）的任何部位，和比球的任何部位都更靠近對方的底線時，即處於越位位置。<br>
          `,
        answer: 'Ｂ·若此球員處於本方半場內，”則不“受此限制。',
      }
    ]
  },
])

const quizItems2 = ref([
  {
    title: '英文',
    key: 'english',
    qaPair:[
      {
        content:
          `
            Never gonna give you up, never gonna let you down
            Never gonna ___ ______ ___ ______ ___
            Never gonna make you cry, never gonna say goodbye
            Never gonna tell a lie and hurt you
          `,
        answer: 'run around and desert you',
      },
      {
        content:
          `
            <a href='https://www.youtube.com/shorts/co_QZtZT89I' target=”_blank”>請聽題！</a>
          `,
        answer: 'Number 5.',
      },
      {
        content:
          `
            眾所周知，英國號稱足球起源地，而大考中心本人最喜歡的運動就是足球，而這個大題是英文，所以出點足球相關也是合情合理。<br>
            請問大考中心目前支持的是下列哪一隻球隊？<br>
            Ａ· 切爾西。<br>
            Ｂ· 巴黎聖日爾曼。<br>
            Ｃ· 巴薩隆納。<br>
            Ｄ· 拜仁慕尼黑。<br>
          `,
        answer: 'Ａ· 切爾西。',
      },
      {
        content:
          `
            眾所周知，Java 是一種程式語言，Javascript 也是一種程式語言。兩者之間關係為何？<br>
            Ａ· Javascript 是 Java 的爸爸。<br>
            Ｂ· Java 是 Javascript 的爸爸。<br>
            Ｃ· 沒有關係。<br>
          `,
        answer: 'Ｃ· 沒有關係。',
      },
      {
        content:
          `
            50-50俱樂部（英語：50-50 club），是指MLB球員在單一球季例行賽中完成50支全壘打與50次盜壘的紀錄。在大聯盟百年的歷史中，目前只有1位球員完成此項紀錄，請問該名球員為何？<br>
            Ａ· Lionel Andrés "Leo" Messi Cuccittini。<br>
            Ｂ· Barry Lamar Bonds。<br>
            Ｃ· Derek Sanderson Jeter。<br>
            Ｄ· Shohei Ohtani。<br>
          `,
        answer: 'Ｄ· Shohei Ohtani。',
      }
    ]
  },
  {
    title: '生物',
    key: 'biology',
    qaPair: [
      {
        content:
          '請問酷拉皮卡中指的念能力是什麼？',
        answer: '只能使用在幻影旅團的成員身上，若用在旅團成員以外的人身上，使用者心臟就會爆裂。',
      },
      {
        content:
          `
            轟焦凍是知名動漫『我的英雄學院』的角色，是個半頭白髮小酷哥，請問他一開始不願意使用他哪一部分的能力？<br>
            Ａ·飛行。<br>
            Ｂ·冰凍。<br>
            Ｃ·火焰。<br>
            Ｄ·冰火。<br>
          `,
        answer: 'Ｃ·火焰。',
      },
      {
        content:
          `
            以下何者敘述正確？<br>
            Ａ·旋渦鳴人體內的九尾狐是從六尾進化的。<br>
            Ｂ·賽佛勒斯·石內卜是一個混血巫師。他是女巫艾娃·格林和麻瓜托比亞·石內卜的兒子。<br>
            Ｃ·藥師少女的獨語的女主角叫做貓貓，她百毒不侵。<br>
            Ｄ·旗木卡卡西一直蓋著他的左眼，是因為他是人造人，左眼上有他是人造人的記號。<br>
          `,
        answer: 'Ｃ·藥師少女的獨語的女主角叫做貓貓，她百毒不侵。',
      },
      {
        content:
          `
            進擊的巨人中的里維·阿卡曼身高為何？<br>
            Ａ· 177公分。<br>
            Ｂ· 160公分。<br>
            Ｃ· 161公分。<br>
            Ｄ· 162公分。<br>
          `,
        answer: 'Ｂ· 160公分。',
      },
      {
        content:
          `
            猿飛阿斯瑪是第三代火影猿飛蒜山的兒子，猿飛木葉丸是第三代火影猿飛蒜山的孫子，請問木葉丸要叫阿斯瑪什麼？<br>
            Ａ· 舅舅。<br>
            Ｂ· 叔叔。<br>
            Ｃ· 爸爸。<br>
            Ｄ· 媽媽。<br>
          `,
        answer: 'Ｂ· 叔叔。',
      }

    ]
  },

])



const dialogVisible = ref(false)
const showAnswer = ref(false)
const curQuizIndex = ref(0)
const currentQuiz = ref({
  title: '',
  key: '',
  qaPair: [
    {
      content: '',
      answer: '',
    },
  ]
})

const showDialog = (item) => {
  dialogVisible.value = true
  currentQuiz.value = item
}

const nextQuiz = () => {
  if (curQuizIndex.value === currentQuiz.value.qaPair.length - 1) return
  curQuizIndex.value++
  showAnswer.value = false
}

const handleClose = () => {
  dialogVisible.value = false
  showAnswer.value = false
  curQuizIndex.value = 0
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
  font-size: 40px;
  font-weight: 700;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    transform: translateY(-10px);
    background: #fcb503;
    text-shadow: 0px 3px 0px #b2a98f, 0px 14px 10px rgba(0, 0, 0, 0.15),
      0px 24px 2px rgba(0, 0, 0, 0.1), 0px 34px 30px rgba(0, 0, 0, 0.1);
    &::before {
      border-left: 125px solid transparent;
      border-right: 125px solid transparent;
      border-bottom: 78px solid #fcb503;
    }
    &::after {
      border-left: 125px solid transparent;
      border-right: 125px solid transparent;
      border-top: 78px solid #fcb503;
    }
  }
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
  transition: 0.3s;
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
  transition: 0.3s;
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

:deep(.el-dialog__title) {
  font-size: 48px;
}
.dialog__content {
  color: #333;
  font-size: 32px;
  margin: 40px 0;
}
.answer {
  font-size: 28px;
  color: #fff;
  transition: .2s;
  &.showAnswer {
    color: #fcb503;
  }
}
</style>
