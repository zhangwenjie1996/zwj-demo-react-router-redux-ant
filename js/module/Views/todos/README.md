# Redux 简明教程

## &sect; 零、Why redux？

正如 react 官方文档所描述的， react 是一个 UI 库（a library for UI），因此单靠 react 不足以搭建一个完整的 web 应用。因此，我们要结合其它架构（包括第三方架构和自主设计的架构），才能搭建一个完整的 web 应用。

2014 年，Facebook 发布的 Flux 便是对此提供的一种架构思想。且引发了很多实现，2015 年， redux 出现，将 Flux 和 函数式编程 结合在一起，成为了一时前端架构的热门。

当然，redux 是为了解决更复杂的业务逻辑而设计的，如果是简单的业务逻辑，我们完全可以不使用 redux。若应用的特点符合以下的标准，可以考虑使用 redux：

* 用户的使用方式复杂
* 不同身份的用户有不同的使用方式（比如普通用户和管理员）
* 多个用户之间可以协作
* 与服务器大量交互，或者使用了 WebSocket
* View 要从多个来源获取数据

## &sect; 三大原则

Redux 可以用这三个基本原则来描述：

### 单一数据源

整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。

这让同构应用开发变得非常容易。来自服务端的 state 可以在无需编写更多代码的情况下被序列化并注入到客户端中。由于是单一的 state tree ，调试也变得非常容易。在开发中，你可以把应用的 state 保存在本地，从而加快开发速度。此外，受益于单一的 state tree ，以前难以实现的如“撤销/重做”这类功能也变得轻而易举。

```
console.log(store.getState())

/* Prints
{
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Consider using Redux',
      completed: true,
    },
    {
      text: 'Keep all state in a single tree',
      completed: false
    }
  ]
}
*/
```

### State 是只读的

_惟一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。_

这样确保了视图和网络请求都不能直接修改 state，相反它们只能表达想要修改的意图。因为所有的修改都被集中化处理，且严格按照一个接一个的顺序执行，因此不用担心 race condition 的出现。 Action 就是普通对象而已，因此它们可以被日志打印、序列化、储存、后期调试或测试时回放出来。

```
store.dispatch({
  type: 'COMPLETE_TODO',
  index: 1
});

store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
});
```

### 使用纯函数来执行修改

_为了描述 action 如何改变 state tree ，你需要编写 reducers。_

Reducer 只是一些纯函数，它接收先前的 state 和 action，并返回新的 state。刚开始你可以只有一个 reducer，随着应用变大，你可以把它拆成多个小的 reducers，分别独立地操作 state tree 的不同部分，因为 reducer 只是函数，你可以控制它们被调用的顺序，传入附加数据，甚至编写可复用的 reducer 来处理一些通用任务，如分页器。

```
function visibilityFilter(state = 'SHOW_ALL', action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case 'COMPLETE_TODO':
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: true
          })
        }
        return todo
      })
    default:
      return state
  }
}

import { combineReducers, createStore } from 'redux'
let reducer = combineReducers({ visibilityFilter, todos })
let store = createStore(reducer)
```

就是这样，现在你应该明白 Redux 是怎么回事了。接下来具体细看。。。

## &sect; Store

首先要区分 `store` 和 `state`

`state` 是应用的状态，一般本质上是一个普通**对象**  
例如，我们有一个 Web APP，包含 计数器 和 待办事项 两大功能  
那么我们可以为该应用设计出对应的存储数据结构（应用初始状态）：

```js
/** 应用初始 state，本代码块记为 code-1 **/
{
  counter: 0,
  todos: []
}
```

`store` 是应用状态 `state` 的管理者，包含下列四个函数：

* `getState() # 获取整个 state`
* `dispatch(action) # ※ 触发 state 改变的【唯一途径】※`
* `subscribe(listener) # 您可以理解成是 DOM 中的 addEventListener`
* `replaceReducer(nextReducer) # 一般在 Webpack Code-Splitting 按需加载的时候用`

二者的关系是：`state = store.getState()`

Redux 规定，一个应用只应有一个单一的 `store`，其管理着唯一的应用状态 `state`  
Redux 还规定，不能直接修改应用的状态 `state`，也就是说，下面的行为是不允许的：

```js
var state = store.getState();
state.counter = state.counter + 1; // 禁止在业务逻辑中直接修改 state
```

**若要改变 `state`，必须 `dispatch` 一个 `action`，这是修改应用状态的不二法门**

> 现在您只需要记住 `action` 只是一个包含 **`type`** 属性的普通**对象**即可  
> 例如 `{ type: 'INCREMENT' }`

上面提到，`state` 是通过 `store.getState()` 获取，那么 `store` 又是怎么来的呢？  
想生成一个 `store`，我们需要调用 Redux 的 `createStore`：

```js
import { createStore } from 'redux'
...
const store = createStore(reducer, initialState) // store 是靠传入 reducer 生成的哦！
```

> 现在您只需要记住 `reducer` 是一个 **函数**，负责**更新**并返回一个**新的** `state`  
> 而 `initialState` 主要用于前后端同构的数据同步（详情请关注 React 服务端渲染）

## &sect; Action

上面提到，`action`（动作）实质上是包含 `type` 属性的普通对象，这个 `type` 是我们实现用户行为追踪的关键  
例如，增加一个待办事项 的 `action` 可能是像下面一样：

```js
/** 本代码块记为 code-2 **/
{
  type: 'ADD_TODO',
  payload: {
    id: 1,
    content: '待办事项1',
    completed: false
  }
}
```

当然，`action` 的形式是多种多样的，唯一的约束仅仅就是包含一个 `type` 属性罢了  
也就是说，下面这些 `action` 都是合法的：

```js
/** 如下都是合法的，但就是不够规范 **/
{
  type: 'ADD_TODO',
  id: 1,
  content: '待办事项1',
  completed: false
}

{
  type: 'ADD_TODO',
  abcdefg: {
    id: 1,
    content: '待办事项1',
    completed: false
  }
}
```

> 虽说没有约束，但最好还是遵循[规范][flux-action-pattern]

