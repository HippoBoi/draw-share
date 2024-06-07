import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { Box, useColorModeValue } from '@chakra-ui/react';
import { useReducer } from 'react';
import userReducer from './userReducer';
import UserContext from '../services/userContext';
import searchReducer from '../services/searchReducer';
import SearchContext from '../services/searchContext';

const Layout = () => {
    const gradientColor = useColorModeValue(
        "linear(to-r, #d4dadf, #f4dadf)", 
        "linear(to-r, #2a2427, #1f191c)"
    )
    const [user, dispatch] = useReducer(userReducer, null);
    const [search, searchDispatch] = useReducer(searchReducer, "");

    return (
        <Box
            bgGradient={gradientColor}
            minH="100vh"
            py={4}
            paddingTop={16}>
            <SearchContext.Provider value={{ search, dispatch: searchDispatch }}>
            <UserContext.Provider value={{ user, dispatch }}>
                <NavBar />
                <Outlet />
            </UserContext.Provider>
            </SearchContext.Provider>
        </Box>
    )
}

export default Layout;
