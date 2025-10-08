import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { type ShoppingListProducts } from "../types/shoppingListProduct";
import { type ShoppingList } from "../types/shoppingList";
import { addProductInListUI } from "./productsSlice";
import api from "../api/api";


export const fetchProductsList = createAsyncThunk(
  "listsProduct/fetchProducts",
  async (
    {
      id,
    }: {
      id: number;
    },
    thunkAPI
  ) => {
    try {
      const res = await api.get(
        `/api/list/${id}/productsList`,
        {
          withCredentials: true,
        }
      );
      console.log("Dados recebidos:", res.data);
      return {
        products: res.data.products,
        list: res.data.list,
      };
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(
        "Erro! Não foi possivel buscar produtos da lista"
      );
    }
  }
);

export const addProductToList = createAsyncThunk(
  "listsProduct/addProduct",
  async ({
    listId,
    productId,
    quantity,
    observation,
  }: {
    listId: number;
    productId: number | null;
    quantity: number | null;
    observation: string | null;
  }, thunkAPI) => {
    try {
      const res = await api.post(
        `/api/shopping-list-add-product`,
        {
          shoppingListId: listId,
          productId,
          quantity,
          observation,
        }
      );
      if (productId !== null) {
        thunkAPI.dispatch(addProductInListUI(productId));
      }
      return res.data;
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return thunkAPI.rejectWithValue(
            error.response.data.message || "Erro no servidor."
          );
        }
      }
    }
  }
);

export const deleteProductInList = createAsyncThunk(
  "products/deleteProduct",
  async (
    {
      shoppingProductId,
    }: {
      shoppingProductId: number;
    },
    thunkAPI
  ) => {
    try {
      const res = await api.delete(
        `/api/product-list-delete/${shoppingProductId}`,
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return thunkAPI.rejectWithValue(
            error.response?.data.message || "Erro ao deletar produto:"
          );
        }
      }
    }
  }
);

export const updateObservation = createAsyncThunk(
  "products/updateObservation",
  async (
    {
      observation,
      shoppingProduct,
    }: {
      observation: string | null;
      shoppingProduct: number;
    },
    thunkAPI
  ) => {
    try {
      console.log(shoppingProduct);
      const res = await api.patch(
        `/api/product-list-update/${shoppingProduct}`,
        {
          observation,
        },
        { withCredentials: true }
      );

      return res.data;
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return thunkAPI.rejectWithValue(
            error.response?.data.message || "Erro ao deletar produto:"
          );
        }
      }
    }
  }
);

export const checkBoxChange = createAsyncThunk(
  "listProduct/checkbox",
  async (
    {
      id,
      isChecked,
    }: {
      id: number;
      isChecked: boolean;
    },
    thunkAPI
  ) => {
    const newIsChecked = !isChecked;

    try {
      await api.patch(
        `/api/checked/${id}`,
        { isChecked: newIsChecked },
        { withCredentials: true }
      );
      return {
        id,
        isChecked: newIsChecked,
      };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Erro");
    }
  }
);

export const editQuantity = createAsyncThunk(
  "listProduct/editQuantity",
  async (
    {
      id,
      quantity,
    }: {
      id: number;
      quantity: number;
    }, thunkAPI) => {
    try {
      const res = await api.patch(
        `/api/edit-quantity/${id}`,
        { quantity: quantity },
        { withCredentials: true }
      )
      return res.data;
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return thunkAPI.rejectWithValue(
            error.response?.data.message || "Erro ao deletar produto:"
          );
        }
      }
    }

  }

)


interface ListProductsState {
  list: ShoppingList;
  products: ShoppingListProducts[];
  totalPages: number;
  page: number;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: ListProductsState = {
  list: {
    id: 0,
    name: "",
    totalPrice: 0,
  },
  products: [],
  loading: false,
  error: null,
  success: null,
  page: 1,
  totalPages: 0,
};

const listProductSlice = createSlice({
  name: "listProducts",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setError: (state) => {
      state.error = null;
    },
    setSuccess: (state) => {
      state.success = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsList.fulfilled, (state, action) => {
        state.error = null;
        state.products = action.payload.products;
        state.list = action.payload.list;
        state.loading = false;
      })
      .addCase(fetchProductsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(checkBoxChange.pending, (state, action) => {
        const { id, isChecked } = action.meta.arg;
        const index = state.products.findIndex((p) => p.id === id);
        if (index !== -1) {
          state.products[index].isChecked = !isChecked;
        }
      })
      .addCase(checkBoxChange.fulfilled, (state, action) => {
        console.log(action.payload);
        const updatedProduct = action.payload;
        state.products = state.products.map((product) =>
          product.id === updatedProduct.id
            ? { ...product, isChecked: updatedProduct.isChecked }
            : product
        );
      })
      .addCase(updateObservation.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(updateObservation.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.success = action.payload.message as string
        const updatedProduct = action.payload.product;
        const index = state.products.findIndex(
          (p) => p.id === updatedProduct.id
        );
        if (index !== -1) {
          state.products[index].observation = updatedProduct.observation;
        }
      })

      .addCase(editQuantity.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(editQuantity.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.success = action.payload.message as string;
        const updatedProduct = action.payload.product;
        const index = state.products.findIndex(
          (p) => p.id === updatedProduct.id
        );
        if (index !== -1) {
          state.products[index].quantity = updatedProduct.quantity;
        }
      })
      .addCase(addProductToList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductToList.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.success = action.payload.message as string
      })
      .addCase(addProductToList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteProductInList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductInList.fulfilled, (state, action) => {
        console.log("Payload do delete:", action.payload);
        state.loading = false;
        state.success = action.payload.message as string;
        state.products = state.products.filter(
          product => product.id !== Number(action.payload.productId)
        );
      })
      .addCase(deleteProductInList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPage, setProducts, setError, setSuccess } = listProductSlice.actions;
export default listProductSlice.reducer;
