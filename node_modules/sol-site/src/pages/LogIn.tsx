import { Box, Button, FormControl, FormLabel, Heading, Input, Text, VStack, useToast } from '@chakra-ui/react'
import { useState } from 'react';

const LogInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
        setIsLoading(false);
        toast({
            title: 'Inicio de sesión exitoso',
            description: 'Has iniciado sesión correctamente',
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
        }, 2000);
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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
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
                as={"button"}
                decoration={"underline"}
                _hover={{"color": "red.400", 
                    "fontSize": "17px",
                    "transition": "0.2s ease"}}>
                Registrate</Text>
        </VStack>
        </Box>
    );
}

export default LogInForm;
