import { Box, Center, Image, Text } from '@chakra-ui/react'
import { User, getUserDataByName } from '../services/user-data';
import blankPfp from "../assets/blank-pfp.webp"
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post, getPostsByUsername } from '../services/post-data';

const Profile = () => {
    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [userLoading, setUserLoading] = useState(false);
    const [postsLoading, setPostsLoading] = useState(false);
    const { username } = useParams();

    useEffect(() => {
        if (username) {
            getUserDataByName(username)
                .then(res => {
                    setUser(res.data);
                });

            getPostsByUsername(username)
                .then(res => {
                    setPosts(res.data);
                });
        }
    }, [username])

    return (
        <Box position={"relative"}>
            <Box position={"absolute"} left={"1%"} marginTop={2}>
                <Image 
                    src={ user ? user.picture ? user.picture : blankPfp : blankPfp } 
                    boxSize={"300px"}
                    rounded={"md"}
                    boxShadow={"md"} />
                <Center>
                    <Text 
                        as={"i"} 
                        fontWeight={"bold"} 
                        fontSize={"30px"}>
                        {user?.username}
                    </Text>
                </Center>
            </Box>
        </Box>
    )
}

export default Profile
