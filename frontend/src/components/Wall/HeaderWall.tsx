import { Flex, Stack, Text, useBreakpointValue, VStack } from "@chakra-ui/react";

interface HeaderWallProps {
    backgroundClass: string;
    nameMatter: string;
    nameClass: string;
}

export function HeaderWall({ nameClass, nameMatter, backgroundClass }: HeaderWallProps) {
    return (
        <Flex
            w="full"
            h="240px"
            backgroundImage={`url(${backgroundClass})`}
            backgroundSize="cover"
            backgroundPosition="center"
            rounded="xl"
        >
            <VStack
                w="full"
                p="24px"
                justify="end"
                align="start"
                px={useBreakpointValue({ base: 12, md: 8 })}
            >
                <Stack
                    maxW="2xl"
                    align="flex-start"
                    spacing={6}
                >
                    <Text
                        as="h1"
                        color="black"
                        textStyle="default"
                        fontSize="3xl"
                        fontWeight="bold"
                    >
                        {nameMatter}

                        <Text
                            as="p"
                            color="black"
                            textStyle="default"
                            fontSize="xl"
                            fontWeight="normal"
                        >
                            {nameClass}
                        </Text>
                    </Text>
                </Stack>
            </VStack>
        </Flex>
    );
}