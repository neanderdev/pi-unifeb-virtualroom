import Link from "next/link";
import { useContext } from "react";
import {
    Avatar,
    AvatarBadge,
    HStack,
    Stack,
    Icon,
    IconButton,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    Box,
    Text,
} from "@chakra-ui/react";
import { IoIosArrowDown, IoIosSchool, } from "react-icons/io";
import { GoGear, } from "react-icons/go";
import { FiPower } from "react-icons/fi";

import { AuthContext } from "../../contexts/AuthContext";

export function Profile() {
    const { user } = useContext(AuthContext);

    return (
        <HStack alignItems="center">
            <Box mr="4" textAlign="right">
                <Text>{user?.name_user}</Text>

                <Text color="gray.500" fontSize="small">
                    {user?.email_user}
                </Text>
            </Box>

            <Avatar
                name={user?.name_user}
                src={user?.avatar !== "" ? `http://localhost:8000/files${user?.avatar}` : ""}
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
                        <Link href="/rooms" passHref>
                            <Stack
                                direction="row"
                                cursor="pointer"
                                spacing={2}
                                alignItems="center"
                                _hover={{
                                    color: "gray.500"
                                }}
                            >
                                <Icon as={IoIosSchool} fontSize="xl" />

                                <Text>Turmas</Text>
                            </Stack>
                        </Link>

                        <Link href="/setting" passHref>
                            <Stack
                                direction="row"
                                cursor="pointer"
                                spacing={2}
                                alignItems="center"
                                _hover={{
                                    color: "gray.500"
                                }}
                            >
                                <Icon as={GoGear} fontSize="xl" />

                                <Text>Configuração</Text>
                            </Stack>
                        </Link>

                        <Link href="/logout" passHref>
                            <Stack
                                direction="row"
                                cursor="pointer"
                                spacing={2}
                                alignItems="center"
                                _hover={{
                                    color: "gray.500"
                                }}
                            >
                                <Icon as={FiPower} fontSize="xl" />

                                <Text>Logout</Text>
                            </Stack>
                        </Link>
                    </Stack>
                </PopoverContent>
            </Popover>
        </HStack>
    );
}