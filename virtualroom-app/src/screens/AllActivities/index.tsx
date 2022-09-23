import React from 'react';
import { StatusBar } from 'react-native';

import { Header } from '../../components/Header';

import {
    Container,
    Title,
} from './styles';

export function AllActivities() {
    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />

            <Header
                title='Atividades'
            />

            <Title>
                Todas as atividades do usuário
            </Title>
        </Container>
    );
}