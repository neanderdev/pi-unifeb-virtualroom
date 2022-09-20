import React from 'react';
import { StatusBar } from 'react-native';

import { Header } from '../../components/Header';
import { CardActivity } from '../../components/CardActivity';

import {
    Container,
    ActivityList,
} from './styles';

export function ClassRoom() {
    const activityData = {
        id: 'id',
        name: 'TDE 01',
        dataPublished: '16 de Setembro de 2022',
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
                data={[1, 2, 3, 4, 5, 6, 7, 8]}
                keyExtractor={item => String(item)}
                renderItem={({ item }) => <CardActivity data={activityData} />}
            />
        </Container>
    );
}