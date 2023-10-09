## 启动项目

```shell
npm start
```

## 打包项目

```shell
npm run build
```

## 必须需要安装的vscode插件

- ESLint：项目代码不规范提示与爆红
- Prettier-Code formatter：格式化代码
- vscode-styled-components：用于编写css-in-js的样式代码时，提供css属性提示
- EditorConfig for VSCode: 跨编辑器工具统一编辑器格式

## 项目路径说明

```js
import emitter from '@/utils/eventBus';
// 类似等价于
// import emitter from '../../utils/eventBus.js';
```

项目文件中使用的@符号，表示的是项目下的src目录，所以不需要再使用相对路径，比如：../../utiles/eventBus。
项目中引用的文件不需要添加文件类型后缀，只要文件的类型是'.jsx', '.js', '.json', '.ts', '.tsx', '.wasm'中的任意一种

## 项目重点包依赖说明

- "antd": "^5.9.2",
- "react": "^18.2.0"
- "react-redux": "^8.1.2"
- "react-router-dom": "^6.16.0"

## 定义项目源码中任何地方都可以使用的变量

借助于不同环境下的.env文件。具体步骤：

1. 在env文件中定义自己需要在源码中使用的变量及其值（建议全大写）

```
BASE_URL=www.baidu.com
TIME_OUT=10000
```

2. 在项目的config/webpack.base.js文件中增加类似的内容

```js
{
  plugins: [
    new webpack.DefinePlugin({
      BASE_URL: JSON.stringify(process.env.BASE_URL), // 如果值是字符串，则必须用JSON.stringify再包裹一下
      TIME_OUT: process.env.TIME_OUT // 值是数字则不用
      // others
    })
  ];
}
```

3. 在项目源码中将可以直接使用如上面代码中的 BASE_URL 或者 TIME_OUT来表示其代表的值

## 项目使用的node版本

- "node": "16.17.0"
- "npm": "8.15.0"

## 项目各个目录说明

- assets（静态资源）
  - language（语言包资源）
    - login（登录页的语言包）
      - en.json
      - zh.json
    - home（主页的语言包）
      - en.json
      - zh.json
    - ...
  - images（图片资源）
  - fonts（icon字体图标资源）
- components（整个项目共享的组件）
- layout（项目布局组件）
- router（项目路由）
- store（项目redux仓库）
- style（项目全局样式目录）
  - css
  - less
- utils（项目工具库目录）
- views（项目功能模块）
- index.jsx项目入口文件，配置了redux
- App.jsx配置了国际化，antd，react-router
- 其他配置类文件不再说明...

## React Redux8使用说明

通过使用React Redux提供的hooks进行和store的各种交互。在函数组件中：

- useSelector:用于从仓库中读取一个值,并且当值变化时，会触发组件更新
- useDispatch:该方法返回store提供的dispatch方法，然后自己用于派发action

如下代码：

```jsx
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '@/store/reducer/counterSlice';
import { useState } from 'react';

export default function Home() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);

  return (
    <div>
      <p>{count}</p>
      <Button
        type="primary"
        onClick={() => {
          dispatch(increment());
        }}
      >
        +1
      </Button>

      <Button
        type="primary"
        onClick={() => {
          dispatch(decrement());
        }}
      >
        -1
      </Button>
      <div style={{ paddingTop: 16 }}>{t('home.hello')}</div>
    </div>
  );
}

Home.displayName = 'Home';
```



## React-Router-Dom

整个项目的路由系统采用router-config风格进行组织。

```js
import { createBrowserRouter } from 'react-router-dom';
import Layout, { LayoutLoader } from '@/layout';
import Login from '@/views/login';
import Home from '@/views/home/index';
import ErrorPage from '@/views/error';
import homeChildRoutes from './home';  

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    loader: LayoutLoader, // 加载对应的路由前会触发的类似于路由拦截器功能的函数
    errorElement: <ErrorPage />,  // 路由加载出错加载的组件
    children: [
      {
        path: 'home', // 以相对路径开头，匹配的是：/home
        element: <Home />,
        children: [
    			...homeChildRoutes,  // home模块下的其他功能模块的路由,建议拆出去
          {
            path: 'test2',   // 以相对路径开头，匹配的是：/home/test2
            lazy: <Test2 />
          }
    		]  
      },
      {
        path: 'about',
        lazy: () => import(/* webpackChunkName: "about" */ '@/views/about/index')  // 懒加载
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <div>404</div>
  }
]);

export default router;

```



