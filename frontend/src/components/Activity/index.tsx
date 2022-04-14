import { Box, Flex, VStack } from "@chakra-ui/react";

import { SidebarActivity } from "./SidebarActivity";
import { SelectCategoriesAcitivity } from "./SelectCategoriesAcitivity";
import { ButtonViewActivity } from "./ButtonViewActivity";
import { BoxActivity } from "./BoxActivity";

interface ActivityProps {
    isSmallScreen: boolean
}

interface Activity {
    id: number;
    titleBodyActivity: string;
    dateFinalized?: string;
    datePosted?: string;
    dateUpdatedPosted?: string;
}

interface FakeActivity {
    id: number;
    title: string;
    activity: Array<Activity>;
}

const fakeActivity: Array<FakeActivity> = [
    {
        id: 1,
        title: "TDE 01",
        activity: [],
    },
    {
        id: 1,
        title: "TDE 02",
        activity: [
            {
                id: 1,
                titleBodyActivity: "Entrega",
                dateFinalized: "12/04/2022",
            },
            {
                id: 2,
                titleBodyActivity: "Material",
                datePosted: "12/04/2022",
            },
            {
                id: 3,
                titleBodyActivity: "Links",
                datePosted: "12/04/2022",
                dateUpdatedPosted: "13/04/2022"
            },
        ],
    },
];

export function Activity({ isSmallScreen }: ActivityProps) {
    return (
        <Flex
            p={5}
            direction="column"
        >
            <Flex direction="row" pt="1.5rem">
                {!isSmallScreen && <SidebarActivity />}

                <VStack spacing={4} w="full">
                    {isSmallScreen && <SelectCategoriesAcitivity />}

                    <Box mr="auto" ml={-4}>
                        <ButtonViewActivity />
                    </Box>

                    {fakeActivity.map((activity) => (
                        <BoxActivity
                            key={activity.id}
                            title={activity.title}
                            activity={activity.activity}
                        />
                    ))}
                </VStack>
            </Flex>
        </Flex>
    );
}