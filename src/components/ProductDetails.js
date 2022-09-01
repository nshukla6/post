import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../features/cart/cartSlice";

const ProductDetails = ({ product }) => {

    const dispatch = useDispatch();
    const {cartItems=[]} = useSelector(store => store.cart);


  const { id, title, price, img, amount } = product;
  const qnty = cartItems.find(item => item.id === id)?.amount
  return (
    <Card sx={{ width: 345, margin: 5 }}>
      <CardMedia
        component="img"
        height="140"
        image={img}
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {price}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent:'space-between'}}>
        <Button disabled={!qnty || qnty <= 0} onClick={() => dispatch(removeItem({...product }))} variant="contained" color="secondary" size="small">Remove</Button>
        {
            qnty
        }
        <Button onClick={() => dispatch(addItem({...product }))} variant="contained" size="small">Add</Button>
      </CardActions>
    </Card>
  );
};

export default ProductDetails;
