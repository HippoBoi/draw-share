import { Text, useColorModeValue } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
    children: ReactNode;
    onClick?: () => void;
    color?: string;
    boxShadow?: "md" | "lg";
}

const LinkButton = ({ children, onClick, color, boxShadow }: Props) => {
    const bgColor = useColorModeValue("red.200", "red.700");

    return (
        <Text 
            bgColor={color && color}
            boxShadow={boxShadow && boxShadow}
            as={"button"} 
            onClick={onClick} 
            rounded={'md'}
            paddingX={2} 
            paddingY={1}
            _hover={{ bg: bgColor }}>
            {children}
        </Text>
    )
}

export default LinkButton
