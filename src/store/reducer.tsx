import { ACTION } from "./action";

export enum STATUS {
  Normal,
  Sending,
  Success
}

const defaultState = {
  status: STATUS.Normal,
  message: ``
};

export default function counter(state: any = defaultState, action: any) {
  switch (action.type) {
    case ACTION.Send:
      return {
        ...state,
        status: STATUS.Sending,
        message: action.message
      };
    case ACTION.Reset:
      return {
        ...state,
        status: STATUS.Normal,
        message: action.message
      };
    case ACTION.Success:
      return {
        ...state,
        status: STATUS.Success,
        message: action.message
      };
    case ACTION.Failure:
      return {
        ...state,
        status: STATUS.Normal,
        message: action.message
      };
    default:
      return state;
  }
}
