# a demo project
react-router-redux

### 前言
> 使用React技术栈开发SPA.蚂蚁金服的Ant Design为UI库,做了一些demo展示.

### 第三方依赖模块
- react
- react-router@3.0.5 (<span style="color: rgb(243,121,52);">react路由,4.x的差异还是比较大，暂时还是3.x的版本</span>)
- antd@3.1.0 (<span style="color: rgb(243,121,52);">蚂蚁金服开源的react ui组件框架(当前最新版本)</span>)
- fetch (<span style="color: rgb(243,121,52);">http请求模块,fetch请求(axios前端请求模块,也是挺不错的)</span>)
- echarts-for-react@1.1.6 (<span style="color: rgb(243,121,52);">可视化图表，基于react对echarts的封装</span>)
- react-draft-wysiwyg@1.9.6 (<span style="color: rgb(243,121,52);">基于react的富文本封装,比起单纯draft.js太底层,要自己手动配置太多，这个是基于draft搭建好的架子，另外百度的ueditor，太大、复杂了</span>)
- react-draggable@3.0.5 (<span style="color: rgb(243,121,52);">拖拽模块</span>)
- screenfull@3.3.2 （<span style="color: rgb(243,121,52);">全屏插件</span>)
- animate.css@3.5.2 (<span style="color: rgb(243,121,52);">css动画库</span>)

### 功能模块
<span style="color: rgb(184,49,47);">备注：项目只引入了ant-design的部分组件，其他的组件敬请访问ant design官网。</span>
<span style="color: rgb(184,49,47);">项目使用了antd的自定义主题功能-->深蓝色，若想替换其他颜色，具体操作请查看antd官网</span>
<!--more-->

- 导航菜单
    - 顶部导航(菜单伸缩，全屏功能)
    - 左边菜单(适配react路由Link操作)
- 工具模块
    - 拖拽
    - 富文本
    - 待办事项
    - 右击面板
- 动画
    - 基础动画(animate.css所有动画)
    - 动画案例
- 表格
    - 基础表格(antd组件)
    - 复杂表格(带有权限)
- 表单
    - 基础表单(antd组件)
    - 表单管理
- 图表
    - echarts for react图表 
- 其他页面
    - 404页面

 
### 安装运行
##### 1.下载或克隆项目源码
##### 2.npm安装相关包文件(国内建议增加淘宝镜像源，不然会很慢)
##### 3.启动项目
```js
npm start
```
##### 4.打包项目
```js
npm run build
```

### 结尾
该项目会不定时更新，后续时间会添加更多的模块