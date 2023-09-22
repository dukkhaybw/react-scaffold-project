import * as types from '../constant/personConstant';

// 同步action，就是指action的值为Object类型的 [一般对象]
export const updataInfo = (payload) => ({ type: types.UPDATAINFO, payload });
export const delPerson = (payload) => ({ type: types.DEL_PERSON, payload });
