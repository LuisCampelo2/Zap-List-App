import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { type ShoppingList } from "../types/shoppingList";
import api from "../api/api";

export const fetchLists = createAsyncThunk("lists/fetchLists", async () => {
  try {
    const res = await api.get(`/api/lists`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Erro desconhecido", err);
    }
  }
});

export const deleteList = createAsyncThunk(
  "list/deleteList",
  async (listId: number | null) => {
    try {
      const res = await api.delete(
        `/api/list-delete/${listId}`,
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      console.log(error);
    } 
  }
);

export const createList = createAsyncThunk(
  "list/createList",
  async ({
    name
  }: {
      name: string;
  }) => {
     try {
      const res = await api.post(
        `/api/shopping-lists`,
        { name },
        { withCredentials: true }
      );
      return res.data;
    } catch (erro) {
      console.log(erro);
    }
  }
)

interface ListsState {
  lists: ShoppingList[];
  loading: boolean;
  error: string | null;
  success:string | null;
}

const initialState: ListsState = {
  lists: [],
  loading: false,
  error: null,
  success:null,
};

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
     setSuccess: (state) => {
      state.success = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.lists = action.payload;
        state.loading = false;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.loading = false;
        state.success= action.payload.message as string;
        state.lists = state.lists.filter(
          list => list.id !== Number(action.payload.listId)
        );
      })
      .addCase(deleteList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createList.fulfilled, (state, action) => {
        state.loading = false;
        state.success= action.payload.message as string;
        state.lists = state.lists.filter(
          list => list.id !== Number(action.payload.listId)
        );
      })
      .addCase(createList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSuccess } = listsSlice.actions;
export default listsSlice.reducer;
