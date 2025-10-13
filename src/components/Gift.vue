<template>
  <div
    ref="container"
    :class="['gift-container', displayType, { autoTurn: isRunning }]"
  >
    <div
      v-for="(gift, index) in config.gifts"
      :key="index"
      :class="['gift', config.style]"
      :style="`transform: rotateX(${rotate * index}deg) translateZ(${translateZ}px)`"
    >
      <template v-if="gift.type === 'text'">{{ gift.name }}</template>
      <template v-else-if="gift.type === 'image'">
        <img :src="gift.path" :height="config.height" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'

const props = defineProps({
  trigger: {
    type: Date,
    default: undefined
  },
  config: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['finished'])

const container = ref(null)
const isRunning = ref(false)
const currentDeg = ref(0)
const targetDeg = ref(0)
const giftsDeg = ref([])

// === 計算屬性 ===
const displayType = computed(() => (props.config.run3D ? 'three-dimension' : 'flat'))

const rotate = computed(() => 360 / props.config.gifts.length)

const translateZ = computed(() => {
  return (props.config.height / 2) / Math.tan((rotate.value / 2 / 180) * Math.PI)
})

// === 設定 CSS 變數 ===
const setConfig = () => {
  if (!container.value) return
  container.value.style.setProperty('--rotateY', `${props.config.rotateY}deg`)
  container.value.style.setProperty('--duration', `${props.config.duration}ms`)
  container.value.style.setProperty('--fontSize', `${props.config.fontSize}px`)
  container.value.style.setProperty('--height', `${props.config.height}px`)
  container.value.style.setProperty('--width', `${props.config.width}px`)
  container.value.style.setProperty('--currentDeg', `-${currentDeg.value}deg`)
}

// === 記錄每個獎品的角度範圍 ===
const logGiftsDeg = () => {
  giftsDeg.value = props.config.gifts.map((gift, index) => {
    const from = index === 0 ? 0 : giftsDeg.value[index - 1].to
    const to = index === 0 ? rotate.value : giftsDeg.value[index - 1].to + rotate.value
    return { from, to, name: gift.name }
  })
}

// === 自動旋轉 ===
const autoTurn = () => {
  if (!container.value) return
  let randomDeg = Math.random() * 360 + 360 * 5
  randomDeg -= randomDeg % rotate.value
  targetDeg.value = randomDeg

  const randomRollBackDeg = props.config.rollback
    ? Math.random() * props.config.rollback + 1
    : 1

  container.value.style.setProperty('--targetDeg', `-${targetDeg.value}deg`)
  container.value.style.setProperty('--rollBackDeg', `${randomRollBackDeg}`)
  isRunning.value = true
}

// === 停止旋轉 ===
const autoTurnStop = () => {
  if (!container.value) return
  currentDeg.value = targetDeg.value % 360
  container.value.style.setProperty('--currentDeg', `-${currentDeg.value}deg`)

  const endDeg = currentDeg.value + rotate.value / 2
  let giftName = null
  giftsDeg.value.forEach((gift) => {
    if (endDeg >= gift.from && endDeg <= gift.to) {
      giftName = gift.name
    }
  })

  isRunning.value = false
  emit('finished', giftName)
}

// === 監聽 ===
watch(
  () => props.config,
  () => {
    setConfig()
  },
  { deep: true }
)

watch(
  () => props.trigger,
  () => {
    autoTurn()
  }
)

watch(isRunning, (val) => {
  if (val) {
    setTimeout(() => {
      autoTurnStop()
    }, props.config.duration + 200)
  }
})

// === 初始化 ===
onMounted(() => {
  setConfig()
  logGiftsDeg()
})
</script>

<style scoped lang="scss">
.gift-container {
  /* CSS 變數 */
  $width: var(--width);
  $height: var(--height);
  $fontSize: var(--fontSize);
  $duration: var(--duration);
  $rotateY: var(--rotateY);
  $targetDeg: var(--targetDeg);
  $currentDeg: var(--currentDeg);
  $rollBackDeg: var(--rollBackDeg);

  * {
    box-sizing: border-box;
  }

  perspective: 999999px;
  user-select: none;
  position: relative;
  display: flex;
  align-items: center;
  margin-right: $width;
  transform-style: preserve-3d;

  .gift {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: $width;
    height: $height;
    border: 1px solid #333;
    background-color: #fff;
    font-size: $fontSize;

    img {
      padding: 1px;
    }
  }

  &.flat {
    transform: rotateX($currentDeg);

    &.autoTurn {
      transition: $duration ease-in-out;
      transform: rotateX($targetDeg);
    }
  }

  &.three-dimension {
    transform: rotateY($rotateY) rotateX($currentDeg);

    &.autoTurn {
      transition: $duration cubic-bezier(0.1, 0, 0, $rollBackDeg);
      transform: rotateY($rotateY) rotateX($targetDeg);
    }
  }
}
</style>
