import { Icon, LinkBox, LinkOverlay, Spacer, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { IconType } from "react-icons";

import { ActiveLink } from "../ActiveLink";

interface NavItemProps {
    icon: IconType;
    count?: number;
    href?: string;
    name: string;
};

export function NavItem({ icon, name, count, href }: NavItemProps) {
    return (
        <LinkBox>
            <ActiveLink href={href} passHref>
                <Stack
                    direction="row"
                    cursor="pointer"
                    px={8}
                    py={4}
                    spacing={4}
                    alignItems="center"
                    fontWeight="semibold"
                    transition="all .4s ease-in-out"
                    borderRightWidth="3px"
                    borderRightColor="transparent"
                >
                    <Icon as={icon} fontSize="xl" />

                    <LinkOverlay>
                        <Text>{name}</Text>
                    </LinkOverlay>

                    <Spacer />

                    {count && (
                        <Text
                            as="span"
                            display="inline-flex"
                            alignItems="center"
                            justifyContent="center"
                            px={2}
                            py={1}
                            fontSize="xs"
                            fontWeight="bold"
                            lineHeight="none"
                            color="pink.50"
                            bg="pink.700"
                            rounded="full"
                        >
                            {count}
                        </Text>
                    )}
                </Stack>
            </ActiveLink>
        </LinkBox>
    );
}