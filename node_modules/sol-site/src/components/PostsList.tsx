import { Image, List, ListItem, VStack, Text, Box } from '@chakra-ui/react';
import { Post, getAllPosts } from '../services/post-data';
import { useEffect, useState } from 'react';

const PostsList = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    return (
        <List>
            <VStack spacing={"35px"}>
            {posts.map((post) => (
                <ListItem key={post.id}>
                    <VStack spacing={"-5px"}>
                        <Text fontSize={"20px"} fontWeight={"bold"}>{post.title}</Text>
                        <Text as={"i"}>Por: {post.user}</Text>
                        <Box
                            width={"50%"}
                            as="button"
                            onClick={() => console.log(post.title, post.user)}
                            _hover={{ opacity: 0.8 }}>
                            <Image src={post.imageURL} />
                        </Box>
                    </VStack>
                </ListItem>
                ))}
            </VStack>
        </List>
    );
}

export default PostsList