如果需要新增一个代办事项，实际上就是将 `code-2` 中的 `payload` **“写入”** 到 `state.todos` 数组中（如何“写入”？在此留个悬念）：

```js
/** 本代码块记为 code-3 **/
{
  counter: 0,
  todos: [{
    id: 1,
    content: '待办事项1',
    completed: false
  }]
}
```

刨根问底，`action` 是谁生成的呢？

### ⊙ Action Creator

> Action Creator 可以是同步的，也可以是异步的

顾名思义，Action Creator 是 `action` 的创造者，本质上就是一个**函数**，返回值是一个 `action`（**对象**）  
例如下面就是一个 “新增一个待办事项” 的 Action Creator：

```js
/** 本代码块记为 code-4 **/
var id = 1;
function addTodo(content) {
  return {
    type: "ADD_TODO",
    payload: {
      id: id++,
      content: content, // 待办事项内容
      completed: false // 是否完成的标识
    }
  };
}
```

将该函数应用到一个表单（假设 `store` 为全局变量，并引入了 jQuery ）：

```html
<--! 本代码块记为 code-5 -->
<input type="text" id="todoInput" />
<button id="btn">提交</button>

<script>
$('#btn').on('click', function() {
  var content = $('#todoInput').val() // 获取输入框的值
  var action = addTodo(content) // 执行 Action Creator 获得 action
  store.dispatch(action) // 改变 state 的不二法门：dispatch 一个 action！！！
})
</script>
```

在输入框中输入 “待办事项 2” 后，点击一下提交按钮，我们的 `state` 就变成了：

```js
/** 本代码块记为 code-6 **/
{
  counter: 0,
  todos: [{
    id: 1,
    content: '待办事项1',
    completed: false
  }, {
    id: 2,
    content: '待办事项2',
    completed: false
  }]
}
```

> 通俗点讲，Action Creator 用于绑定到用户的操作（点击按钮等），其返回值 `action` 用于之后的 `dispatch(action)`

刚刚提到过，`action` 明明就没有强制的规范，为什么 `store.dispatch(action)` 之后，  
Redux 会明确知道是提取 `action.payload`，并且是对应写入到 `state.todos` 数组中？  
又是谁负责“写入”的呢？悬念即将揭晓...

## &sect; Reducer

> Reducer 必须是同步的纯函数

用户每次 `dispatch(action)` 后，都会触发 `reducer` 的执行  
`reducer` 的实质是一个**函数**，根据 `action.type` 来**更新** `state` 并返回 `nextState`  
最后会用 `reducer` 的返回值 `nextState` **完全替换掉**原来的 `state`

> 注意：上面的这个 “更新” 并不是指 `reducer` 可以直接对 `state` 进行修改  
> Redux 规定，须先复制一份 `state`，在副本 `nextState` 上进行修改操作  
> 例如，可以使用 lodash 的 `cloneDeep`，也可以使用 `Object.assign / map / filter/ ...` 等返回副本的函数

在上面 Action Creator 中提到的 待办事项的 `reducer` 大概是长这个样子 (为了容易理解，在此不使用 ES6 / [Immutable.js][immutable])：

```js
/** 本代码块记为 code-7 **/
var initState = {
  counter: 0,
  todos: []
};

function reducer(state, action) {
  // ※ 应用的初始状态是在第一次执行 reducer 时设置的 ※
  if (!state) state = initState;

  switch (action.type) {
    case "ADD_TODO":
      var nextState = _.cloneDeep(state); // 用到了 lodash 的深克隆
      nextState.todos.push(action.payload);
      return nextState;

    default:
      // 由于 nextState 会把原 state 整个替换掉
      // 若无修改，必须返回原 state（否则就是 undefined）
      return state;
  }
}
```

> 通俗点讲，就是 `reducer` 返回啥，`state` 就被替换成啥

## &sect; 总结

* `store` 由 Redux 的 `createStore(reducer)` 生成
* `state` 通过 `store.getState()` 获取，本质上一般是一个存储着整个应用状态的**对象**
* `action` 本质上是一个包含 `type` 属性的普通**对象**，由 Action Creator (**函数**) 产生
* 改变 `state` 必须 `dispatch` 一个 `action`
* `reducer` 本质上是根据 `action.type` 来更新 `state` 并返回 `nextState` 的**函数**
* `reducer` 必须返回值，否则 `nextState` 即为 `undefined`
* 实际上，**`state` 就是所有 `reducer` 返回值的汇总**（本教程只有一个 `reducer`，主要是应用场景比较简单）

> Action Creator => `action` => `store.dispatch(action)` => `reducer(state, action)` => ~~`原 state`~~ `state = nextState`

### ⊙ Redux 与传统后端 MVC 的对照

| Redux                             | 传统后端 MVC                                    |
| --------------------------------- | ----------------------------------------------- |
| `store`                           | 数据库实例                                      |
| `state`                           | 数据库中存储的数据                              |
| `dispatch(action)`                | 用户发起请求                                    |
| `action: { type, payload }`       | `type` 表示请求的 URL，`payload` 表示请求的数据 |
| `reducer`                         | 路由 + 控制器（handler）                        |
| `reducer` 中的 `switch-case` 分支 | 路由，根据 `action.type` 路由到对应的控制器     |
| `reducer` 内部对 `state` 的处理   | 控制器对数据库进行增删改操作                    |
| `reducer` 返回 `nextState`        | 将修改后的记录写回数据库                        |

## &sect; 最简单的例子 ( [在线演示][jsbin] )

```html
<!DOCTYPE html>
<html>
<head>
  <script src="//cdn.bootcss.com/redux/3.5.2/redux.min.js"></script>
</head>
<body>
<script>
/** Action Creators */
function inc() {
  return { type: 'INCREMENT' };
}
function dec() {
  return { type: 'DECREMENT' };
}

function reducer(state, action) {
  // 首次调用本函数时设置初始 state
  state = state || { counter: 0 };

  switch (action.type) {
    case 'INCREMENT':
      return { counter: state.counter + 1 };
    case 'DECREMENT':
      return { counter: state.counter - 1 };
    default:
      return state; // 无论如何都返回一个 state
  }
}

var store = Redux.createStore(reducer);

console.log( store.getState() ); // { counter: 0 }

store.dispatch(inc());
console.log( store.getState() ); // { counter: 1 }

store.dispatch(inc());
console.log( store.getState() ); // { counter: 2 }

store.dispatch(dec());
console.log( store.getState() ); // { counter: 1 }
</script>
</body>
</html>
```

