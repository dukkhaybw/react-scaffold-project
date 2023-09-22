/*
   该文件专门为Count组件生成action对象
*/

import * as types from '../constant/countConstant';

// 同步action，就是指action的值为Object类型的 [一般对象]
export const increment = (payload) => ({ type: types.INCREMENT, payload });
export const decrement = (payload) => ({ type: types.DECREMENT, payload });

// 异步action，就是指action的值为 [函数] ,
// 异步action中一般都会调用 [同步action],异步action不是必须要用的。
export const incrementAsync = (delay) => (dispatch) => {
  setTimeout(() => {
    dispatch(increment());
  }, delay);
};
