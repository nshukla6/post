import { Button } from "@mui/material";
import React, { useEffect } from "react";
import ProductList from "../components/ProductList";
import { useDispatch, useSelector } from "react-redux";
// import products from "../products";
import { clearCart, getProducts } from "../features/cart/cartSlice";

const About = () => {
  const dispatch = useDispatch();
  const { total, cartItems, isLoading } = useSelector((store) => store.cart);

  useEffect(() => {
    dispatch(getProducts('id'))
  }, []);
  return (
    <div>
      <h1>About Page</h1>
      <h3>{isLoading && "Loading..."}</h3>
      <ProductList products={cartItems} />
      <Button variant="contained" onClick={() => dispatch(clearCart())}>
        Clear Cart
      </Button>
      Total Amount : {total}{" "}
    </div>
  );
};

export default About;