> 由上可知，Redux 并不一定要搭配 React 使用。Redux 纯粹只是一个状态管理库，几乎可以搭配任何框架使用

# Redux 进阶教程

## &sect; Redux API 总览

在 Redux 的[源码目录][redux-src] `src/`，我们可以看到如下文件结构：

```
├── utils/
│     ├── warning.js # 打酱油的，负责在控制台显示警告信息
├── applyMiddleware.js
├── bindActionCreators.js
├── combineReducers.js
├── compose.js
├── createStore.js
├── index.js # 入口文件
```

除去打酱油的 `utils/warning.js` 以及入口文件 `index.js`，剩下那 5 个就是 Redux 的 API

## &sect; [compose(...functions)][compose]

> 先说这个 API 的原因是它没有依赖，是一个纯函数

### ⊙ 源码分析

```js
/**
 * 看起来逼格很高，实际运用其实是这样子的：
 * compose(f, g, h)(...arg) => f(g(h(...args)))
 *
 * 值得注意的是，它用到了 reduceRight，因此执行顺序是从右到左
 *
 * @param  {多个函数，用逗号隔开}
 * @return {函数}
 */

export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  const last = funcs[funcs.length - 1];
  const rest = funcs.slice(0, -1);
  return (...args) =>
    rest.reduceRight((composed, f) => f(composed), last(...args));
}
```

这里的关键点在于，`reduceRight` 可传入初始值：

```js
// 由于 reduce / reduceRight 仅仅是方向的不同，因此下面用 reduce 说明即可
var arr = [1, 2, 3, 4, 5];

var re1 = arr.reduce(function(total, i) {
  return total + i;
});
console.log(re1); // 15

var re2 = arr.reduce(function(total, i) {
  return total + i;
}, 100); // <---------------传入一个初始值
console.log(re2); // 115
```

