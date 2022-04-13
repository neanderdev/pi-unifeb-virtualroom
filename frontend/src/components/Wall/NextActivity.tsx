import { Box, Button, Flex, Text } from "@chakra-ui/react";

export function NextActivity() {
    return (
        <Box
            w={240}
            minH={180}
            rounded="md"
            borderWidth="1px"
            borderColor="gray.100"
            mr={4}
        >
            <Flex direction="column">
                <Text
                    p={2}
                    textStyle="default"
                    fontSize="md"
                    fontWeight="semibold"
                    color="gray.600"
                >
                    Próximas atividades
                </Text>

                <Text
                    p={2}
                    textStyle="default"
                    fontSize="sm"
                    fontWeight="normal"
                    color="gray.400"
                >
                    Nenhuma atividade para a próxima semana!
                </Text>

                <Button colorScheme='red' variant='ghost' ml="auto" mr="2">
                    Ver tudo
                </Button>
            </Flex>
        </Box>
    );
}