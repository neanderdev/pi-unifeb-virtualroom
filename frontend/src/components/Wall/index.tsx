import { Dispatch, SetStateAction } from "react";
import { Flex, Text, useMediaQuery, VStack } from "@chakra-ui/react";

import { HeaderWall } from "./HeaderWall";
import { NextActivity } from "./NextActivity";
import { NoticeClass } from "./NoticeClass";
import { CardActivity } from "./CardActivity";
import { CommentNotice } from "./CommentNotice";

interface CategoryActivity {
    tipo_category_activity: string;
}

interface ClassUser {
    user: {
        name_user: string;
        tipo_user: string;
    };
}

interface Class {
    ClassUser: ClassUser[];
}

interface Acitivities {
    uid_activity: string;
    name_activity: string;
    createdAt_activity: Date | string;
    category_activity: CategoryActivity;
    class: Class;
}

interface WallProps {
    classUid: string;
    backgroundClass: string;
    nameMatter: string;
    nameClass: string;
    classNotice: string;
    setClassNotice: Dispatch<SetStateAction<string>>;
    avatarTeacher: string;
    nameTeacher: string;
    publicDateComment: string;
    avatarStudent: string;
    nameStudent: string;
    classComment: string;
    setClassComment: Dispatch<SetStateAction<string>>;
    activities: Acitivities[];
}

export function Wall({
    classUid,
    backgroundClass,
    nameMatter,
    nameClass,
    classNotice,
    setClassNotice,
    avatarTeacher,
    nameTeacher,
    publicDateComment,
    avatarStudent,
    nameStudent,
    classComment,
    setClassComment,
    activities
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
                    <NextActivity />
                )}

                <VStack spacing={4} w="full">
                    <NoticeClass classNotice={classNotice} setClassNotice={setClassNotice} />

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

                    <CommentNotice
                        avatarTeacher={avatarTeacher}
                        nameTeacher={nameTeacher}
                        publicDateComment={publicDateComment}
                        avatarStudent={avatarStudent}
                        nameStudent={nameStudent}
                        classComment={classComment}
                        setClassComment={setClassComment}
                    />
                </VStack>
            </Flex>
        </Flex>
    );
}