## 启动项目

```shell
npm start
```

## 打包项目

```shell
npm run build
```

## 需要安装的vscode插件

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
  const count = useSelector((state) => state.counter.value);
  const [number, setNumber] = useState(0);
  const dispatch = useDispatch();
  const { t } = useTranslation();

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

      <hr />
      <div>
        {number}
        <Button onClick={() => setNumber(number + 1)}>+1number</Button>
      </div>
    </div>
  );
}

Home.displayName = 'Home';
```
