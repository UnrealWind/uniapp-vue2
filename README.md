### 基于 vant + uniapp

1. 通过静态方式引入 vant，因为无法通过 npm 引入 vant，使用 webpack 将 static 打包进 dist （https://youzan.github.io/vant-weapp/#/intro） （/src/static）
2. 适用 flyjs 并集成了 toast，拦截器等,并不推荐集中管理 api 的方式，因为个人觉得无用 （/wxcomponents/flyio）
3. store 使用方式与 vuex store 相同 （/src/store）
4. container 每个页面的通用容器，之所以不推荐集中管理 api 也是个人认为这样与容器相结合有更加统一且规范的代码管理方式 (/src/components/facontainer)
5. faFlex 如果不愿意学 flex 可以使用这个组件进行 flex 布局，个人觉得随意 static，flex 对最终产品并没有什么影响 (/src/components/facontainer)
6. jssdk 调用 wxjssdk,这里需要与后台配合进行修改 (/src/wxcompinents/jssdk)

### 开发规范

1. eslint
2. 不允许使用 var function 使用 let，const 以及箭头函数代替

3. 每个页面初始化进行数据获取，请采用这种方式，结合 container 组件使用，获取到数据之后在对应的方法下进行数据处理即可<br>

```
   async init() {
         try {
           // await this.getUserInfo()
         } catch (e) {
           this.status = 'error'
           throw e
         }
         this.status = 'success'
       },
```

#### question

Q: 这套架构与直接使用 hbuilder 项目有什么区别？<br>
A:

1. 首先，hbuilder 并不是一款好的 ide，他确实减少了开发者的学习成本，但是也变相锁死了开发者更进一步的道路。推荐的 ide 有 vscode，webstorm （无所谓，这个自己用的惯就行

2. hbuilder 默认项目无法随心所欲的自己引用各种组件以及配置 webpack，uniapp 插件市场插件良莠不齐

Q: 为什么使用 eslint？<br>
A: eslint 能够大部分解决代码不规范的问题，一定程度上能够将解决代码风格的问题

Q:为什么要使用 let const 箭头函数<br>
A:为了解决作用域，this 绑定，原有的 var 以及 function 过于混乱,搞清楚了复杂的 js 静态作用域以及 this 在各种不同情况下的绑定问题对业务代码的开发帮助不大（当然面试很有用）

Q:为什么要使用 init 函数<br>
A:

1. 从 mvvm 框架大火之后，前端从 js 操作 dom 变化为 js 操作数据，前端的大部分工作都在数据处理中，大部分页面都需要获取数据，对数据进行处理，统一 init 书写方式能够最大程度统一每个人的开发风格。
2. 获取数据之后不可避免的数据处理，这个与业务或者接口有关，在统一的管理之下与 container 组件能够有效的统一的定义当前页面的状态
3. 不推荐集中管理 api 方式书写代码，没有节省任何代码，业务代码在自己的页面存在非常合理
4. 接口变动或者各种不可抗力造成数据变动，无需改动其他代码，直接在代码后书写适配器即可
5. async await 很大程度上解决了异步同步，代码执行顺序的问题

Q:为什么要对 uniapp 的原生 api 转义？<br>
A：减少翻阅 uniapp 文档的成本（虽然 uniapp 已经很容易学了），在项目初期架构的同时根据业务需求对 uni 的接口进行再封装，尽量减少开发人员的学习成本，尽量做到开发人员只对业务代码负责

ToDo :

1. 页面跳转带参 uni 的处理方式个人认为并不好，比如回退无法携带参数，这个应与 historylist 相结合完善出一个组件
2. websocket
3. 路由自动注册，pages 里写几十条路由很 low，vue 可以进行自动注册，这个应该也可以
4. 鉴权
5. 基于 vant 的，vant 解决了大部分的 ui 问题，但是仍会有问题出现，随着业务不断完善

后记： 这个架构一切的一切都是为了尽可能能够以最少的成本规范前端的开发以及减少学习成本，个人会不断地完善该架构
