<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
// 引入mixin
import { ebookMixin } from "../../utils/mixin";
import Epub from "epubjs";
import {
  saveFontFamily,
  getFontFamily,
  getFontSize,
  saveFontSize,
  saveTheme,
  getTheme,
  setDefaultTheme
} from "../../utils/localStorage";
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
      const baseUrl = process.env.VUE_APP_RES_URL + "/epub/" + this.fileName + ".epub";
      this.book = new Epub(baseUrl);
      this.setCurrentBook(this.book);
      this.initRendition();
      this.initGesture();
      console.log(this.book);
      // 分页
      this.book.ready.then(() => {
          return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
      }).then(localtions => {
        // console.log(localtions)
        this.setBookAvailable(true)
      })
    },
    // 初始化渲染
    initRendition() {
      // 渲染电子书 epub自带的方法       绑定#read
      this.rendition = this.book.renderTo("read", {
        width: innerWidth,
        height: innerHeight,
        method: "default" // 微信兼容性配置
      });
      // 初始化字体样式、大小
      this.rendition.display().then(() => {
        this.initFontSize();
        this.initFontFamily();
        this.initTheme();
        this.initGlobalStyle();
      });
      // 引入放入Nginx中的字体样式
      this.rendition.hooks.content.register(contents => {
        Promise.all([
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/cabin.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`
          )
        ]).then(res => {
          console.log("字体全部加载完成...");
        });
      });
    },
    // 初始化手势
    initGesture() {
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
    // 设置字体样式
    initFontFamily() {
      let font = getFontFamily(this.fileName);
      if (!font) {
        saveFontFamily(this.fileName, this.defaultFontFamily);
      } else {
        this.rendition.themes.font(font);
        this.setDefaultFontFamily(font);
      }
    },
    // 设置字体大小
    initFontSize() {
      let fontSize = getFontSize(this.fileName);
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize);
      } else {
        this.rendition.themes.fontSize(fontSize);
        this.setDefaultFontSize(fontSize);
      }
    },
    // 设置主题
    initTheme() {
      let defaultTheme = getTheme(this.fileName);
      if (!defaultTheme) {
        defaultTheme = this.themeList[0].name;
        saveTheme(this.fileName, defaultTheme);
      }
      this.setDefaultTheme(defaultTheme);
      this.themeList.forEach(theme => {
        this.rendition.themes.register(theme.name, theme.style);
      });
      this.rendition.themes.select(defaultTheme);
    },
    // 设置全局主题
    /** 在mixins中设置了 */
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
      if (this.menuVisible) {
        this.setSettingVisible(-1);
        this.setFontFamilyVisible(false); // 隐藏字号样式
      }
      // this.$store.dispatch("setMenuVisible", !this.menuVisible);
      this.setMenuVisible(!this.menuVisible);
    },
    // 翻页时隐藏导航栏
    hideTitleAndMenu() {
      this.setMenuVisible(false);
      this.setSettingVisible(-1); // -1隐藏状态
      this.setFontFamilyVisible(false);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
