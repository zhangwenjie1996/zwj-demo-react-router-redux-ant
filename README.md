# a demo project
react-router-redux

### 前言
> 使用React技术栈开发SPA,做了一些demo展示.

### 技术堆栈
- Babel Webpack(<span style="color: #1890ff;">打包构建热更新</span>) 
- Yarn || Npm(<span style="color: #1890ff;">包管理</span>) 
- react (<span style="color: #1890ff;">前端框架</span>) 
- ES6 (<span style="color: #1890ff;">JS语法</span>) 
- Less (<span style="color: #1890ff;">样式</span>) 
- react-router@3.0.5 (<span style="color: #1890ff;">react路由,4.x的差异还是比较大，暂时还是3.x的版本</span>)
- antd@3.1.0 (<span style="color: #1890ff;">蚂蚁金服开源的react UI组件(当前最新版本)</span>)
- fetch (<span style="color: #1890ff;">fetch请求模块,与后台通信(axios前端请求模块,也是挺不错的)</span>)
- react-redux (<span style="color: #1890ff;">实现待办事项模块</span>)
- react-intl (<span style="color: #1890ff;">国际化</span>)

### 第三方库
- css动画库：animate.css@3.5.2
- 富文本编辑：react-draft-wysiwyg@1.9.6(基于react的富文本封装,比起单纯draft.js太底层,要自己手动配置太多，这个是基于draft搭建好的架子，另外百度的ueditor，太大、复杂了)
- 全屏插件：screenfull@3.3.2
- 可视化图表：echarts-for-react@1.1.6
- 拖拽：react-draggable@3.0.5

### 功能模块
<span style="color: rgb(184,49,47);">备注：项目只引入了ant-design的部分组件，其他的组件敬请访问ant design官网。</span>
<span style="color: rgb(184,49,47);">项目使用了antd的自定义主题功能-->深蓝色，若想替换其他颜色，具体操作请查看antd官网</span>

- 导航菜单
    - 顶部导航(菜单伸缩，全屏功能)
    - 左边菜单(适配react路由Link操作)
- 表单
    - 基础表单 
    - 表单管理
- 表格
    - 基础表格 
    - 查询表格
- 工具模块
    - 拖拽
    - 富文本
    - 待办事项
    - 右击面板
- 动画
    - 基础动画(animate.css所有动画)
    - 动画案例
- 图表
    - echarts for react图表 
- 权限管理
    - 元素权限
    - 页面权限
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