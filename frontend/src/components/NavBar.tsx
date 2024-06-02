import { Box, Flex, HStack, Link, useColorMode, useColorModeValue, 
    IconButton, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData, User } from '../services/user-data';
import ProfileMenuButton from './ProfileMenuButton';

const NavBar = () => {
    const [user, setUser] = useState<User | null>(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const { colorMode, toggleColorMode } = useColorMode();
    const bgColor = useColorModeValue("red.200", "red.700");
    const gradientColor = useColorModeValue(
        "linear(to-r, #f1f1fd, #fdf1fd)", 
        "linear(to-r, #100913, #100913)"
    );

    useEffect(() => {
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
                <ProfileMenuButton
                    user={user} />
            </HStack>
            </Flex>
        </Flex>
        </Box>
    );
}

export default NavBar;