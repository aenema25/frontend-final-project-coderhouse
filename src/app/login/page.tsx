
'use client';
import { FC, useState, useEffect } from 'react';
import { Box, TextField, Divider, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const LoginPage: FC = () => {

    const { push } = useRouter();

    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [isLogin, setIsLogin] = useState<boolean>(false)

    const login = async (loginType: 'login' | 'github') => {
        if (email && password || loginType === 'github') {
            const payload = {
                email: email,
                password: password
            }
            const postLogin = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/user/${loginType}`, {
                method: loginType === 'login' ? 'POST' : 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                ...(loginType === 'login' && { body: JSON.stringify(payload) })

            })
            const res = await postLogin.json()
            if (res.user) {
                setIsLogin(true)
                localStorage.setItem('user', JSON.stringify(res.user.userData))
                localStorage.setItem('isLogin', JSON.stringify(true))
            } else {
                setIsLogin(false)
                localStorage.removeItem('isLogin')
                alert("Usuario y/o contraseña incorrecta, intenta nuevamente")
            }
        } else {
            alert("El campo correo y/o contraseña esta(n) vacio(s)")
        }
    }

    useEffect(() => {
        if (isLogin || localStorage.getItem('isLogin')) push('/')
    }, [isLogin])
    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: 2,
                    boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.05)',
                    backgroundColor: 'white',
                    color: 'black',
                    p: 5
                }}>
                <Typography variant='h4' fontWeight={600} pb={3}>
                    Inicio de Sesion
                </Typography>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: 2,
                    width: '100%'
                }}>
                    <TextField
                        label="Correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant='outlined'
                        type='text'
                        size='small'
                        fullWidth
                    />
                    <TextField
                        label="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant='outlined'
                        type='password'
                        size='small'
                        fullWidth
                    />
                </Box>
                <Box
                    sx={{
                        pt: 2,
                        display: 'flex',
                        gap: 2,
                        width: '100%'
                    }}>
                    <Button
                        onClick={() => login('login')}
                        variant='contained'
                        fullWidth
                        size='small'
                    >
                        Entrar
                    </Button>
                    <Button
                        variant='contained'
                        fullWidth
                        size='small'
                    >
                        Registrarse
                    </Button>
                </Box>
                <Divider />
                <Box>
                    <Button
                        onClick={() => login('github')}
                    >
                        Entrar con GitHub
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default LoginPage