'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tienda virtual',
  description: 'Tienda virtual',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const { push } = useRouter();
  const logOut = () => {
    localStorage.removeItem('isLogin')
    localStorage.removeItem('user')
    push('/')
    setIsLogin(false)
  }

  useEffect(() => {
    setIsLogin(localStorage.getItem('isLogin') ? true : false)
  }, [])
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <AppBar position='static'>
            <Toolbar>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%'
                }}>
                <Box>
                  Logo
                </Box>
                <Box>
                  <Link href={"/"}>
                    <Typography>
                      Tienda
                    </Typography>
                  </Link>
                </Box>
                <Box>
                  {
                    isLogin &&
                    <Button variant='text' color="inherit" onClick={logOut}>
                      Cerrar Sesion
                    </Button>
                  }
                  {
                    !isLogin &&
                    <Link href={"/login"}>
                      <Button variant='text' color="inherit">
                        Inicio de Sesion
                      </Button>
                    </Link>
                  }
                  <Link href={"/register"}>
                    <Button variant='text' color="inherit">
                      Registro
                    </Button>
                  </Link>
                  <Link href={"/cart"}>
                    <Button variant='text' color="inherit">
                      Carro de compra
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
          {children}
        </div>
      </body>
    </html>
  )
}
