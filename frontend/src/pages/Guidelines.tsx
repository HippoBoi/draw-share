import { Box, Text, VStack } from '@chakra-ui/react'

const Guidelines = () => {
    return (
        <Box marginTop={"60px"}>
            <VStack>
                <Text fontSize={"30px"} fontWeight={"bold"}>Página web desarrollada con el propósito de practicar Django y el uso de POSTS</Text>
                <Text as={"i"}>Favor de no publicar contenido +18 o contenido ilegal.</Text>
                <Text as={"i"} opacity={"30%"}>-hippoooooooo</Text>
            </VStack>
        </Box>
    );
}

export default Guidelines;
