import { memo } from "react";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { CgNotes } from "react-icons/cg";

interface BoxBodyAcitivityProps {
    titleBodyActivity: string;
    dateFinalized?: string;
    datePosted?: string;
    dataUpdatedPosted?: string;
}

function BoxBodyAcitivityComponent({ titleBodyActivity, dateFinalized, datePosted, dataUpdatedPosted }: BoxBodyAcitivityProps) {
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
                    {titleBodyActivity}
                </Text>
            </Flex>

            <Text
                ml="auto"
                mr={4}
                fontSize="sm"
                fontWeight="normal"
                isTruncated
            >
                {dateFinalized && `Data de entrega: ${dateFinalized}`}

                {datePosted && !dataUpdatedPosted && `Item postado: ${datePosted}`}

                {dataUpdatedPosted && `Última edição: ${dataUpdatedPosted}`}
            </Text>
        </Box>
    );
}

export const BoxBodyAcitivity = memo(BoxBodyAcitivityComponent, (prevProps, nextProps) => {
    return Object.is(prevProps, nextProps);
})