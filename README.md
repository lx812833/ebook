---
title: Vue web读书器
date: 2019-01-09 22:47:42
tags: "项目"
categories: "项目"
---

### Vue web 读书器

Vue web 读书器是一款以**Vue 全家桶**为主要的技术栈，媲美原生 App 的读书器。主要技术栈包括**Vue 全家桶、Vue-cli3.0、交互动画、LocalStorage+IndexedDB**等

### 1、初始化项目

#### 1.1、使用 Vue-cli3.0 搭建开发环境

已安装好 Vue-cli3.0 后直接创建项目

```python
 vue create my-project
```

#### 1.2、导入 Iconfont svg 图标

首先先去[Iconfont](https://www.iconfont.cn/)选好矢量图标并下载，再去[Icomoon](https://icomoon.io/app/#/select)将字体图标设置为 svg 格式并下载到本地。
具体步骤为： `New Empty Set` --> `Import to Set` -->`选择已下载的图标` -->`Generate Font` --> `Download`--> 解压后将`style.css`和`fonts` 复制至`assets/styles`

最后在`main.js`中引入图标

```python
// 引入字体图标
import './assets/styles/icon.css'
```

#### 1.3、引入字体

将提前准备好的字体引入`src/assets/fonts`
例如：

```python
// daysOne.css

@font-face {
    font-family: 'Days One';
    font-style: normal;
    font-weight: 400;
    src: url('daysOne.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

引入字体的方式有几种：

- 在`public/index.html`中引入
  ```python
  <link rel="stylesheet" href="<%= BASE_URL %>fonts/daysOne.css">
  ```
- 在`src/main.js`中引入
  ```python
  import './assets/fonts/daysOne.css'
  ```
  使用时则需注明`font-family`

```python
.text {
   font-family: "Days One";
   color: orange;
}
```

这里的`font-family`需和引入字体的`font-family`一致

#### 1.4、设置响应式 rem

**`rem`** 是指根元素（root element，html）的字体大小，在移动端中需要根据屏幕大小自动适应根源素大小从而响应其他`fong-size`
在`src/App.vue`页面下进行`rem`设置

```python
export default {};
// 设置rem
document.addEventListener("DOMContentLoaded", () => {
    const html = document.querySelector("html");
    let fontSize = window.innerWidth / 10;
    fontSize = fontSize > 50 ? 50 : fontSize;
    html.style.fontSize = fontSize + "px";
});
```

#### 1.5、安装 epub

`ePub` 是一种电子书的标准格式，该项目主要使用 `Vue` 和 `epub.js` 制作电子书阅读器
安装`epubjs`

```python
npm i --save epubjs
```

引入并使用`epubjs`

```python
import Epub from "epubjs";
global.Epub = Epub;
```

#### 1.6、安装 Nginx 作为代理服务器

安装[Nginx](http://nginx.org/en/download.html)作为代理服务器，具体配置以及跨域问题询问度娘

### 2、电子书解析与渲染

#### 2.1、动态路由

在`router.js`下重定向到`/ebook`,并在`views/ebook`下创建`index.vue`作为根页面，在`components/ebook/` 创建`EbookReader.vue`二级路由

```python

path: '/ebook',
component: () => import('./views/ebook/index.vue'),
children: [
    {
        path: ':fileName',   // 动态路由
        component: () => import('./components/ebook/EbookReader.vue')
    }
]
```

在`EbookReader.vue`组件中利用 **`$route.params.fileName`** 来获取`fileName`，然后利用`split、join`对`fileName`进行处理

#### 2.2、vuex 模块化管理

**`vuex`** 是 **`vue`** 用来集中管理状态的容器，用来管理全局的状态的，实现不同组件之间相互的数据访问。如果一个项目非常大的话状态就会非常的多，如果不进行分类处理，所有的状态都维护在一个`state`里面的话，状态管理就会变得非常的混乱，这样非常不利于项目的后期维护。这里需要使用到 **`vuex模块化管理`**。

在`store/modules/book.js` 模块下

- **`states`** 保存应用的状态值
  ```python
  state: {
      fileName: ''
  }
  ```
- **`mutations`** 定义对状态值的操作
  更改`Vuex` 的 `store` 中的状态的唯一方法是`提交 mutation`。`Vuex` 中的 `mutation` 非常类似于事件：每个 `mutation` 都有一个字符串的  **`事件类型 (type)`**  和 一个  **`回调函数 (handler)`**。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 **`state`** 作为第一个参数。且这里要注意不要在 **`mutations`** 里面进行异步操作。
  ```python
  mutations: {
      'SET_FILENAME': (state, fileName) => {
           state.fileName = fileName
      }
  }
  ```
- **`actions`** 将 **`mutations`** 中定义的方法进行了一次封装

  **`actions`** 定义的方法只是将 **`mutations`** 中定义的方法进行了一次**封装**,就是去触发 **`mutations`** 中的方法。如果传递的参数需要**异步获取**的话，可以在这里等待异步返回成功，然后在触发 **`mutations`** 中的方法。

  **`actions`** 通过调用 **`store.commit`** 提交载荷(`fileName`这个对象)到名为`SET_FILENAME`的 `mutation` 中

  ```python
  actions: {
      setFileName: ({commit}, fileName) => {
          return commit('SET_FILENAME', fileName)
          // 需要return才能返回一个promise对象
      }
  }
  ```

  且在`components/ebook/EbookReader.vue`中，**`actions`** 通过调用  **`store.dispatch`**  方法提交载荷(`fileName`这个对象)触发 **`actions`** 中的`setFileName`

  ```python
  this.$store.dispatch("setFileName", fileName)
  ```

在`store/` 模块下

- **`getters`** 将 **`states`** 中定义的值暴露在 **`store.getters对象`** 中

  ```python
  const book = {
      fileName: state => state.book.fileName
  }

  export default book
  ```

  这里将 **`getters`** 提取出来作为多个模块之间共享的方法，故提取出来。
  在`components/ebook/EbookReader.vue`中， **`mapGetters 辅助函数`** 仅仅是将 store 中的 `getter`映射到局部计算属性,且使用对象展开运算符将 `getter` 混入`computed` 对象中

  ```python
  import { mapGetters } from "vuex";

  computed: {
      ...mapGetters(["fileName"])
  }
  ```

- **`index.js`** 入口文件

  ```python
  import Vue from 'vue'
  import Vuex from 'vuex'
  import book from './modules/book'
  import actions from './actions'
  import getters from './getters'

  Vue.use(Vuex)

  export default new Vuex.Store({
      modules: {
          book
      },
      getters,
      actions
  })
  ```

最后在`main.js`里引入`store`: `import store from './store'`

#### 2.3、**`mixins`** 混入

混入 **`mixins`** 是一种分发 `Vue`组件中可复用功能的非常灵活的方式。**混入对象**可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。

全局注册一个**混入**，影响注册之后所有创建的每个 `Vue` 实例

**`mapActions`**

组件中使用`this.$store.dispatch('xxx')`  分发`action`，或者使用 **`mapActions`** 辅助函数将组件的`methods` 映射为  `store.dispatch`

- 在`src/store/actions.js`中定义`actions`

  ```python
  const actions = {
      setFileName: ({ commit }, fileName) => {
          return commit('SET_FILENAME', fileName)
          // 需要return才能返回一个promise对象
      },
      setMenuVisible: ({ commit }, menuVisible) => {
          return commit('SET_MENUVISIBLE', menuVisible)
      }
   }

   export default actions
  ```

- 在`src/store/getters.js`中定义 `getters.js`

  ```python
  const book = {
      fileName: state => state.book.fileName,
      menuVisible: state => state.book.menuVisible
  }

  export default book
  ```

- 在`src/utils/mixin.js`中创建`mixin.js`
  ```python
  import { mapGetters, mapActions } from 'vuex'
  export const ebookMixin = {
    computed:{
        ...mapGetters([
            "fileName",
            "menuVisible",
            // 这里是 getters 暴露 state中的对象
        ])
    },
    methods: {
        ...mapActions([
            "setMenuVisible",
            "setFileName",
            //  这里是定义 actions.js中分发 mutations 中的方法
        ])
    }
  }
  ```

最后在组件中引入`mixins`并使用`mixins`

```python
import { ebookMixin } from "../../utils/mixin";

// 使用mixins
 mixins: [ebookMixin]
```

使用`mixins`中定义的方法时，直接`this.+函数名`，如`this.setFileName()`
