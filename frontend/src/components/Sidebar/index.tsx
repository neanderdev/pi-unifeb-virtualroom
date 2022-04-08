import { Stack, useColorModeValue } from "@chakra-ui/react";
import { RiDashboardLine, RiInboxArchiveLine } from "react-icons/ri";
import { HiOutlineBookOpen } from "react-icons/hi";
import { FiPower, FiSettings } from "react-icons/fi";

import { NavItem } from "./NavItem";
import { CollapsedItem } from "./CollapsedItem";

import { useDrawer } from "../../contexts/DrawerContext";

interface SidebarProps {
    isCollapseSidebar?: boolean;
}

export function Sidebar({ isCollapseSidebar = false }: SidebarProps) {
    const { isOpen } = useDrawer();

    const NavAction = !isOpen && isCollapseSidebar ? CollapsedItem : isOpen && !isCollapseSidebar ? CollapsedItem : NavItem;

    return (
        <Stack
            layerStyle="card"
            rounded="xl"
            w={!isOpen && isCollapseSidebar ? "60px" : isOpen && !isCollapseSidebar ? "60px" : "300px"}
            transition="width .4s ease-in-out"
            py={8}
            shadow="md"
            minH="full"
            spacing={2}
            fontSize="sm"
            display={["none", , "initial"]}
            overflowX={!isOpen && isCollapseSidebar ? "initial" : isOpen && !isCollapseSidebar ? "initial" : "clip"}
            whiteSpace="nowrap"
            bg={useColorModeValue("gray.200", "gray.800")}
        >
            <NavAction
                href="/rooms"
                name="Sala de Aulas"
                icon={RiDashboardLine}
            />

            <NavAction
                href="/works"
                name="Trabalhos"
                icon={HiOutlineBookOpen}
                count={2}
            />

            <NavAction
                href="/rooms-filed"
                name="Turmas Arquivada"
                icon={RiInboxArchiveLine}
            />

            <NavAction name="Settings" icon={FiSettings} href="/setting" />

            <NavAction name="Logout" icon={FiPower} href="/logout" />
        </Stack>
    );
}