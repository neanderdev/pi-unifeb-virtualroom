import { Drawer, DrawerCloseButton, DrawerContent, DrawerOverlay, Stack, useColorModeValue } from "@chakra-ui/react";
import { RiDashboardLine, RiInboxArchiveLine } from "react-icons/ri";
import { HiOutlineBookOpen } from "react-icons/hi";
import { FiPower, FiSettings } from "react-icons/fi";
import { GiTeacher } from "react-icons/gi";
import { IoSchoolOutline } from "react-icons/io5";

import { useListAllUserActivities } from "../../services/hooks/useListAllUserActivities";

import { useDrawer } from "../../contexts/DrawerContext";

import { SearchBox } from "../Navbar/SearchBox";
import { NavItem } from "./NavItem";
import { Can } from "../Can";

interface MobileSidebarProps {
    uid_user: string;
}

export function MobileSidebar({ uid_user }: MobileSidebarProps) {
    const { isOpen, onClose } = useDrawer();

    const { data, isLoading } = useListAllUserActivities(uid_user);

    return (
        <Drawer isOpen={isOpen} onClose={onClose} placement="left">
            <DrawerOverlay display={["initial", , "none"]}>
                <DrawerContent layerStyle="neutral" py={8} bg={useColorModeValue("gray.200", "gray.800")}>
                    <Stack spacing={4} fontSize="sm">
                        <DrawerCloseButton />

                        <SearchBox />

                        <NavItem
                            href="/rooms"
                            name="Sala de Aulas"
                            icon={RiDashboardLine}
                        />

                        <Can roles={["admin"]}>
                            <NavItem
                                href="/teachers"
                                name="Professores"
                                icon={GiTeacher}
                            />

                            <NavItem
                                href="/students"
                                name="Alunos"
                                icon={IoSchoolOutline}
                            />
                        </Can>


                        <NavItem
                            href="/works"
                            name="Trabalhos"
                            icon={HiOutlineBookOpen}
                            count={isLoading ? 0 : data.count}
                        />

                        <NavItem
                            href="/filed-rooms"
                            name="Turmas Arquivada"
                            icon={RiInboxArchiveLine}
                        />

                        <NavItem name="Settings" icon={FiSettings} href="/setting" />

                        <NavItem name="Logout" icon={FiPower} href="/logout" />
                    </Stack>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    );
}