import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Header } from '../../components/Header';
import { Load } from '../../components/Load';

import { ClassUser, IResponseClassByUid } from '../../dtos/ClassByUidDTO';

import { api } from '../../services/api';

import {
    Container,
    TeacherList,
    StudentList,
    HeaderPeople,
    PeopleContent,
    AvatarPeople,
    NamePeople,
    Separator,
    ContentIsEmpty,
    TextIsEmpty,
} from './styles';

export function Peoples() {
    const [uidClass, setUidClass] = useState<string | null>('');
    const [nameMatterClass, setNameMatterClass] = useState('');
    const [teachers, setTeachers] = useState<ClassUser[]>([]);
    const [students, setStudents] = useState<ClassUser[]>([]);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    async function fetchPeoplesByClassUid() {
        const uidClass = await AsyncStorage.getItem('@uid_class');

        if (!uidClass || uidClass === '') {
            navigation.navigate('Home');
        }

        setUidClass(uidClass);

        try {
            const responseClassByUid = await api.get<IResponseClassByUid>(`/class/${uidClass}`);

            setNameMatterClass(responseClassByUid.data.name_matter_class);
            setTeachers(responseClassByUid.data.ClassUser.filter((user) => user.user.tipo_user === 'T'));
            setStudents(responseClassByUid.data.ClassUser.filter((user) => user.user.tipo_user === 'S'));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            fetchPeoplesByClassUid();
        }

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />

            <Header
                title={nameMatterClass}
            />

            {loading
                ? <Load />
                : <TeacherList
                    data={teachers}
                    keyExtractor={item => String(item.user.email_user)}
                    renderItem={({ item }) => (
                        <PeopleContent>
                            <AvatarPeople
                                source={{ uri: `http://192.168.1.11:8000/files${item.user.avatar}` }}
                                resizeMode="cover"
                            />

                            <NamePeople>
                                {item.user.name_user}
                            </NamePeople>
                        </PeopleContent>
                    )}
                    ListHeaderComponent={
                        <>
                            <HeaderPeople>
                                Professores
                            </HeaderPeople>

                            <Separator />

                            {teachers.length === 0 && (
                                <ContentIsEmpty>
                                    <TextIsEmpty>
                                        Nenhum professor vinculado.
                                    </TextIsEmpty>
                                </ContentIsEmpty>
                            )}
                        </>
                    }
                    ItemSeparatorComponent={() => <Separator />}
                    ListFooterComponent={
                        <StudentList
                            data={students}
                            keyExtractor={item => String(item.user.email_user)}
                            renderItem={({ item }) => (
                                <PeopleContent>
                                    <AvatarPeople
                                        source={{ uri: `http://192.168.1.11:8000/files${item.user.avatar}` }}
                                        resizeMode="cover"
                                    />

                                    <NamePeople>
                                        {item.user.name_user}
                                    </NamePeople>
                                </PeopleContent>
                            )}
                            ListHeaderComponent={
                                <>
                                    <HeaderPeople>
                                        Alunos
                                    </HeaderPeople>

                                    <Separator />

                                    {students.length === 0 && (
                                        <ContentIsEmpty>
                                            <TextIsEmpty>
                                                Nenhum aluno vinculado.
                                            </TextIsEmpty>
                                        </ContentIsEmpty>
                                    )}
                                </>
                            }
                            ItemSeparatorComponent={() => <Separator />}
                        />
                    }
                />
            }
        </Container>
    );
}