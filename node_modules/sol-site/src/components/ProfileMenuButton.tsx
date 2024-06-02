import { Menu, MenuButton, Button, useColorModeValue, Center, MenuList, MenuItem, Image } from '@chakra-ui/react'
import blankPfp from "../assets/blank-pfp.webp"
import { domain } from '../services/api-client'
import { User } from '../services/user-data'
import { useNavigate } from 'react-router-dom';

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
                        src={ user ? user.picture ? domain + user.picture : blankPfp : blankPfp } 
                        width={"35px"} 
                        height={"35px"} 
                        rounded={20}  />
                    </Center>
                    { user ? user.username : "Iniciar Sesión"}
                </MenuButton>
                <MenuList bgGradient={bgColor}>
                    <MenuItem 
                        bgGradient={bgColor} >
                        Perfil
                    </MenuItem>
                    <MenuItem 
                        bgGradient={bgColor} >
                        Configuración
                    </MenuItem>
                    <MenuItem 
                        bgGradient={bgColor} >
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
            _hover={{ bg: bgColor }}>
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
