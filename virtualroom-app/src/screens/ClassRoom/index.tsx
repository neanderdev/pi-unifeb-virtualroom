import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Header } from '../../components/Header';
import { CardActivity } from '../../components/CardActivity';
import { InputComment } from '../../components/InputComment';
import { NoticeClass } from '../../components/NoticeClass';
import { Load } from '../../components/Load';

import { IResponseClassByUid } from '../../dtos/ClassByUidDTO';
import { IResponseAcitivities } from '../../dtos/ActivitiesByClassUidDTO';
import { IResponseClassNotice } from '../../dtos/ClassNoticeByClassUidDTO';

import { api } from '../../services/api';

import {
    Container,
    ActivityList,
    ClassNoticeList,
    ContentIsEmpty,
    TextIsEmpty,
} from './styles';

export function ClassRoom() {
    const [uidClass, setUidClass] = useState<string | null>('');
    const [nameMatterClass, setNameMatterClass] = useState('');
    const [activities, setActivities] = useState<IResponseAcitivities[]>([]);
    const [classNotice, setClassNotice] = useState<IResponseClassNotice[]>([]);
    const [loading, setLoading] = useState(true);
    const [noticeClass, setNoticeClass] = useState('');

    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    async function handleSendNoticeClass() {
        console.log(noticeClass)
    }

    async function fetchClasseByUid() {
        const uidClass = await AsyncStorage.getItem('@uid_class');

        if (!uidClass || uidClass === '') {
            navigation.navigate('Home');
        }

        setUidClass(uidClass);

        try {
            const responseClassByUid = await api.get<IResponseClassByUid>(`/class/${uidClass}`);
            const responseAllActivitiesByClassUid = await api.get<IResponseAcitivities[]>(`/activity/${uidClass}`);
            const responseClassNoticeByClassUid = await api.get<IResponseClassNotice[]>(`/list-all-class-notice/${uidClass}`);

            setNameMatterClass(responseClassByUid.data.name_matter_class);
            setActivities(responseAllActivitiesByClassUid.data);
            setClassNotice(responseClassNoticeByClassUid.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    async function handleActivity(uid_activity: string) {
        await AsyncStorage.setItem('@uid_activity', uid_activity);

        navigation.navigate('ActivityByUid');
    }

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            fetchClasseByUid();
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
                : activities.length === 0 && classNotice.length === 0
                    ? <ContentIsEmpty>
                        <TextIsEmpty>
                            Essa sala de aula ainda não tem atividade.
                        </TextIsEmpty>
                    </ContentIsEmpty>
                    : <ActivityList
                        data={activities}
                        keyExtractor={item => String(item.uid_activity)}
                        renderItem={({ item }) => <CardActivity data={item} onPress={() => handleActivity(item.uid_activity)} />}
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
                                data={classNotice}
                                keyExtractor={item => String(item.id_class_notice)}
                                renderItem={({ item }) => <NoticeClass data={item} />}
                            />
                        }
                    />
            }
        </Container>
    );
}