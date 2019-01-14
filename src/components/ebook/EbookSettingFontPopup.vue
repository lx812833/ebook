<template>
  <div class="ebook-popup-list" v-show="fontFamilyVisible">
    <div class="ebook-popup-title">
        <div class="ebook-popup-title-icon" @click="hide">
            <span class="icon-down2"></span>
        </div>
        <span class="ebook-popup-title-text">选择字体</span>
    </div>
    <div class="ebook-popup-list-wrapper"></div>
  </div>
</template>

<script>
import { ebookMixin } from "../../utils/mixin";
export default {
    mixins: [ebookMixin],
    methods: {
        hide() {
            this.setFontFamilyVisible(false)
        }
    },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";
.ebook-popup-list {
    position: absolute;
    background: red;
    bottom: 0;
    left: 0;
    z-index: 300;
    width: 100%;
    .ebook-popup-title {
        .ebook-popup-title-icon {}
        .ebook-popup-title-text {}
    }
    .ebook-popup-list-wrapper {}
}
</style>
