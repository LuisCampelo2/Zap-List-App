import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../slices/userSlice';
import listsReducer from '../slices/listsSlice';
import listProductReducer from '../slices/listProductsSlice';
import productsReducer from '../slices/productsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    lists: listsReducer,
    listProduct: listProductReducer,
    products:productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;