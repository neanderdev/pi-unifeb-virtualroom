import { Flex } from "@chakra-ui/react";

import { HeaderWall } from "./HeaderWall";

interface WallProps {
    nameMatter: string;
    nameClass: string;
}

export function Wall({ nameMatter, nameClass }: WallProps) {
    return (
        <Flex
            p={5}
            direction="column"
        >
            <HeaderWall nameMatter={nameMatter} nameClass={nameClass} />
        </Flex>
    );
}