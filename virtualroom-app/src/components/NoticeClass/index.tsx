import React, { useState } from 'react';

import { Comment } from '../Comment';
import { InputComment } from '../InputComment';

import { formatterDate } from '../../utils/formatterDate';

import { IResponseClassNotice } from '../../dtos/ClassNoticeByClassUidDTO';

import { api } from '../../services/api';

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
    uid_user: String;
};

export function NoticeClass({ data, uid_user }: Props) {
    const [comment, setComment] = useState('');

    async function handleSendComment() {
        try {
            const createClassNoticeAnswerFormData = {
                message: comment,
                user_uid: uid_user,
                class_notice_id: Number(data.id_class_notice),
            };

            await api.post('class-notice-answer', createClassNoticeAnswerFormData);

            setComment('');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container>
            <NoticeClassContent>
                <HeaderClassNotice>
                    <AvatarNoticeClass
                        source={{ uri: `http://192.168.1.11:8000/files${data.user.avatar}` }}
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