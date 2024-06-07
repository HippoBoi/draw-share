import { VStack, HStack, Text } from '@chakra-ui/react'
import { User } from '../services/user-data'

interface Props {
    user: User | null;
    postsLength: number;
}

const UserStats = ({ user, postsLength }: Props) => {
    return (
        <VStack spacing={5}>
            <HStack>
            <Text 
                as={"i"} fontSize={"20px"}>
                Seguidores:
            </Text>
            <Text 
                as={"i"} fontWeight={"bold"} fontSize={"20px"}>
                0
            </Text>
            </HStack>

            <HStack>
            <Text 
                as={"i"} fontSize={"20px"}>
                Dibujos:
            </Text>
            <Text 
                as={"i"} fontWeight={"bold"} fontSize={"20px"}>
                {postsLength}
            </Text>
            </HStack>
        </VStack>
    )
}

export default UserStats
