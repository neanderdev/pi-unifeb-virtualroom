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
} from "@chakra-ui/react";
import { IoIosArrowDown, IoIosSchool, } from "react-icons/io";
import { GoGear, } from "react-icons/go";

export function Profile() {
    return (
        <HStack alignItems="center">
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