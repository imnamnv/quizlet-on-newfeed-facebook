import React from "react";
import createDataContext, { ActionType } from "./createDataContext";
import jobInterView from "../assets/txt/jobInterview.json";
import food from "../assets/txt/food.json";
import { Category } from "../models";
import { setInitState } from "../utils/storage";

const ROOT_ACTION = {
  SET_CURRENT_CATEGORY: "set_current_category",
  SET_CURRENT_STATUS: "set_current_status",
  ADD_NEW_CATEGORY: "add_new_category",
  UPDATE_CATEGORY: "update_category",
  DELETE_CATEGORY: "delete_category",
  SET_INIT_STATE: "set_init_state",
};

export const enum ROOT_STATUS {
  LEARNING,
  ADDING,
  EDITING,
}

export interface InitState {
  state: {
    currentCategory: number;
    categoryList: Category[];
    currentStatus: ROOT_STATUS;
  };
  [key: string]: any;
}

export interface InitStateAction {
  setCurrentCategory: (payload: { id: number }) => void;
  setCurrentStatus: (payload: { currentStatus: ROOT_STATUS }) => void;
  addNewCategory: (payload: { newCategory: Category }) => void;
  updateCategory: (payload: { category: Category }) => void;
  deleteCategory: (payload: { id: number }) => void;
  setState: (payload: { initState: InitState }) => void;
}

const categoryReducer = (
  state: {
    currentCategory: number;
    categoryList: Category[];
    currentStatus: ROOT_STATUS;
  },
  action: ActionType
) => {
  switch (action.type) {
    case ROOT_ACTION.SET_CURRENT_CATEGORY: {
      const newState = {
        ...state,
        currentCategory: action.payload,
      };

      setInitState({ state: newState });
      return newState;
    }
    case ROOT_ACTION.SET_CURRENT_STATUS: {
      const newState = {
        ...state,
        currentStatus: action.payload,
      };

      setInitState({ state: newState });
      return newState;
    }

    case ROOT_ACTION.ADD_NEW_CATEGORY: {
      const newState = {
        ...state,
        categoryList: [...state.categoryList, action.payload],
        currentCategory: action.payload.id,
      };

      setInitState({ state: newState });
      return newState;
    }
    case ROOT_ACTION.UPDATE_CATEGORY: {
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

      const newState = {
        ...state,
        categoryList: newCategoryList,
      };

      setInitState({ state: newState });
      return newState;
    }
    case ROOT_ACTION.DELETE_CATEGORY: {
      const newCategoryList = state.categoryList.filter(
        (category: Category) => {
          return category.id !== action.payload;
        }
      );

      const newState = {
        ...state,
        currentCategory: 0,
        categoryList: newCategoryList,
      };

      setInitState({ state: newState });
      return newState;
    }
    case ROOT_ACTION.SET_INIT_STATE: {
      return action.payload.state;
    }

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

const deleteCategory = (dispatch: React.Dispatch<ActionType>) => {
  return ({ id }: { id: number }) => {
    dispatch({
      type: ROOT_ACTION.DELETE_CATEGORY,
      payload: id,
    });
  };
};

const setState = (dispatch: React.Dispatch<ActionType>) => {
  return ({ initState }: { initState: InitState }) => {
    dispatch({
      type: ROOT_ACTION.SET_INIT_STATE,
      payload: initState,
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
    deleteCategory,
    setState,
  },
  {
    currentCategory: 0,
    categoryList: [jobInterView, food],
    currentStatus: ROOT_STATUS.LEARNING,
  }
);
