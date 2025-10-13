import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { type Product } from "../types/product";
import {api,publicApi} from "../api/api";


export const fetchProducts = createAsyncThunk(
  "products/fetchPorducts",
  async (
    {
      listId,
    }: {
      listId?: number
    },
    thunkAPI
  ) => {
    try {
      const res = await publicApi.get(
        `/api/products`,
        {
          params: {
            listId: listId || undefined,
          },
          withCredentials: true,
        }
      );
      return {
        products: res.data.products,
        productsInlist: res.data.productsInList,
      };
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return thunkAPI.rejectWithValue(
            error.response?.data.message || "Erro no servidor:"
          );
        }
      }
    }
  }
);


interface ProductsState {
  products: Product[];
  productInList: number[];
  totalPages: number;
  page: number;
  limit: number;
  error: string | null;
  success:string | null;
  loading: boolean;
  search: boolean;
}

const initialState: ProductsState = {
  products: [],
  productInList: [],
  totalPages: 0,
  page: 1,
  limit: 20,
  error: null,
  success:null,
  loading: false,
  search: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSearch: (state) => {
      state.search = !state.search;
    },
    addProductInListUI: (state, action: PayloadAction<number>) => {
      if (!state.productInList.includes(action.payload)) {
        state.productInList.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload?.products;
        state.productInList = action.payload?.productsInlist;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export const { setPage, setSearch,addProductInListUI } = productsSlice.actions;
export default productsSlice.reducer;
