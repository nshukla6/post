import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import usersReducer from "./features/users/userSlice";
import counterReducer from "./features/counter/counterSlice";
import postsReducer from "./features/posts/postSlice";



export const store = configureStore({
    reducer: {
      cart: cartReducer,
      users: usersReducer,
      counter: counterReducer,
      posts: postsReducer,
    }
})