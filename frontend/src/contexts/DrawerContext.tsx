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
        router.events.on("routeChangeComplete", disclojure.onClose);

        return () => {
            router.events.off("routeChangeComplete", disclojure.onClose);
        };
    }, [router, disclojure.onClose]);

    return (
        <DrawerContext.Provider value={disclojure}>
            {children}
        </DrawerContext.Provider>
    );
}

export const useDrawer = () => useContext(DrawerContext);