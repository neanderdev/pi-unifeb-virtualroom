import { Dispatch, SetStateAction } from "react";
import { Flex, useMediaQuery, VStack } from "@chakra-ui/react";

import { HeaderWall } from "./HeaderWall";
import { NextActivity } from "./NextActivity";
import { NoticeClass } from "./NoticeClass";
import { CardActivity } from "./CardActivity";

interface WallProps {
    nameMatter: string;
    nameClass: string;
    classNotice: string;
    setClassNotice: Dispatch<SetStateAction<string>>;
}

interface FakeActivityProps {
    id: number;
    nameTeacher: string;
    nameActivity: string;
    publicDateActivity: string;
}

const fakeActivity: Array<FakeActivityProps> = [
    {
        id: 1,
        nameTeacher: "Wendel Cortes",
        nameActivity: "Revisão P1",
        publicDateActivity: "12 de abril de 2022",
    },
    {
        id: 2,
        nameTeacher: "Wendel Cortes",
        nameActivity: "TDE 01",
        publicDateActivity: "11 de abril de 2022",
    },
    {
        id: 3,
        nameTeacher: "Wendel Cortes",
        nameActivity: "Materiais e Links",
        publicDateActivity: "10 de abril de 2022",
    },
];

export function Wall({ nameMatter, nameClass, classNotice, setClassNotice }: WallProps) {
    const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

    return (
        <Flex
            p={5}
            direction="column"
        >
            <HeaderWall nameMatter={nameMatter} nameClass={nameClass} />

            <Flex direction="row" pt="1.5rem">
                {!isSmallScreen && (
                    <NextActivity />
                )}

                <VStack spacing={4} w="full">
                    <NoticeClass classNotice={classNotice} setClassNotice={setClassNotice} />

                    {fakeActivity.map((activity) => (
                        <CardActivity
                            key={activity.id}
                            nameTeacher={activity.nameTeacher}
                            nameActivity={activity.nameActivity}
                            publicDateActivity={activity.publicDateActivity}
                        />
                    ))}
                </VStack>
            </Flex>
        </Flex>
    );
}