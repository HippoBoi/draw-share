import { Image, List, ListItem, VStack, Text, Box, Skeleton } from '@chakra-ui/react';
import { Post, getAllPosts } from '../../services/post-data';
import { useEffect, useState } from 'react';
import PostCard from './PostCard';
import PostCardSkeleton from './PostCardSkeleton';

const PostsList = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setLoading] = useState(false);
    const skeletons = [1, 2, 3, 4];

    useEffect(() => {
        setLoading(true);
        getAllPosts()
            .then(res => {
                setPosts(res.data)
            })
            .catch(err => {
                console.log(err.message);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])

    if (isLoading)
        return (
            <List>
                <VStack>
                {skeletons.map((id) => (
                    <ListItem key={id}>
                        <PostCardSkeleton />
                    </ListItem>
                ))}
                </VStack>
            </List>
        )

    return (
        <List>
            <VStack spacing={"35px"}>
            {posts.map((post) => (
                <ListItem key={post.id}>
                    <VStack spacing={"-5px"}>
                        <PostCard post={post} username={post.user_details.username}/>
                    </VStack>
                </ListItem>
                ))}
            </VStack>
        </List>
    );
}

export default PostsList
