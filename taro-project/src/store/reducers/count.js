import { ADD, RESET } from "../constants/count";

const INITIAL_STATE = 0;

const count = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD:
      return state + action.num;
    case RESET:
      return action.num || 0;
    default:
      return state;
  }
};

export default count;
