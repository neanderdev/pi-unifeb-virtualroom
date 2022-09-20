import React from 'react';

import {
    Container,
    SeparatorClassNotice,
    HeaderCommentClassNotice,
    AvatarCommentNoticeClass,
    CommentNoticeClassDetail,
    TitleCommentNoticeClass,
    DatePublishedCommentNoticeClass,
    CommentNoticeClass,
} from './styles';

interface Comment {
    id: string;
    name: string;
    message: string;
    urlImage: string;
    dataPublished: string;
}

interface Props {
    data: Comment;
}

export function Comment({ data }: Props) {
    return (
        <Container>
            <SeparatorClassNotice>
                <HeaderCommentClassNotice>
                    <AvatarCommentNoticeClass
                        source={{ uri: data.urlImage }}
                        resizeMode="cover"
                    />

                    <CommentNoticeClassDetail>
                        <TitleCommentNoticeClass numberOfLines={1}>
                            {data.name}
                        </TitleCommentNoticeClass>

                        <DatePublishedCommentNoticeClass numberOfLines={1}>
                            {data.dataPublished}
                        </DatePublishedCommentNoticeClass>
                    </CommentNoticeClassDetail>
                </HeaderCommentClassNotice>

                <CommentNoticeClass>
                    {data.message}
                </CommentNoticeClass>
            </SeparatorClassNotice>
        </Container>
    );
}