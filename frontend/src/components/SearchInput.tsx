import { Search2Icon } from '@chakra-ui/icons';
import { IconButton, Input, InputGroup, InputLeftElement, InputRightElement, useBreakpointValue } from '@chakra-ui/react'

interface Props {
    height?: string;
    paddingX?: string;
}

const SearchInput = ({ paddingX = "20px", height = "40px" }: Props) => {
    const smallScreen = useBreakpointValue({ base: true, lg: false });
    
    if (smallScreen) {
        return (
            <IconButton aria-label='search'>
                <Search2Icon />
            </IconButton>
        )
    }

    return (
        <InputGroup>
            <InputLeftElement>
                <Search2Icon />
            </InputLeftElement>
            <Input 
                variant={"filled"}
                height={height}
                paddingX={paddingX}
                placeholder='Buscar...' />
        </InputGroup>
    )
}

export default SearchInput
