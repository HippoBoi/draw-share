import { Box, Flex, HStack, Link, useColorMode, useColorModeValue, 
    IconButton, Text, 
    Spinner,
    Center,
    useBreakpointValue} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileMenuButton from './ProfileMenuButton';
import UserContext from '../services/userContext';
import { getUserData } from '../services/user-data';
import SearchInput from './SearchInput';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import SwitchTheme from './SwitchTheme';

const NavBar = () => {
    const { user, dispatch } = useContext(UserContext);
    const navigate = useNavigate();
    const { colorMode, toggleColorMode } = useColorMode();
    const bgColor = useColorModeValue("red.200", "red.700");
    const gradientColor = useColorModeValue(
        "linear(to-r, #f1f1fd, #fdf1fd)", 
        "linear(to-r, #100913, #100913)"
    );
    const token = localStorage.getItem("token");
    const smallScreen = useBreakpointValue({ base: true, lg: false });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) {
            setLoading(true);

            getUserData(token)
                .then(res => {
                    const user = res.data;
                    dispatch({ type: "CHANGE", user: user });
                })
                .catch(err => {
                    console.log(err.message);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }, [token])

    return (
        <Box px={4} bgGradient={gradientColor} position={"fixed"} width={"100%"} top={"0%"} zIndex={1000}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <HStack spacing={8} alignItems={'center'}>

            <Box as={"button"} fontWeight="bold" fontSize="xl" onClick={() => navigate("/")}>
                Draw Sharing
            </Box>

            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                <Link as={"button"} onClick={() => navigate("/guidelines")} px={2} py={1} rounded={'md'} 
                    _hover={{ bg: bgColor }}>
                    Acerca de
                </Link>

                <Link as={"button"} onClick={() => navigate("/contact")} px={2} py={1} rounded={'md'} 
                    _hover={{ bg: bgColor }}>
                    Contacto
                </Link>
            </HStack>

            <Flex alignItems={'center'} marginLeft={ smallScreen ? "0px" : "165px"}>
                <SearchInput />
            </Flex>

            </HStack>

            <Flex alignItems={'center'}>
            <SwitchTheme colorMode={colorMode} toggleColorMode={toggleColorMode} />

            <HStack spacing={"-5px"}>
                {!loading ? (
                    <ProfileMenuButton
                    user={user} />
                ) : (
                    <Spinner />
                )}
            </HStack>
            </Flex>
        </Flex>
        </Box>
    );
}

export default NavBar;