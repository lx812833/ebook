<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Epub from "epubjs";
global.Epub = Epub;
export default {
  computed: {
    ...mapGetters(["fileName"])
  },
  mounted() {
    // 获取动态路由
    const fileName = this.$route.params.fileName.split("|").join("/");
    this.$store.dispatch("setFileName", fileName).then(() => {
      this.initEpub();
    });
  },
  methods: {
    initEpub() {
      const baseUrl = "http://192.168.31.178:9000/epub/" + this.fileName + ".epub";
      console.log(`${baseUrl}`);
      this.book = new Epub(baseUrl);
      console.log(this.book);
      // 渲染电子书 epub自带的方法       绑定#read
      this.rendition = this.book.renderTo("read", {
        width: innerWidth,
        height: innerHeight,
        method: "default"  // 微信兼容性配置
      });
      this.rendition.display()
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
