import { useEffect, useState } from "react";
import {
    Avatar,
    AvatarBadge,
    HStack,
    Stack,
    Icon,
    Link,
    IconButton,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    Box,
    Text,
    Spinner,
} from "@chakra-ui/react";
import { IoIosArrowDown, IoIosSchool, } from "react-icons/io";
import { GoGear, } from "react-icons/go";

import { useMe } from "../../services/hooks/useMe";

export function Profile() {
    const { data, isLoading, isFetching, error } = useMe();

    if (isLoading) {
        return <Spinner />;
    }

    if (isFetching) {
        return <Spinner />;
    }

    if (error) {
        return (
            <Text>Falha ao obter dados do usuários.</Text>
        );
    }

    return (
        <HStack alignItems="center">
            <Box mr="4" textAlign="right">
                <Text>{data.me.ra_user}</Text>
                <Text color="gray.500" fontSize="small">
                    {data.me.email_user}
                </Text>
            </Box>

            <Avatar
                name="Neander de Souza"
                src=""
                size="sm"
            >
                <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Avatar>

            <Popover isLazy>
                <PopoverTrigger>
                    <IconButton aria-label="Popover" bg="transparent" size='xs' icon={<IoIosArrowDown />} />
                </PopoverTrigger>
                <PopoverContent p={5}>
                    <PopoverArrow />

                    <PopoverCloseButton />

                    <Stack spacing={4}>
                        <Stack
                            direction="row"
                            cursor="pointer"
                            spacing={2}
                            alignItems="center"
                        >
                            <Icon as={IoIosSchool} fontSize="xl" />

                            <Link href="/rooms">Turmas</Link>
                        </Stack>

                        <Stack
                            direction="row"
                            cursor="pointer"
                            spacing={2}
                            alignItems="center"
                        >
                            <Icon as={GoGear} fontSize="xl" />

                            <Link href="/configurations">Configuração</Link>
                        </Stack>
                    </Stack>
                </PopoverContent>
            </Popover>
        </HStack>
    );
}