import React, { useState } from 'react';
import { StatusBar } from 'react-native';

import { Header } from '../../components/Header';
import { CardActivity } from '../../components/CardActivity';
import { InputComment } from '../../components/InputComment';

import {
    Container,
    ActivityList,
} from './styles';

export function ClassRoom() {
    const [noticeClass, setNoticeClass] = useState('');

    const activityData = {
        id: 'id',
        name: 'TDE 01',
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
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
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
            />
        </Container>
    );
}