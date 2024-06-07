import { Box, Card, Center, HStack, Image, Skeleton, Spinner, Text, VStack, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import { User, getUserDataByName } from '../services/user-data';
import blankPfp from "../assets/blank-pfp.webp"
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post, getPostsByUsername } from '../services/post-data';
import PostsList from '../components/Posts/PostsList';
import UserStats from '../components/UserStats';
import ProfileSkeleton from '../components/ProfileSkeleton';

const Profile = () => {
    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setLoading] = useState(false);
    const smallScreen = useBreakpointValue({ base: true, lg: false });
    const { username } = useParams();

    useEffect(() => {
        if (username) {
            setLoading(true);

            getUserDataByName(username)
                .then(res => {
                    setUser(res.data);
                })
                .catch(err => {
                    console.log(err.error);
                });

            getPostsByUsername(username)
                .then(res => {
                    setPosts(res.data);
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err.error);
                })
                .finally(() => setLoading(false));
                
            
        }
    }, [username])

    if (isLoading) {
        return (
            <Box marginTop={"15px"}>
                <ProfileSkeleton />
            </Box>
        );
    }

    return (
        <>
        <Box marginTop={"15px"}>
            <HStack marginLeft={ smallScreen ? "0%" : "2%"}>
                <VStack> 
                    <Image 
                        src={ user ? user.picture ? user.picture : blankPfp : blankPfp } 
                        boxSize={ smallScreen ? "220px" : "300px" }
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
                </VStack>

                <UserStats user={user} postsLength={posts.length} />
            </HStack>
        </Box>

        <Box marginLeft={ smallScreen ? 0 : "60%"} marginTop={ smallScreen ? "40px" : "-27%" }>
            <VStack>
                {posts.length > 0 ? (
                    <>
                    <Text>Dibujos de {user?.username}</Text>
                    <PostsList posts={posts} isLoading={isLoading} />
                    </>
                ) : (
                    <Box width={ smallScreen ? "250px" : "350px"}>
                    <Text as={"b"}>{user?.username} no ha subido ningún dibujo.</Text>
                    </Box>
                )}
            </VStack>
        </Box>
        </>
    )
}

export default Profile
