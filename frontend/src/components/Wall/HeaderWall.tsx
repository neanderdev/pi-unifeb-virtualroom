import { Flex, Stack, Text, useBreakpointValue, VStack } from "@chakra-ui/react";

interface HeaderWallProps {
    nameMatter: string;
    nameClass: string;
}

export function HeaderWall({ nameClass, nameMatter }: HeaderWallProps) {
    return (
        <Flex
            w="full"
            h="240px"
            backgroundImage="url(https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=100)"
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
                        color="white"
                        textStyle="default"
                        fontSize="3xl"
                        fontWeight="bold"
                    >
                        {nameMatter}

                        <Text
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