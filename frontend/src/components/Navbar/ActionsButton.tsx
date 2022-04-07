import { Icon, IconButton, IconButtonProps } from "@chakra-ui/react";
import { CgMenuMotion, CgMenuRightAlt } from "react-icons/cg";

export function ActionsButton(props: IconButtonProps | any) {
    const { isOpen, ...rest } = props;

    const icon = isOpen ? CgMenuMotion : CgMenuRightAlt;

    return (
        <IconButton
            display={{ md: "none" }}
            colorScheme="brand"
            variant="ghost"
            fontSize="2xl"
            aria-label="Toggle Actions"
            icon={<Icon as={icon} />}
            transition="all .4s ease-in-out"
            {...rest}
        />
    );
}