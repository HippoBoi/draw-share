import { Search2Icon, CloseIcon } from '@chakra-ui/icons';
import { IconButton, Input, InputGroup, InputLeftElement, InputRightElement, useBreakpointValue, useColorModeValue, useOutsideClick } from '@chakra-ui/react'
import { useRef, useState } from 'react';

interface Props {
    height?: string;
    width?: string;
    smallWidth?: string;
}

const SearchInput = ({ width = "250px", height = "40px", smallWidth = "100px" }: Props) => {
    const smallScreen = useBreakpointValue({ base: true, lg: false });
    const [searchOpen, setSearchOpen] = useState(false);
    const bgColor = useColorModeValue("red.200", "red.700");

    return (
        <InputGroup>
            <InputLeftElement>
                <Search2Icon />
            </InputLeftElement>
            <Input 
                variant={"filled"}
                height={height}
                width={ smallScreen ? smallWidth : width}
                placeholder='Buscar...' />
            {!smallScreen && (
                <InputRightElement>
                    <IconButton
                        bg={"false"}
                        _hover={{ "bg": bgColor, "opacity": "50%" }}
                        aria-label='close'>
                        <CloseIcon />
                    </IconButton>
                </InputRightElement>
            )}
        </InputGroup>
    )
}

export default SearchInput
