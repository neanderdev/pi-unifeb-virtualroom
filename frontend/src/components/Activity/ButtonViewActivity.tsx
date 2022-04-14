import { Button, useColorModeValue } from "@chakra-ui/react";
import { AiOutlineContacts } from "react-icons/ai";

export function ButtonViewActivity() {
    return (
        <Button leftIcon={<AiOutlineContacts size={24} />} colorScheme="transparent" variant="solid" color={useColorModeValue("gray.600", "gray.200")}>
            Ver seus trabalhos
        </Button>
    );
}