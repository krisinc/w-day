<template>
  <div id="home">
    <swiper
      :spaceBetween="0"
      :centeredSlides="true"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
      }"
      :speed="2000"
      :loop="true"
      :navigation="true"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide
        v-for="(item, index) in 30" :key="index"
      >
      <img :src="imgUrl(index)" />
      </swiper-slide>
    </swiper>
    <div class="container">
      <div class="marquee">
        <ul>
          <li><span class="text">WEDDING DAY</span></li>
        </ul>
        <ul aria-hidden="true">
          <li>
            <span class="text">WEDDING DAY</span>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';


const modules = [Autoplay]
const imgUrl = (index) => {
  const url = `./../../assets/swiperImg/img_${index}.jpg`
  return new URL(url, import.meta.url).href
}

onMounted(() => {
  // 初始化用，如果要預設開場動畫可以放這裡
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Bungee+Spice&family=Zen+Tokyo+Zoo&display=swap');
:root {
  --gap: 3rem;
}

body {
  background: var(--bg-dark);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
}

.swiper {
  width: 100vw;
  height: 100vh;
}
.swiper-slide {
  width: 100vw !important;
  height: 100vh !important;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: auto;
    height: 100%;
  }
}

.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.marquee {
  user-select: none;
  display: flex;
  gap: var(--gap);
  transform: rotate(-17deg);
  // font-family: Lobster;
  font-family: "Zen Tokyo Zoo";
}

ul {
  list-style: none;
  flex-shrink: 0;
  min-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--gap);
  animation: marquee 8s linear infinite;
}

.text {
  background: linear-gradient(to right, #a2a2a2, #ffffff, #212121);
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 400;
  font-size: 25ch;
}

@keyframes marquee {
  to {
    transform: translateX(calc(-100% - var(--gap)));
  }
}

</style>
