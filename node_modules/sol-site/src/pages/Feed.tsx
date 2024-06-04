import { Box, Center, HStack, Text, VStack } from '@chakra-ui/react'
import PostsList from '../components/Posts/PostsList'
import SideBar from '../components/SideBar';
import { useNavigate } from 'react-router-dom';

const Feed = () => {
    const navigate = useNavigate();

    return (
        <>
        <VStack marginTop={"50px"} marginBottom={"100px"}>

            <Text as={"i"}>Dibujos</Text>
            <PostsList></PostsList>
        </VStack>

        <Box position={"relative"}>
            <Box position={"fixed"} left={"0%"} top={"50%"} transform="translateY(-50%)">
                <SideBar />
            </Box>
        </Box>

        <Center marginBottom={"50px"}>
            <HStack>
                <Text>Parece que eso es todo por ahora. Vuelve más tarde o</Text>
                <Text
                    onClick={() => navigate("/post")}
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
    );
}

export default Feed
