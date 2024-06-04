import { Box, Card, Text, Image, Button, HStack, CardBody, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Post } from '../../services/post-data'
import { User, getUserDataById } from '../../services/user-data';

interface Props {
    post: Post;
    username: string;
}

const PostCard = ({ post, username }: Props) => {
    const smallScreen = useBreakpointValue({ base: true, lg: false });
    const bgColor = useColorModeValue(
        "linear(to-r, #fff4f6, #f4dadf)", 
        "linear(to-r, #170c1c, #140d0d)"
    );

    return (
        <Card padding={2} boxSize={smallScreen ? "200px" : "300px"} bgGradient={bgColor} boxShadow={"md"}>
            <Text fontSize={"20px"} fontWeight={"bold"}>{post.title}</Text>
            <HStack>
                <Text as={"i"}>Por:</Text>
                <Button variant={"link"}>{username}</Button>
            </HStack>
            <CardBody>
                <Box
                    width={"50%"}
                    as="button"
                    onClick={() => console.log(post.title, username)}
                    _hover={{ opacity: 0.8 }}>
                    <Image src={post.image} />
                </Box>
            </CardBody>
        </Card>
    )
}

export default PostCard
