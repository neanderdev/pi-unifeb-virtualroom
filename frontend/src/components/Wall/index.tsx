import { Dispatch, SetStateAction } from "react";
import { Flex, Spinner, Text, useMediaQuery, VStack } from "@chakra-ui/react";

import { HeaderWall } from "./HeaderWall";
import { NextActivity } from "./NextActivity";
import { NoticeClass } from "./NoticeClass";
import { CardActivity } from "./CardActivity";
import { CommentNotice } from "./CommentNotice";

interface CategoryActivity {
    tipo_category_activity: string;
};

interface ClassUser {
    user: {
        name_user: string;
        tipo_user: string;
    };
};

interface Class {
    ClassUser: ClassUser[];
};

interface Acitivities {
    uid_activity: string;
    name_activity: string;
    createdAt_activity: Date | string;
    category_activity: CategoryActivity;
    class: Class;
};

interface User {
    name_user: string;
    avatar: string;
};

interface ClassNoticeAnswer {
    id_class_notice_answer: number;
    message: string;
    createdAt_class_notice_answer: Date | string;
    user_uid: string;
    class_notice_id: number;
    user: User;
};

interface ClassNotice {
    id_class_notice: number;
    message: string;
    createdAt_class_notice: Date | string;
    user_uid: string;
    class_uid: string;
    ClassNoticeAnswer: ClassNoticeAnswer[];
    user: User;
};

interface ThatWeekActivity {
    uid_activity: string;
    name_activity: string;
};

interface WallProps {
    user_uid: string;
    classUid: string;
    backgroundClass: string;
    nameMatter: string;
    nameClass: string;
    classNotices: ClassNotice[];
    isLoadingClassNotice: boolean;
    errorClassNotice: unknown;
    classNotice: string;
    setClassNotice: Dispatch<SetStateAction<string>>;
    avatarStudent: string;
    nameStudent: string;
    activities: Acitivities[];
    thatWeekActivity: ThatWeekActivity[];
};

export function Wall({
    user_uid,
    classUid,
    backgroundClass,
    nameMatter,
    nameClass,
    classNotices,
    isLoadingClassNotice,
    errorClassNotice,
    classNotice,
    setClassNotice,
    avatarStudent,
    nameStudent,
    activities,
    thatWeekActivity
}: WallProps) {
    const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

    return (
        <Flex
            p={5}
            direction="column"
        >
            <HeaderWall backgroundClass={backgroundClass} nameMatter={nameMatter} nameClass={nameClass} />

            <Flex direction="row" pt="1.5rem">
                {!isSmallScreen && (
                    <NextActivity
                        classUid={classUid}
                        thatWeekActivity={thatWeekActivity} /
                    >
                )}

                <VStack spacing={4} w="full">
                    <NoticeClass classUid={classUid} user_uid={user_uid} classNotice={classNotice} setClassNotice={setClassNotice} />

                    {activities.length === 0 ? (
                        <Flex justify="center" alignItems="center">
                            <Text fontWeight="bold" fontSize="xl">Essa turma não contém nenhum atividade.</Text>
                        </Flex>
                    ) : (
                        <>
                            {activities.map((activity) => (
                                <CardActivity
                                    key={activity.uid_activity}
                                    uid_activity={activity.uid_activity}
                                    nameTeacher={activity.class.ClassUser[0].user.name_user}
                                    nameActivity={activity.name_activity}
                                    tipoActivity={activity.category_activity.tipo_category_activity}
                                    publicDateActivity={activity.createdAt_activity}
                                    classUid={classUid}
                                />
                            ))}
                        </>
                    )}

                    {isLoadingClassNotice ? (
                        <Flex justify="center" alignItems="center">
                            <Spinner color="red" size="xl" />
                        </Flex>
                    ) : errorClassNotice ? (
                        <Flex justify="center" alignItems="center">
                            <Text fontWeight="bold" fontSize="xl">Erro ao buscar as atividades desta turma</Text>
                        </Flex>
                    ) : (
                        classNotices.map((classNotice) => (
                            <CommentNotice
                                key={classNotice.id_class_notice}
                                user_uid={user_uid}
                                classNoticeId={classNotice.id_class_notice}
                                avatarTeacher={classNotice.user.avatar}
                                message={classNotice.message}
                                nameTeacher={classNotice.user.name_user}
                                publicDateComment={classNotice.createdAt_class_notice}
                                classNoticeAnswer={classNotice.ClassNoticeAnswer}
                                avatarStudent={avatarStudent}
                                nameStudent={nameStudent}
                            />
                        ))
                    )}
                </VStack>
            </Flex>
        </Flex>
    );
}