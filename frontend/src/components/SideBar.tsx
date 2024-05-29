import { VStack, HStack } from '@chakra-ui/react'
import LinkButton from './LinkButton'

const SideBar = () => {
    return (
        <VStack marginLeft={1} spacing={5}>
            <HStack>
                <LinkButton onClick={() => console.log("click")}>Tus dibujos</LinkButton>
            </HStack>
            <HStack>
                <LinkButton>Seguidos</LinkButton>
            </HStack>
            <HStack>
                <LinkButton>Guardados</LinkButton>
            </HStack>
        </VStack>
    );
}

export default SideBar
