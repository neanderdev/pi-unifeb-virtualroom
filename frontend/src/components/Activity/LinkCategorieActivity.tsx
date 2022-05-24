import NextLink from "next/link";
import { memo } from "react";
import { Box, Text } from "@chakra-ui/react";

interface LinkCategorieActivityProps {
    href: string;
    nameCategorieActivity: string;
    isActive?: boolean;
}

function LinkCategorieActivityComponent({ href, nameCategorieActivity, isActive = false }: LinkCategorieActivityProps) {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

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
                onClick={href === "#all-categories" ? scrollToTop : null}
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

export const LinkCategorieActivity = memo(LinkCategorieActivityComponent, (prevProps, nextProps) => {
    return Object.is(prevProps, nextProps);
})