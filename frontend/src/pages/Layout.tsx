import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { Box, useColorModeValue } from '@chakra-ui/react';
import { useReducer } from 'react';
import userReducer from './userReducer';
import UserContext from '../services/userContext';

const Layout = () => {
    const gradientColor = useColorModeValue(
        "linear(to-r, #d4dadf, #f4dadf)", 
        "linear(to-r, #2a2427, #1f191c)"
    )
    const [user, dispatch] = useReducer(userReducer, null);

    return (
        <Box
            bgGradient={gradientColor}
            minH="100vh"
            py={4}
            paddingTop={16}>
            <UserContext.Provider value={{ user, dispatch }}>
                <NavBar />
                <Outlet />
            </UserContext.Provider>
        </Box>
    )
}

export default Layout;
