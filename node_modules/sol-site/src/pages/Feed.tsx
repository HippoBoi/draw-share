import { Box, Center, HStack, Text, VStack, useBreakpointValue } from '@chakra-ui/react'
import PostsList from '../components/Posts/PostsList'
import SideBar from '../components/SideBar';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../components/SearchInput';
import { useContext, useEffect, useState } from 'react';
import { Post, getAllPosts, getPostByQuery } from '../services/post-data';
import SearchContext from '../services/searchContext';
import { useDebounce } from 'use-debounce';

const DEBOUNCE_TIME = 400;

const Feed = () => {
    const navigate = useNavigate();
    const smallScreen = useBreakpointValue({ base: true, lg: false });
    const { search } = useContext(SearchContext);
    const [debouncedSearch] = useDebounce(search, DEBOUNCE_TIME);
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getPostByQuery(debouncedSearch)
            .then(res => {
                setPosts(res.data);
            })
            .catch(err => {
                console.log(err.message);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [debouncedSearch])

    return (
        <>
        <VStack marginTop={"50px"} marginBottom={"100px"}>
            <Text as={"i"}>Dibujos</Text>
            <PostsList posts={posts} isLoading={isLoading}></PostsList>
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
