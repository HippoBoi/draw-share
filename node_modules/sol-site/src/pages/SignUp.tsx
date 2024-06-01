import { Box, Button, FormControl, FormLabel, Heading, 
    Input, VStack, Image, Center, Text,
    useToast} from '@chakra-ui/react'
import React, { FormEvent, useState } from 'react';
import apiClient from '../services/api-client';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [pfp, setPfp] = useState<File | null>(null);
    const [pfpPreview, setPfpPreview] = useState("");
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    const pfpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const picture = event.target.files?.[0]
        if (picture) {
            setPfp(picture);
            setPfpPreview(URL.createObjectURL(picture));
        }
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        if (pfp) {
            formData.append("picture", pfp);
        }

        apiClient.post("/users/register/", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(() => {
                toast({
                    title: "Felicidades, " + username + "!",
                    description: "Tu cuenta fue creada exitosamente.",
                    status: "success",
                    duration: 5000,
                    isClosable: true
                })
            })
            .catch(err => {
                toast({
                    title: "Error",
                    description: err.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true
                })
                console.log(err.message);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <Box w="100%" maxW="400px" mx="auto" mt="50px">
        <VStack spacing={4} p={4} boxShadow="lg" borderRadius="md">
            <Heading as="h1" size="lg" mb={6}>
                Registro
            </Heading>
            <form onSubmit={handleSubmit}>
                <FormControl id="username" isRequired>
                    <FormLabel>Nombre de Usuario</FormLabel>
                    <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormControl>
                <FormControl id="email" isRequired mt={4}>
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
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button onClick={() => { setShowPassword(!showPassword) }} boxShadow='lg'>
                        { showPassword ? "Ocultar" : "Mostrar"}
                    </Button>
                </FormControl>
                <FormControl id="profile_picture" mt={4}>
                    <FormLabel>Foto de Perfil</FormLabel>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={pfpChange}
                    />
                    {pfpPreview && (
                        <Center>
                        <Image src={pfpPreview} width={"220px"} height={"200px"} />
                        </Center>
                    )}
                </FormControl>
                <Button
                    type="submit"
                    colorScheme="pink"
                    width="full"
                    mt={4}
                    isLoading={isLoading}
                >
                    Registrar
                </Button>
            </form>
            <Text>¿Ya estás registrado?</Text>
            <Text 
                onClick={() => navigate("/login")}
                as={"button"}
                decoration={"underline"}
                _hover={{"color": "red.400", 
                    "fontSize": "17px",
                    "transition": "0.2s ease"}}>
                Inicia Sesión
            </Text>
        </VStack>
        </Box>
    );
}

export default SignUp
