import React, { useState } from 'react';

import { Comment } from '../Comment';
import { InputComment } from '../InputComment';

import { formatterDate } from '../../utils/formatterDate';

import { IResponseClassNotice } from '../../dtos/ClassNoticeByClassUidDTO';

import {
    Container,
    NoticeClassContent,
    HeaderClassNotice,
    AvatarNoticeClass,
    NoticeClassDetail,
    TitleNoticeClass,
    DatePublishedNoticeClass,
    MessageNoticeClass,
    CommentNoticeClassList,
    ContainerInputComment,
} from './styles';

interface Props {
    data: IResponseClassNotice;
};

export function NoticeClass({ data }: Props) {
    const [comment, setComment] = useState('');

    async function handleSendComment() {
        console.log(comment)
    }

    return (
        <Container>
            <NoticeClassContent>
                <HeaderClassNotice>
                    <AvatarNoticeClass
                        source={{ uri: data.user.avatar === '' ? null : data.user.avatar }}
                        resizeMode="cover"
                    />

                    <NoticeClassDetail>
                        <TitleNoticeClass numberOfLines={1}>
                            {data.user.name_user}
                        </TitleNoticeClass>

                        <DatePublishedNoticeClass numberOfLines={1}>
                            {formatterDate(data.createdAt_class_notice)}
                        </DatePublishedNoticeClass>
                    </NoticeClassDetail>
                </HeaderClassNotice>

                <MessageNoticeClass>
                    {data.message}
                </MessageNoticeClass>

                <CommentNoticeClassList
                    data={data.ClassNoticeAnswer}
                    keyExtractor={item => String(item.id_class_notice_answer)}
                    renderItem={({ item }) => <Comment data={item} />}
                />

                <ContainerInputComment>
                    <InputComment
                        placeholder="Comentar..."
                        onPressSend={handleSendComment}
                        onChangeText={setComment}
                        value={comment}
                    />
                </ContainerInputComment>
            </NoticeClassContent>
        </Container>
    );
}