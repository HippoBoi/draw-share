import { Card, useBreakpointValue, Skeleton, useColorModeValue } from '@chakra-ui/react'

const PostCardSkeleton = () => {
    const smallScreen = useBreakpointValue({ base: true, lg: false });
    const bgColor = useColorModeValue(
        "linear(to-r, #fff4f6, #f4dadf)", 
        "linear(to-r, #170c1c, #140d0d)"
    );
    const startColor = useColorModeValue("#c9b3b3", "#1c0e21")
    const endColor = useColorModeValue("#e6e6e6", "#0d0312")
    
    return (
        <Card padding={2} boxSize={smallScreen ? "200px" : "300px"} boxShadow={"md"} bgGradient={bgColor}>
            <Skeleton startColor={startColor} endColor={endColor} height={"100px"}/>
            <Skeleton startColor={startColor} endColor={endColor} height={"250px"} marginTop={"20px"}/>
        </Card>
    )
}

export default PostCardSkeleton
