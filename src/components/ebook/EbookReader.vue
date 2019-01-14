<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
// 引入mixin
import { ebookMixin } from "../../utils/mixin";
import Epub from "epubjs";
global.Epub = Epub;
export default {
  // 使用vuex mixins
  mixins: [ebookMixin],
  mounted() {
    // 获取动态路由
    const fileName = this.$route.params.fileName.split("|").join("/");
    this.setFileName(fileName).then(() => {
      this.initEpub();
    });
  },
  methods: {
    initEpub() {
      const baseUrl = "http://192.168.31.178:9000/epub/" + this.fileName + ".epub";
      this.book = new Epub(baseUrl);
      this.setCurrentBook(this.book)
      console.log(this.book);
      // 渲染电子书 epub自带的方法       绑定#read
      this.rendition = this.book.renderTo("read", {
        width: innerWidth,
        height: innerHeight,
        method: "default" // 微信兼容性配置
      });
      this.rendition.display();
      // 手势操作
      this.rendition.on("touchstart", event => {
        this.touchStartX = event.changedTouches[0].clientX;
        this.touchStartTime = event.timeStamp;
      });
      this.rendition.on("touchend", event => {
        // 滑动x轴偏移量
        const offsetX = event.changedTouches[0].clientX - this.touchStartX;
        // 滑动时间差
        const time = event.timeStamp - this.touchStartTime;
        // console.log(offsetX, time);
        if (time < 500 && offsetX > 40) {
          this.prevPage();
        } else if (time < 500 && offsetX < -40) {
          this.nextPage();
        } else {
          this.toggleTitleAndMenu();
        }
        // 停止事件默认动作及传播
        // event.preventDefault();
        event.stopPropagation();
      });
    },
    // 上一页
    prevPage() {
      if (this.rendition) {
        this.rendition.prev();
        this.hideTitleAndMenu();
      }
    },
    // 下一页
    nextPage() {
      if (this.rendition) {
        this.rendition.next();
        this.hideTitleAndMenu();
      }
    },
    // 切换导航栏
    toggleTitleAndMenu() {
      if(this.menuVisible) {
        this.setSettingVisible(-1);
      }
      // this.$store.dispatch("setMenuVisible", !this.menuVisible);
      this.setMenuVisible(!this.menuVisible);
    },
    // 翻页时隐藏导航栏
    hideTitleAndMenu() {
      this.setMenuVisible(false);
      this.setSettingVisible(-1); // -1隐藏状态
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
