import React from "react";
import createDataContext, { ActionType } from "./createDataContext";
import jobInterView from "../assets/txt/jobInterview.json";
import food from "../assets/txt/food.json";
import { Category } from "../models";

const ROOT_ACTION = {
  SET_CURRENT_CATEGORY: "set_current_category",
  SET_CURRENT_STATUS: "set_current_status",
  ADD_NEW_CATEGORY: "add_new_category",
  UPDATE_CATEGORY: "update_category",
};

export const enum ROOT_STATUS {
  LEARNING,
  ADDING,
  EDITING,
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
        currentCategory: +action.payload,
      };
    case ROOT_ACTION.SET_CURRENT_STATUS:
      return {
        ...state,
        currentStatus: action.payload,
      };
    case ROOT_ACTION.ADD_NEW_CATEGORY:
      return {
        ...state,
        categoryList: [...state.categoryList, action.payload],
        currentCategory: +action.payload.id,
      };
    case ROOT_ACTION.UPDATE_CATEGORY:
      const newCategoryList = state.categoryList.map((category: Category) => {
        if (category.id === action.payload.id) {
          return {
            ...category,
            name: action.payload.name,
            data: action.payload.data,
          };
        }
        return category;
      });
      return {
        ...state,
        categoryList: newCategoryList,
      };
    default:
      return state;
  }
};

const setCurrentCategory = (dispatch: React.Dispatch<ActionType>) => {
  return ({ id }: { id: string | number }) => {
    dispatch({
      type: ROOT_ACTION.SET_CURRENT_CATEGORY,
      payload: id,
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

const addNewCategory = (dispatch: React.Dispatch<ActionType>) => {
  return ({ newCategory }: { newCategory: Category }) => {
    dispatch({
      type: ROOT_ACTION.ADD_NEW_CATEGORY,
      payload: newCategory,
    });
  };
};

const updateCategory = (dispatch: React.Dispatch<ActionType>) => {
  return ({ category }: { category: Category }) => {
    dispatch({
      type: ROOT_ACTION.UPDATE_CATEGORY,
      payload: category,
    });
  };
};

export const { Provider, Context } = createDataContext(
  categoryReducer,
  {
    setCurrentCategory,
    setCurrentStatus,
    addNewCategory,
    updateCategory,
  },
  {
    currentCategory: 0,
    categoryList: [jobInterView, food],
    currentStatus: ROOT_STATUS.LEARNING,
  }
);
