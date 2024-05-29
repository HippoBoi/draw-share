import { Box, Flex, HStack, Link, Button, useColorMode, useColorModeValue, IconButton, Text, Image } from '@chakra-ui/react';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const bgColor = useColorModeValue("red.200", "red.700")
    const gradientColor = useColorModeValue(
        "linear(to-r, #f1f1fd, #fdf1fd)", 
        "linear(to-r, #100913, #100913)"
    )
    const [pfpURL, setPfpURL] = useState("");
    const navigate = useNavigate();

    return (
        <Box px={4} bgGradient={gradientColor} position={"fixed"} width={"100%"} top={"0%"} zIndex={1000}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <HStack spacing={8} alignItems={'center'}>

            <Box as={"button"} fontWeight="bold" fontSize="xl" onClick={() => navigate("/")}>
                Draw Sharing
            </Box>

            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                <Link as={"button"} onClick={() => navigate("/")} px={2} py={1} rounded={'md'} 
                    _hover={{ textDecoration: 'none', bg: bgColor }}>
                    Reglas
                </Link>

                <Link as={"button"} onClick={() => navigate("/")} px={2} py={1} rounded={'md'} 
                    _hover={{ textDecoration: 'none', bg: bgColor }}>
                    Contacto
                </Link>
            </HStack>

            </HStack>

            <Flex alignItems={'center'}>
            <IconButton
                size="md"
                padding={"20px"}
                icon={colorMode === 'light' ? <Text>Dark Mode</Text> : <Text>Light Mode</Text>}
                aria-label="Toggle Color Mode"
                onClick={toggleColorMode}
                mr={4}
            />

            <HStack>
                <Image src={pfpURL} />
                <Button 
                    as={"button"} 
                    onClick={() => navigate("/login")} 
                    variant={"link"}
                    rounded={'md'}
                    color={useColorModeValue("gray.700", "gray.200")}
                    px={2} 
                    py={1}
                    mr={4}
                    _hover={{ textDecoration: 'none', bg: bgColor }}>
                    Iniciar Sesión
                </Button>
            </HStack>
            </Flex>
        </Flex>
        </Box>
    );
}

export default NavBar;