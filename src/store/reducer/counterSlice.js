import * as types from '../constant/countConstant';

const initState = {
  count: 2
};

export default function counterReducer(state = initState, action) {
  const { type } = action;
  switch (type) {
    case types.INCREMENT:
      return { count: state.count + 1 };
    case types.DECREMENT:
      return { count: state.count - 1 };
    default:
      return state;
  }
}
