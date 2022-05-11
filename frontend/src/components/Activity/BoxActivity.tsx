import { Flex, Text } from "@chakra-ui/react";

import { BoxHeaderActivity } from "./BoxHeaderActivity";
import { BoxBodyAcitivity } from "./BoxBodyAcitivity";

interface Activity {
    uid_activity: string;
    name_activity: string;
    dt_entrega_activity: string;
    createdAt_activity: string;
    updatedAt_activity: string;
}


interface BoxActivityProps {
    title: string;
    tipoActivity: string,
    activity: Array<Activity>;
}

export function BoxActivity({ title, tipoActivity, activity }: BoxActivityProps) {
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
                    key={activity.uid_activity}
                    tipoActivity={tipoActivity}
                    name_activity={activity.name_activity}
                    dt_entrega_activity={activity.dt_entrega_activity}
                    createdAt_activity={activity.createdAt_activity}
                    updatedAt_activity={activity.updatedAt_activity}
                />
            ))}
        </Flex>
    );
}