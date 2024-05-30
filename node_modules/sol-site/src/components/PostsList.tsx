import { Image, List, ListItem, VStack, Text, Button, Box } from '@chakra-ui/react';
import React from 'react'

interface Post {
    id: number;
    title: string;
    user: string;
    imageURL: string;
}

const PostsList = () => {
    const posts: Post[] = [
    {
        id: 1,
        title: "primer post", 
        user: "papu",
        imageURL: "https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/nunu_2.jpg"
    },
    {
        id: 2,
        title: "segundo post que",
        user: "papu2",
        imageURL: "https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/Nunu_0.jpg"
    },
    {
        id: 3,
        title: "post numero 3",
        user: "papu3",
        imageURL: "https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/Shen_3.jpg"
    }
    ];

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
