import { Box, Button, FormControl, FormLabel, Heading, 
    Input, VStack, Image, Center } from '@chakra-ui/react'
import React, { useState } from 'react';
import LinkButton from '../components/LinkButton';

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [pfp, setPfp] = useState<File | null>(null);
    const [pfpPreview, setPfpPreview] = useState("");
    const [isLoading, setLoading] = useState(false);

    const pfpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const picture = event.target.files?.[0]
        if (picture) {
            setPfp(picture);
            setPfpPreview(URL.createObjectURL(picture));
        }
    }

    return (
        <Box w="100%" maxW="400px" mx="auto" mt="50px">
        <VStack spacing={4} p={4} boxShadow="lg" borderRadius="md">
            <Heading as="h1" size="lg" mb={6}>
                Registro
            </Heading>
            <form onSubmit={(event) => {event.preventDefault; console.log("submit");}}>
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
                    <LinkButton onClick={() => { setShowPassword(!showPassword) }} boxShadow='lg'>
                        { showPassword ? "Ocultar" : "Mostrar"}
                    </LinkButton>
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
        </VStack>
        </Box>
    );
}

export default SignUp
