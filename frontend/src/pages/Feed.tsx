import { Box, Button, Center, HStack, Text, VStack, useBreakpointValue } from '@chakra-ui/react'
import PostsList from '../components/PostsList'
import LinkButton from '../components/LinkButton';
import SideBar from '../components/SideBar';

const Feed = () => {
    const smallScreen = useBreakpointValue({ base: true, lg: false });

    return (
    <>
    <VStack marginTop={"50px"} marginBottom={"100px"}>
        <Text as={"i"}>Dibujos</Text>
        <PostsList></PostsList>
    </VStack>

    {!smallScreen && (
        <Box position={"relative"}>
            <Box position={"fixed"} left={"0%"} top={"50%"} transform="translateY(-50%)">
                <SideBar />
            </Box>
        </Box>
    )}

    <Center marginBottom={"50px"}>
        <HStack>
            <Text>Parece que eso es todo por ahora. Vuelve más tarde o</Text>
            <Text 
                as={"button"} 
                decoration={"underline"}
                _hover={{"color": "red.400", 
                    "fontSize": "17px",
                    "transition": "0.2s ease"}}>
                    Publica un dibujo
            </Text>
        </HStack>
    </Center>
    </>
    )
}

export default Feed
