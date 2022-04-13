import { Flex, useMediaQuery } from "@chakra-ui/react";

import { HeaderWall } from "./HeaderWall";
import { NextActivity } from "./NextActivity";

interface WallProps {
    nameMatter: string;
    nameClass: string;
}

export function Wall({ nameMatter, nameClass }: WallProps) {
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
            </Flex>
        </Flex>
    );
}