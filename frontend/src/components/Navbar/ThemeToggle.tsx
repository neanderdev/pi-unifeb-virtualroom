import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export function ThemeToggle() {
    const SwitchIcon = useColorModeValue(FaMoon, FaSun);
    const text = useColorModeValue("dark", "light");

    const { toggleColorMode: toggleMode } = useColorMode();

    return (
        <IconButton
            size="sm"
            fontSize="lg"
            aria-label={`Switch to ${text} mode`}
            title={`Switch to ${text} mode`}
            variant="ghost"
            onClick={toggleMode}
            icon={<SwitchIcon />}
        />
    );
}