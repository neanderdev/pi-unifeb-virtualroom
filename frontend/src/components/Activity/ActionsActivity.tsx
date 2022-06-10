import { useRouter } from "next/router";
import { Button, useColorModeValue, HStack } from "@chakra-ui/react";
import { AiOutlineContacts } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";

import { useModal } from "../../contexts/ModalContext";
import { Can } from "../Can";

export function ActionsActivity() {
    const { onOpen } = useModal();
    const router = useRouter();

    return (
        <HStack>
            <Button
                leftIcon={<AiOutlineContacts size={24} />}
                colorScheme="transparent"
                variant="solid"
                color={useColorModeValue("gray.600", "gray.200")}
                onClick={() => router.push("/works")}
            >
                Ver seus trabalhos
            </Button>

            <Can roles={["admin", "teacher"]}>
                <Button leftIcon={<BiCategory size={24} />} colorScheme="pink" variant="ghost" onClick={onOpen}>
                    Criar nova categoria
                </Button>
            </Can>
        </HStack>
    );
}