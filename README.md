### Vue web读书器

Vue web读书器是一款以**Vue全家桶**为主要的技术栈，媲美原生App的读书器。主要技术栈包括**Vue全家桶、Vue-cli3.0、交互动画、LocalStorage+IndexedDB**等

### 1、初始化项目

#### 1.1、使用Vue-cli3.0搭建开发环境

已安装好Vue-cli3.0后直接创建项目

```python
 vue create my-project
```

#### 1.2、导入 Iconfont svg图标

首先先去[Iconfont](https://www.iconfont.cn/)选好矢量图标并下载，再去[Icomoon](https://icomoon.io/app/#/select)将字体图标设置为svg格式并下载到本地。
具体步骤为： `New Empty Set` --> `Import to Set` -->`选择已下载的图标` -->`Generate Font` --> `Download `--> 解压后将`style.css`和`fonts` 复制至`assets/styles` 

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

#### 1.4、设置响应式rem

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

#### 1.5、安装epub

`ePub` 是一种电子书的标准格式，该项目主要使用 `Vue` 和 `epub.js` 制作电子书阅读器

```python
// 安装epubjs
npm i --save epubjs
```
