import { Box, Button, Center, Image, Spinner, Text, VStack, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom'
import SideBar from '../components/SideBar';
import { useEffect, useState } from 'react';
import { Post, getPostById } from '../services/post-data';
import { User } from '../services/user-data';

const PostPage = () => {
    const { userId, postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const smallScreen = useBreakpointValue({ base: true, lg: false });
    const gradientColor = useColorModeValue(
        "linear(to-r, #fff4f6, #f4dadf)", 
        "linear(to-r, #170c1c, #140d0d)"
    );

    useEffect(() => {
        if (postId) {
            getPostById(parseInt(postId))
                .then(res => {
                    const user = res.data.user_details;
                    setPost(res.data);
                    setUser(user);
                })
                .catch(err => {
                    console.log(err.message);
                })
        }
    }, [])

    if (!post || !user) {
        return (
            <Center>
                <Spinner marginTop={"60px"} />
            </Center>
        )
    }

    if (smallScreen) {
        return (
            <VStack marginTop={"40px"}>
                <Text fontWeight={"bold"} fontSize={"40px"}>{post.title}</Text>
                <Button 
                    as={"i"} fontSize={"20px"} opacity={"80%"} onClick={() => navigate(`/user/${user.username}`)}
                    variant={"link"} textDecor={"underline"}>
                    {"Por: " + user.username}
                </Button>
                <Box boxSize={"350px"} bgGradient={gradientColor} bgBlendMode={"difference"}>
                    <Image src={post.image} boxSize={"100%"} />
                </Box>

                <Box minHeight={"150px"} minWidth={"200px"} maxWidth={"300px"} padding={"10px"} bgGradient={gradientColor}>
                    <VStack>
                        <Text textDecoration={"underline"}>Descripción</Text>
                        <Text marginTop={"20px"}>{post.description && post.description}</Text>
                    </VStack>
                </Box>

                <Box position={"relative"}>
                    <Box position={"fixed"} left={"0%"} top={"50%"} transform="translateY(-50%)">
                        <SideBar />
                    </Box>
                </Box>
            </VStack>
        )
    }

    return (
        <Center>
        <Box>
            <VStack marginTop={"40px"}>
                <Text fontWeight={"bold"} fontSize={"40px"}>{post.title}</Text>
                <Button 
                    as={"i"} fontSize={"20px"} opacity={"80%"} onClick={() => navigate(`/user/${user.username}`)}
                    variant={"link"} textDecor={"underline"} _hover={{ "cursor": "pointer", "opacity": "100%" }}>
                    {"Por: " + user.username}
                </Button>
                <Box boxSize={"350px"} bgGradient={gradientColor} bgBlendMode={"difference"}>
                    <Image src={post.image} boxSize={"100%"} />
                </Box>
            </VStack>
        </Box>

        <Box marginLeft={"200px"} bgGradient={gradientColor}>
            <Text textDecoration={"underline"}>Descripción</Text>
            <Text marginTop={"20px"}>{post.description && post.description}</Text>
        </Box>

        <Box position={"relative"}>
            <Box position={"fixed"} left={"0%"} top={"50%"} transform="translateY(-50%)">
                <SideBar />
            </Box>
        </Box>
        </Center>
    );
}

export default PostPage
