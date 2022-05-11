import { memo } from "react";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { CgNotes } from "react-icons/cg";

interface BoxBodyAcitivityProps {
    tipoActivity?: string;
    name_activity?: string;
    dt_entrega_activity?: string;
    createdAt_activity?: string;
    updatedAt_activity?: string;
}

function BoxBodyAcitivityComponent({ tipoActivity, name_activity, dt_entrega_activity, createdAt_activity, updatedAt_activity }: BoxBodyAcitivityProps) {
    return (
        <Box
            w="full"
            cursor="pointer"
            _hover={{
                bg: useColorModeValue("gray.100", "gray.700"),
            }}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
        >
            <Flex align="center">
                <Box
                    w={10}
                    h={10}
                    bg="gray"
                    rounded="full"
                    my="6px"
                    ml="12px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <CgNotes size={20} color="white" />
                </Box>

                <Text
                    fontSize="lg"
                    fontWeight="normal"
                    ml={4}
                    isTruncated
                >
                    {name_activity}
                </Text>
            </Flex>

            <Text
                ml="auto"
                mr={4}
                fontSize="sm"
                fontWeight="normal"
                isTruncated
            >
                {tipoActivity === "A" || tipoActivity === "C"
                    ? `Data de entrega em ${dt_entrega_activity}`
                    : null
                }

                {tipoActivity === "M" && createdAt_activity === updatedAt_activity
                    ? `Item postado em ${createdAt_activity}`
                    : tipoActivity === "M" && createdAt_activity !== updatedAt_activity
                        ? `Última edição em ${updatedAt_activity}`
                        : null
                }
            </Text>
        </Box>
    );
}

export const BoxBodyAcitivity = memo(BoxBodyAcitivityComponent, (prevProps, nextProps) => {
    return Object.is(prevProps, nextProps);
})