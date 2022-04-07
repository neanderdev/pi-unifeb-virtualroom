import { Flex, Icon, IconButton, Spacer, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { CgClose, CgMenu } from "react-icons/cg";

import { Logo } from "../Logo";
import { SearchBox } from "./SearchBox";
import { Actions } from "./Actions";

import { useDrawer } from "../../contexts/DrawerContext";

interface NavbarProps {
    title: string;
}

export function Navbar({ title }: NavbarProps) {
    const { onToggle, isOpen } = useDrawer();

    const icon = isOpen ? CgClose : CgMenu;

    return (
        <Flex
            h="4.5rem"
            roundedBottom={[, , "2xl"]}
            alignItems="center"
            p={5}
            bg={useColorModeValue("gray.200", "gray.800")}
        >
            <Stack direction="row" w="full" alignItems="center" spacing={[0, , 8]}>
                <Logo />

                <IconButton
                    color={useColorModeValue("gray.900", "white")}
                    variant="ghost"
                    fontSize="2xl"
                    aria-label="Toggle Actions"
                    icon={<Icon as={icon} />}
                    transition="all .4s ease-in-out"
                    onClick={onToggle}
                />

                <Spacer display={{ md: "none" }} />

                <Text
                    textStyle="default"
                    fontSize="xl"
                    fontWeight="semibold"
                    fontFamily="cursive"
                    display={{ md: "none" }}
                >
                    {title}
                </Text>

                <SearchBox />

                <Spacer />

                <Actions />
            </Stack>
        </Flex>
    );
}