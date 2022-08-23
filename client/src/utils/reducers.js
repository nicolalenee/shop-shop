import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY
} from "./actions";

import { useReducer } from 'react';

export const reducer = (state, action) => {
  switch (action.type) {

    //if action type value is the value of `update_products`, return a new state object with an updated products array
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],

      };

      // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an update categories array
      case UPDATE_CATEGORIES: 
        return {
          ...state,
          categories: [...action.categories]
        };

      // if current category value is diffent from 
      case UPDATE_CURRENT_CATEGORY:
        return {
          ...state,
          currentCategory: action.currentCategory
        };
      // if it's none of these actions, do not update state at all and keep things the same
      default: 
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}