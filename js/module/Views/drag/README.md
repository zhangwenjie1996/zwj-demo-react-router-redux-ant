# React Draft Wysiwyg
> 比起单纯的draft.js太底层,要自己手动配置太多，这个是基于draft搭建好的架子，另外百度的ueditor，太大、复杂了。
React拖拽组件 (github: https://github.com/mzabriskie/react-draggable).

##  安装
```js
npm install react-draggable
```
## Exports导出
默认出口<Draggable>，在.DraggableCore属性是<DraggableCore>,通过es6(推荐) import 或者es5 require导入
```js
// ES6
import Draggable from 'react-draggable'; // The default
import {DraggableCore} from 'react-draggable'; // <DraggableCore>
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time

// CommonJS
let Draggable = require('react-draggable');
let DraggableCore = Draggable.DraggableCore;
```
## <Draggable>

<Draggable>元素包装一个现有的元素，并用新的事件处理器和样式来扩展它。它不会在DOM中创建包装器元素。 

Draggable项目使用CSS转换移动。这允许项目被拖动，而不管它们当前的位置（相对，绝对或静态）。  

如果您正在拖动的项目已经应用了CSS变换，则将被<Draggable>覆盖。在这种情况下使用中间包装 (<Draggable><span>...</span></Draggable>) 。

### Draggable使用
```js
import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';

class App extends React.Element {

  eventLogger = (e: MouseEvent, data: Object) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };

  render() {
    return (
      <Draggable
        axis="x"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={null}
        grid={[25, 25]}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>
        <div>
          <div className="handle">Drag from here</div>
          <div>This readme is really dragging on...</div>
        </div>
      </Draggable>
    );
  }
}

ReactDOM.render(<App/>, document.body);
```
## Draggable API
<Draggable/>组件透明地为其子项添加可拖动性。 

> 注意：只允许单一child子元素否则会抛出一个错误。 

对于组件将其自身正确地附加到其子组件，子组件必须提供对以下支持的支持：

- style用于将变换CSS赋予子组件。 
- className用于将正确的类应用于被拖动的对象。 
- onMouseDown，onMouseUp，onTouchStart和onTouchEnd用于跟踪拖动状态。 
React.DOM元素默认支持上述属性，所以你可以使用这些元素作为子元素而不做任何改变。如果你想使用你创建的React组件，你需要确保传输道具。

### Draggable props属性:
```js
//
// Types:
//
type DraggableEventHandler = (e: Event, data: DraggableData) => void | false;
type DraggableData = {
  node: HTMLElement,
  // lastX + deltaX === x
  x: number, y: number,
  deltaX: number, deltaY: number,
  lastX: number, lastY: number
};

//
// Props:
//
{
// If set to `true`, will allow dragging on non left-button clicks.
allowAnyClick: boolean,

// Determines which axis the draggable can move. This only affects
// flushing to the DOM. Callbacks will still include all values.
// Accepted values:
// - `both` allows movement horizontally and vertically (default).
// - `x` limits movement to horizontal axis.
// - `y` limits movement to vertical axis.
// - 'none' stops all movement.
axis: string,

// Specifies movement boundaries. Accepted values:
// - `parent` restricts movement within the node's offsetParent
//    (nearest node with position relative or absolute), or
// - a selector, restricts movement within the targeted node
// - An object with `left, top, right, and bottom` properties.
//   These indicate how far in each direction the draggable
//   can be moved.
bounds: {left: number, top: number, right: number, bottom: number} | string,

// Specifies a selector to be used to prevent drag initialization.
// Example: '.body'
cancel: string,

// Class names for draggable UI.
// Default to 'react-draggable', 'react-draggable-dragging', and 'react-draggable-dragged'
defaultClassName: string,
defaultClassNameDragging: string,
defaultClassNameDragged: string,

// Specifies the `x` and `y` that the dragged item should start at.
// This is generally not necessary to use (you can use absolute or relative
// positioning of the child directly), but can be helpful for uniformity in
// your callbacks and with css transforms.
defaultPosition: {x: number, y: number},

// If true, will not call any drag handlers.
disabled: boolean,

// Specifies the x and y that dragging should snap to.
grid: [number, number],

// Specifies a selector to be used as the handle that initiates drag.
// Example: '.handle'
handle: string,

// If desired, you can provide your own offsetParent for drag calculations.
// By default, we use the Draggable's offsetParent. This can be useful for elements
// with odd display types or floats.
offsetParent: HTMLElement,

// Called whenever the user mouses down. Called regardless of handle or
// disabled status.
onMouseDown: (e: MouseEvent) => void,

// Called when dragging starts. If `false` is returned any handler,
// the action will cancel.
onStart: DraggableEventHandler,

// Called while dragging.
onDrag: DraggableEventHandler,

// Called when dragging stops.
onStop: DraggableEventHandler,

// Much like React form elements, if this property is present, the item
// becomes 'controlled' and is not responsive to user input. Use `position`
// if you need to have direct control of the element.
position: {x: number, y: number}
}
```
## <DraggableCore>
对于需要绝对控制的用户，可用<DraggableCore>元素。这对于触摸和鼠标事件的抽象是有用的，但是完全控制。 没有内部状态。有关使用示例，请参阅React-Resizable和React-Grid-Layout。 

是其他库的一个有用的构建块，只需要在用户尝试移动元素时抽象浏览器特定的怪癖并接收回调。它不会自己设置样式或变换，因此必须有回调才有用。
### DraggableCore API
<DraggableCore>需要一个有限的选项子集：
```js
{
  allowAnyClick: boolean,
  cancel: string,
  disabled: boolean,
  enableUserSelectHack: boolean,
  offsetParent: HTMLElement,
  grid: [number, number],
  handle: string,
  onStart: DraggableEventHandler,
  onDrag: DraggableEventHandler,
  onStop: DraggableEventHandler,
  onMouseDown: (e: MouseEvent) => void
}
```

> 没有起始位置。 <DraggableCore>简单地使用下面的参数调用拖拉处理程序，指出它的位置（从底层的MouseEvent推断）和增量。  
 父级要在<DraggableCore>上设置实际的位置。
  
 使用与<Draggable>相同的参数调用Drag回调函数（onStart，onDrag，onStop）。