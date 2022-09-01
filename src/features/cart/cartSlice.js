import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const URL = `https://course-api.com/react-useReducer-cart-project`

const initialState = {
    cartItems: [],
    amount: 0,
    total:0,
    isLoading: false
}


export const getProducts = createAsyncThunk('cart/getProducts',async(param, thunkAPI) => {
    try{
        const response = await fetch(URL);
        return response.json();
    }catch(err){

    }
        
})

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action){

            const index = state.cartItems.findIndex(item => item.id === action.payload.id);
            if(index === -1){
                state.cartItems.push(action.payload)
            }else {
                state.cartItems[index].amount +=1;
            }

            
            state.amount += action.payload.amount
            let total = 0;
            state.cartItems.forEach(item => {
                total += parseFloat(item.price * item.amount) 
            });
            state.total = total;
        },
        removeItem(state, {payload}){

            const index = state.cartItems.findIndex(item => item.id === payload.id);

            if(index !== -1){
                state.amount -= 1;
                state.total -= state.cartItems[index].price

                if(state.cartItems[index].amount === 1){

                    state.cartItems = state.cartItems.filter(item => item.id !== payload.id);
                    
                }else{
                    state.cartItems[index].amount -= 1;

                }
            }
        },

        clearCart(state){
            // state.cartItems = [];
            // state.amount = 0;
            // state.total = 0;
            // state.isLoading = false;
            return initialState;
        }

    },
    extraReducers: {
        [getProducts.pending]: (state) => {
            state.isLoading = true;
        },
        [getProducts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload
        },
        [getProducts.rejected]: (state) => {
            state.isLoading = false;
        }
    }
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
