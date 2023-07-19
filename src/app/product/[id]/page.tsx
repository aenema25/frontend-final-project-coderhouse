
'use client';
import { FC, useState, useEffect } from 'react';
import { Box, TextField, Divider, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ProductType } from '@/components/ProductCard/types';

const ProductPage: FC<any> = ({ params }) => {

    const [productData, setProductData] = useState<ProductType>()

    const [qtyToAdd, setQtyToAdd] = useState<number>(0)

    const sumUp = () => {
        const currentQty = productData?.stock === qtyToAdd ? qtyToAdd : qtyToAdd + 1
        setQtyToAdd(currentQty)
    }

    const restDown = () => {
        const currentQty = qtyToAdd > 0 ? qtyToAdd - 1 : 0
        setQtyToAdd(currentQty)
    }

    const getProduct = async () => {
        const product = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/products/${params.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        const response = await product.json()
        if (response.status === 'success') {
            setProductData(response.product)
        } else {
            alert('Producto no encontrado')
        }
    }

    useEffect(() => {
        getProduct()
    }, [params])

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            {
                productData &&
                <div>
                    <p>{productData.title}</p>
                    <div>
                        {
                            productData.thumbnails.map((thumbnail) => (
                                <img src={thumbnail} width="200px" />
                            ))
                        }
                    </div>
                    <div>
                        {productData.description}
                    </div>
                    <div>
                        {productData.stock}
                    </div>
                    <div>
                        <Button onClick={restDown}>
                            -
                        </Button>
                        {qtyToAdd}
                        <Button onClick={sumUp}>
                            +
                        </Button>
                    </div>
                    <div>
                        {productData.price}
                    </div>
                    <div>
                        <Button>
                            Agregar al carro
                        </Button>
                    </div>
                </div>
            }
        </Box>
    )
}

export default ProductPage