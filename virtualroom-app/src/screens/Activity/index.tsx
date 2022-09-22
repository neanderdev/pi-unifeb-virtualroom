import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Header } from '../../components/Header';
import { ActivityClass } from '../../components/ActivityClass';
import { Load } from '../../components/Load';

import { IResponseClassByUid } from '../../dtos/ClassByUidDTO';
import { IResponseAcitivities } from '../../dtos/ActivitiesByClassUidDTO';

import { api } from '../../services/api';

import {
    Container,
    ActivityList,
    ContentIsEmpty,
    TextIsEmpty,
} from './styles';

export function Activity() {
    const [uidClass, setUidClass] = useState<string | null>('');
    const [nameMatterClass, setNameMatterClass] = useState('');
    const [activities, setActivities] = useState<IResponseAcitivities[]>([]);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    async function fetchActivitiesByClassUid() {
        const uidClass = await AsyncStorage.getItem('@uid_class');

        if (!uidClass || uidClass === '') {
            navigation.navigate('Home');
        }

        setUidClass(uidClass);

        try {
            const responseClassByUid = await api.get<IResponseClassByUid>(`/class/${uidClass}`);
            const responseAllActivitiesByClassUid = await api.get<IResponseAcitivities[]>(`/activity/${uidClass}`);

            setNameMatterClass(responseClassByUid.data.name_matter_class);
            setActivities(responseAllActivitiesByClassUid.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            fetchActivitiesByClassUid();
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
                : activities.length === 0
                    ? <ContentIsEmpty>
                        <TextIsEmpty>
                            Essa sala de aula ainda não tem atividade.
                        </TextIsEmpty>
                    </ContentIsEmpty>
                    : <ActivityList
                        data={activities}
                        keyExtractor={item => String(item.uid_activity)}
                        renderItem={({ item }) => <ActivityClass data={item} />}
                    />
            }
        </Container>
    );
}