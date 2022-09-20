import React, { useState } from 'react';

import { Comment } from '../Comment';
import { InputComment } from '../InputComment';

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

interface NoticeClass {
    id: string;
    name: string;
    message: string;
    urlImage: string;
    dataPublished: string;
}

interface Props {
    data: NoticeClass;
}

export function NoticeClass({ data }: Props) {
    const [comment, setComment] = useState('');

    const commentNoticeClass = {
        id: 'id',
        name: 'Dudu Buch',
        message: 'Boa noite professor, tmj.',
        urlImage: 'https://github.com/neanderdev.png',
        dataPublished: '17 de Setembro de 2022',
    }

    async function handleSendComment() {
        console.log(comment)
    }

    return (
        <Container>
            <NoticeClassContent>
                <HeaderClassNotice>
                    <AvatarNoticeClass
                        source={{ uri: data.urlImage }}
                        resizeMode="cover"
                    />

                    <NoticeClassDetail>
                        <TitleNoticeClass numberOfLines={1}>
                            {data.name}
                        </TitleNoticeClass>

                        <DatePublishedNoticeClass numberOfLines={1}>
                            {data.dataPublished}
                        </DatePublishedNoticeClass>
                    </NoticeClassDetail>
                </HeaderClassNotice>

                <MessageNoticeClass>
                    {data.message}
                </MessageNoticeClass>

                <CommentNoticeClassList
                    data={[1]}
                    keyExtractor={item => String(item)}
                    renderItem={({ item }) => <Comment data={commentNoticeClass} />}
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