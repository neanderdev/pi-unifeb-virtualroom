import NextLink from "next/link";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

interface ThatWeekActivity {
    uid_activity: string;
    name_activity: string;
};

interface NextActivityProps {
    classUid: string;
    thatWeekActivity: ThatWeekActivity[];
};

export function NextActivity({ classUid, thatWeekActivity }: NextActivityProps) {
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

                {thatWeekActivity.length === 0 ? (
                    <Text
                        p={2}
                        textStyle="default"
                        fontSize="sm"
                        fontWeight="normal"
                        color="gray.400"
                    >
                        Nenhuma atividade para a próxima semana!
                    </Text>
                ) : (
                    <>
                        {thatWeekActivity.map((activity) => (
                            <NextLink href={`/rooms/${classUid}/${activity.uid_activity}`} passHref key={activity.uid_activity}>
                                <Text
                                    p={2}
                                    textStyle="default"
                                    fontSize="sm"
                                    fontWeight="normal"
                                    color="gray.400"
                                    cursor="pointer"
                                    isTruncated
                                >
                                    {activity.name_activity}
                                </Text>
                            </NextLink>
                        ))}
                    </>
                )}

                <Button colorScheme='red' variant='ghost' ml="auto" mr="2">
                    Ver tudo
                </Button>
            </Flex>
        </Box>
    );
}