import { useRouter } from "next/router";
import { useState } from "react";
import { Box, Stack, useMediaQuery } from "@chakra-ui/react";

import { getClassUid } from "../../../services/hooks/useClassUid";
import { getMe } from "../../../services/hooks/useMe";
import { getFindDetailActivityByUserUid } from "../../../services/hooks/useFindDetailActivityByUserUid";
import { useFindByActivityUid } from "../../../services/hooks/useFindByActivityUid";
import { useListAllActivityComment } from "../../../services/hooks/useListAllActivityComment";

import { withSSRAuth } from "../../../utils/withSSRAuth";

import { Navbar } from "../../../components/Navbar";
import { Sidebar } from "../../../components/Sidebar";
import { MobileSidebar } from "../../../components/Sidebar/MobileSidebar";
import { DetailActivity } from "../../../components/DetailActivity";

interface MaterialDetailActivity {
    id_material_detail_activity: number;
    link_material_detail_activity: string;
    detail_activity_id: number;
    name_material_detail_activity: string;
    size_material_detail_activity: number;
    format: string;
    size: number;
    name: string;
    blobURL: string;
};

interface ActivityIdProps {
    name_class: string;
    name_matter: string;
    ra_user: number;
    uid_user: string;
    name_user: string;
    roles: any;
    dt_isEntrega_detail_acitivity: Date | string;
    nota_user: number;
    MaterialDetailActivity: MaterialDetailActivity[];
};

export default function ActivityId({
    name_class,
    name_matter,
    ra_user,
    uid_user,
    name_user,
    roles,
    dt_isEntrega_detail_acitivity,
    nota_user,
    MaterialDetailActivity,
}: ActivityIdProps) {
    const router = useRouter();

    const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

    const [commentActivity, setCommentActivity] = useState("");

    const { data, isLoading, error } = useFindByActivityUid(router.query.activityId as string);
    const {
        data: activityComments,
        isLoading: isLoadingActivityComments,
        isFetching: isFetchingActivityComments,
        error: errorActivityComments,
    } = useListAllActivityComment(router.query.activityId as string);

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
                                ra_user={ra_user}
                                uid_user={uid_user}
                                uid_activity={router.query.activityId as string}
                                roles={roles}
                                dt_isEntrega_detail_acitivity={dt_isEntrega_detail_acitivity}
                                nota_user={nota_user}
                                MaterialDetailActivity={MaterialDetailActivity}
                                avatarActivityComment=""
                                nameActivityComment={name_user}
                                commentActivity={commentActivity}
                                setCommentActivity={setCommentActivity}
                                activityComments={activityComments}
                                isLoadingActivityComments={isLoadingActivityComments}
                                isFetchingActivityComments={isFetchingActivityComments}
                                errorActivityComments={errorActivityComments}
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
    const { me } = await getMe(ctx);
    const data = await getFindDetailActivityByUserUid(ctx.params.activityId as string, me.uid_user, ctx);

    const materialDetailActivity = data?.MaterialDetailActivity?.map((materialDetailActivity) => {
        return {
            ...materialDetailActivity,
            format: materialDetailActivity.name_material_detail_activity.replace(/^.*\./, ''),
            size: materialDetailActivity.size_material_detail_activity,
            name: materialDetailActivity.name_material_detail_activity,
            blobURL: `http://localhost:8000/files${materialDetailActivity.link_material_detail_activity}`,
        };
    });

    return {
        props: {
            name_class: classes.name_class,
            name_matter: classes.name_matter_class,
            ra_user: me.ra_user,
            uid_user: me.uid_user,
            name_user: classes.ClassUser?.filter((user) => user.user.ra_user === me.ra_user)[0].user.name_user,
            roles: me.roles,
            dt_isEntrega_detail_acitivity: data?.dt_isEntrega_detail_acitivity ?? null,
            nota_user: data?.nota_user ?? null,
            MaterialDetailActivity: materialDetailActivity ?? [],
        }
    };
})