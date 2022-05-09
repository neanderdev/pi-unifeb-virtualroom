import { Button, useColorModeValue, HStack } from "@chakra-ui/react";
import { AiOutlineContacts } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";

import { useModal } from "../../contexts/ModalContext";

export function ActionsActivity() {
    const { onOpen } = useModal();

    return (
        <HStack>
            <Button leftIcon={<AiOutlineContacts size={24} />} colorScheme="transparent" variant="solid" color={useColorModeValue("gray.600", "gray.200")}>
                Ver seus trabalhos
            </Button>

            <Button leftIcon={<BiCategory size={24} />} colorScheme="pink" variant="ghost" onClick={onOpen}>
                Criar nova categoria
            </Button>
        </HStack>
    );
}