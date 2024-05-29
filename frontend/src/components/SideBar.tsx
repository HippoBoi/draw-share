import { VStack, HStack, Box, useColorModeValue } from '@chakra-ui/react'
import LinkButton from './LinkButton'

const SideBar = () => {
    const bgColor = useColorModeValue("gray.100", "#100913")

    return (
        <Box bg={bgColor} p={4} borderRadius={"md"} boxShadow={"md"} width={"100%"} height={"100vh"}>
            <VStack marginLeft={1} marginTop={"60px"} spacing={5}>
                <HStack>
                    <LinkButton onClick={() => console.log("click")}>Tus dibujos</LinkButton>
                </HStack>
                <HStack>
                    <LinkButton>Seguidos</LinkButton>
                </HStack>
                <HStack>
                    <LinkButton>Guardados</LinkButton>
                </HStack>
            </VStack>
        </Box>
    );
}

export default SideBar
