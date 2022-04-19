import { Dispatch, SetStateAction } from "react";
import { SimpleGrid, Stack } from "@chakra-ui/react";

import { CardDetailActivity } from "./CardDetailActivity";
import { CardFinallizedActivity } from "./CardFinallizedActivity";
import { CardPrivateComment } from "./CardPrivateComment";

interface DetailActivityProps {
    avatarPrivateComment: string;
    namePrivateComment: string;
    commentPrivate: string;
    setCommentPrivate: Dispatch<SetStateAction<string>>;
}

export function DetailActivity({ avatarPrivateComment, namePrivateComment, commentPrivate, setCommentPrivate }: DetailActivityProps) {
    return (
        <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start">
            <CardDetailActivity />

            <Stack direction="column" spacing={4}>
                <CardFinallizedActivity />

                <CardPrivateComment
                    avatarPrivateComment={avatarPrivateComment}
                    namePrivateComment={namePrivateComment}
                    commentPrivate={commentPrivate}
                    setCommentPrivate={setCommentPrivate}
                />
            </Stack>
        </SimpleGrid>
    );
}