import { Menu, MenuButton, Button, useColorModeValue, Center, MenuList, 
    MenuItem, Image, useToast } from '@chakra-ui/react'
import blankPfp from "../assets/blank-pfp.webp"
import { domain } from '../services/api-client'
import { User } from '../services/user-data'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../services/userContext';

interface Props {
    user: User | null;
}   

const ProfileMenuButton = ({ user }: Props) => {
    const navigate = useNavigate();
    const bgColor = useColorModeValue(
        "linear(to-r, #f1f1fd, #fdf1fd)", 
        "linear(to-r, #100913, #100913)"
    );
    const hoverColor = useColorModeValue("red.200", "red.700");
    const toast = useToast();
    const { dispatch } = useContext(UserContext);

    const LogOut = () => {
        localStorage.removeItem("token");
        dispatch({ type: "REMOVE" })
        navigate("/login");
        toast({
            title: "Sesión Cerrada",
            description: "Has cerrado tu sesión exitosamente.",
            status: "success",
            duration: 4000,
            isClosable: true
        })
    }
    
    if (user) {
        return (
            <Menu>
                <MenuButton 
                    as={Button} 
                    variant={"link"}
                    rounded={'md'}
                    color={useColorModeValue("gray.700", "gray.200")}>
                    <Center>
                    <Image 
                        src={ user ? user.picture ? user.picture : blankPfp : blankPfp } 
                        width={"35px"} 
                        height={"35px"} 
                        rounded={20}  />
                    </Center>
                    { user ? user.username : "Iniciar Sesión"}
                </MenuButton>
                <MenuList bgGradient={bgColor}>
                    <MenuItem 
                        bgGradient={bgColor}
                        onClick={() => navigate(`/user/${user.username}`)} >
                        Perfil
                    </MenuItem>
                    <MenuItem 
                        bgGradient={bgColor} >
                        Configuración
                    </MenuItem>
                    <MenuItem 
                        bgGradient={bgColor}
                        onClick={LogOut} >
                        Cerrar Sesión
                    </MenuItem>
                </MenuList>
            </Menu>
        )
    };

    return (
        <Button 
            onClick={() => navigate("/login")} 
            variant={"link"}
            rounded={'md'}
            color={useColorModeValue("gray.700", "gray.200")}
            paddingX={2} 
            paddingY={1}
            _hover={{ bg: hoverColor }}>
            <Image 
                src={ blankPfp } 
                width={"35px"} 
                height={"35px"} 
                rounded={20}  />
            Iniciar Sesión
        </Button>
    )
}

export default ProfileMenuButton
