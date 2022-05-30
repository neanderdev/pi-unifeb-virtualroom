import { useContext, useEffect } from "react";
import { Flex, Spinner } from "@chakra-ui/react";

import { AuthContext } from "../contexts/AuthContext";

export default function Logout() {
    const { signOut } = useContext(AuthContext);

    useEffect(() => {
        signOut();
    }, [signOut]);

    return (
        <Flex justify='center' align="center" w="100vw" h="100vh">
            <Spinner size="xl" color='gray.500' />
        </Flex>
    );
}