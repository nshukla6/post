import { Box } from '@mui/material';
import React from 'react';
import ProductDetails from './ProductDetails';


const ProductList = ({ products }) => {

  return (
    <Box sx={{ display: 'flex' }}>
        {
            products.map(product => <ProductDetails key={product.id}  product={product} />)
        }
    </Box>
  )
}

export default ProductList