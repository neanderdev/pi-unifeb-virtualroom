import NextLink from "next/link";
import { Box, Text } from "@chakra-ui/react";

interface LinkCategorieActivityProps {
    href: string;
    nameCategorieActivity: string;
    isActive?: boolean;
}

export function LinkCategorieActivity({ href, nameCategorieActivity, isActive = false }: LinkCategorieActivityProps) {
    return (
        <NextLink href={href} passHref>
            <Box
                w={210}
                h={10}
                bg="transparent"
                pl={2}
                display="flex"
                justifyContent="start"
                alignItems="center"
                cursor="pointer"
                borderRadius="xl"
                _hover={{
                    bg: "gray.100"
                }}
                color={isActive ? "red.500" : "gray"}
            >
                <Text
                    fontWeight="bold"
                    isTruncated
                >
                    {nameCategorieActivity}
                </Text>
            </Box>
        </NextLink>
    );
}