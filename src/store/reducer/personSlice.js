import * as types from '../constant/personConstant';

const initState = [
  {
    id: 1,
    name: '张三',
    age: 18,
    gender: '男'
  },
  {
    id: 2,
    name: '李四',
    age: 20,
    gender: '男'
  }
];

export default function personReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.UPDATAINFO:
      return state.map((p) => {
        if (p.id === payload.id) {
          return { ...p, ...payload };
        }
        return p;
      });
    case types.DEL_PERSON:
      return state.filter((p) => p.id !== payload);
    default:
      return state;
  }
}
