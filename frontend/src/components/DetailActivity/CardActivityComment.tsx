import { Dispatch, SetStateAction } from "react";
import { Box, Icon, Text } from "@chakra-ui/react";
import { BiCommentDetail } from "react-icons/bi";

import { ActivityComment } from "./ActivityComment";
import { InputActivityComment } from "./InputActivityComment";

interface User {
    name_user: string;
    avatar: string;
};

interface ActivityComment {
    id_private_comment: number;
    message: string;
    createdAt_private_comment: Date | string;
    user_uid: string;
    activity_uid: string;
    user: User;
};

interface CardActivityCommentProps {
    avatarActivityComment: string;
    uid_user: string;
    uid_activity: string;
    nameActivityComment: string;
    commentActivity: string;
    setCommentActivity: Dispatch<SetStateAction<string>>;
    activityComments: ActivityComment[];
};

export function CardActivityComment({ activityComments, uid_user, uid_activity, avatarActivityComment, nameActivityComment, commentActivity, setCommentActivity }: CardActivityCommentProps) {
    return (
        <Box
            w="full"
            borderWidth="1px"
            borderColor="gray.200"
            rounded="base"
        >
            <Box
                display="flex"
                my="6px"
                ml="12px"
                fontWeight="bold"
            >
                <Icon as={BiCommentDetail} fontSize={22} />

                <Text ml={2}>Comentários da atividade</Text>
            </Box>

            {activityComments.map((comment) => (
                <ActivityComment
                    key={comment.id_private_comment}
                    avatarStudent={comment.user.avatar}
                    nameStudent={comment.user.name_user}
                    message={comment.message}
                />
            ))}

            <InputActivityComment
                uid_user={uid_user}
                uid_activity={uid_activity}
                avatarStudent={avatarActivityComment}
                nameStudent={nameActivityComment}
                commentActivity={commentActivity}
                setCommentActivity={setCommentActivity}
            />
        </Box>
    );
}