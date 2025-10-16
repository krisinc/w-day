<template>
  <header id="header" class="header">
    <button
      :class="['header__hamburger', { 'is-active': isShowMenu }]"
      type="button"
      @click="isShowMenu = !isShowMenu"
    >
      <span class="header__hamburger-line"></span>
      <span class="header__hamburger-line"></span>
      <span class="header__hamburger-line"></span>
    </button>

    <div :class="['header__menu', { 'is-active': isShowMenu }]">
      <div class="header__menu-bg"></div>

      <nav class="header__nav">
        <ul class="header__nav-list">
          <li
            v-for="(item, index) in navItems"
            :key="index"
            class="header__nav-item"
          >
            <router-link
              :to="`/${item.path}`"
              class="header__nav-link"
              @click="closeMenu"
            >
              {{ item.title }}
              <span class="header__nav-link-ja">{{ item.subTitle }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue"

const isShowMenu = ref(false)
const navItems = ref([
  { title: "HOME", subTitle: "Home sweet home", path: "" },
  { title: "", subTitle: "slotMachine", path: "slotMachine" },
  { title: "QUEST", subTitle: "Quest", path: "quest" },
])

const closeMenu = () => {
  $hamburger.removeClass('is-active')

  $menu.addClass('is-closing')

  setTimeout(() => {
    $menu.removeClass('is-active is-closing')
  }, 600)
}
const showMenu = () => {}
</script>

<style scoped lang="scss">
$pc: 961px;
$tab: 960px;
$sp: 520px;

@mixin pc {
  @media (min-width: ($pc)) {
    @content;
  }
}
@mixin tab {
  @media (max-width: ($tab)) {
    @content;
  }
}
@mixin sp {
  @media (max-width: ($sp)) {
    @content;
  }
}
.header {
  &__hamburger {
    outline: none;
    position: fixed;
    top: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    z-index: 1004;
    padding: 0;
    transition: transform 0.3s ease;

    @include sp {
      top: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      gap: 6px;
    }

    &:hover {
      transform: scale(1.1);
    }

    &.is-active {
      .header__hamburger-line {
        background-color: #fff;

        &:nth-child(1) {
          transform: translateY(10px) rotate(45deg);

          @include sp {
            transform: translateY(10px) rotate(45deg);
          }
        }

        &:nth-child(2) {
          opacity: 0;
        }

        &:nth-child(3) {
          transform: translateY(-10px) rotate(-45deg);

          @include sp {
            transform: translateY(-10px) rotate(-45deg);
          }
        }
      }
    }

    &-line {
      display: block;
      width: 30px;
      height: 2px;
      background-color: #fff;
      transition: all 0.4s ease;
      transform-origin: center;

      @include sp {
        width: 24px;
      }
    }
  }

  &__menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 1003;
    pointer-events: none;
    overflow: hidden;

    &.is-active {
      pointer-events: auto;
      overflow-y: auto;
    }

    &-bg {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0;
      background-color: #1a1a1a;
      transition: height 0.8s cubic-bezier(0.76, 0, 0.24, 1);

      .header__menu.is-active & {
        height: 100vh;
      }

      .header__menu.is-closing & {
        height: 0;
        transition: height 0.6s cubic-bezier(0.76, 0, 0.24, 1);
      }
    }
  }

  &__nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 120px 40px 60px;
    clip-path: inset(100% 0 0 0);
    transition: clip-path 0.8s cubic-bezier(0.76, 0, 0.24, 1);

    .header__menu.is-active & {
      clip-path: inset(0 0 0 0);
    }

    .header__menu.is-closing & {
      clip-path: inset(100% 0 0 0);
      transition: clip-path 0.6s cubic-bezier(0.76, 0, 0.24, 1);
    }

    @include sp {
      padding: 100px 30px 40px;
    }

    &-list {
      list-style: none;
      margin: 0;
      padding: 0;
      width: 100%;
      max-width: 800px;

      @include sp {
        max-width: 100%;
      }
    }

    &-link {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      color: #fff;
      text-decoration: none;
      padding: 20px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      font-size: 32px;
      font-weight: 500;
      transition: all 0.3s ease;
      letter-spacing: 0.02em;

      @include sp {
        font-size: 20px;
        padding: 16px 0;
      }

      &:hover {
        color: #007bff;
        padding-left: 20px;

        @include sp {
          padding-left: 10px;
        }
      }

      &-ja {
        display: block;
        font-size: 14px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.6);
        margin-top: 8px;
        letter-spacing: 0.05em;

        @include sp {
          font-size: 12px;
          margin-top: 4px;
        }
      }
    }
  }
}
</style>
