import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type User } from "../types/user";
import axios from "axios";
import api from "../api/api";

export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
  try {
    const res = await api.get(`/api/me`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      try {
        await thunkAPI.dispatch(refresh()).unwrap();
        const retry = await api.get(`/api/me`, {
          withCredentials: true,
        });
        return retry.data;
      } catch (refreshError) {
        console.log(refreshError);
        return thunkAPI.rejectWithValue("Sessão expirada. Faça login novamente.");
      }
    }
  }
});

export const refresh = createAsyncThunk("user/refresh", async (_, thunkAPI) => {
  try {
    const res = await api.post(`/api/refresh`, null, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue("Sessao expirada");
  }
});

export const login = createAsyncThunk(
  "user/login",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await api.post(
        `/api/login`,
        { email, password },
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return thunkAPI.rejectWithValue(
            error.response.data.message || "Erro no servidor."
          );
        } else if (error.request) {
          return thunkAPI.rejectWithValue(
            "Servidor não respondeu. Tente novamente."
          );
        } else {
          return thunkAPI.rejectWithValue("Erro inesperado. Tente novamente.");
        }
      } else {
        return thunkAPI.rejectWithValue("Erro desconhecido.");
      }
    }
  }
);

export const sendEmailWithToken = createAsyncThunk(
  "user/forgot-password",
  async (
    { email }: { email: string | null },
    thunkAPI
  ) => {
    try {
      const res = await api.post(
        '/api/forgot-password',
        { email },
        {
          withCredentials: true,
        }
      )
      return res.data;
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return thunkAPI.rejectWithValue(
            error.response.data.message || "Erro no servidor."
          );
        } else if (error.request) {
          return thunkAPI.rejectWithValue(
            "Servidor não respondeu. Tente novamente."
          );
        } else {
          return thunkAPI.rejectWithValue("Erro inesperado. Tente novamente.");
        }
      } else {
        return thunkAPI.rejectWithValue("Erro desconhecido.");
      }
    }
  }
)

export const compareToken = createAsyncThunk(
  "user/compare-token",
  async (
    {
      tokenClient,
      email,
    }:
      {
        tokenClient: string;
        email: string;
      },
    thunkAPI
  ) => {
    try {
      const res = await api.post(
        `/api/compare-token`,
        { tokenClient, email },
        {
          withCredentials: true,
        }
      )
      return res.data;
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return thunkAPI.rejectWithValue(
            error.response.data.message || "Erro no servidor."
          );
        } else if (error.request) {
          return thunkAPI.rejectWithValue(
            "Servidor não respondeu. Tente novamente."
          );
        } else {
          return thunkAPI.rejectWithValue("Erro inesperado. Tente novamente.");
        }
      } else {
        return thunkAPI.rejectWithValue("Erro desconhecido.");
      }
    }
  }
)

export const resetPassword = createAsyncThunk(
  "user/reset-password",
  async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    }, thunkAPI
  ) => {
    try {
      const res = await api.post(
        `/api/reset-password`,
        { password, email },
        {
          withCredentials: true,
        }
      )
      return res.data;
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return thunkAPI.rejectWithValue(
            error.response.data.message || "Erro no servidor."
          );
        } else if (error.request) {
          return thunkAPI.rejectWithValue(
            "Servidor não respondeu. Tente novamente."
          );
        } else {
          return thunkAPI.rejectWithValue("Erro inesperado. Tente novamente.");
        }
      } else {
        return thunkAPI.rejectWithValue("Erro desconhecido.");
      }
    }
  }
)

export const logout = createAsyncThunk("user/logout", async () => {
  try {
    await api.post(`/api/logout`, null, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
})

export const register = createAsyncThunk(
  "user/register",
  async (
    {
      email,
      password,
      name,
      lastName,
    }: {
      email: string;
      password: string;
      name: string;
      lastName: string;
    },
    thunkAPI
  ) => {
    try {
      const res = await api.post(`/api/register`, {
        email,
        password,
        name,
        lastName,
      });

      return res.data;
    } catch (error) {
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

export const activate = createAsyncThunk(
  "user/activate",
  async (
    {
      token,
    }: {
      token: string | undefined;
    },
    thunkAPI
  ) => {
    try {
      await api.get(
        `/api/activation/${token}`
      );
    } catch (error) {
      console.error("Erro na ativação:", error);
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

interface UserState {
  user: User | null;
  authenticated: boolean | null;
  accessToken: string | null;
  error: string | null;
  success: string | null;
  loading: boolean;
};

const initialState: UserState = {
  user: null,
  authenticated: null,
  accessToken: null,
  error: null,
  success: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = false;
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
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authenticated = true;
        state.loading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
        state.user = null;
        state.authenticated = false;
      })
      .addCase(refresh.pending, (state) => {
        state.error = null;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload?.accessToken || state.accessToken;
      })
      .addCase(refresh.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticated = true;
        state.accessToken = action.payload?.accessToken || null;
        state.user = action.payload?.user || null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.authenticated = false;
        state.user = null;
        state.accessToken = null;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(sendEmailWithToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendEmailWithToken.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendEmailWithToken.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(compareToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(compareToken.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(compareToken.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message as string;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
  },
});

export const { setLoading, setError, setSuccess } = userSlice.actions;
export default userSlice.reducer;
