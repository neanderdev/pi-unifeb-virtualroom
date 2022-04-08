import { Text } from "@chakra-ui/react";

export function Logo() {
    return (
        <Text
            fontSize={['2xl', '3xl']}
            fontWeight="bold"
            letterSpacing="tight"
            w="32"
            display={["none", , "flex"]}
        >
            feb

            <Text as="span" ml="1" color="pink.500">
                room
            </Text>
        </Text>
    );
}