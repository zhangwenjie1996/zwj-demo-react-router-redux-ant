# React Draft Wysiwyg

该编辑器采用reactjs和draftjs库 (https://jpuri.github.io/react-draft-wysiwyg).

##  安装
通过npm或者yarn命令安装

```js
npm install -S react-draft-wysiwyg
yarn add react-draft-wysiwyg
```
## 功能特色
- 可配置的工具栏选项中添加/删除控件。
- 选择更改工具栏上的控件的顺序。
- 选择向工具栏添加自定义控件。
- 选择工具栏中的图标风格和变化。
- 选择显示工具栏只有当编辑的重点是。
- 对于内联样式支持：大胆，斜体，下划线，StrikeThrough，代码，下标，上标。
- 块类型的支持：段，H1 - H6、引用、代码。
- 设置字体大小和字体支持。
- 支持有序/无序列表和缩进。
- 文本对齐的支持。
- 着色的文本或背景支持。
- 添加/编辑环节的支持
- 超过150的emojis的选择。
- support for条目。
- 支持标签。
- 添加/上传图片支持。
- 支持调整图像，设置高度，宽度。
- 嵌入式链接支持，灵活设置高度和宽度。
- 提供删除添加样式选项。
- 撤消和重做选项。
- RTL和拼写检查配置的行为。
- 支持占位符。
- 对于WAI-ARIA支持属性
- 使用编辑控制或联合控制的反应元件。
- 支持将编辑内容的HTML、JSON，降价。
- 支持转换的编辑回到编辑内容生成的HTML。
- 对国际化的支持。

## 属性
### 编辑器样式
默认情况下，编辑器会使用draftjs编辑器，这是没有任何的造型，它将占据100%的宽度的容器。一些造型添加边框的宽度将是很好的编辑和设置。
- wrapperclassname：应用在编辑器和工具栏的样式类
- editorclassname： 应用在编辑的样式类
- toolbarclassname： 应用在工具栏的样式类
- wrapperstyle：style对象应用于编辑器和工具栏
- editorstyle： style对象应用在编辑器
- toolbarstyle：style对象应用在工具栏

### 编辑器状态
编辑器可以使用EditorState实现为受控组件，或者使用EditorState或RawDraftContentState实现未受控组件
- defaulteditorstate：属性在创建时初始化编辑状态一次。 对象类型editorstate。
- editorstate：属性以受控方式更新编辑器状态。
- oneditorstatechange：每当编辑器状态发生变化时调用函数， 传递的参数是对象的类型editorstate。
- defaultcontentstate：属性在创建时初始化编辑状态一次,对象类型rawdraftcontentstate。
- contentstate：属性更新控制器中的编辑器状态。
- onChange：每当编辑器状态发生变化时调用函数，传递的参数是对象的类型rawdraftcontentstate。
- oncontentstatechange：每当编辑器状态发生变化时调用函数，传递的参数是对象的类型rawdraftcontentstate。

## 开始使用
编辑可以作为简单的react组件使用：
```js
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
<Editor
  editorState={editorState}
  toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  editorClassName="editorClassName"
  onEditorStateChange={this.onEditorStateChange}
/>
```
## 文档
> 更多详细内容, 移步官方文档 https://jpuri.github.io/react-draft-wysiwyg

