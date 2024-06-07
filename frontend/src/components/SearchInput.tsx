import { Search2Icon, CloseIcon } from '@chakra-ui/icons';
import { IconButton, Input, InputGroup, InputLeftElement, InputRightElement, useBreakpointValue, useColorModeValue, useOutsideClick } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { useDebounce } from "@uidotdev/usehooks"
import { getPostByQuery } from '../services/post-data';

interface Props {
    height?: string;
    width?: string;
    smallWidth?: string;
}

const DEBOUNCE_TIME = 500;

const SearchInput = ({ width = "250px", height = "40px", smallWidth = "100px" }: Props) => {
    const smallScreen = useBreakpointValue({ base: true, lg: false });
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, DEBOUNCE_TIME);
    const [searchOpen, setSearchOpen] = useState(false);
    const bgColor = useColorModeValue("red.200", "red.700");

    useEffect(() => {
        getPostByQuery(debouncedSearch)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err.message);
            })
    }, [debouncedSearch])

    return (
        <InputGroup>
            <InputLeftElement>
                <Search2Icon />
            </InputLeftElement>
            <Input 
                variant={"filled"}
                height={height}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                width={ smallScreen ? smallWidth : width}
                placeholder='Buscar...' />
            {!smallScreen && (
                <InputRightElement>
                    <IconButton
                        onClick={() => setSearch("")}
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
