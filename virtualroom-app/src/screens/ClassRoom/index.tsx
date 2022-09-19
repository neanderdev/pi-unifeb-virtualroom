import React from 'react';
import { StatusBar } from 'react-native';

import { Header } from '../../components/Header';

import {
    Container
} from './styles';

export function ClassRoom() {
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
        </Container>
    );
}