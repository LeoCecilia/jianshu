import { likeAction } from "./actionType";

export type Action = {
  type: typeof likeAction[keyof typeof likeAction];
  payload?: {
    upCount: number;
    isLike: boolean;
  };
};

export const likeReducer = (
  state: {
    upCount: number;
    isLike: boolean;
  },
  action: Action
) => {
  switch (action.type) {
    case likeAction.like: {
      return {
        ...state,
        upCount: state.upCount + 1,
        isLike: true,
      };
    }
    case likeAction.unlike: {
      return {
        ...state,
        upCount: state.upCount - 1,
        isLike: false,
      };
    }
    case likeAction.reset: {
      return action.payload!;
    }
    default: {
      return state;
    }
  }
};
