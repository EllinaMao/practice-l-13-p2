import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
 
// Асинхронный запрос для получения товаров
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  }
);
 
const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    currentPage: 1, // поле для хранения текущей страницы
    itemsPerPage: 9, // сколько товаров выводить
  },
  reducers: {
    // Экшен для смены страницы
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
 
export const { setCurrentPage } = productsSlice.actions; // Экспортируем новый экшен
export default productsSlice.reducer;
