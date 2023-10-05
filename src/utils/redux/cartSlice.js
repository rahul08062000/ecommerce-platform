import { createSlice } from "@reduxjs/toolkit";


const cartSlice=createSlice({
    name: 'cart',
    initialState:{
        items: [], 
      },
    reducers:{
        addToCart:(state,action)=>{
            state.items.push(action.payload)
        },
        removeToCart:(state,action)=>{
            state.items = state.items.filter(item => item.id !== action.payload.id);
        },
        clearCart:(state)=>{
            state.item.length=0;
        }
    }
})


export const {addToCart,removeToCart,clearCart}=cartSlice.actions; 

export default cartSlice.reducer;