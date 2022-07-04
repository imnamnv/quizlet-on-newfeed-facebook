import React from "react";
import createDataContext, { ActionType } from "./createDataContext";
import jobInterView from "../assets/txt/jobInterview.json";
import food from "../assets/txt/food.json";

const ROOT_ACTION = {
  SET_CURRENT_CATEGORY: "set_current_category",
  SET_CURRENT_STATUS: "set_current_status",
};

export const enum ROOT_STATUS {
  LEARNING,
  ADDING,
  EDITING,
}

export interface Item {
  id: number;
  front: string;
  back: string;
}

export interface Category {
  name: string;
  data: Item;
}

export interface InitState {
  state: {
    currentCategory: string;
    categoryList: Category[];
    currentStatus: ROOT_STATUS;
  };
  [key: string]: any;
}

const categoryReducer = (state: InitState, action: ActionType) => {
  switch (action.type) {
    case ROOT_ACTION.SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.payload,
      };
    case ROOT_ACTION.SET_CURRENT_STATUS:
      return {
        ...state,
        currentStatus: action.payload,
      };
    default:
      return state;
  }
};

const setCurrentCategory = (dispatch: React.Dispatch<ActionType>) => {
  return ({ name }: { name: string }) => {
    dispatch({
      type: ROOT_ACTION.SET_CURRENT_CATEGORY,
      payload: name,
    });
  };
};

const setCurrentStatus = (dispatch: React.Dispatch<ActionType>) => {
  return ({ currentStatus }: { currentStatus: ROOT_STATUS }) => {
    dispatch({
      type: ROOT_ACTION.SET_CURRENT_STATUS,
      payload: currentStatus,
    });
  };
};

export const { Provider, Context } = createDataContext(
  categoryReducer,
  {
    setCurrentCategory,
    setCurrentStatus,
  },
  {
    currentCategory: "Job Interview",
    categoryList: [jobInterView, food],
    currentStatus: ROOT_STATUS.LEARNING,
  }
);
