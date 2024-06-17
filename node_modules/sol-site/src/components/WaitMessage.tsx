import { Center, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const WaitMessage = () => {
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowMessage(true);
        }, 6000); // 6 seg
    
        return () => clearTimeout(timeout);
    }, []);

    return (
        <Center>
            {showMessage && (
                <Text
                    as={"b"} 
                    fontSize={"20px"}
                    decoration={"underline"}
                    _hover={{"color": "red.400", 
                        "fontSize": "21px",
                        "transition": "0.2s ease"}}>
                    El servidor está iniciandose. Porfavor espera un minuto.
                </Text>
            )}
        </Center>
    );
}

export default WaitMessage;