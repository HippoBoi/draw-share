import { Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
    children: ReactNode;
    onClick?: () => void;
}

const LinkButton = ({ onClick, children }: Props) => {
    return (
        <Text as={"button"} onClick={onClick}>
            {children}
        </Text>
    )
}

export default LinkButton
