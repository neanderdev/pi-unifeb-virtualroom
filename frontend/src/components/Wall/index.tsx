import { Dispatch, SetStateAction } from "react";
import { Flex, useMediaQuery, VStack } from "@chakra-ui/react";

import { HeaderWall } from "./HeaderWall";
import { NextActivity } from "./NextActivity";
import { NoticeClass } from "./NoticeClass";

interface WallProps {
    nameMatter: string;
    nameClass: string;
    classNotice: string;
    setClassNotice: Dispatch<SetStateAction<string>>;
}

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
                </VStack>
            </Flex>
        </Flex>
    );
}