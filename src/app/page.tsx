'use client';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { ProductType } from '@/components/ProductCard/types';
import styles from './page.module.css'

export default function Home() {


  const [products, setProducts] = useState<any>([])

  

  

  const getProducts = async () => {
    const products = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/products`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    const response = await products.json()
    if (response.status === "success") {
      setProducts(response.payload)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <Box>
      
      <div className={styles['products-container']}>
        {
          products &&
          products.map((product: ProductType) => (
            <ProductCard {...product} />
          ))
        }
      </div>

    </Box>
  )
}
