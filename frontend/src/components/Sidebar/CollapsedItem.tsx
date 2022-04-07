import { Icon, IconButton, LinkBox, LinkOverlay, Text, Tooltip } from "@chakra-ui/react";
import { IconType } from "react-icons";

import { ActiveLink } from "../ActiveLink";

interface CollapsedItemProps {
    icon: IconType;
    count?: number;
    href: string;
    name: string;
};

export function CollapsedItem({ icon, name, count, href }: CollapsedItemProps) {
    return (
        <Tooltip hasArrow label={name} placement="right">
            <LinkBox display="flex" justifyContent="center">
                <ActiveLink href={href} passHref isCollapseItem>
                    <IconButton
                        colorScheme="transparent"
                        aria-label={name}
                        boxSize="40px"
                        alignSelf="center"
                        mt="1"
                        _focus={{ shadow: "none" }}
                        icon={
                            <>
                                <LinkOverlay>
                                    <Icon as={icon} fontSize="lg" />
                                </LinkOverlay>

                                {count && (
                                    <Text
                                        as="span"
                                        pos="absolute"
                                        top="-1px"
                                        right="-1px"
                                        px={2}
                                        py={1}
                                        fontSize="xs"
                                        fontWeight="bold"
                                        lineHeight="none"
                                        color="pink.100"
                                        transform="translate(50%, -50%)"
                                        bg="pink.700"
                                        rounded="full"
                                    >
                                        {count}
                                    </Text>
                                )}
                            </>
                        }
                    />
                </ActiveLink>
            </LinkBox>
        </Tooltip >
    );
}