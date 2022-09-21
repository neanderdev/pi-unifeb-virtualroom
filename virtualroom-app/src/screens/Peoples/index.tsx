import React from 'react';
import { StatusBar } from 'react-native';

import { Header } from '../../components/Header';

import {
    Container,
    TeacherList,
    StudentList,
    HeaderPeople,
    PeopleContent,
    AvatarPeople,
    NamePeople,
    Separator,
} from './styles';

export function Peoples() {
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

            <TeacherList
                data={[1, 2]}
                keyExtractor={item => String(item)}
                renderItem={({ item }) => (
                    <PeopleContent>
                        <AvatarPeople
                            source={{ uri: 'https://github.com/neanderdev.png' }}
                            resizeMode="cover"
                        />

                        <NamePeople>
                            Alexandre Salvatierra
                        </NamePeople>
                    </PeopleContent>
                )}
                ListHeaderComponent={
                    <>
                        <HeaderPeople>
                            Professores
                        </HeaderPeople>

                        <Separator />
                    </>
                }
                ItemSeparatorComponent={() => <Separator />}
                ListFooterComponent={
                    <StudentList
                        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                        keyExtractor={item => String(item)}
                        renderItem={({ item }) => (
                            <PeopleContent>
                                <AvatarPeople
                                    source={{ uri: 'https://github.com/neanderdev.png' }}
                                    resizeMode="cover"
                                />

                                <NamePeople>
                                    Neander de Souza Faria
                                </NamePeople>
                            </PeopleContent>
                        )}
                        ListHeaderComponent={
                            <>
                                <HeaderPeople>
                                    Alunos
                                </HeaderPeople>

                                <Separator />
                            </>
                        }
                        ItemSeparatorComponent={() => <Separator />}
                    />
                }
            />
        </Container>
    );
}