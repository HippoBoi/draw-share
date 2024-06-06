import { Button, Center, FormControl, FormLabel, Input, Image, Box, Text, useColorModeValue, useBreakpointValue, useToast } from '@chakra-ui/react'
import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import apiClient from '../services/api-client';
import UserContext from '../services/userContext';

const PostForm = () => {
    const { user } = useContext(UserContext);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePrev, setImagePrev] = useState("");
    const [isLoading, setLoading] = useState(false);
    const smallScreen = useBreakpointValue({ base: true, lg: false });
    const toast = useToast();
    const textColor = useColorModeValue(
        "linear(to-r, #542c31, #12090b)",
        "linear(to-r, #d4dadf, #f26f9d)"
    );

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (!image || !user) {
            return;
        }

        setLoading(true);
        
        const formData = new FormData();
        formData.append("username", user.username);
        formData.append("title", title);
        formData.append("description", desc);
        formData.append("image", image);

        apiClient.post("/users/post/", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(() => {
                toast({
                    title: "Publicación Creada" ,
                    description: "Tu publicación fue creada exitosamente.",
                    status: "success",
                    duration: 4000,
                    isClosable: true
                })
            })
            .catch(err => {
                toast({
                    title: "Error",
                    description: err.message,
                    status: "error",
                    duration: 4000,
                    isClosable: true
                })
                console.log(err.message);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const imageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const drawing = event.target.files?.[0]
        if (drawing) {
            setImage(drawing);
            setImagePrev(URL.createObjectURL(drawing));
        }
    }

    return (
        <>
        <Box w="100%" maxW={ smallScreen ? "300px" : "800px"} mx="auto" mt="50px">
            <Text
                bgGradient={textColor} as={"i"} fontWeight={"bold"} bgClip={"text"}
                fontSize={"40px"} marginX={"-20px"} decoration={"underline"}>
                Publica un dibujo
            </Text>

            <form onSubmit={handleSubmit}>
                <FormControl id="post_image" mt={4} isRequired>
                    <FormLabel>Imagen</FormLabel>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={imageChange}
                    />
                    {imagePrev && (
                        <Center>
                        <Image src={imagePrev} boxSize={ smallScreen ? "200px" : "300px"} rounded={"40px"} />
                        </Center>
                    )}
                </FormControl>

                <FormControl id="title" isRequired>
                    <FormLabel>Título</FormLabel>
                    <Input
                    placeholder='El mejor gato ever...'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                </FormControl>

                <FormControl id="description" mt={4}>
                    <FormLabel>Descripción</FormLabel>
                    <Input
                    placeholder='Este es un gato y además...'
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    />
                </FormControl>
                <Button
                    type="submit"
                    colorScheme="pink"
                    width="full"
                    mt={4}
                    isLoading={isLoading}
                >
                    Publicar
                </Button>
            </form>
        </Box>
        </>
    )
}

export default PostForm