下面是 `compose` 的实例（[在线演示](http://jsbin.com/gavomes/edit?html,console)）：

```html
<!DOCTYPE html>
<html>
<head>
  <script src="//cdn.bootcss.com/redux/3.5.2/redux.min.js"></script>
</head>
<body>
<script>
function func1(num) {
  console.log('func1 获得参数 ' + num);
  return num + 1;
}

function func2(num) {
  console.log('func2 获得参数 ' + num);
  return num + 2;
}

function func3(num) {
  console.log('func3 获得参数 ' + num);
  return num + 3;
}

// 有点难看（如果函数名再长一点，那屏幕就不够宽了）
var re1 = func3(func2(func1(0)));
console.log('re1：' + re1);

console.log('===============');

// 很优雅
var re2 = Redux.compose(func3, func2, func1)(0);
console.log('re2：' + re2);
</script>
</body>
</html>
```

控制台输出：

```
func1 获得参数 0
func2 获得参数 1
func3 获得参数 3
re1：6
===============
func1 获得参数 0
func2 获得参数 1
func3 获得参数 3
re2：6
```

## &sect; [createStore(reducer, initialState, enhancer)][createstore]

### ⊙ 源码分析

```js
import isPlainObject from "lodash/isPlainObject";
import $$observable from "symbol-observable";

/**
 * 这是 Redux 的私有 action 常量
 * 长得太丑了，你不要鸟就行了
 */
export var ActionTypes = {
  INIT: "@@redux/INIT"
};

/**
 * @param  {函数}  reducer 不多解释了
 * @param  {对象}  preloadedState 主要用于前后端同构时的数据同步
 * @param  {函数}  enhancer 很牛逼，可以实现中间件、时间旅行，持久化等
 * ※ Redux 仅提供 applyMiddleware 这个 Store Enhancer ※
 * @return {Store}
 */
export default function createStore(reducer, preloadedState, enhancer) {
  // 这里省略的代码，到本文的最后再讲述（用于压轴你懂的）

  var currentReducer = reducer;
  var currentState = preloadedState; // 这就是整个应用的 state
  var currentListeners = []; // 用于存储订阅的回调函数，dispatch 后逐个执行
  var nextListeners = currentListeners; //【悬念1：为什么需要两个 存放回调函数 的变量？】
  var isDispatching = false;

  /**
   * 【悬念1·解疑】
   * 试想，dispatch 后，回调函数正在乖乖地被逐个执行（for 循环进行时）
   * 假设回调函数队列原本是这样的 [a, b, c, d]
   *
   * 现在 for 循环执行到第 3 步，亦即 a、b 已经被执行，准备执行 c
   * 但在这电光火石的瞬间，a 被取消订阅！！！
   *
   * 那么此时回调函数队列就变成了 [b, c, d]
   * 那么第 3 步就对应换成了 d！！！
   * c 被跳过了！！！这就是躺枪。。。
   *
   * 作为一个回调函数，最大的耻辱就是得不到执行
   * 因此为了避免这个问题，本函数会在上述场景中把
   * currentListeners 复制给 nextListeners
   *
   * 这样的话，dispatch 后，在逐个执行回调函数的过程中
   * 如果有新增订阅或取消订阅，都在 nextListeners 中操作
   * 让 currentListeners 中的回调函数得以完整地执行
   *
   * 既然新增是在 nextListeners 中 push，因此毫无疑问
   * 新的回调函数不会在本次 currentListeners 的循环体中被触发
   *
   * （上述事件发生的几率虽然很低，但还是严谨点比较好）
   */
  function ensureCanMutateNextListeners() {
    // <-------这货就叫做【ensure 哥】吧
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * 返回 state
   */
  function getState() {
    return currentState;
  }

  /**
   * 负责注册回调函数的老司机
   *
   * 这里需要注意的就是，回调函数中如果需要获取 state
   * 那每次获取都请使用 getState()，而不是开头用一个变量缓存住它
   * 因为回调函数执行期间，有可能有连续几个 dispatch 让 state 改得物是人非
   * 而且别忘了，dispatch 之后，整个 state 是被完全替换掉的
   * 你缓存的 state 指向的可能已经是老掉牙的 state 了！！！
   *
   * @param  {函数} 想要订阅的回调函数
   * @return {函数} 取消订阅的函数
   */
  function subscribe(listener) {
    if (typeof listener !== "function") {
      throw new Error("Expected listener to be a function.");
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners(); // 调用 ensure 哥保平安
    nextListeners.push(listener); // 新增订阅在 nextListeners 中操作

    // 返回一个取消订阅的函数
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners(); // 调用 ensure 哥保平安
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1); // 取消订阅还是在 nextListeners 中操作
    };
  }

  /**
   * 改变应用状态 state 的不二法门：dispatch 一个 action
   * 内部的实现是：往 reducer 中传入 currentState 以及 action
   * 用其返回值替换 currentState，最后逐个触发回调函数
   *
   * 如果 dispatch 的不是一个对象类型的 action（同步的），而是 Promise / thunk（异步的）
   * 则需引入 redux-thunk 等中间件来反转控制权【悬念2：什么是反转控制权？】
   *
   * @param & @return {对象} action
   */
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error(
        "Actions must be plain objects. " +
          "Use custom middleware for async actions."
      );
    }

    if (typeof action.type === "undefined") {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
          "Have you misspelled a constant?"
      );
    }

    if (isDispatching) {
      throw new Error("Reducers may not dispatch actions.");
    }

    try {
      isDispatching = true;
      // 关键点：currentState 与 action 会流通到所有的 reducer
      // 所有 reducer 的返回值整合后，替换掉当前的 currentState
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    // 令 currentListeners 等于 nextListeners，表示正在逐个执行回调函数（这就是上面 ensure 哥的判定条件）
    var listeners = (currentListeners = nextListeners);

    // 逐个触发回调函数
    for (var i = 0; i < listeners.length; i++) {
      listeners[i]();

      /* 现在逐个触发回调函数变成了：
            var listener = listeners[i]
            listener() // 该中间变量避免了 this 指向 listeners 而造成泄露的问题 */
      // 在此衷心感谢 @BuptStEve 在 issue7 中指出之前我对此处的错误解读
    }

    return action; // 为了方便链式调用，dispatch 执行完毕后，返回 action（下文会提到的，稍微记住就好了）
  }

  /**
   * 替换当前 reducer 的老司机
   * 主要用于代码分离按需加载、热替换等情况
   *
   * @param {函数} nextReducer
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== "function") {
      throw new Error("Expected the nextReducer to be a function.");
    }

    currentReducer = nextReducer; // 就是这么简单粗暴！
    dispatch({ type: ActionTypes.INIT }); // 触发生成新的 state 树
  }

  /**
   * 这是留给 可观察/响应式库 的接口（详情 https://github.com/zenparsing/es-observable）
   * 如果您了解 RxJS 等响应式编程库，那可能会用到这个接口，否则请略过
   * @return {observable}
   */
  function observable() {
    略;
  }

  // 这里 dispatch 只是为了生成 应用初始状态
  dispatch({ type: ActionTypes.INIT });

  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
  };
}
```

【悬念 2：什么是反转控制权？ · 解疑】  
在同步场景下，`dispatch(action)` 的这个 `action` 中的数据是同步获取的，并没有控制权的切换问题  
但异步场景下，则需要将 `dispatch` 传入到回调函数。待异步操作完成后，回调函数**自行**调用 `dispatch(action)`

说白了：在异步 Action Creator 中**自行**调用 `dispatch` 就相当于反转控制权  
您完全可以自己实现，也可以借助 [redux-thunk][redux-thunk] / [redux-promise][redux-promise] 等中间件统一实现  
（它们的作用也仅仅就是把 `dispatch` 等传入异步 Action Creator 罢了）

> 拓展阅读：阮老师的 [Thunk 函数的含义与用法][ryf-thunk]  
> 题外话：您不觉得 JavaScript 的回调函数，就是反转控制权最普遍的体现吗？

## &sect; [combineReducers(reducers)][combinereducers]

### ⊙ 应用场景

简明教程中的 `code-7` 如下：

```js
/** 本代码块记为 code-7 **/
var initState = {
  counter: 0,
  todos: []
};

function reducer(state, action) {
  if (!state) state = initState;

  switch (action.type) {
    case "ADD_TODO":
      var nextState = _.cloneDeep(state); // 用到了 lodash 的深克隆
      nextState.todos.push(action.payload);
      return nextState;

    default:
      return state;
  }
}
```

上面的 `reducer` 仅仅是实现了 “新增待办事项” 的 `state` 的处理  
我们还有计数器的功能，下面我们继续增加计数器 “增加 1” 的功能：

```js
/** 本代码块记为 code-8 **/
var initState = { counter: 0, todos: [] };

function reducer(state, action) {
  if (!state) return initState; // 若是初始化可立即返回应用初始状态
  var nextState = _.cloneDeep(state); // 否则二话不说先克隆

  switch (action.type) {
    case "ADD_TODO": // 新增待办事项
      nextState.todos.push(action.payload);
      break;
    case "INCREMENT": // 计数器加 1
      nextState.counter = nextState.counter + 1;
      break;
  }
  return nextState;
}
```

如果说还有其他的动作，都需要在 `code-8` 这个 `reducer` 中继续堆砌处理逻辑  
但我们知道，计数器 与 待办事项 属于两个不同的模块，不应该都堆在一起写  
如果之后又要引入新的模块（例如留言板），该 `reducer` 会越来越臃肿  
此时就是 `combineReducers` 大显身手的时刻：

```
目录结构如下
reducers/
   ├── index.js
   ├── counterReducer.js
   ├── todosReducer.js
```

```js
/** 本代码块记为 code-9 **/
/* reducers/index.js */
import { combineReducers } from 'redux'
import counterReducer from './counterReducer'
import todosReducer from './todosReducer'

const rootReducer = combineReducers({
  counter: counterReducer, // 键名就是该 reducer 对应管理的 state
  todos: todosReducer
})

export default rootReducer

-------------------------------------------------

/* reducers/counterReducer.js */
export default function counterReducer(counter = 0, action) { // 传入的 state 其实是 state.counter
  switch (action.type) {
    case 'INCREMENT':
      return counter + 1 // counter 是值传递，因此可以直接返回一个值
    default:
      return counter
  }
}

-------------------------------------------------

/* reducers/todosReducers */
export default function todosReducer(todos = [], action) { // 传入的 state 其实是 state.todos
  switch (action.type) {
    case 'ADD_TODO':
      return [ ...todos, action.payload ]
    default:
      return todos
  }
}
```

`code-8 reducer` 与 `code-9 rootReducer` 的功能是一样的，但后者的各个子 `reducer` 仅维护对应的那部分 `state`  
其可操作性、可维护性、可扩展性大大增强

> Flux 中是根据不同的功能拆分出多个 `store` 分而治之  
> 而 Redux 只允许应用中有唯一的 `store`，通过拆分出多个 `reducer` 分别管理对应的 `state`

---

下面继续来深入使用 `combineReducers`。一直以来我们的应用状态都是只有两层，如下所示：

```
state
  ├── counter: 0
  ├── todos: []
```

如果说现在又有一个需求：在待办事项模块中，存储用户每次操作（增删改）的时间，那么此时应用初始状态树应为：

```
state
  ├── counter: 0
  ├── todo
        ├── optTime: []
        ├── todoList: [] # 这其实就是原来的 todos！
```

那么对应的 `reducer` 就是：

```
目录结构如下
reducers/
   ├── index.js <-------------- combineReducers (生成 rootReducer)
   ├── counterReducer.js
   ├── todoReducers/
           ├── index.js <------ combineReducers
           ├── optTimeReducer.js
           ├── todoListReducer.js
```

```js
/* reducers/index.js */
import { combineReducers } from 'redux'
import counterReducer from './counterReducer'
import todoReducers from './todoReducers/'

const rootReducer = combineReducers({
  counter: counterReducer,
  todo: todoReducers
})

export default rootReducer

=================================================

/* reducers/todoReducers/index.js */
import { combineReducers } from 'redux'
import optTimeReducer from './optTimeReducer'
import todoListReducer from './todoListReducer'

const todoReducers = combineReducers({
  optTime: optTimeReducer,
  todoList: todoListReducer
})

export default todoReducers

-------------------------------------------------

/* reducers/todosReducers/optTimeReducer.js */
export default function optTimeReducer(optTime = [], action) {
  // 咦？这里怎么没有 switch-case 分支？谁说 reducer 就一定包含 switch-case 分支的？
  return action.type.includes('TODO') ? [ ...optTime, new Date() ] : optTime
}

-------------------------------------------------

/* reducers/todosReducers/todoListReducer.js */
export default function todoListReducer(todoList = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [ ...todoList, action.payload ]
    default:
      return todoList
  }
}
```

无论您的应用状态树有多么的复杂，都可以通过逐层下分管理对应部分的 `state`：

```
                                 counterReducer(counter, action) -------------------- counter
                              ↗                                                              ↘
rootReducer(state, action) —→∑     ↗ optTimeReducer(optTime, action) ------ optTime ↘         nextState
                              ↘—→∑                                                    todo  ↗
                                   ↘ todoListReducer(todoList,action) ----- todoList ↗


注：左侧表示 dispatch 分发流，∑ 表示 combineReducers；右侧表示各实体 reducer 的返回值，最后汇总整合成 nextState
```

看了上图，您应该能直观感受到为何取名为 `reducer` 了吧？把 `state` 分而治之，极大减轻开发与维护的难度

> 无论是 `dispatch` 哪个 `action`，都会流通**所有的** `reducer`  
> 表面上看来，这样子很浪费性能，但 JavaScript 对于这种**纯函数**的调用是很高效率的，因此请尽管放心  
> 这也是为何 `reducer` 必须返回其对应的 `state` 的原因。否则整合状态树时，该 `reducer` 对应的键值就是 `undefined`

### ⊙ 源码分析

> 仅截取关键部分，毕竟有很大一部分都是类型检测警告

```js
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];
    if (typeof reducers[key] === "function") {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers);

  // 返回合成后的 reducer
  return function combination(state = {}, action) {
    var hasChanged = false;
    var nextState = {};
    for (var i = 0; i < finalReducerKeys.length; i++) {
      var key = finalReducerKeys[i];
      var reducer = finalReducers[key];
      var previousStateForKey = state[key]; // 获取当前子 state
      var nextStateForKey = reducer(previousStateForKey, action); // 执行各子 reducer 中获取子 nextState
      nextState[key] = nextStateForKey; // 将子 nextState 挂载到对应的键名
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
```

> 在此我的注释很少，因为代码写得实在是太过明了了，注释反而影响阅读  
> 作者 Dan 用了大量的 `for` 循环，的确有点不够优雅

## &sect; [bindActionCreators(actionCreators, dispatch)][bindactioncreators]

> 这个 API 有点鸡肋，它无非就是做了这件事情：`dispatch(ActionCreator(XXX))`

### ⊙ 源码分析

```js
/* 为 Action Creator 加装上自动 dispatch 技能 */
function bindActionCreator(actionCreator, dispatch) {
  return (...args) => dispatch(actionCreator(...args));
}

export default function bindActionCreators(actionCreators, dispatch) {
  // 省去一大坨类型判断
  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === "function") {
      // 逐个装上自动 dispatch 技能
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}
```

### ⊙ 应用场景

简明教程中的 `code-5` 如下：

```html
<--! 本代码块记为 code-5 -->
<input id="todoInput" type="text" />
<button id="btn">提交</button>

<script>
$('#btn').on('click', function() {
  var content = $('#todoInput').val() // 获取输入框的值
  var action = addTodo(content)       // 执行 Action Creator 获得 action
  store.dispatch(action)              // 手动显式 dispatch 一个 action
})
</script>
```

我们看到，调用 `addTodo` 这个 Action Creator 后得到一个 `action`，之后又要手动 `dispatch(action)`  
如果是只有一个两个 Action Creator 还是可以接受，但如果有很多个那就显得有点重复了（其实我觉得不重复哈哈哈）  
这个时候我们就可以利用 `bindActionCreators` 实现自动 `dispatch`：

```html
<input id="todoInput" type="text" />
<button id="btn">提交</button>

<script>
// 全局引入 Redux、jQuery，同时 store 是全局变量
var actionsCreators = Redux.bindActionCreators(
  { addTodo: addTodo },
  store.dispatch // 传入 dispatch 函数
)

$('#btn').on('click', function() {
  var content = $('#todoInput').val()
  actionCreators.addTodo(content) // 它会自动 dispatch
})
</script>
```

> 综上，这个 API 没啥卵用，尤其是异步场景下，基本用不上

## &sect; [applyMiddleware(...middlewares)][applymiddleware]

> Redux 中文文档 [高级 · Middleware][redux-middleware] 有提到中间件的演化由来

首先要理解何谓 `Middleware`，何谓 `Enhancer`

### ⊙ Middleware

说白了，Redux 引入中间件机制，其实就是为了在 `dispatch` 前后，**统一**“做爱做的事”。。。  
诸如统一的日志记录、引入 thunk 统一处理异步 Action Creator 等都属于中间件  
下面是一个简单的打印动作前后 `state` 的中间件：

```js
/* 装逼写法 */
const printStateMiddleware = ({ getState }) => next => action => {
  console.log('state before dispatch', getState())

  let returnValue = next(action)

  console.log('state after dispatch', getState())

  return returnValue
}

-------------------------------------------------

/* 降低逼格写法 */
function printStateMiddleware(middlewareAPI) { // 记为【锚点-1】，中间件内可用的 API
  return function (dispatch) {                 // 记为【锚点-2】，传入上级中间件处理逻辑（若无则为原 store.dispatch）

    // 下面记为【锚点-3】，整个函数将会被传到下级中间件（如果有的话）作为它的 dispatch 参数
    return function (action) { // <---------------------------------------------- 这货就叫做【中间件处理逻辑哥】吧
      console.log('state before dispatch', middlewareAPI.getState())

      var returnValue = dispatch(action) // 还记得吗，dispatch 的返回值其实还是 action

      console.log('state after dispatch', middlewareAPI.getState())

      return returnValue // 将 action 返回给上一个中间件（实际上可以返回任意值，或不返回）
      // 在此衷心感谢 @zaleGZL 在 issue15 中指出之前我对此处的错误解读
    }
  }
}
```

### ⊙ Store Enhancer

说白了，Store 增强器就是对生成的 `store` API 进行改造，这是它与中间件最大的区别（中间件不修改 `store` 的 API）  
而改造 `store` 的 API 就要从它的缔造者 `createStore` 入手。例如，Redux 的 API `applyMiddleware` 就是一个 Store 增强器：

```js
import compose from "./compose"; // 这货的作用其实就是 compose(f, g, h)(action) => f(g(h(action)))

/* 传入一坨中间件 */
export default function applyMiddleware(...middlewares) {
  /* 传入 createStore */
  return function(createStore) {
    /* 返回一个函数签名跟 createStore 一模一样的函数，亦即返回的是一个增强版的 createStore */
    return function(reducer, preloadedState, enhancer) {
      // 用原 createStore 先生成一个 store，其包含 getState / dispatch / subscribe / replaceReducer 四个 API
      var store = createStore(reducer, preloadedState, enhancer);

      var dispatch = store.dispatch; // 指向原 dispatch
      var chain = []; // 存储中间件的数组

      // 提供给中间件的 API（其实都是 store 的 API）
      var middlewareAPI = {
        getState: store.getState,
        dispatch: action => dispatch(action)
      };

      // 给中间件“装上” API，见上面 ⊙Middleware【降低逼格写法】的【锚点-1】
      chain = middlewares.map(middleware => middleware(middlewareAPI));

      // 串联所有中间件
      dispatch = compose(...chain)(store.dispatch);
      // 例如，chain 为 [M3, M2, M1]，而 compose 是从右到左进行“包裹”的
      // 那么，M1 的 dispatch 参数为 store.dispatch（见【降低逼格写法】的【锚点-2】）
      // 往后，M2 的 dispatch 参数为 M1 的中间件处理逻辑哥（见【降低逼格写法】的【锚点-3】）
      // 同样，M3 的 dispatch 参数为 M2 的中间件处理逻辑哥
      // 最后，我们得到串联后的中间件链：M3(M2(M1(store.dispatch)))
      //（这种形式的串联类似于洋葱，可参考文末的拓展阅读：中间件的洋葱模型）
      // 在此衷心感谢 @ibufu 在 issue8 中指出之前我对此处的错误解读

      return {
        ...store, // store 的 API 中保留 getState / subsribe / replaceReducer
        dispatch // 新 dispatch 覆盖原 dispatch，往后调用 dispatch 就会触发 chain 内的中间件链式串联执行
      };
    };
  };
}
```

最终返回的虽然还是 `store` 的那四个 API，但其中的 `dispatch` 函数的功能被增强了，这就是所谓的 Store Enhancer

### ⊙ 综合应用 ( [在线演示][jsbin] )

```html
<!DOCTYPE html>
<html>
<head>
  <script src="//cdn.bootcss.com/redux/3.5.2/redux.min.js"></script>
</head>
<body>
<script>
/** Action Creators */
function inc() {
  return { type: 'INCREMENT' };
}
function dec() {
  return { type: 'DECREMENT' };
}

function reducer(state, action) {
  state = state || { counter: 0 };

  switch (action.type) {
    case 'INCREMENT':
      return { counter: state.counter + 1 };
    case 'DECREMENT':
      return { counter: state.counter - 1 };
    default:
      return state;
  }
}

function printStateMiddleware(middlewareAPI) {
  return function (dispatch) {
    return function (action) {
      console.log('dispatch 前：', middlewareAPI.getState());
      var returnValue = dispatch(action);
      console.log('dispatch 后：', middlewareAPI.getState(), '\n');
      return returnValue;
    };
  };
}

var enhancedCreateStore = Redux.applyMiddleware(printStateMiddleware)(Redux.createStore);
var store = enhancedCreateStore(reducer);

store.dispatch(inc());
store.dispatch(inc());
store.dispatch(dec());
</script>
</body>
</html>
```

控制台输出：

```
dispatch 前：{ counter: 0 }
dispatch 后：{ counter: 1 }

dispatch 前：{ counter: 1 }
dispatch 后：{ counter: 2 }

dispatch 前：{ counter: 2 }
dispatch 后：{ counter: 1 }
```

---

实际上，上面生成 `store` 的代码可以更加优雅：

```js
/** 本代码块记为 code-10 **/
var store = Redux.createStore(
  reducer,
  Redux.applyMiddleware(printStateMiddleware)
);
```

如果有多个中间件以及多个增强器，还可以这样写（请留意序号顺序）：

> 重温一下 `createStore` 完整的函数签名：`function createStore(reducer, preloadedState, enhancer)`

```js
/** 本代码块记为 code-11 **/
import { createStore, applyMiddleware, compose } from "redux";

const store = createStore(
  reducer,
  preloadedState, // 可选，前后端同构的数据同步
  compose(
    // 还记得吗？compose 是从右到左的哦！
    applyMiddleware(
      // 这货也是 Store Enhancer 哦！但这是关乎中间件的增强器，必须置于 compose 执行链的最后
      middleware1,
      middleware2,
      middleware3
    ),
    enhancer3,
    enhancer2,
    enhancer1
  )
);
```

为什么会支持那么多种写法呢？在 `createStore` 的源码分析的开头部分，我省略了一些代码，现在奉上该压轴部分：

```js
/** 本代码块记为 code-12 **/
if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
  // 这里就是上面 code-10 的情况，只传入 reducer 和 Store Enhancer 这两个参数
  enhancer = preloadedState;
  preloadedState = undefined;
}

if (typeof enhancer !== "undefined") {
  if (typeof enhancer !== "function") {
    throw new Error("Expected the enhancer to be a function.");
  }
  // 存在 enhancer 就立即执行，返回增强版的 createStore <--------- 记为【锚点 12-1】
  return enhancer(createStore)(reducer, preloadedState);
}

if (typeof reducer !== "function") {
  throw new Error("Expected the reducer to be a function.");
}

// 除 compose 外，createStore 竟然也在此为我们提供了书写的便利与自由度，实在是太体贴了
```

如果像 `code-11` 那样有多个 `enhancer`，则 `code-12 【锚点 12-1】` 中的代码会执行多次  
生成最终的超级增强版 `store`。最后，奉上 `code-11` 中 `compose` 内部的执行顺序示意图：

```
原 createStore ————
                  │
                  ↓
return enhancer1(createStore)(reducer, preloadedState, enhancer2)
   |
   ├———————→ createStore 增强版 1
                    │
                    ↓
return enhancer2(createStore1)(reducer, preloadedState, enhancer3)
   |
   ├———————————→ createStore 增强版 1+2
                        │
                        ↓
return enhancer3(createStore1+2)(reducer, preloadedState, applyMiddleware(m1,m2,m3))
   |
   ├————————————————————→ createStore 增强版 1+2+3
                                     │
                                     ↓
return appleMiddleware(m1,m2,m3)(createStore1+2+3)(reducer, preloadedState)
   |
   ├——————————————————————————————————→ 生成最终增强版 store
```

---

## &sect; 总结

Redux 有五个 API，分别是：

* `createStore(reducer, [initialState])`
* `combineReducers(reducers)`
* `applyMiddleware(...middlewares)`
* `bindActionCreators(actionCreators, dispatch)`
* `compose(...functions)`

`createStore` 生成的 `store` 有四个 API，分别是：

* `getState()`
* `dispatch(action)`
* `subscribe(listener)`
* `replaceReducer(nextReducer)`

# React Redux

> 本库并不是 Redux 内置，需要单独安装

Redux 官方提供的 React 绑定库。

具有高效且灵活的特性。

## 安装

React Redux 依赖 React 0.14 或更新版本。

```
npm install --save react-redux
```

## 快速开始

本库深受 分离容器组件和展示组件 思想启发。

在应用中，只有最顶层组件是对 Redux 可知（例如路由处理）这是很好的。所有它们的子组件都应该是“笨拙”的，并且是通过 props 获取数据。

| ---          | 容器组件              | 展示组件              |
| ------------ | --------------------- | --------------------- |
| `位置`       | 数据库实例            | 中间和子组件          |
| `使用 Redux` | 是                    | 否                    |
| `读取数据`   | 从 Redux 获取 state   | 从 props 获取数据     |
| `修改数据:`  | 向 Redux 发起 actions | 从 props 调用回调函数 |

react-redux 在 redux 的基础上，就关注两点：Provider 和 connect。

### 1、Provider:

```
<Provider store={store}>
    <Router ref="router" history={hashHistory}>
        <Route path='/' component={Index}>
            <IndexRoute  component={MainPage}></IndexRoute>
        </Route>
    </Router>
</Provider>
```

Provider 就是把我们用 rudux 创建的 store 传递到内部的其他组件。让内部组件可以享有这个 store 并提供对 state 的更新。

### 2、connect:

```
export default connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
```

这个模块是算是真正意义上连接了 Redux 和 React，正好它的名字也叫 connect。

先考虑 Redux 是怎么运作的：首先 store 中维护了一个 state，我们 dispatch 一个 action，接下来 reducer 根据这个 action 更新 state。

映射到我们的 React 应用中，store 中维护的 state 就是我们的 app state，一个 React 组件作为 View 层，做两件事：render 和响应用户操作。于是 connect 就是将 store 中的必要数据作为 props 传递给 React 组件来 render，并包装 action creator 用于在响应用户操作时 dispatch 一个 action。

好了，详细看看 connect 这个模块做了什么。

mapStateToProps 是一个函数，返回值表示的是需要 merge 进 props 的 state。默认值为() => ({})，即什么都不传。

```
(state, props) => ({  }) // 通常会省略第二个参数
```

mapDispatchToProps 是可以是一个函数，返回值表示的是需要 merge 仅 props 的 actionCreators，这里的 actionCreator 应该是已经被包装了 dispatch 了的，推荐使用 redux 的 bindActionCreators 函数。

```
(dispatch, props) => ({ // 通常会省略第二个参数
 ...bindActionCreators({
   ...ResourceActions
 }, dispatch)
})
```

更方便的是可以直接接受一个对象，此时 connect 函数内部会将其转变为函数，这个函数和上面那个例子是一模一样的。

mergeProps 用于自定义 merge 流程，下面这个是默认流程，parentProps 值的就是组件自身的 props，可以发现如果组件的 props 上出现同名，会被覆盖。

```
(stateProps, dispatchProps, parentProps) => ({
  ...parentProps,
  ...stateProps,
  ...dispatchProps
})
```

options 共有两个开关：pure 代表是否打开优化，详细内容下面会提，默认为 true，withRef 用来给包装在里面的组件一个 ref，可以通过 getWrappedInstance 方法来获取这个 ref，默认为 false。

connect 返回一个函数，它接受一个 React 组件的构造函数作为连接对象，最终返回连接好的组件构造函数。

然后几个问题：

* React 组件如何响应 store 的变化？
* 为什么 connect 选择性的 merge 一些 props，而不是直接将整个 state 传入？
* pure 优化的是什么？我们把 connect 返回的函数叫做 Connector，它返回的是内部的一个叫 Connect 的组件，它在包装原有组件的基础上，还在内部监听了 Redux 的 store 的变化，为了让被它包装的组件可以响应 store 的变化:

```
trySubscribe() {
  if (shouldSubscribe && !this.unsubscribe) {
    this.unsubscribe = this.store.subscribe(::this.handleChange)
    this.handleChange()
  }
}

handleChange () {
  this.setState({
    storeState: this.store.getState()
  })
}
```

但是通常，我们 connect 的是某个 Container 组件，它并不承载所有 App state，然而我们的 handler 是响应所有 state 变化的，于是我们需要优化的是：当 storeState 变化的时候，仅在我们真正依赖那部分 state 变化时，才重新 render 相应的 React 组件，那么什么是我们真正依赖的部分？就是通过 mapStateToProps 和 mapDispatchToProps 得到的。

具体优化的方式就是在 shouldComponentUpdate 中做检查，如果只有在组件自身的 props 改变，或者 mapStateToProps 的结果改变，或者是 mapDispatchToProps 的结果改变时 shouldComponentUpdate 才会返回 true，检查的方式是进行 shallowEqual 的比较。

所以对于某个 reducer 来说：

```
export default (state = {}, action) => {
  return { ...state } // 返回的是一个新的对象，可能会使组件reRender
  // return state // 可能不会使得组件reRender
}
```

另外在 connect 的时候，要谨慎 map 真正需要的 state 或者 actionCreators 到 props 中，以避免不必要的性能损失。

最后，根据 connect 的 API 我们发现可以使用 ES7 decorator 功能来配合 React ES6 的写法：

```
@connect(
  state => ({
    user: state.user,
    resource: state.resource
  }),
  dispatch => ({
    ...bindActionCreators({
      loadResource: ResourceActions.load
    }, dispatch)
  })
)
export default class Main extends Component {

}
```
下看connect 计数器的一个demo实现

###  connect-demo 

```js
/** main **/
import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers/index.js';
import App from './containers/App.js';

let store = createStore(reducer);

ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
```
```js
/** reducer **/
import { combineReducers } from 'redux'
import counter from './counter'

//使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
    // counter 等价于counter:counter
    abc:counter // 等价于abc:counter(state.abc,action)
});
// 以下两种写法完全等价：(可以给它们设置不同的 key，或者调用不同的函数)
//   const reducer = combineReducers({
//     a: doSomethingWithA,
//     b: processB,
//     c: c,
//     counter 
//   })

// function rootReducer(state = {}, action) {
//     return {
//       a: doSomethingWithA(state.a, action),
//       b: processB(state.b, action),
//       c: c(state.c, action),
//       counter: counter(state.counter, action)
//     }
//   }
export default rootReducer;
```
```js
/** counter **/
export default function counter(state = 99, action) {
    switch (action.type) {
        case 'INCREMENT_COUNTER':
            return state + 1;
        case 'DECREMENT_COUNTER':
            return state - 1;
        default:
            return state
    }
};
```
```js
/** App **/
import { connect } from 'react-redux'
import Counter from '../component/Counter'
import actions from '../actions/counter';

//将state.counter绑定到props的counter
const mapStateToProps = (state) => {
    console.log("mapStateToProps",state)
    return {
        dd: state.abc
    }
};
//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
    console.log("ownProps",ownProps)
    return {
        increment: (...args) => dispatch(actions.increment(...args)),
        decrement: (...args) => dispatch(actions.decrement(...args))
    }
};

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(Counter)
```
```js
/** Counter **/
import React, {Component} from 'react'

class Counter extends Component {
    render() {
        //从组件的props属性中导入increment decrement 方法(mapDispatchToProps)和一个变量dd(mapStateToProps)
        const {increment, decrement, dd} = this.props;
        //渲染组件，包括一个数字，四个按钮
        return (
            <p>
                Clicked: {dd} times
                {' '}
                <button onClick={increment}>+</button>
                {' '}
                <button onClick={decrement}>-</button>
                {' '}
            </p>
        )
    }
}

export default Counter
```
```js
/** actions **/
const increment = ()=> {
    return {
        type: 'INCREMENT_COUNTER',
    }
};
const decrement = ()=> {
    return {type: 'DECREMENT_COUNTER'}
};

module.exports = {
    increment,
    decrement
};
```
