import { Flex, Icon, Input, useColorModeValue } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox() {
    return (
        <Flex
            as="label"
            flex="1"
            py="4"
            px="8"
            ml="6"
            maxWidth={400}
            alignSelf="center"
            color="gray.200"
            position="relative"
            bg={useColorModeValue("gray.100", "gray.700")}
            borderRadius="full"
            display={["none", , "flex"]}
        >
            <Input
                color="gray.500"
                variant="unstyled"
                px="4"
                mr="4"
                placeholder="Buscar na plataforma"
                _placeholder={{ color: 'gray.400' }}
            />

            <Icon as={RiSearchLine} fontSize="20" />
        </Flex>
    );
}