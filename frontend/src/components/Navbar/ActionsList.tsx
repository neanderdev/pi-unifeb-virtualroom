import { Stack, StackProps } from "@chakra-ui/react";

import { Notifications } from "./Notifications";
import { Profile } from "./Profile";
import { ThemeToggle } from "./ThemeToggle";

export function ActionsList(props: StackProps) {
    return (
        <Stack direction="row" alignItems="center" spacing={[2, , 6]} {...props}>
            <ThemeToggle />

            <Notifications />

            <Profile />
        </Stack>
    );
}