
'use client';
import { FC, useState, useEffect } from 'react';
import { Box, TextField, Divider, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const CartPage: FC = () => {

    const user = localStorage.getItem('user')

    useEffect(() => {
        if (user) {
            console.log('usuario')
        } else {
            console.log('usuario no ')
        }
    }, [])
    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <Box>

                Productos en carro de compra


            </Box>
        </Box>
    )
}

export default CartPage