import { HStack, VStack, Skeleton, Center, Spinner, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'

const ProfileSkeleton = () => {
    const smallScreen = useBreakpointValue({ base: true, lg: false });
    const startColor = useColorModeValue("#c9b3b3", "#1c0e21");
    const endColor = useColorModeValue("#e6e6e6", "#0d0312");
    
    return (
        <HStack marginLeft={ smallScreen ? "0%" : "2%"}>
            <VStack> 
                <Skeleton 
                        boxSize={ smallScreen ? "220px" : "300px" }
                        rounded={"md"}
                        boxShadow={"md"}
                        startColor={startColor} endColor={endColor} />
                    <Center marginTop={"20px"}>
                        <Spinner />
                </Center>
            </VStack>
        </HStack>
    )
}

export default ProfileSkeleton
