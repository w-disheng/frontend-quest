window.QUESTIONS = [
  {
    "id": "J1",
    "title": "作用域、提升与 TDZ",
    "chapter": 0,
    "page": 7,
    "prompt": "这段代码首先会发生什么？",
    "choices": [
      "输出 undefined，然后抛出 ReferenceError",
      "输出 undefined 和 undefined",
      "先输出 1，再输出 2",
      "代码不会报错"
    ],
    "answer": "var 声明在执行前初始化为 undefined；let/const 在初始化前处于暂时性死区，访问会报错。const 限制的是绑定重新赋值，对象属性仍可变。",
    "points": [
      "var 是函数作用域，let/const 是块级作用域",
      "TDZ 内访问会报 ReferenceError",
      "函数表达式的变量声明与函数值初始化要分开看"
    ],
    "memory": "var 提前占座；let / const 到点入座。",
    "follow": "const obj = {} 后为什么能修改 obj.name？",
    "code": "console.log(a);\nvar a = 1;\nconsole.log(b);\nlet b = 2;",
    "english": "Var is function-scoped and initialized to undefined before execution. Let and const are block-scoped and have a temporal dead zone. Const prevents reassignment, not object mutation. A function expression is initialized when its expression is evaluated.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "J2",
    "title": "闭包：把作用域带走",
    "chapter": 0,
    "page": 7,
    "prompt": "三个定时器最终输出什么？",
    "choices": [
      "3、3、3",
      "0、1、2",
      "undefined 三次",
      "随机顺序的 0、1、2"
    ],
    "answer": "闭包让函数继续访问创建时的词法环境。var 循环共享一个 i，回调执行时循环已结束，i 为 3；let 每轮创建独立绑定。",
    "points": [
      "闭包捕获词法环境，不是自动复制变量的值",
      "私有状态、防抖与回调都用得到",
      "闭包本身不是泄漏；不再需要却仍可达的引用才值得排查"
    ],
    "memory": "函数带着出生地的地址簿。",
    "follow": "改成 let 后为什么输出不同？",
    "code": "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}",
    "english": "A closure is a function bundled with the scope where it was created, so it can access those variables later. I use closures for private state, factories, debounce and throttle. The classic trap: var in a loop shares one binding, so timeouts all print the last value — let fixes it because each iteration gets its own binding.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "J3",
    "title": "this 的四种调用方式",
    "chapter": 0,
    "page": 7,
    "prompt": "严格模式下，脱离对象调用普通方法，this 是什么？",
    "choices": [
      "undefined",
      "obj",
      "window",
      "函数本身"
    ],
    "answer": "普通函数的 this 由调用方式决定。obj.fn() 指向 obj；独立调用在严格模式下为 undefined；call/apply/bind 显式指定；new 构造时使用新实例。",
    "points": [
      "先看调用位置，不看定义位置",
      "严格模式独立调用 this 是 undefined",
      "箭头函数从外层词法环境取得 this"
    ],
    "memory": "普通函数问“谁叫我”，箭头函数问“我在哪出生”。",
    "follow": "如果把 read 改成箭头函数会怎样？",
    "code": "'use strict';\nconst obj = { read() { return this; } };\nconst fn = obj.read;\nconsole.log(fn());",
    "english": "Four rules: plain call → global (undefined in strict mode); method call → the object; call/apply/bind → the given value; new → the new object. Arrow functions have no own this — they inherit it lexically and it can't be changed. They also have no arguments and can't be constructors.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "J4",
    "title": "call / apply / bind",
    "chapter": 0,
    "page": 8,
    "prompt": "哪一种操作不会立刻执行原函数？",
    "choices": [
      "fn.bind(obj, 1)",
      "fn.call(obj, 1)",
      "fn.apply(obj, [1])",
      "fn(1)"
    ],
    "answer": "call 逐个传参，apply 接受类数组参数，bind 返回一个绑定函数。原生绑定函数被 new 调用时忽略绑定的 this，仍保留预设参数。",
    "points": [
      "call 与 apply 立即调用",
      "bind 返回新函数，支持预设参数",
      "完整手写 bind 还要处理构造调用与原型语义"
    ],
    "memory": "call 散装，apply 打包，bind 预约。",
    "follow": "为什么只用 apply 包一层不等价于原生 bind？",
    "code": "function read(x) { return this.n + x; }\nconst f = read.bind({ n: 2 }, 3);\nconsole.log(f()); // 5",
    "english": "call takes arguments one by one, apply takes an array, bind returns a new function without calling it. A hand-written bind returns a function that applies the original with the bound context and preset arguments.",
    "source": "top",
    "kind": "quiz",
    "note": "原资料的 myBind 简化代码不能正确覆盖 new 场景，不作为完整实现背诵。",
    "url": "",
    "correct": 0
  },
  {
    "id": "J5",
    "title": "原型链与 class",
    "chapter": 0,
    "page": 8,
    "prompt": "对象自身没有某属性时，JavaScript 如何继续查找？",
    "choices": [
      "沿内部原型链向上查找，直到 null",
      "只检查 Object.prototype",
      "复制父类全部属性到实例",
      "始终返回 undefined"
    ],
    "answer": "属性查找先看自身，再沿内部 [[Prototype]] 链，终点是 null。class 基于原型机制，但还具有严格模式、不能无 new 调用等语义。",
    "points": [
      "Object.getPrototypeOf 可读取原型",
      "普通构造函数的 prototype 与实例内部原型不同",
      "Object.create(null) 没有 Object.prototype"
    ],
    "memory": "查不到就问上一层，问到 null 为止。",
    "follow": "实例方法放在 prototype 上有什么好处？",
    "code": "const parent = { role: 'reader' };\nconst child = Object.create(parent);\nconsole.log(child.role); // reader",
    "english": "Property lookup follows the internal prototype chain until null. Class uses prototypes with additional semantics. Object.getPrototypeOf reveals the link; a constructor prototype property is a different concept.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "J6",
    "title": "new 的执行过程",
    "chapter": 0,
    "page": 8,
    "prompt": "构造函数显式返回一个对象，new 会返回什么？",
    "choices": [
      "显式返回的那个对象",
      "永远返回新建实例",
      "undefined",
      "抛出 TypeError"
    ],
    "answer": "对普通构造函数，new 创建实例并连接原型，用实例作为 this 执行构造函数。如果返回对象或函数，使用该返回值；返回原始值则通常忽略。",
    "points": [
      "创建对象",
      "连接原型并绑定 this 执行",
      "根据显式返回值决定最终结果"
    ],
    "memory": "造对象 → 连原型 → 执行 → 选返回值。",
    "follow": "如果 return 42 呢？",
    "code": "function User() {\n  this.name = 'A';\n  return { name: 'B' };\n}\nconsole.log(new User().name);",
    "english": "Four steps: create an empty object, link it to the constructor's prototype, run the constructor with this set to it, and return the object unless the constructor returns its own object.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "J7",
    "title": "Event Loop 输出挑战",
    "chapter": 1,
    "page": 8,
    "prompt": "在浏览器普通脚本中，输出顺序是什么？",
    "choices": [
      "1 → 4 → 3 → 2",
      "1 → 2 → 3 → 4",
      "1 → 3 → 4 → 2",
      "1 → 4 → 2 → 3"
    ],
    "answer": "先执行当前同步代码，然后在微任务检查点清空微任务队列，再执行后续任务。Promise.then 是微任务，setTimeout 回调是任务；浏览器渲染有自己的调度时机，不应简单当成普通定时器任务。",
    "points": [
      "同步代码先执行",
      "微任务会在下一任务前排空，包括新追加的微任务",
      "0ms 定时器不代表立即执行"
    ],
    "memory": "先清桌面，再清便签，才拿下一份工作。",
    "follow": "then 里再注册一个 then，会排在 timer 前吗？",
    "code": "console.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);",
    "english": "JavaScript runs synchronous code first, then drains all microtasks — Promise callbacks and queueMicrotask — then takes one macrotask like a timer, and repeats. So microtasks always run before the next macrotask. Code after await runs as a microtask too.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "J8",
    "title": "Promise 状态与错误传播",
    "chapter": 1,
    "page": 9,
    "prompt": "这条 Promise 链最终走向哪里？",
    "choices": [
      "catch，得到 cleanup failed",
      "then，得到 ok",
      "一直 pending",
      "同时走 then 和 catch"
    ],
    "answer": "Promise 从 pending 变成 fulfilled 或 rejected 后不可再改。then 返回新的 Promise。finally 通常透传结果，但如果抛错或返回拒绝的 Promise，新链会变成拒绝。",
    "points": [
      "then/catch 的返回值决定下一个 Promise",
      "错误沿链传播到能处理它的 catch",
      "finally 抛错可以覆盖先前结果"
    ],
    "memory": "finally 通常做收尾，收尾失败也会改变结局。",
    "follow": "catch 返回一个普通值后，后续 then 会执行吗？",
    "code": "Promise.resolve('ok')\n  .finally(() => { throw Error('cleanup failed'); })\n  .then(console.log)\n  .catch(e => console.log(e.message));",
    "english": "Promises settle once. Each then creates a new promise. Errors propagate to catch. Finally usually preserves the outcome, unless its callback throws or rejects.",
    "source": "top",
    "kind": "quiz",
    "note": "修正原资料“finally 不改结果”的绝对说法。",
    "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally",
    "correct": 0
  },
  {
    "id": "J9",
    "title": "Promise 四兄弟",
    "chapter": 1,
    "page": 9,
    "prompt": "三个独立请求，希望保留每个成功或失败结果，应该选什么？",
    "choices": [
      "Promise.allSettled",
      "Promise.all",
      "Promise.race",
      "Promise.any"
    ],
    "answer": "all 等全部成功，一个拒绝就拒绝；allSettled 收集每个输入的最终状态；race 采用最先 settled 的结果；any 采用最先成功的值，全拒绝才以 AggregateError 拒绝。",
    "points": [
      "all 结果按输入顺序排列",
      "race 区分最快完成，any 区分最快成功",
      "这些组合器不会自动取消其他请求"
    ],
    "memory": "all 全过；settled 全收；race 抢先；any 抢成功。",
    "follow": "all 失败后，其他 fetch 会自动取消吗？",
    "code": "",
    "english": "all waits for every promise and fails fast on the first rejection, results in order. race takes whatever settles first. allSettled waits for all and reports each outcome. any takes the first success and only rejects if all fail.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "J10",
    "title": "async / await 与并行请求",
    "chapter": 1,
    "page": 9,
    "prompt": "两个互不依赖的请求如何尽早一起启动？",
    "choices": [
      "await Promise.all([fetchA(), fetchB()])",
      "先 await fetchA() 再 await fetchB()",
      "把 await 写在 forEach 回调中",
      "用 async 就自动并行"
    ],
    "answer": "async 函数总返回 Promise。await 暂停当前异步函数的后续执行，不阻塞整个线程。独立请求可以先启动后一起等待；有依赖时才按顺序等待。",
    "points": [
      "await 的后续恢复通过微任务调度",
      "try/catch 可处理被 await 的拒绝",
      "并行还是串行取决于启动时机与数据依赖"
    ],
    "memory": "先一起出发，再一起集合。",
    "follow": "如果 B 需要 A 返回的 id，还能直接 Promise.all 吗？",
    "code": "async function load() {\n  const [a, b] = await Promise.all([fetchA(), fetchB()]);\n  return { a, b };\n}",
    "english": "An async function always returns a Promise. await pauses until the Promise settles — it's syntax sugar over then. Errors go through try/catch. I avoid awaiting things one by one when they can run in parallel with Promise.all.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "J11",
    "title": "浅拷贝与深拷贝",
    "chapter": 2,
    "page": 10,
    "prompt": "这里 a.user.name 最后是什么？",
    "choices": [
      "B",
      "A",
      "undefined",
      "抛出错误"
    ],
    "answer": "展开运算符只复制一层，嵌套对象还是共享引用。structuredClone 支持许多内建类型和循环引用，但不能克隆函数与 DOM 节点；JSON 序列化会改变或丢失部分值。",
    "points": [
      "浅拷贝不隔离嵌套引用",
      "深拷贝工具有支持类型边界",
      "React 更新嵌套 state 要复制修改路径"
    ],
    "memory": "换了外盒，里面还是同一个东西。",
    "follow": "如果对象里有 Date 和循环引用，JSON 方案会怎样？",
    "code": "const a = { user: { name: 'A' } };\nconst b = { ...a };\nb.user.name = 'B';\nconsole.log(a.user.name);",
    "english": "Shallow copy copies one level — nested objects still share references. Spread and Object.assign are shallow. For deep copy I use structuredClone, which handles Dates, Maps, Sets, and circular references but not functions. The JSON trick loses functions, undefined, and Dates, and throws on circular structures.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "J12",
    "title": "防抖 vs 节流",
    "chapter": 1,
    "page": 10,
    "prompt": "搜索框只希望在用户停止输入 300ms 后请求一次，应选择？",
    "choices": [
      "防抖 debounce",
      "节流 throttle",
      "每次输入立刻请求",
      "setInterval 持续请求"
    ],
    "answer": "尾沿防抖每次调用都会重置等待时间，静默一段时间才执行；节流限制执行频率。实现时应说明前沿/尾沿语义，并考虑 this、参数和取消。",
    "points": [
      "搜索建议常用防抖",
      "滚动采样常用节流",
      "防抖不能单独解决已经发出请求的竞态"
    ],
    "memory": "防抖等安静，节流控频率。",
    "follow": "已经发出去的旧请求后返回，怎么避免覆盖新结果？",
    "code": "",
    "english": "Debounce waits until things go quiet — search suggestions, resize. Throttle runs at most once per interval — scroll and drag handlers. Both are built with timers; throttle tracks the last run time.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "J13",
    "title": "类型判断的边界",
    "chapter": 2,
    "page": 10,
    "prompt": "跨 iframe 判断一个值是否为数组，优先使用？",
    "choices": [
      "Array.isArray(value)",
      "typeof value === \"array\"",
      "value instanceof Array 永远可靠",
      "value.constructor.name 永远可靠"
    ],
    "answer": "typeof null 和数组都返回 object。instanceof 依赖原型链，跨 realm 可能不符合预期。数组优先 Array.isArray；toString 标签也可能受 Symbol.toStringTag 影响。",
    "points": [
      "typeof 适合大多数原始类型",
      "instanceof 不是跨 realm 的万能判断",
      "针对具体类型使用合适 API"
    ],
    "memory": "判断数组就问 Array.isArray。",
    "follow": "typeof null 为什么不能当作对象非空检查？",
    "code": "console.log(typeof null); // object\nconsole.log(Array.isArray([])); // true",
    "english": "Typeof works for primitives, but null and arrays report object. Instanceof checks the prototype chain and can fail across realms. I use Array.isArray for arrays.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "J14",
    "title": "浮点数精度",
    "chapter": 2,
    "page": 11,
    "prompt": "为什么 0.1 + 0.2 !== 0.3？",
    "choices": [
      "二进制浮点无法精确表示这些十进制小数",
      "加法运算符先转字符串",
      "JavaScript 随机丢位",
      "这是浏览器的 bug"
    ],
    "answer": "Number 使用二进制浮点表示，部分十进制小数不能精确表示。比较时容差要结合数值尺度；金额常按最小单位整数或十进制定点库处理，toFixed 只是格式化。",
    "points": [
      "浮点数存储会产生舍入误差",
      "Number.EPSILON 不是所有数值尺度通用容差",
      "toFixed 返回字符串，不修复计算模型"
    ],
    "memory": "计算精度和显示位数是两件事。",
    "follow": "金额先转“分”时还需要考虑什么舍入规则？",
    "code": "console.log(0.1 + 0.2);\n// 0.30000000000000004",
    "english": "Binary floating-point cannot represent every decimal exactly. I choose a tolerance based on scale. For money I use integer minor units or decimal arithmetic, and define rounding rules. ToFixed is for display.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "J15",
    "title": "作用域链与垃圾回收",
    "chapter": 0,
    "page": 11,
    "prompt": "一个不再显示的页面对象为什么可能无法被回收？",
    "choices": [
      "全局监听器仍通过闭包引用它",
      "它曾被 const 声明",
      "它属于局部变量",
      "JavaScript 不回收对象"
    ],
    "answer": "变量按词法作用域向外解析。垃圾回收关注可达性：从根仍能访问的对象会保留。未解除的事件订阅、计时器、缓存可能保留不再需要的对象。",
    "points": [
      "作用域链决定变量解析",
      "可达性决定对象是否可回收",
      "清理订阅与定时器，避免无界缓存"
    ],
    "memory": "不用不等于不可达。",
    "follow": "闭包一定会造成内存泄漏吗？",
    "code": "",
    "english": "Variables resolve by walking the scope chain outward. Garbage collection is mostly mark-and-sweep: anything reachable from the roots stays, the rest is collected. Closures, globals, and uncleared timers or listeners keep objects reachable, so I clean those up.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "J16",
    "title": "ES Modules 与 CommonJS",
    "chapter": 2,
    "page": 11,
    "prompt": "关于 CommonJS，哪句更准确？",
    "choices": [
      "require 可拿到共享的导出对象引用",
      "require 总会深拷贝所有导出值",
      "ESM 导入不是活绑定",
      "CommonJS 只能导出字符串"
    ],
    "answer": "ESM 静态 import/export 支持活绑定和静态分析。CommonJS 通过 require 在运行时加载并缓存 module.exports；导出对象可以共享引用，不能笼统说成深拷贝或独立副本。",
    "points": [
      "ESM 的导入绑定跟随导出绑定",
      "CommonJS 导出对象的属性变化可以被同一引用观察到",
      "解构读取原始值与持续读对象属性不同"
    ],
    "memory": "ESM 看绑定，CJS 看 exports 返回的值。",
    "follow": "const { count } = require(...) 后 count 会自动追踪属性变化吗？",
    "code": "",
    "english": "ES modules expose live bindings and support static analysis. CommonJS returns module.exports and caches modules. Exported objects can be shared references, not deep copies.",
    "source": "top",
    "kind": "quiz",
    "note": "修正原资料“CommonJS 导出都是值的拷贝”的简化说法。",
    "url": "https://nodejs.org/api/modules.html",
    "correct": 0
  },
  {
    "id": "J17",
    "title": "事件传播与委托",
    "chapter": 2,
    "page": 11,
    "prompt": "点击列表中的链接，只想阻止跳转但保留冒泡，应使用？",
    "choices": [
      "event.preventDefault()",
      "event.stopPropagation()",
      "两者完全一样",
      "删除父元素监听器"
    ],
    "answer": "事件通常经过捕获、目标和冒泡阶段。委托把处理器放在父元素，通过 target/closest 判断子项。preventDefault 阻止可取消的默认行为；stopPropagation 阻止传播。",
    "points": [
      "target 是触发来源，currentTarget 是当前处理器绑定元素",
      "委托适合动态子项",
      "不是所有事件都会冒泡"
    ],
    "memory": "阻止“做什么”和阻止“传给谁”不同。",
    "follow": "点击按钮内的图标，为什么直接检查 target.tagName 可能失效？",
    "code": "",
    "english": "Events travel down in the capture phase, then bubble back up. I usually listen on the bubble phase. Event delegation puts one listener on a parent and uses event.target to tell which child was clicked — fewer listeners, and it works for dynamically added children. stopPropagation stops the travel, preventDefault stops the default action.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "J18",
    "title": "数组方法与异步陷阱",
    "chapter": 2,
    "page": 12,
    "prompt": "为什么 await list.forEach(async ...) 不会等待全部任务？",
    "choices": [
      "forEach 返回 undefined，不汇总回调 Promise",
      "async 在数组里不起作用",
      "await 只能等待 setTimeout",
      "forEach 会自动取消异步任务"
    ],
    "answer": "forEach 用来遍历但不收集返回值；map 返回映射数组，filter 筛选，reduce 聚合。并行任务使用 Promise.all(list.map(...))；需要串行则用 for...of 加 await。",
    "points": [
      "forEach 不等待回调返回的 Promise",
      "map 处理异步时得到 Promise 数组",
      "这些方法不直接改原数组，但回调可修改共享对象"
    ],
    "memory": "map 负责收集，all 负责等待。",
    "follow": "请求太多时，为什么还需要并发限制？",
    "code": "await Promise.all(items.map(item => save(item)));",
    "english": "ForEach does not collect or await callback promises. Map transforms, filter selects, and reduce accumulates. For parallel work I use Promise.all with map; for sequential work I use for...of with await.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "J19",
    "title": "解构、展开与空值合并",
    "chapter": 2,
    "page": 12,
    "prompt": "下面两个表达式分别得到什么？",
    "choices": [
      "0 和 10",
      "10 和 10",
      "0 和 0",
      "undefined 和 10"
    ],
    "answer": "?? 只在左侧为 null 或 undefined 时使用默认值；|| 对所有假值使用默认值。解构提取成员，spread 展开，rest 收集剩余部分，可选链在空值处短路。",
    "points": [
      "?? 保留 0、false 和空字符串",
      "?. 只保护所在链条的空值访问",
      "对象展开仍是浅拷贝"
    ],
    "memory": "?? 只补空缺，|| 替换假值。",
    "follow": "分页 pageSize 为 0 时用 || 默认值会出什么问题？",
    "code": "console.log(0 ?? 10);\nconsole.log(0 || 10);",
    "english": "Destructuring pulls values out of objects and arrays. Spread copies and merges shallowly. Rest gathers extra arguments into an array. Optional chaining short-circuits on null or undefined instead of throwing. Nullish coalescing only falls back for null or undefined — unlike ||, it keeps 0, empty string, and false.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "J20",
    "title": "箭头函数与普通函数",
    "chapter": 0,
    "page": 12,
    "prompt": "哪一种需求不能用箭头函数满足？",
    "choices": [
      "作为 new 的构造函数",
      "作为 map 的回调",
      "捕获外层 this",
      "返回一个计算结果"
    ],
    "answer": "箭头函数没有自己的 this 和 arguments，也不能被 new 调用。普通可构造函数适合构造实例；对象方法需要动态 this 时应使用普通方法语法。",
    "points": [
      "箭头 this 来自外层，不被 call/bind 改写",
      "箭头函数不能构造实例",
      "rest 参数可代替很多 arguments 用途"
    ],
    "memory": "箭头擅长回调，构造请用普通函数或 class。",
    "follow": "对象字面量的箭头方法，this 会自动指向该对象吗？",
    "code": "",
    "english": "Three differences: arrow functions have no own this, arguments, or prototype; they can't be used with new; and they shouldn't be object methods when I need dynamic this. I use them for callbacks and short functions, regular functions when I need this binding, arguments, or construction.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "J21",
    "title": "严格模式",
    "chapter": 0,
    "page": 12,
    "prompt": "严格模式中给未声明变量赋值会怎样？",
    "choices": [
      "抛出 ReferenceError",
      "自动创建全局变量",
      "变成局部变量",
      "被静默忽略"
    ],
    "answer": "严格模式把一些静默错误变成异常，并改变普通调用的 this 等行为。ES Modules 和 class 代码自动处于严格模式。",
    "points": [
      "禁止意外的未声明赋值",
      "独立普通调用 this 为 undefined",
      "不是所有八进制写法都禁用：0o 前缀是合法语法"
    ],
    "memory": "把悄悄出错变成及时报错。",
    "follow": "为什么模块里不写 use strict 也有严格模式行为？",
    "code": "'use strict';\nmissing = 1;",
    "english": "Strict mode turns silent mistakes into errors: no undeclared variables, this is undefined instead of global in plain functions, no duplicate parameters. ES Modules are strict by default.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "J22",
    "title": "高阶函数与柯里化",
    "chapter": 0,
    "page": 13,
    "prompt": "add(a, b) 转换成 add(a)(b)，这个过程叫？",
    "choices": [
      "柯里化",
      "深拷贝",
      "原型继承",
      "事件委托"
    ],
    "answer": "高阶函数接收函数或返回函数；柯里化把多参数函数改造成逐个接收参数的函数链。简单通用实现会依赖 fn.length，默认参数、rest 参数需要额外约定。",
    "points": [
      "map 和 debounce 都是高阶函数",
      "柯里化方便复用已提供的参数",
      "部分应用与严格柯里化概念相关但不完全相同"
    ],
    "memory": "每次给一点参数，把剩下的留给下一步。",
    "follow": "const addTax = rate => price => price * (1 + rate) 如何使用？",
    "code": "const add = a => b => a + b;\nconsole.log(add(2)(3)); // 5",
    "english": "A higher-order function takes or returns a function — map, filter, and debounce all qualify. Currying turns a multi-argument function into a chain of single-argument functions, which lets me reuse partially applied arguments.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "J23",
    "title": "setTimeout 的 0ms",
    "chapter": 1,
    "page": 13,
    "prompt": "setTimeout(fn, 0) 的正确理解是？",
    "choices": [
      "安排后续任务，不保证立即执行或精确延迟",
      "一定在 0ms 执行",
      "任何浏览器都至少等 4ms",
      "一定等 React 提交后执行"
    ],
    "answer": "定时器延迟是调度阈值，不是精确执行承诺。当前同步代码和微任务会影响时机；浏览器超过规定嵌套层级的定时器有 4ms 下限，后台标签还可能被节流。",
    "points": [
      "0 不代表立刻执行",
      "4ms 下限有嵌套条件，不是所有 timer 的固定规则",
      "不要靠 timer 保证 React DOM 提交时机"
    ],
    "memory": "定时器给的是最早候场时间。",
    "follow": "如果同步计算阻塞 2 秒，0ms timer 会什么时候执行？",
    "code": "",
    "english": "A zero-delay timer schedules a later task. It is not immediate or exact. Deeply nested timers have a minimum delay, and background tabs can be throttled.",
    "source": "top",
    "kind": "quiz",
    "note": "修正原资料“浏览器一般最少 4ms”的概括。",
    "url": "https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout",
    "correct": 0
  },
  {
    "id": "J24",
    "title": "原始值与对象引用",
    "chapter": 2,
    "page": 13,
    "prompt": "这两个比较的结果是什么？",
    "choices": [
      "false 和 true",
      "true 和 true",
      "false 和 false",
      "true 和 false"
    ],
    "answer": "对象相等比较看身份，两个内容一样的新对象不相等。赋值传递对象引用值，使两个变量可指向同一个对象；原始值不可变，赋值传递值。",
    "points": [
      "对象比较不是内容深比较",
      "多个变量可共享同一对象",
      "JavaScript 参数传递仍是按值，值可能是对象引用"
    ],
    "memory": "长得一样不代表是同一个。",
    "follow": "函数里重新赋值参数，为什么不会替换调用方变量？",
    "code": "const a = { n: 1 };\nconst b = a;\nconsole.log(a === { n: 1 });\nconsole.log(a === b);",
    "english": "Assignment copies values; an object reference is also a value. Two variables can refer to the same object. Equality compares object identity, not structure. Reassigning a parameter does not reassign the caller variable.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "R1",
    "title": "Render、协调与 Commit",
    "chapter": 3,
    "page": 1,
    "prompt": "组件重新渲染是否一定修改真实 DOM？",
    "choices": [
      "不一定，只在提交阶段应用必要差异",
      "一定替换全部 DOM",
      "只要调用组件就同步重建页面",
      "永远不会修改 DOM"
    ],
    "answer": "React 用组件描述 UI。render 计算下一份界面描述，协调比较身份与输出，commit 应用实际变化。render 可能重跑甚至被丢弃，因此必须保持纯净。",
    "points": [
      "render 与 commit 是不同阶段",
      "重新执行组件不等于 DOM 变化",
      "并发可中断的重点是 render，不是把 commit 任意切开"
    ],
    "memory": "先画草稿，再比较，最后落笔。",
    "follow": "为什么不能在 render 中直接发请求或修改外部对象？",
    "code": "",
    "english": "React describes UI from state. Rendering computes a tree, reconciliation compares identities and output, and commit applies the changes. A re-render does not necessarily change the DOM, and render must remain pure.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "R2",
    "title": "函数组件与 Hooks",
    "chapter": 3,
    "page": 1,
    "prompt": "Hooks 主要让哪种复用变得直接？",
    "choices": [
      "按功能组织并复用带状态的逻辑",
      "让所有组件共享同一个 state",
      "代替所有错误边界",
      "允许在任意条件中调用 useState"
    ],
    "answer": "函数组件通过 Hooks 使用状态和 React 能力。自定义 Hook 可把相关逻辑按功能组织，而不必按 class 生命周期拆散。useState/useEffect 等 Hooks 应在组件或自定义 Hook 顶层调用。",
    "points": [
      "函数组件没有实例 this",
      "Hook 复用的是逻辑，不自动共享状态",
      "遵守 Hooks 调用顺序规则"
    ],
    "memory": "按功能装抽屉，不按生命周期分散摆放。",
    "follow": "为什么不能在 if 内调用 useState？",
    "code": "",
    "english": "I use function components with Hooks. Class components scatter related logic across lifecycles and reuse is awkward. Hooks keep logic together by feature and make reuse easy with custom Hooks.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "R3",
    "title": "State 快照与函数式更新",
    "chapter": 3,
    "page": 1,
    "prompt": "从 count = 0 开始，同一事件中连续执行三次这条语句，下一次 count 是？",
    "choices": [
      "1",
      "3",
      "0",
      "不确定"
    ],
    "answer": "每次 render 的 state 是快照。同一处理器中 count 一直是 0，三次都请求替换为 1。连续函数式更新 setCount(c => c + 1) 则根据队列中的前一个状态逐次计算，得到 3。",
    "points": [
      "旧闭包里的变量不会被 setter 改写",
      "函数式更新适合依赖前一状态的更新",
      "批处理与快照相关，但不是同一个概念"
    ],
    "memory": "快照不变，更新排队。",
    "follow": "把三次更新换成功能函数后为什么是 3？",
    "code": "setCount(count + 1);\nsetCount(count + 1);\nsetCount(count + 1);",
    "english": "State is a snapshot for each render. Calling a setter queues an update; it does not change the current variable. I use functional updates when the next value depends on the previous one.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "R4",
    "title": "Effect 依赖与清理",
    "chapter": 3,
    "page": 2,
    "prompt": "[roomId] 改变后，Effect 正确的清理顺序是？",
    "choices": [
      "旧 cleanup → 新 setup",
      "新 setup → 旧 cleanup",
      "只在卸载时 cleanup",
      "先清空全部 state"
    ],
    "answer": "Effect 用于与外部系统同步。依赖改变时先清理旧同步，再启动新同步；卸载时也清理。省略数组在每次提交后运行；[] 不随 props/state 变化而重跑，但开发 StrictMode 会额外检查。",
    "points": [
      "列出使用的响应式依赖",
      "依赖使用 Object.is 比较",
      "cleanup 对应订阅、监听、timer 或请求的处理"
    ],
    "memory": "每次换连接，先拆旧线。",
    "follow": "为什么 [] 不能简单背成“绝对只执行一次”？",
    "code": "useEffect(() => {\n  const conn = connect(roomId);\n  return () => conn.disconnect();\n}, [roomId]);",
    "english": "Effects synchronize with external systems. React cleans up the old effect before running a new one after dependencies change, and on unmount. Strict Mode adds an extra development check.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "https://react.dev/reference/react/useEffect",
    "correct": 0
  },
  {
    "id": "R5",
    "title": "三个 memo 各管什么",
    "chapter": 4,
    "page": 2,
    "prompt": "哪个对应关系正确？",
    "choices": [
      "useMemo 缓存值，useCallback 缓存函数引用，memo 优化组件渲染",
      "三者都缓存 DOM",
      "useCallback 会执行函数并缓存结果",
      "memo 阻止所有 state 更新"
    ],
    "answer": "useMemo 缓存计算结果；useCallback 缓存函数引用；memo 可在 props 未变时跳过父渲染引起的重渲染。组件自己的 state 或所消费的 context 更新仍可能触发渲染。",
    "points": [
      "缓存是性能优化，不是正确性保证",
      "引用稳定只有在消费者需要时才有价值",
      "先测量成本与收益"
    ],
    "memory": "值、函数、组件，各管一层。",
    "follow": "为什么给 memo 子组件每次传新对象会削弱收益？",
    "code": "",
    "english": "UseMemo caches a computed value, useCallback caches a function reference, and memo can skip parent-driven renders when props are unchanged. Local state and context can still trigger updates. I measure before adding caching.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "R6",
    "title": "Context 的更新范围",
    "chapter": 4,
    "page": 2,
    "prompt": "Provider 的 value 变成了新对象，哪些组件可能因此重渲染？",
    "choices": [
      "读取该 Context 的消费者",
      "整个应用中的每个组件",
      "只有 Provider 本身",
      "memo 消费者绝对不会更新"
    ],
    "answer": "Context 解决跨层级传值。value 按 Object.is 比较变化后，读取该 Context 的消费者会收到新值。可拆分状态域、稳定不必要变化的对象引用，减少影响范围。",
    "points": [
      "Context 是传值机制",
      "value 引用变化可能扩大渲染",
      "拆分高低频数据与状态归属比盲目 memo 更重要"
    ],
    "memory": "广播内容变了，订阅者都要听。",
    "follow": "把每秒变化的时钟与主题放在一个 Context 会怎样？",
    "code": "",
    "english": "Context avoids prop drilling. The catch: when the context value changes, every consumer re-renders. I split contexts and memoize the value to limit that.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "R7",
    "title": "useReducer 还是 useState",
    "chapter": 3,
    "page": 2,
    "prompt": "多个表单字段联动、动作种类很多，何时考虑 useReducer？",
    "choices": [
      "希望把相关状态转移集中到纯 reducer 时",
      "只要字段超过 2 个就必须使用",
      "希望 reducer 里直接 fetch",
      "希望所有组件自动共享它"
    ],
    "answer": "useState 适合简单状态；useReducer 把多动作、相关字段的更新逻辑集中成纯函数。它改善组织和可测试性，不会自动变成全局 store。",
    "points": [
      "reducer 根据 state 和 action 返回新 state",
      "保持纯净，不放请求等副作用",
      "复杂度决定选型，不是字段数量硬门槛"
    ],
    "memory": "动作多，找一个调度台。",
    "follow": "reducer 内为什么不应修改原 state？",
    "code": "",
    "english": "Simple state, useState. Complex state with many related fields and actions — like a form or a workflow — useReducer. It centralizes update logic, which is easier to test and maintain.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "R8",
    "title": "自定义 Hook 的复用边界",
    "chapter": 3,
    "page": 3,
    "prompt": "两个组件都调用 useToggle，它们的状态会怎样？",
    "choices": [
      "默认各自独立",
      "自动完全共享",
      "只第一个有状态",
      "后调用的覆盖前一个"
    ],
    "answer": "自定义 Hook 复用带状态的逻辑。每次 Hook 调用通常拥有独立的本地状态；要共享状态需提升状态、Context 或外部 store。",
    "points": [
      "名字以 use 开头",
      "遵守 Hooks 规则",
      "相同逻辑不等于同一份状态"
    ],
    "memory": "共享配方，不共享饭碗。",
    "follow": "想让两个组件切换同一个开关，应把状态放在哪里？",
    "code": "function useToggle(initial = false) {\n  const [value, setValue] = useState(initial);\n  const toggle = () => setValue(v => !v);\n  return [value, toggle];\n}",
    "english": "A custom Hook extracts stateful logic into a reusable function starting with \"use\". Each component using it gets its own independent state.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "R9",
    "title": "列表 key 与组件身份",
    "chapter": 3,
    "page": 3,
    "prompt": "可排序的编辑表格最适合用什么 key？",
    "choices": [
      "数据中稳定唯一的 row.id",
      "每次 render 的 Math.random()",
      "当前数组 index",
      "每行都用相同字符串"
    ],
    "answer": "key 帮 React 在同级列表中识别项的身份，从而保留正确状态。index 在插入、删除、排序时可能把状态关联到错误的数据项；随机 key 会导致反复重建。",
    "points": [
      "key 要在同级唯一并稳定",
      "key 不会作为普通 prop 传给组件",
      "更改 key 可有意重置组件状态"
    ],
    "memory": "身份证别写成排队号。",
    "follow": "固定、永不重排的静态列表用 index 是否一定出错？",
    "code": "",
    "english": "Keys give list items a stable identity so React can tell moves from inserts and deletes. Index keys break when the list reorders or items are inserted — React reuses the wrong DOM nodes, and input or checkbox state ends up on the wrong row.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "R10",
    "title": "受控与非受控表单",
    "chapter": 3,
    "page": 3,
    "prompt": "input 的 value 来自 state，onChange 更新 state，这属于？",
    "choices": [
      "受控组件",
      "非受控组件",
      "只读组件一定不能输入",
      "服务器组件"
    ],
    "answer": "受控输入由 React state 作为数据源，方便联动和验证；非受控输入由 DOM 保管当前值，可用 defaultValue 提供初值，通过 ref 或 FormData 读取。",
    "points": [
      "value + onChange 是常见受控模式",
      "defaultValue 只提供初始值",
      "避免同一输入在受控/非受控之间意外切换"
    ],
    "memory": "受控由 state 记账，非受控由 DOM 保管。",
    "follow": "为什么 value={undefined} 后又变字符串可能触发警告？",
    "code": "",
    "english": "Controlled components keep the value in React state with value and onChange — easy to validate. Uncontrolled components keep the value in the DOM and I read it with a ref. I use controlled for complex forms.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "R11",
    "title": "Redux 数据流与异步",
    "chapter": 4,
    "page": 3,
    "prompt": "Redux 的 reducer 应该做什么？",
    "choices": [
      "根据 action 纯粹地计算新 state",
      "直接操作 DOM",
      "直接发起网络请求",
      "直接修改所有订阅组件"
    ],
    "answer": "dispatch action 后，reducer 计算状态，store 通知订阅者；React-Redux 通常依据选择值变化决定是否更新组件。Thunk 支持 dispatch 函数处理异步，Saga 用 generator 编排任务。",
    "points": [
      "reducer 必须保持纯净",
      "异步任务由中间件等处理",
      "Saga 的取消不等于已经发送的服务器操作被撤销"
    ],
    "memory": "action 报事件，reducer 算状态，订阅者读结果。",
    "follow": "takeLatest 为什么不能单独保证服务器不重复创建报表？",
    "code": "",
    "english": "Redux has one-way data flow: dispatch an action, reduce state, then notify subscribers. Thunks handle async functions; sagas orchestrate tasks with generators. Reducers stay pure.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "R12",
    "title": "重新渲染的触发源",
    "chapter": 4,
    "page": 4,
    "prompt": "被 memo 包裹的组件自己的 state 改变，会怎样？",
    "choices": [
      "仍可能重新渲染",
      "永远不再渲染",
      "只更新父组件",
      "只有改 key 才能更新"
    ],
    "answer": "自身 state、消费的 context 变化，以及父组件重新渲染都可能引发组件执行。memo 主要优化 props 未变化时来自父组件的更新，不能冻结自身状态。",
    "points": [
      "组件执行与 DOM 提交不同",
      "状态下沉可缩小更新范围",
      "先确认问题来源再做缓存"
    ],
    "memory": "memo 是筛选门，不是冰箱。",
    "follow": "如何把输入状态下沉，避免整页跟着每次击键更新？",
    "code": "",
    "english": "Re-renders happen when a parent renders or when state, props, or context change. I optimize by splitting components so state changes affect a small area, memoizing where it actually helps, and virtualizing long lists so only visible rows render.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "R13",
    "title": "React 合成事件",
    "chapter": 4,
    "page": 4,
    "prompt": "React 的 SyntheticEvent 主要解决什么？",
    "choices": [
      "统一 React 事件接口和处理行为",
      "自动阻止所有默认行为",
      "让点击事件总异步执行",
      "禁止使用原生事件"
    ],
    "answer": "SyntheticEvent 提供 React 事件对象接口，兼容常用原生事件行为。React DOM 的事件委托主要在 root 容器上；并非每一种事件都完全相同。",
    "points": [
      "通过 onClick 等注册处理器",
      "需要时可访问 nativeEvent",
      "preventDefault 与 stopPropagation 仍有不同作用"
    ],
    "memory": "同一套事件接口，配合 React 管理。",
    "follow": "event.target 与 event.currentTarget 的区别是什么？",
    "code": "",
    "english": "Synthetic events are React's cross-browser wrapper around native events. I write onClick and friends the same way, and React normalizes the behavior across browsers.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "R14",
    "title": "Error Boundary 的边界",
    "chapter": 4,
    "page": 4,
    "prompt": "普通错误边界通常不能直接捕获哪种错误？",
    "choices": [
      "点击处理器里抛出的错误",
      "子组件 render 中的错误",
      "子组件构造阶段错误",
      "子组件生命周期中的错误"
    ],
    "answer": "错误边界捕获后代渲染及相关生命周期错误，并显示兜底 UI。事件处理器、一般异步回调、服务端渲染或边界自身错误不在普通错误边界的捕获范围内。",
    "points": [
      "class 通过 getDerivedStateFromError/componentDidCatch 实现",
      "函数组件可使用边界组件或库",
      "请求失败仍需专门的错误状态处理"
    ],
    "memory": "边界兜住渲染树，不兜住所有异步。",
    "follow": "如何把 fetch 失败显示成可重试状态？",
    "code": "",
    "english": "An error boundary is a class component that catches render errors in its children and shows a fallback UI instead of a blank page. There's no built-in Hook version — I use a library or a class wrapper.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "R15",
    "title": "lazy 与 Suspense",
    "chapter": 4,
    "page": 5,
    "prompt": "React.lazy 配合动态 import 的主要目的是什么？",
    "choices": [
      "按需加载组件代码，缩小初始下载",
      "自动缓存所有 API 请求",
      "让所有组件服务端运行",
      "彻底消除加载状态"
    ],
    "answer": "lazy 延迟加载组件模块，Suspense 为挂起的子树提供 fallback。常在路由或大型组件边界拆包。并不是把 fetch 放进 useEffect 就自动支持 Suspense。",
    "points": [
      "lazy 通常在模块顶层声明",
      "动态 import 形成代码拆分边界",
      "fallback 处理等待，错误还需错误边界"
    ],
    "memory": "先带必要装备，大件按需领取。",
    "follow": "如果懒加载模块下载失败，应如何兜底？",
    "code": "const Report = lazy(() => import('./Report'));\n<Suspense fallback={<p>加载中…</p>}>\n  <Report />\n</Suspense>",
    "english": "React.lazy with Suspense — load routes and heavy components on demand, with a loading fallback. It shrinks the first-load bundle.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "R16",
    "title": "Effect 与 LayoutEffect",
    "chapter": 3,
    "page": 5,
    "prompt": "必须量尺寸并在用户看到画面前定位浮层，优先考虑？",
    "choices": [
      "useLayoutEffect",
      "把所有 Effect 都改成定时器",
      "在 render 中直接改 DOM",
      "永远使用 useEffect 即可"
    ],
    "answer": "useLayoutEffect 在 DOM 提交后、浏览器绘制前运行，会阻塞绘制，适合必要的布局测量。useEffect 通常让浏览器先绘制，但交互等情况下也可能在绘制前执行，不应绝对化。",
    "points": [
      "layout effect 会阻塞绘制，应克制使用",
      "普通外部同步通常选 useEffect",
      "SSR 中不能依赖客户端布局测量"
    ],
    "memory": "要防闪烁才抢在绘制前。",
    "follow": "为什么不能说 useEffect 永远在 paint 后执行？",
    "code": "",
    "english": "UseLayoutEffect runs before repaint and can block it, so I reserve it for layout measurement. UseEffect is usually preferable, but its timing is not always strictly after paint.",
    "source": "top",
    "kind": "quiz",
    "note": "修正原资料对 useEffect 绘制时机的绝对描述。",
    "url": "https://react.dev/reference/react/useEffect",
    "correct": 0
  },
  {
    "id": "R17",
    "title": "React 18 迁移",
    "chapter": 4,
    "page": 5,
    "prompt": "React 18 createRoot 下，哪个说法正确？",
    "choices": [
      "自动批处理扩展到 Promise、timer 等更新",
      "StrictMode 双执行表示生产环境也一定双发请求",
      "transition 会让昂贵代码自动跑到后台线程",
      "不需要回归测试依赖兼容"
    ],
    "answer": "React 18 的新 root 支持更广的自动批处理和并发相关能力。transition 标记非紧急更新，不是 Web Worker。StrictMode 开发检查帮助暴露不完整的清理。",
    "points": [
      "确认 createRoot 与依赖兼容",
      "验证批处理下依赖同步读取的代码",
      "排查 Effect 清理、重复订阅与竞态"
    ],
    "memory": "升级不只换版本，还要验证行为。",
    "follow": "哪些 UI 更新不适合标记为 transition？",
    "code": "",
    "english": "With the React 18 root API, automatic batching covers more async sources. Transitions mark non-urgent updates; they do not create a worker thread. Strict Mode adds development checks for cleanup and purity.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "R18",
    "title": "Ref 暴露与版本差异",
    "chapter": 4,
    "page": 5,
    "prompt": "关于 React 18 与 React 19 的 ref，哪个说法正确？",
    "choices": [
      "18 常用 forwardRef；19 函数组件可接收 ref prop",
      "19 完全删除了所有 ref",
      "useImperativeHandle 会自动触发渲染",
      "ref 只允许存字符串"
    ],
    "answer": "React 18 中常用 forwardRef 向函数组件传递 ref；React 19 可把 ref 作为 prop 接收。useImperativeHandle 自定义对外暴露的句柄，避免泄露全部内部实现。",
    "points": [
      "先说明所讨论的 React 版本",
      "ref 适合必要的命令式接口",
      "尽可能通过 props 表达声明式行为"
    ],
    "memory": "暴露一把钥匙，不交出整间屋子。",
    "follow": "封装输入框时为什么只暴露 focus 而不是所有内部节点？",
    "code": "",
    "english": "In React 18, forwardRef passes a ref into a function component. In React 19, ref can be a prop. UseImperativeHandle exposes a focused imperative API.",
    "source": "top",
    "kind": "quiz",
    "note": "已补充 React 19 差异，原资料中的默认描述对应旧版本。",
    "url": "https://react.dev/reference/react/forwardRef",
    "correct": 0
  },
  {
    "id": "R19",
    "title": "Server Components",
    "chapter": 4,
    "page": 6,
    "prompt": "哪种任务更适合 Server Component？",
    "choices": [
      "服务端读数据并生成界面描述",
      "响应浏览器 onClick",
      "使用 useState 管理输入",
      "读取 window.innerWidth"
    ],
    "answer": "Server Components 可在服务端或构建时运行，其组件代码不发到客户端。交互状态与浏览器 API 需要客户端边界。它与 SSR 不等同，Client Component 也可能参与服务端预渲染。",
    "points": [
      "Server Component 不能使用客户端 state/effect",
      "use client 定义客户端模块边界",
      "结合框架理解数据和序列化约束"
    ],
    "memory": "数据靠近服务端，交互留给客户端。",
    "follow": "为什么 Client Component 不等于“绝不在服务器预渲染”？",
    "code": "",
    "english": "Server Components run on the server or at build time without shipping their component code to the browser. Interactive state and browser APIs need a client boundary. Server Components and server-side rendering are different concepts.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "R20",
    "title": "状态应该放在哪里",
    "chapter": 4,
    "page": 6,
    "prompt": "仅一个弹窗使用的打开/关闭状态，优先放在哪里？",
    "choices": [
      "弹窗或最近相关组件的本地 state",
      "所有状态统一塞进 Redux",
      "服务器数据库",
      "全局 Context 的最高层"
    ],
    "answer": "按归属与共享范围选择状态位置。局部 UI 用本地 state；跨层共享可用 Context；复杂跨页面转移可考虑 store。服务端数据还涉及缓存、刷新与失效管理。",
    "points": [
      "局部状态尽量靠近使用处",
      "跨页共享不代表所有值都应全局化",
      "区分服务端数据与客户端 UI 状态"
    ],
    "memory": "离谁最近，就先放谁那里。",
    "follow": "哪些报表筛选条件应该进入 URL 而不是只放 store？",
    "code": "",
    "english": "I choose state ownership first. Local UI state stays local. Shared client state may use Context or a store. Server data needs caching and invalidation policies.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "R21",
    "title": "大表单性能",
    "chapter": 4,
    "page": 6,
    "prompt": "输入一个字段导致整张复杂表单变慢，首先应该？",
    "choices": [
      "测量后缩小订阅和渲染范围",
      "立即把所有字段放全局 Context",
      "禁用所有校验",
      "给每个变量都加 useMemo"
    ],
    "answer": "先确认慢在渲染还是验证。可隔离字段状态、采用细粒度订阅、选择合适受控/非受控方案，并按体验调整验证时机。不能仅以字段数量决定方案。",
    "points": [
      "关注实际输入延迟",
      "避免每次击键全量执行昂贵验证",
      "保留清楚的错误反馈与可访问性"
    ],
    "memory": "每改一格，不必重做整张表。",
    "follow": "提交失败后，如何让用户定位到第一个错误字段？",
    "code": "",
    "english": "I first measure whether typing is slowed by rendering or validation. Then I isolate field updates, choose suitable subscriptions and controlled or uncontrolled inputs, and adjust validation timing without sacrificing feedback.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "R22",
    "title": "性能优化：先测量",
    "chapter": 4,
    "page": 6,
    "prompt": "大表格变卡，最有用的第一步是什么？",
    "choices": [
      "用 Profiler 和性能工具确定瓶颈",
      "先给每个函数 useCallback",
      "先替换所有状态库",
      "盲目增加缓存"
    ],
    "answer": "用 React Profiler 看提交和渲染成本，结合浏览器工具区分 JS 计算、布局绘制和网络瓶颈。按原因选择状态下沉、缓存、虚拟列表、分页或请求优化，并复测收益。",
    "points": [
      "先测量，区分频繁与昂贵",
      "虚拟列表减少挂载行数",
      "用相同场景和数据比较优化前后"
    ],
    "memory": "先找最重的石头，再搬。",
    "follow": "虚拟列表对可访问性、动态行高有什么额外要求？",
    "code": "",
    "english": "I start with the React DevTools Profiler to find which components render too often or take too long. Too many renders: split components and memoize. Too expensive: cache the computation, virtualize lists, lazy-load. Measure first, then optimize.",
    "source": "top",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "G1",
    "title": "Object.is 与相等比较",
    "chapter": 2,
    "page": 1,
    "prompt": "Object.is(NaN, NaN) 和 Object.is(+0, -0) 分别是什么？",
    "choices": [
      "true 和 false",
      "false 和 true",
      "true 和 true",
      "false 和 false"
    ],
    "answer": "=== 不做类型转换，NaN 不等于自身，正负零相等。Object.is 把 NaN 视为相同，区分正负零。== 按规则进行类型转换；对象仍比较身份。",
    "points": [
      "== 会进行特定转换",
      "=== 不做类型转换",
      "Object.is 的 NaN / 零语义不同"
    ],
    "memory": "Object.is 认 NaN，分正负零。",
    "follow": "React 比较 Hook 依赖使用哪一种相等语义？",
    "code": "",
    "english": "Strict equality avoids coercion. Object.is treats NaN as equal to itself and distinguishes positive and negative zero.",
    "source": "guide",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "G2",
    "title": "什么时候不需要 Effect",
    "chapter": 3,
    "page": 2,
    "prompt": "从 items 和 query 计算 filteredItems，通常应该？",
    "choices": [
      "在 render 中直接计算，昂贵时再考虑 memo",
      "用 Effect 同步一份 filteredItems state",
      "每次筛选发到服务端存储",
      "通过 DOM 查询结果"
    ],
    "answer": "能从当前 props/state 推导出的值通常直接在 render 计算，避免维护重复状态。点击引发的操作通常在事件处理器中完成；Effect 负责与外部系统同步。",
    "points": [
      "派生数据尽量不重复存 state",
      "用户事件对应事件处理器",
      "外部订阅等才需要同步 Effect"
    ],
    "memory": "能算出来的，就别再同步一份。",
    "follow": "把派生值放 Effect 中会多出什么渲染和一致性问题？",
    "code": "",
    "english": "I calculate derived data during render. Event-specific work goes in handlers. Effects are for synchronization with external systems.",
    "source": "guide",
    "kind": "quiz",
    "note": "",
    "url": "https://react.dev/learn/you-might-not-need-an-effect",
    "correct": 0
  },
  {
    "id": "G3",
    "title": "Stale closure 修复",
    "chapter": 3,
    "page": 2,
    "prompt": "这个计时器总是把 count 设为 1，最直接修复是什么？",
    "choices": [
      "用 setCount(c => c + 1)",
      "删除 cleanup",
      "把 count 改成全局变量",
      "加一个没有依赖的 useMemo"
    ],
    "answer": "[] 中的回调捕获初次 render 的 count。这里更新只依赖前一个计数值，可以使用函数式更新；其他场景可能需要完整依赖或 ref，不能一律删除依赖来规避问题。",
    "points": [
      "闭包关联某次 render 的快照",
      "函数式更新只解决依赖前一 state 的更新",
      "监听器与 timer 仍需 cleanup"
    ],
    "memory": "闭包看旧照片，更新函数接队列。",
    "follow": "如果 interval 需要最新的 prop 倍率，只改函数式更新够吗？",
    "code": "useEffect(() => {\n  const id = setInterval(() => setCount(count + 1), 1000);\n  return () => clearInterval(id);\n}, []);",
    "english": "The interval captures an old render. For increments I use a functional update. Other stale reads may require correct dependencies or a ref.",
    "source": "guide",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "G4",
    "title": "useRef vs useState",
    "chapter": 3,
    "page": 2,
    "prompt": "只修改 ref.current 会怎样？",
    "choices": [
      "不会单独触发组件重新渲染",
      "总是触发重新渲染",
      "自动同步到 DOM",
      "清空所有 state"
    ],
    "answer": "ref 是跨 render 保留的可变容器，改变 current 不通知 React 重新渲染。它可保存 DOM 节点、timer id 等；需要影响显示的数据通常用 state。",
    "points": [
      "ref.current 可变但不是渲染通知机制",
      "state 更新参与渲染流程",
      "避免在 render 中随意读写 ref 影响输出"
    ],
    "memory": "ref 是抽屉，state 是公告板。",
    "follow": "把页面计数器只存在 ref 里，为什么 UI 不跟着变化？",
    "code": "",
    "english": "A ref persists across renders, but changing current does not trigger a render. I use state for values that affect the UI.",
    "source": "guide",
    "kind": "quiz",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "C1",
    "title": "手写防抖与节流",
    "chapter": 5,
    "page": 3,
    "prompt": "手写一个尾沿 debounce，保留 this 和参数，并支持 cancel。再说明 throttle 的前沿与尾沿策略。",
    "choices": [],
    "answer": "先写出自己的实现，再逐项核对。示例只实现尾沿防抖；完整节流需要明确前沿、尾沿与取消语义。",
    "points": [
      "每次调用 clearTimeout 并重新安排",
      "通过普通函数捕获调用时 this 与参数",
      "cancel 清理 timer；说明节流限制频率"
    ],
    "memory": "先讲调用时间线，再写代码。",
    "follow": "组件卸载时怎么取消尚未执行的防抖？",
    "code": "function debounce(fn, wait) {\n  let timer;\n  function wrapped(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), wait);\n  }\n  wrapped.cancel = () => clearTimeout(timer);\n  return wrapped;\n}",
    "english": "This is a trailing debounce. Each call resets the timer and preserves the caller context. Cancel clears pending work.",
    "source": "guide",
    "kind": "code",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "C2",
    "title": "搜索框：消除请求竞态",
    "chapter": 5,
    "page": 3,
    "prompt": "用户先搜索 A 再搜索 B，但 A 最后返回。请设计 loading、error 和请求清理，使结果不会退回 A。",
    "choices": [],
    "answer": "防抖减少发起频率；竞态控制避免过期结果提交。可用 AbortController 配合 active 标记或请求序号，只允许当前请求更新结果、错误和 loading。",
    "points": [
      "检查 response.ok 并处理错误",
      "cleanup 取消请求或使旧结果失效",
      "过期请求的 finally 也不能改新请求的 loading"
    ],
    "memory": "防抖管发车，竞态管谁能到站。",
    "follow": "只 abort fetch，为什么仍需考虑后续异步处理？",
    "code": "useEffect(() => {\n  let active = true;\n  const ctrl = new AbortController();\n  setLoading(true); setError(null);\n  fetch('/api/search?q=' + encodeURIComponent(query), { signal: ctrl.signal })\n    .then(r => { if (!r.ok) throw Error('请求失败'); return r.json(); })\n    .then(data => { if (active) setData(data); })\n    .catch(e => { if (active && e.name !== 'AbortError') setError(e.message); })\n    .finally(() => { if (active) setLoading(false); });\n  return () => { active = false; ctrl.abort(); };\n}, [query]);",
    "english": "I debounce input, cancel obsolete requests, and guard state updates so stale responses cannot overwrite newer results.",
    "source": "guide",
    "kind": "code",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "C3",
    "title": "可排序、筛选、分页表格",
    "chapter": 5,
    "page": 3,
    "prompt": "给一个表格设计筛选、排序和分页流程。切换筛选时如何处理当前页？",
    "choices": [],
    "answer": "常见本地流程是先筛选、再排序、最后分页；排序前复制数组。筛选改变时重置或校正页码，使用稳定 id 作 key。大数据量考虑服务器分页与虚拟列表。",
    "points": [
      "排序不能直接 mutate props/state 数组",
      "筛选改变后校正页码并处理空列表",
      "区分本地全量与服务端分页，避免仅排序当前页却暗示全局排序"
    ],
    "memory": "先选人，再排队，最后分车。",
    "follow": "服务端分页时，排序和筛选参数应该在哪里执行？",
    "code": "const filtered = rows.filter(matchesQuery);\nconst sorted = [...filtered].sort(compareRows);\nconst visible = sorted.slice((page - 1) * size, page * size);\n// query 变化时重置 page；行 key 使用 row.id",
    "english": "Filter, sort, then paginate. I use stable row IDs and reset the page when filters change. Large datasets may require server-side operations.",
    "source": "guide",
    "kind": "code",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "C4",
    "title": "手写 useDebounce",
    "chapter": 5,
    "page": 3,
    "prompt": "实现 useDebounce(value, delay)，值停止变化后才更新返回值。",
    "choices": [],
    "answer": "把 debouncedValue 存为 state，Effect 根据 value 和 delay 设 timer，cleanup 取消上一次 timer。每次 Hook 调用拥有独立状态；它只延迟值，不自动处理网络竞态。",
    "points": [
      "依赖包含 value 和 delay",
      "变化和卸载时清理 timer",
      "初始返回值与产品体验一致"
    ],
    "memory": "旧闹钟取消，新闹钟开始。",
    "follow": "delay 动态变化时，为什么必须列入依赖？",
    "code": "function useDebounce(value, delay) {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const id = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(id);\n  }, [value, delay]);\n  return debounced;\n}",
    "english": "The hook schedules an update and clears the previous timer when value or delay changes, or when the component unmounts.",
    "source": "guide",
    "kind": "code",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "C5",
    "title": "数组分组与复杂度",
    "chapter": 5,
    "page": 3,
    "prompt": "将 rows 按 role 分组，说明去重和 id/parentId 转树时会选择的数据结构。",
    "choices": [],
    "answer": "分组可用 Map 配合单次遍历。去重按业务键使用 Set 或 Map。转树通常先建 id 到节点的映射，再连接父子，并处理缺失父节点、重复 id 和循环关系。",
    "points": [
      "Map 分组通常预期 O(n) 时间与 O(n) 空间",
      "对象去重先确定按引用还是按业务 id",
      "转树需定义根节点与异常数据策略"
    ],
    "memory": "先建索引，再找关系。",
    "follow": "为什么用普通对象分组需要注意 __proto__ 这类键？",
    "code": "function groupByRole(rows) {\n  const groups = new Map();\n  for (const row of rows) {\n    if (!groups.has(row.role)) groups.set(row.role, []);\n    groups.get(row.role).push(row);\n  }\n  return groups;\n}",
    "english": "I use a Map to group by role in one pass. For deduplication I choose a business key; for trees I build an ID index first.",
    "source": "guide",
    "kind": "code",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "P1",
    "title": "旧系统迁移到 React",
    "chapter": 5,
    "page": 3,
    "prompt": "讲一次你亲自参与的迁移：怎样拆分组件并保证旧功能正常？",
    "choices": [],
    "answer": "这里没有唯一标准答案。用真实案例填写背景、个人行动、结果与取舍；材料提及的项目仅作为提示，不代表你已经做过其中每一项。",
    "points": [
      "背景与约束：页面范围、旧接口、依赖关系",
      "个人行动：增量迁移、组件边界、兼容层和回归测试",
      "结果证据：真实缺陷、验证方式、发布与回滚方案"
    ],
    "memory": "边界清楚，小步替换，结果可验证。",
    "follow": "如果不能一次替换旧页面，你如何让新旧代码共存？",
    "code": "",
    "english": "In this project, the challenge was [context]. I was responsible for [my contribution]. I chose [approach] because [trade-off]. We verified the result through [real evidence].",
    "source": "guide",
    "kind": "story",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "P2",
    "title": "Report scheduling 设计",
    "chapter": 5,
    "page": 3,
    "prompt": "讲清报表排期从填写表单、校验、提交到错误恢复的完整流程。",
    "choices": [],
    "answer": "这里没有唯一标准答案。用真实案例填写背景、个人行动、结果与取舍；材料提及的项目仅作为提示，不代表你已经做过其中每一项。",
    "points": [
      "状态模型：时间、时区、频率、收件人和权限",
      "个人实现：联动校验、API 错误映射、防重复提交",
      "边界与验证：时区/夏令时、服务端校验、失败重试"
    ],
    "memory": "表单 → 规则 → API → 恢复。",
    "follow": "网络超时后用户重试，怎样避免创建两个排期？",
    "code": "",
    "english": "In this project, the challenge was [context]. I was responsible for [my contribution]. I chose [approach] because [trade-off]. We verified the result through [real evidence].",
    "source": "guide",
    "kind": "story",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "P3",
    "title": "RBAC 权限与界面",
    "chapter": 5,
    "page": 3,
    "prompt": "权限怎样影响按钮、页面和路由？为什么前端隐藏按钮不等于安全？",
    "choices": [],
    "answer": "这里没有唯一标准答案。用真实案例填写背景、个人行动、结果与取舍；材料提及的项目仅作为提示，不代表你已经做过其中每一项。",
    "points": [
      "前端：统一权限读取、加载与拒绝状态",
      "后端：每个受保护操作验证身份与权限",
      "个人贡献：具体权限变更、越权回归用例、真实取舍"
    ],
    "memory": "前端负责体验，后端负责强制校验。",
    "follow": "用户打开页面后权限被撤销，已有页面如何处理？",
    "code": "",
    "english": "In this project, the challenge was [context]. I was responsible for [my contribution]. I chose [approach] because [trade-off]. We verified the result through [real evidence].",
    "source": "guide",
    "kind": "story",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "P4",
    "title": "React / MUI 迁移复盘",
    "chapter": 5,
    "page": 3,
    "prompt": "挑一个你亲自解决的 React 18 或 Material UI 兼容问题，讲出定位过程。",
    "choices": [],
    "answer": "这里没有唯一标准答案。用真实案例填写背景、个人行动、结果与取舍；材料提及的项目仅作为提示，不代表你已经做过其中每一项。",
    "points": [
      "明确旧版/新版、复现步骤和实际症状",
      "说明根因、修复方式、替代方案与个人贡献",
      "说明回归验证与发布后结果，不虚构量化指标"
    ],
    "memory": "症状 → 定位 → 修复 → 验证。",
    "follow": "为什么这个问题只在开发 StrictMode 中明显出现？",
    "code": "",
    "english": "In this project, the challenge was [context]. I was responsible for [my contribution]. I chose [approach] because [trade-off]. We verified the result through [real evidence].",
    "source": "guide",
    "kind": "story",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "P5",
    "title": "可视化组件复用",
    "chapter": 5,
    "page": 3,
    "prompt": "怎样让可视化组件被客户应用与内部应用复用，同时避免过度抽象？",
    "choices": [],
    "answer": "这里没有唯一标准答案。用真实案例填写背景、个人行动、结果与取舍；材料提及的项目仅作为提示，不代表你已经做过其中每一项。",
    "points": [
      "找共同契约：数据结构、交互事件和样式入口",
      "分离展示、数据获取与权限等业务逻辑",
      "说明消费者迁移、向后兼容、测试与维护取舍"
    ],
    "memory": "共性做契约，差异留扩展点。",
    "follow": "两个产品需要不同的交互，你如何避免不断添加布尔 props？",
    "code": "",
    "english": "In this project, the challenge was [context]. I was responsible for [my contribution]. I chose [approach] because [trade-off]. We verified the result through [real evidence].",
    "source": "guide",
    "kind": "story",
    "note": "",
    "url": "",
    "correct": 0
  },
  {
    "id": "P6",
    "title": "跨团队接口与集成",
    "chapter": 5,
    "page": 3,
    "prompt": "选择一个你亲自参与的跨团队接口或集成问题，说明自己负责的部分。",
    "choices": [],
    "answer": "这里没有唯一标准答案。用真实案例填写背景、个人行动、结果与取舍；材料提及的项目仅作为提示，不代表你已经做过其中每一项。",
    "points": [
      "背景：接口契约、责任边界、阻塞点",
      "行动：如何复现、协商契约、验证与推动落地",
      "结果：真实证据、团队与个人贡献、后续改进"
    ],
    "memory": "事实、行动、证据，三件事讲完整。",
    "follow": "如果合作方接口延期，你如何降低依赖风险？",
    "code": "",
    "english": "In this project, the challenge was [context]. I was responsible for [my contribution]. I chose [approach] because [trade-off]. We verified the result through [real evidence].",
    "source": "guide",
    "kind": "story",
    "note": "",
    "url": "",
    "correct": 0
  }
];
