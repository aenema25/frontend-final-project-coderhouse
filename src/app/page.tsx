'use client';
import Image from 'next/image'
import styles from './page.module.css'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {

  const { push } = useRouter();

  const logOut = () => {
    localStorage.removeItem('isLogin')
    localStorage.removeItem('user')
    push('/')
  }
  return (
    <Box>
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
              <Typography>
                Tienda
              </Typography>
            </Box>
            <Box>
              {
                localStorage.getItem('isLogin') &&
                <Button variant='text' color="inherit" onClick={logOut}>
                  Cerrar Sesion
                </Button>
              }
              {
                !localStorage.getItem('isLogin') &&
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
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
