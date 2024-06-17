import { HStack, VStack, Text, Card, useColorModeValue } from '@chakra-ui/react'
import LinkButton from './LinkButton'
import { useNavigate } from 'react-router-dom';
import { AddIcon } from "@chakra-ui/icons";

const SideBarContent = () => {
    const navigate = useNavigate();
    const postColor = useColorModeValue("red.300", "red.800");
    const bgColor = useColorModeValue("red.100", "red.600");

    return (
        <>
        <HStack>
            <LinkButton onClick={() => console.log("click")}>Tus dibujos</LinkButton>
        </HStack>
        <HStack>
            <LinkButton>Seguidos</LinkButton>
        </HStack>
        <HStack>
            <LinkButton>Guardados</LinkButton>
        </HStack>

        <Card
            marginTop={"50px"}
            padding={1}
            bg={postColor}
            _hover={{ bg: bgColor, "cursor": "pointer" }}
            onClick={() => navigate("/post")}>
            <VStack>
                <Text>
                    Publicar
                </Text>
                <AddIcon />
            </VStack>
        </Card>
        </>
    );
}

export default SideBarContent
