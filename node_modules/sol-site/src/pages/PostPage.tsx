import { Box, Center, HStack, Image, Spinner, Text, VStack, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import { useParams } from 'react-router-dom'
import SideBar from '../components/SideBar';
import { useEffect, useState } from 'react';
import { Post, getPostById } from '../services/post-data';
import { User } from '../services/user-data';

const PostPage = () => {
    const { userId, postId } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const smallScreen = useBreakpointValue({ base: true, lg: false });
    const gradientColor = useColorModeValue(
        "linear(to-r, #f1f1fd, #fdf1fd)", 
        "linear(to-r, #100913, #100913)"
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

    return (
        <Center>
        <Box>
            <VStack marginTop={"40px"}>
                <Text fontWeight={"bold"} fontSize={"40px"}>{post.title}</Text>
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
