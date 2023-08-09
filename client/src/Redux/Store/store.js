/* import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../Features/dataSlice/dataSlice";
export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});
 */

import { configureStore } from "@reduxjs/toolkit";
import dataReducer, { fetchData } from "../Features/dataSlice/dataSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

// Check if data is already present in the Redux store
const dataInStore = store.getState().data;

// If data is not present, dispatch the fetchData thunk to fetch it
if (dataInStore.length === 0) {
  store.dispatch(fetchData());
}
