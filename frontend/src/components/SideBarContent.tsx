import { HStack } from '@chakra-ui/react'
import LinkButton from './LinkButton'

const SideBarContent = () => {
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
        </>
    )
}

export default SideBarContent
