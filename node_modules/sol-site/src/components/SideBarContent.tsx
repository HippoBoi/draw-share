import { HStack } from '@chakra-ui/react'
import LinkButton from './LinkButton'
import { useNavigate } from 'react-router-dom';

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

        <HStack>
            <LinkButton onClick={() => navigate("/post")}>Publicar</LinkButton>
        </HStack>
        </>
    );
}

export default SideBarContent
