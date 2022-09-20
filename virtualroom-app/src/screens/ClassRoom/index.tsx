import React, { useState } from 'react';
import { StatusBar } from 'react-native';

import { Header } from '../../components/Header';
import { CardActivity } from '../../components/CardActivity';
import { InputComment } from '../../components/InputComment';
import { NoticeClass } from '../../components/NoticeClass';

import {
    Container,
    ActivityList,
    ClassNoticeList,
} from './styles';

export function ClassRoom() {
    const [noticeClass, setNoticeClass] = useState('');

    const activityData = {
        id: 'id',
        name: 'TDE 01',
        dataPublished: '16 de Setembro de 2022',
    }

    const noticeClassData = {
        id: 'id',
        name: 'Neander de Souza',
        message: 'Boa noite rapaziada, segue o material.',
        urlImage: 'https://github.com/neanderdev.png',
        dataPublished: '16 de Setembro de 2022',
    }

    async function handleSendNoticeClass() {
        console.log(noticeClass)
    }

    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />

            <Header
                title='Sistemas Operacionais'
            />

            <ActivityList
                data={[1, 2, 3, 4, 5]}
                keyExtractor={item => String(item)}
                renderItem={({ item }) => <CardActivity data={activityData} />}
                ListHeaderComponent={
                    <InputComment
                        placeholder="Compartilhar com a turma..."
                        onPressSend={handleSendNoticeClass}
                        onChangeText={setNoticeClass}
                        value={noticeClass}
                    />
                }
                ListFooterComponent={
                    <ClassNoticeList
                        data={[1, 2]}
                        keyExtractor={item => String(item)}
                        renderItem={({ item }) => <NoticeClass data={noticeClassData} />}
                    />
                }
            />
        </Container>
    );
}