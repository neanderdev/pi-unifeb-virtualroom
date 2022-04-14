import { Flex, Text } from "@chakra-ui/react";

import { BoxHeaderActivity } from "./BoxHeaderActivity";
import { BoxBodyAcitivity } from "./BoxBodyAcitivity";

interface Activity {
    id: number;
    titleBodyActivity: string;
    dateFinalized?: string;
    datePosted?: string;
    dateUpdatedPosted?: string;
}


interface BoxActivityProps {
    title: string;
    activity: Array<Activity>;
}

export function BoxActivity({ title, activity }: BoxActivityProps) {
    return (
        <Flex
            ml={4}
            w="full"
            direction="column"
        >

            <BoxHeaderActivity title={title} />

            {activity.length === 0 && (
                <Text
                    fontSize="lg"
                    fontWeight="normal"
                    ml={4}
                    isTruncated
                >
                    Nenhuma atividade está vinculada à esta categoria.
                </Text>
            )}

            {activity.map((activity) => (
                <BoxBodyAcitivity
                    key={activity.id}
                    titleBodyActivity={activity.titleBodyActivity}
                    dateFinalized={activity.dateFinalized}
                    datePosted={activity.datePosted}
                    dataUpdatedPosted={activity.dateUpdatedPosted}
                />
            ))}
        </Flex>
    );
}