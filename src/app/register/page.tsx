
'use client';
import { FC, useState, useEffect } from 'react';
import { Box, TextField, Divider, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const LoginPage: FC = () => {

    const { push } = useRouter();

    const [registerData, setRegisterData] = useState<{
        first_name: string,
        last_name: string,
        email: string,
        age: string,
        password: string
    }>({
        first_name: '',
        last_name: '',
        email: '',
        age: '',
        password: ''
    })

    const register = async () => {
        if (registerData.first_name && registerData.last_name && registerData.email && registerData.password) {
            const registerUser = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/user/signup`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(registerData)
            })
            const response = await registerUser.json()
            alert(response.message)
            if (response.succes) setTimeout(() => push('/login'), 3000)
        } else {
            alert("Uno o mas campos estan vacios, intente nuevamente")
        }
    }

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
                    Registro nuevo usuario
                </Typography>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: 2,
                    width: '100%'
                }}>
                    <TextField
                        label="Nombre"
                        value={registerData.first_name}
                        onChange={(e) => setRegisterData({ ...registerData, first_name: e.target.value })}
                        variant='outlined'
                        type='text'
                        size='small'
                        fullWidth
                    />
                    <TextField
                        label="Apellido"
                        value={registerData.last_name}
                        onChange={(e) => setRegisterData({ ...registerData, last_name: e.target.value })}
                        variant='outlined'
                        type='text'
                        size='small'
                        fullWidth
                    />
                    <TextField
                        label="Correo"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        variant='outlined'
                        type='text'
                        size='small'
                        fullWidth
                    />
                    <TextField
                        label="Edad"
                        value={registerData.age}
                        onChange={(e) => setRegisterData({ ...registerData, age: e.target.value })}
                        variant='outlined'
                        type='text'
                        size='small'
                        fullWidth
                    />
                    <TextField
                        label="Contraseña"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
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
                        onClick={register}
                        variant='contained'
                        fullWidth
                        size='small'
                        disabled={!registerData.first_name || !registerData.last_name || !registerData.email || !registerData.password}
                    >
                        Registrarse
                    </Button>
                    <Button
                        variant='contained'
                        fullWidth
                        size='small'
                        onClick={()=>push('/')}
                    >
                        Volver
                    </Button>
                </Box>
                <Divider />

            </Box>
        </Box>
    )
}

export default LoginPage