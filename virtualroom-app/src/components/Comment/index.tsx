import React from 'react';

import { formatterDate } from '../../utils/formatterDate';

import { ClassNoticeAnswer } from '../../dtos/ClassNoticeByClassUidDTO';

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

interface Props {
    data: ClassNoticeAnswer;
};

export function Comment({ data }: Props) {
    return (
        <Container>
            <SeparatorClassNotice>
                <HeaderCommentClassNotice>
                    <AvatarCommentNoticeClass
                        source={{ uri: data.user.avatar === '' ? null : data.user.avatar }}
                        resizeMode="cover"
                    />

                    <CommentNoticeClassDetail>
                        <TitleCommentNoticeClass numberOfLines={1}>
                            {data.user.name_user}
                        </TitleCommentNoticeClass>

                        <DatePublishedCommentNoticeClass numberOfLines={1}>
                            {formatterDate(data.createdAt_class_notice_answer)}
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