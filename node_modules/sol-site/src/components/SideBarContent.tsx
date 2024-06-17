import { HStack, VStack, Text, Card, useColorModeValue } from '@chakra-ui/react'
import LinkButton from './LinkButton'
import { useNavigate } from 'react-router-dom';
import { AddIcon } from "@chakra-ui/icons";

const SideBarContent = () => {
    const navigate = useNavigate();
    const bgColor = useColorModeValue("red.200", "red.700");

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

        <VStack marginTop={"35px"}>
            <Card 
                padding={1}
                _hover={{ bg: bgColor }}
                onClick={() => navigate("/post")}>
                <Text>
                    Publicar
                </Text>
                <AddIcon />
            </Card>
        </VStack>
        </>
    );
}

export default SideBarContent
