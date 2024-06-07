import { Box, Button, Text, VStack, useColorModeValue } from '@chakra-ui/react'

const Contact = () => {
    const hoverColor = useColorModeValue(
        "red.800", 
        "red.200"
    );

    return (
        <Box marginTop={"60px"}>
            <VStack spacing={"40px"}>
                <VStack>
                    <Text fontSize={"20px"} fontWeight={"bold"} as={"i"}>Correo:</Text>
                    <Text as={"i"}>tagrifavc@gmail.com</Text>
                </VStack>

                <VStack>
                    <Text fontSize={"20px"} fontWeight={"bold"} as={"i"}>GitHub:</Text>
                    <a href='https://github.com/HippoBoi'>
                        <Text 
                            as={"i"} 
                            color={useColorModeValue("blue.800", "blue.200")}
                            variant={"link"} 
                            _hover={{ "color": hoverColor }}
                            decoration={"underline"}>
                            HippoBoi
                        </Text>
                    </a>
                </VStack>

                <VStack>
                    <Text fontSize={"20px"} fontWeight={"bold"} as={"i"}>Discord:</Text>
                    <Text 
                        as={"i"} 
                        color={useColorModeValue("purple.800", "purple.200")} 
                        _hover={{ "color": hoverColor }}>
                        HippoBoi#9649
                    </Text>
                    <Text fontSize={"12px"} opacity={"80%"}>o "cheesyhippo"</Text>
                </VStack>

                <Text as={"i"} opacity={"30%"}>-hippoooooooo</Text>
            </VStack>
        </Box>
    );
}

export default Contact;
