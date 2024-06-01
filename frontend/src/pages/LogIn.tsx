import { Box, Button, FormControl, FormLabel, Heading, Input, Text, VStack, useToast } from '@chakra-ui/react'
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api-client';

const LogInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);

        const userData = {
            email: email,
            password: password
        }

        apiClient.post("/users/token/", userData, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                const token = res.data.access;
                const user = res.data.user;
                localStorage.setItem("token", token);

                navigate(`/user/${user.username}`);

                toast({
                    title: "Bienvenid@, " + user.username,
                    description: "Has iniciado sesión exitosamente.",
                    status: "success",
                    duration: 4000,
                    isClosable: true
                })
            })
            .catch(err => {
                toast({
                    title: "Error",
                    description: err.message,
                    status: "error",
                    duration: 4000,
                    isClosable: true
                })
                console.log(err.message);
            })
            .finally(() => {
                setLoading(false);
            })
    };

    return (
        <Box w="100%" maxW="400px" mx="auto" mt="50px">
        <VStack spacing={4} p={4} boxShadow="lg" borderRadius="md">
            <Heading as="h1" size="lg" mb={6}>
            Iniciar Sesión
            </Heading>
            <form onSubmit={handleSubmit}>
            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="password" isRequired mt={4}>
                <FormLabel>Contraseña</FormLabel>
                <Input
                type={ showPassword ? "text" : "password" }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={() => { setShowPassword(!showPassword) }} boxShadow='lg'>
                    { showPassword ? "Ocultar" : "Mostrar"}
                </Button>
            </FormControl>
            <Button
                type="submit"
                colorScheme="pink"
                width="full"
                mt={4}
                isLoading={isLoading}
            >
                Iniciar Sesión
            </Button>
            </form>
            <Text>¿No tienes una cuenta?</Text>
            <Text 
                onClick={() => navigate("/register")}
                as={"button"}
                decoration={"underline"}
                _hover={{"color": "red.400", 
                    "fontSize": "17px",
                    "transition": "0.2s ease"}}>
                Registrate
            </Text>
        </VStack>
        </Box>
    );
}

export default LogInForm;
