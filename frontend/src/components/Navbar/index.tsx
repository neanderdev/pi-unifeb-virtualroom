import { Flex, HStack, Icon, IconButton, Spacer, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { CgClose, CgMenu } from "react-icons/cg";

import { Logo } from "../Logo";
import { SearchBox } from "./SearchBox";
import { Actions } from "./Actions";

import { useDrawer } from "../../contexts/DrawerContext";

interface NavbarProps {
    title: string;
    nameMatter?: string;
    nameClass?: string;
    isRoom?: boolean
}

export function Navbar({ title, isRoom = false, nameMatter, nameClass }: NavbarProps) {
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


                <HStack display={{ md: "none" }}>
                    <Text
                        textStyle="default"
                        fontSize="xl"
                        fontWeight="semibold"
                        fontFamily="cursive"
                    >
                        {title}

                        <Text
                            textStyle="default"
                            fontSize="sm"
                            fontWeight="normal"
                        >
                            {nameClass}
                        </Text>
                    </Text>
                </HStack>

                {isRoom && (
                    <HStack display={["none", , "flex"]}>
                        <Text
                            textStyle="default"
                            fontSize="lg"
                            fontWeight="semibold"

                        >
                            {nameMatter}

                            <Text
                                textStyle="default"
                                fontSize="sm"
                                fontWeight="normal"
                            >
                                {nameClass}
                            </Text>
                        </Text>
                    </HStack>
                )}

                {!isRoom && <SearchBox />}

                <Spacer />

                <Actions />
            </Stack>
        </Flex >
    );
}