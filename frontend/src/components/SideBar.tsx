import { VStack, Box, useColorModeValue, IconButton, Drawer, DrawerContent, DrawerCloseButton, DrawerBody, useBreakpointValue, DrawerHeader } from '@chakra-ui/react'
import { useState } from 'react';
import SideBarContent from './SideBarContent';

const SideBar = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const smallScreen = useBreakpointValue({ base: true, lg: false });
    const bgColor = useColorModeValue("gray.100", "#100913");

    if (smallScreen) {
        return (
            <>
            <IconButton
                    aria-label="Open sidebar"
                    position="fixed"
                    top={"10%"}
                    left={1}
                    onClick={() => setDrawerOpen(!isDrawerOpen)}
                    zIndex={1100}
                />
                <Drawer isOpen={isDrawerOpen} placement="left" onClose={() => setDrawerOpen(!isDrawerOpen)}>
                    <DrawerContent bgColor={bgColor} maxWidth={"200px"}>
                        <DrawerCloseButton />
                        <DrawerHeader>Buscar</DrawerHeader>
                        <DrawerBody marginTop={"20px"}>
                            <VStack spacing={"10px"}>
                            <SideBarContent />
                            </VStack>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </>
        );

    }
    return ( 
        <Box bg={bgColor} p={4} borderRadius={"md"} boxShadow={"md"} width={"100%"} height={"100vh"}>
            <VStack marginLeft={1} marginTop={"60px"} spacing={5}>
                <SideBarContent />
            </VStack>
        </Box>
    );
}

export default SideBar
