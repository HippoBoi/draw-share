import { Card, Text, Image, Button, HStack, CardBody, useColorModeValue, Center } from '@chakra-ui/react'
import { Post } from '../../services/post-data'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    post: Post;
    username: string;
}

const PostCard = ({ post, username }: Props) => {
    const bgColor = useColorModeValue(
        "linear(to-r, #fff4f6, #f4dadf)", 
        "linear(to-r, #170c1c, #140d0d)"
    );
    const imageColor = useColorModeValue("#f4dadf", "#170c1c");
    const navigate = useNavigate();

    return (
        <Card 
            padding={2} boxSize={"300px"} bgGradient={bgColor} boxShadow={"md"}>
            <Text fontSize={"20px"} fontWeight={"bold"}>{post.title}</Text>
            <HStack>
                <Text as={"i"}>Por:</Text>
                <Button variant={"link"}>{username}</Button>
            </HStack>
            <CardBody>
                <Center>
                    <Image 
                        src={post.image} boxSize={"200px"}
                        bgColor={imageColor}
                        bgClip={"inherit"}
                        _hover={{ 
                                "boxSize": "220px", 
                                "transition": "ease-out 0.1s", 
                                "filter": "sepia(30%)",
                                "cursor": "pointer" }}
                        onClick={() => navigate(`/posts/${post.user_details.id}/${post.id}`)} />
                </Center>
            </CardBody>
        </Card>
    )
}

export default PostCard
