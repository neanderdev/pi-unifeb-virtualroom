import { useRouter } from "next/router";
import { useState } from "react";
import { Box, Stack, useMediaQuery } from "@chakra-ui/react";

import { getClassUid } from "../../../services/hooks/useClassUid";
import { useFindByActivityUid } from "../../../services/hooks/useFindByActivityUid";

import { withSSRAuth } from "../../../utils/withSSRAuth";

import { Navbar } from "../../../components/Navbar";
import { Sidebar } from "../../../components/Sidebar";
import { MobileSidebar } from "../../../components/Sidebar/MobileSidebar";
import { DetailActivity } from "../../../components/DetailActivity";

interface ActivityIdProps {
    name_class: string;
    name_matter: string;
}

export default function ActivityId({ name_class, name_matter }: ActivityIdProps) {
    const router = useRouter();

    const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

    const [commentPrivate, setCommentPrivate] = useState("");

    const { data, isLoading, error } = useFindByActivityUid(router.query.activityId as string);

    return (
        <Box>
            <Navbar
                title={name_matter}
                isRoom
                nameClass={name_class}
                nameMatter={name_matter}
            />

            <Box pos="relative" h="max-content" m={[2, , 5]}>
                <Stack direction="row" spacing={{ md: 5 }}>
                    <Sidebar isCollapseSidebar />

                    {isSmallScreen && <MobileSidebar />}

                    <Box w="full">
                        <Box
                            h="3rem"
                        >
                            <DetailActivity
                                isLoading={isLoading}
                                error={error}
                                data={data}
                                avatarPrivateComment="https://github.com/neanderdev.png"
                                namePrivateComment="Neander de Souza"
                                commentPrivate={commentPrivate}
                                setCommentPrivate={setCommentPrivate}
                            />
                        </Box>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const { classes } = await getClassUid(ctx.params.roomId as string, ctx);

    return {
        props: {
            name_class: classes.name_class,
            name_matter: classes.name_matter_class,
        }
    };
})