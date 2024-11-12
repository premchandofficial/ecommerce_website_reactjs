import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stateData: [],
  totalQuantity: 0,
  totalPrice: 0,
  totalItems: 0,
};

const stateSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      let find = state.stateData.findIndex(
        (item) => item.id === action.payload.id
      );
      if (find >= 0) {
        state.stateData[find].quantity += 1;
      } else {
        state.stateData.push({ ...action.payload, quantity: 1 });
      }
    },


    countTotalQuantityPrice: (state, action) => {
      let { totalQuantity, totalPrice, totalItems } = state.stateData.reduce(
        (ocumulatar, cartItems, index, arr) => {
          const { price, quantity } = cartItems;

          const itemsTotalPrice = price * quantity;
          ocumulatar.totalPrice += itemsTotalPrice;
          ocumulatar.totalQuantity += quantity;
          ocumulatar.totalItems += 1;
          return ocumulatar;
        },
        { totalPrice: 0, totalQuantity: 0, totalItems: 0 }
      );

      state.totalPrice = parseInt(totalPrice.toFixed(2));
      state.totalQuantity = totalQuantity;
      state.totalItems = totalItems;
    },

    // increment
    incrementQuantity: (state, action) => {
      state.stateData = state.stateData.map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    },

    decrementQuantity: (state, action) => {
      state.stateData = state.stateData.map((item) => {
        if (item.id === action.payload) {
          
          return { ...item, quantity: item.quantity - 1 };
        
        }
        return item;
      });
    },

    removeItem: (state, action) => {
      state.stateData = state.stateData.filter(
        (items) => items.id !== action.payload
      );
    },
  },
});

export const {
  addtoCart,
  countTotalQuantityPrice,
  incrementQuantity,
  decrementQuantity,
  removeItem,
} = stateSlice.actions;
export default stateSlice.reducer;
