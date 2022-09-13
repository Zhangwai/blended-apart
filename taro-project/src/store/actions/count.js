import { ADD, RESET } from "../constants/count";

export const addNum = (num) => {
  return {
    type: ADD,
    num,
  };
};
export const resetNum = (num = 0) => {
  return {
    type: RESET,
    num,
  };
};
