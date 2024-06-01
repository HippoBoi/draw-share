import { Box, Flex, HStack, Link, Button, useColorMode, useColorModeValue, IconButton, Text, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import blankPfp from "../assets/blank-pfp.webp"
import { useNavigate } from 'react-router-dom';
import { getUserData, User } from '../services/user-data';

const NavBar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const bgColor = useColorModeValue("red.200", "red.700");
    const gradientColor = useColorModeValue(
        "linear(to-r, #f1f1fd, #fdf1fd)", 
        "linear(to-r, #100913, #100913)"
    );
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getUserData(token)
                .then((res) => {
                    setUser(res.data);
                })
                .catch(err => {
                    console.error('Error:', err);
                });
        }
    }, [])

    return (
        <Box px={4} bgGradient={gradientColor} position={"fixed"} width={"100%"} top={"0%"} zIndex={1000}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <HStack spacing={8} alignItems={'center'}>

            <Box as={"button"} fontWeight="bold" fontSize="xl" onClick={() => navigate("/")}>
                Draw Sharing
            </Box>

            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                <Link as={"button"} onClick={() => navigate("/")} px={2} py={1} rounded={'md'} 
                    _hover={{ bg: bgColor }}>
                    Reglas
                </Link>

                <Link as={"button"} onClick={() => navigate("/")} px={2} py={1} rounded={'md'} 
                    _hover={{ bg: bgColor }}>
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

            <HStack spacing={"-5px"}>
                {user ? (
                    <Button 
                        as={"button"} 
                        onClick={() => navigate(`/user/${user.username}`)} 
                        variant={"link"}
                        rounded={'md'}
                        color={useColorModeValue("gray.700", "gray.200")}
                        paddingX={2} 
                        paddingY={1}
                        _hover={{ bg: bgColor }}>
                        <Image 
                        src={ user.picture ? user.picture : blankPfp } 
                        width={"35px"} 
                        height={"35px"} 
                        rounded={20}  />
                        {user.username}
                    </Button>
                ) : (
                    <Button 
                        as={"button"} 
                        onClick={() => navigate("/login")} 
                        variant={"link"}
                        rounded={'md'}
                        color={useColorModeValue("gray.700", "gray.200")}
                        paddingX={2} 
                        paddingY={1}
                        _hover={{ bg: bgColor }}>
                        <Image 
                        src={ blankPfp } 
                        width={"35px"} 
                        height={"35px"} 
                        rounded={20} />
                        Iniciar Sesión
                    </Button>
                )}
            </HStack>
            </Flex>
        </Flex>
        </Box>
    );
}

export default NavBar;