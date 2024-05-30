import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { Box, useColorModeValue } from '@chakra-ui/react';

const Layout = () => {
    const gradientColor = useColorModeValue(
        "linear(to-r, #d4dadf, #f4dadf)", 
        "linear(to-r, #2a2427, #1f191c)"
    )

    return (
        <Box
            bgGradient={gradientColor}
            minH="100vh"
            py={4}
            paddingTop={16}>
                <NavBar />
                <Outlet />
        </Box>
    )
}

export default Layout;
