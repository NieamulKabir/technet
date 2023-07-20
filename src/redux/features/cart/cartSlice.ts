import { IProduct } from '@/types/globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ICart {
  products: IProduct[];
  total: number;
}
const initialState: ICart = {
  products: [],
  total: 0,
};

const carSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const existing = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (existing) {
        existing.quantity = existing.quantity! + 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      state.total = state.total + action.payload.price;
    },
    removeOneFromCart: (state, action: PayloadAction<IProduct>) => {
      const existing = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (existing && existing.quantity! > 1) {
        existing.quantity = existing.quantity! - 1;
      } else {
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id
        );
      }
      state.total = state.total - action.payload.price;
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
      state.total =
        state.total - action.payload.price * action.payload.quantity!;
    },
  },
});

export const { addToCart, removeFromCart, removeOneFromCart } =
  carSlice.actions;
export default carSlice.reducer;
