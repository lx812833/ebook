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
具体步骤为： `New Empty Set` --> `Import to Set` -->`选择已下载的图标` -->`Generate Font` --> `Download `--> 解压后将`style.css`和`fonts` 复制至assets/styles 

最后在`main.js`中引入图标

```python
// 引入字体图标
import './assets/styles/icon.css'
```

#### 1.3、安装epub

`ePub` 是一种电子书的标准格式，该项目主要使用 `Vue` 和 `epub.js` 制作电子书阅读器

```python
// 安装epubjs
npm i --save epubjs
```