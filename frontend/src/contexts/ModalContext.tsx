import { createContext, ReactNode, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";

interface ModalProviderProps {
    children: ReactNode;
}

type ModalContextData = UseDisclosureReturn;

const ModalContext = createContext({} as ModalContextData);

export function ModalProvider({ children }: ModalProviderProps) {
    const disclojure = useDisclosure();

    const router = useRouter();

    useEffect(() => {
        router.events.on("routeChangeComplete", disclojure.onClose);

        return () => {
            router.events.off("routeChangeComplete", disclojure.onClose);
        };
    }, [router, disclojure.onClose]);

    return (
        <ModalContext.Provider value={disclojure}>
            {children}
        </ModalContext.Provider>
    );
}

export const useModal = () => useContext(ModalContext);