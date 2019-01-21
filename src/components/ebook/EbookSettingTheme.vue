<template>
  <transition name="slide-up">
    <div
      class="setting-wrapper"
      v-show="menuVisible && settingVisible === 1"
    >
      <div class="setting-theme">
        <div
          class="setting-theme-item"
          v-for="(item, index) of themeList"
          :key="index"
          @click="setTheme(index)"
        >
          <div
            class="preview"
            :class="{'selected': item.name === defaultTheme}"
            :style="{background: item.style.body.background}"
          ></div>
          <div
            class="text"
            :class="{'selected': item.name === defaultTheme}"
          >{{item.alias}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from "../../utils/mixin";
import { saveTheme } from "../../utils/localStorage";
// import { themeList } from "../../utils/book"; mixin也需引入
export default {
  mixins: [ebookMixin],
  /**
   * 由于mixin的便利性，可以把此处的themeList放入mixin中，
   * 方便其他组件的调用。 
   * computed: {
        themeList() {
        return themeList(this);
        }
    },
   */
  methods: {
    // 设置相关主题
    setTheme(index) {
      const theme = this.themeList[index];
      this.setDefaultTheme(theme.name).then(() => {
        this.currentBook.rendition.themes.select(this.defaultTheme);
        this.initGlobalStyle();
      });
      // 切换样式进行保存
      saveTheme(this.fileName, theme.name);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";
.setting-wrapper {
  position: absolute;
  bottom: px2rem(48);
  left: 0;
  z-index: 160;
  width: 100%;
  height: px2rem(90);
  background: white;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  .setting-theme {
    height: 100%;
    display: flex;
    .setting-theme-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: px2rem(5);
      box-sizing: border-box;
      .preview {
        flex: 1;
        border: px2rem(1) solid #ccc;
        box-sizing: border-box;
        &.selected {
          box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0, 0, 0, 0.1);
        }
      }
      .text {
        flex: 0 0 px2rem(20);
        font-size: px2rem(14);
        color: #ccc;
        @include center;
        &.selected {
          color: #333;
        }
      }
    }
  }
}
</style>
