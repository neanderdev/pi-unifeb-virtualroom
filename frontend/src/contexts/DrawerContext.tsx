/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, ReactNode, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";

interface DrawerProviderProps {
    children: ReactNode;
}

type DrawerContextData = UseDisclosureReturn;

const DrawerContext = createContext({} as DrawerContextData);

export function DrawerProvider({ children }: DrawerProviderProps) {
    const disclojure = useDisclosure();

    const router = useRouter();

    useEffect(() => {
        disclojure.onClose();
    }, [router.asPath]);

    return (
        <DrawerContext.Provider value={disclojure}>
            {children}
        </DrawerContext.Provider>
    );
}

export const useDrawer = () => useContext(DrawerContext);