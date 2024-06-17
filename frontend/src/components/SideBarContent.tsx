import { HStack, VStack } from '@chakra-ui/react'
import LinkButton from './LinkButton'
import { useNavigate } from 'react-router-dom';
import { AddIcon } from "@chakra-ui/icons";

const SideBarContent = () => {
    const navigate = useNavigate();

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

        <VStack marginTop={"25px"}>
            <LinkButton onClick={() => navigate("/post")}>
                Publicar
            </LinkButton>
            <AddIcon />
        </VStack>
        </>
    );
}

export default SideBarContent