### `<Outlet>`

当前端路由匹配到对应的路径后，需要将路径对应的组件渲染到上级路径对应的组件的特定位置，需要在该上级组件中确定路由组件的渲染出口，使用`<Outlet>`组件确定。

```jsx
import { Button } from 'antd';
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <Outlet />  
    </div>
  );
}
```





### 声明式导航

```jsx
import { useNavigate } from "react-router-dom";

function useLogoutTimer() {
  const userIsInactive = useFakeInactiveUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (userIsInactive) {
      fake.logout();
      navigate("/session-timed-out");
    }
  }, [userIsInactive]);
}
```





### 编程式导航

Link，NavLink

```jsx
import { Outlet, Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="sidebar">
        {/* other elements */}

        <nav>
          <ul>
            <li>
               {/* path可以是相对路径（相对于当前路径），也可以是绝对路径 */}
              <Link to=`/home`>Your Name</Link>  
            </li>
            <li>
              <Link to=`/login`>Your Friend</Link>
            </li>
          </ul>
        </nav>

        {/* other elements */}
      </div>
    </>
  );
}
```



### 路由间传参

```jsx
/* other imports */
import Root from "./routes/root";
import { getContacts } from "../contacts";

export async function loader(...args) {
  // args 中也函数路由参数
  const contacts = await getContacts();
  return { contacts,args };
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,  // 可以在该rootLoader函数获取或者设置参数，不是必选的，需要时再使用
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
]);
```

在组件中获取上面loader函数中设置的参数

```jsx
import {
  Outlet,
  Link,
  useLoaderData,
} from "react-router-dom";
import { getContacts } from "../contacts";

/* other code */

export default function Root() {
  const { contacts } = useLoaderData();   // 这里就是loader返回的数据，如果默认不配置上面的loader，那也可以根据动态路由获取路由中的参数
  return (
      <div id="sidebar">
        <h1>React Router Contacts</h1>
      </div>
  );
}
```





```jsx
import * as React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

function ProfilePage() {
  // Get the userId param from the URL.
  let { userId } = useParams();
  // ...
}

function App() {
  return (
    <Routes>
      <Route path="users">
        <Route path=":userId" element={<ProfilePage />} />
        <Route path="me" element={...} />
      </Route>
    </Routes>
  );
}
```





### redirect

路由重定向

```jsx
import { redirect } from "react-router-dom";

redirect(`/contacts/${params.contactId}`);
/* existing code */
```





## 编码规范

### 命名与注释（Naming and Comments）

大到项目名、模块名、包名、对外暴露的接口，小到类名、函数名、变量名、参数名。命名的好坏，对于代码的可读性来说非常重要。对于影响范围比较大的命名，比如包名、接口、类名，一定要反复斟酌、推敲。实在想不到好名字的时候，可以去 GitHub 上用相关的关键词联想搜索一下，看看类似的代码是怎么命名的。

- 文件夹名字以小驼峰命名方法进行命名
- 对于一些默认的、大家都比较熟知的词，推荐用缩写，比如，sec 表示 second、str 表示 string、num 表示 number、
  doc 表示 document。
- 对于作用域比较小的变量，可以使用相对短的命名，比如一些函数内的临时变量。相反，对于类名这种作用域比较大的，推荐用长的命名方式。
- 命名的一个原则就是以能准确达意为目标，命名的时候，一定要学会换位思考，假设自己不熟悉这块代码，从代码阅读者的角度去考量命名是否足够直观。
- 命名要可读、可搜索。不要使用生僻的、不好读的英文单词来命名。除此之外，命名要符合项目的统一规范，不要用些反直觉的命名。

**注释**

注释的内容建议主要包含这样三个方面：做什么、为什么、怎么做。

```java
/**
* (what) Bean factory to create beans.
*
* (why) The class likes Spring IOC framework, but is more lightweight.
*
* (how) Create objects from different sources sequentially:
* user specified object > SPI > configuration > default object.
*/
public class BeansFactory {
  // ...
}
```



### 代码风格（Code Style）

- **善用空行分割单元块**
- 缩进采用两格缩进
- 在类中，成员变量排在函数的前面。成员变量之间或函数之间，都是按照“先静态（静态函数或静态成员变量）、后普通（非静态函数或非静态成员变量）”的方式来排列的。除此之外，成员变量之间或函数之间，还会按照作用域范围从大到小的顺序来排列，先写 public成员变量或函数，然后是 protected 的，最后是 private 的。
- 避免函数参数过多

