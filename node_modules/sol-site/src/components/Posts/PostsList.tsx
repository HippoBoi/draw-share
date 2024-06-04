import { Image, List, ListItem, VStack, Text, Box } from '@chakra-ui/react';
import { Post, getAllPosts } from '../../services/post-data';
import { useEffect, useState } from 'react';
import PostCard from './PostCard';

const PostsList = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        getAllPosts()
            .then(res => {
                setPosts(res.data)
            })
            .catch(err => {
                console.log(err.message);
            })
    }, [])

    return (
        <List>
            <VStack spacing={"35px"}>
            {posts.map((post) => (
                <ListItem key={post.id}>
                    <VStack spacing={"-5px"}>
                        <PostCard post={post} userId={parseInt(post.user)} />
                    </VStack>
                </ListItem>
                ))}
            </VStack>
        </List>
    );
}

export default PostsList
