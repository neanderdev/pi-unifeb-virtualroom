import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { StatusBar } from 'react-native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet from '@gorhom/bottom-sheet';
import * as DocumentPicker from "expo-document-picker";
import { useTheme } from 'styled-components';

import { Header } from '../../components/Header';
import { Load } from '../../components/Load';
import { ActivityUid } from '../../components/ActivityUid';

import { IResponseClassByUid } from '../../dtos/ClassByUidDTO';
import { IResponseActivityByUid } from '../../dtos/ActivityByUidDTO';
import { IResponseMe } from '../../dtos/MeDTO';
import { IResponseDetailActivityByUserUid, MaterialDetailActivity } from '../../dtos/DetailActivityDTO';

import { useAuth } from '../../hooks/auth';

import { api } from '../../services/api';

import {
    Container,
    ContainerBottomSheet,
    Content,
    Title,
    DetailActivity,
    TitleDetailActivity,
    DetailActivityButton,
    Buttons,
    Button,
    TitleButton,
    MaterialDetailActivityList,
    Separator,
} from './styles';

export function ActivityByUid() {
    const { user } = useAuth();

    const [uidClass, setUidClass] = useState<string | null>('');
    const [uidActivity, setUidActivity] = useState<string | null>('');
    const [nameMatterClass, setNameMatterClass] = useState('');
    const [activity, setActivity] = useState<IResponseActivityByUid>({} as IResponseActivityByUid);
    const [detailActivity, setDetailActivity] = useState<IResponseDetailActivityByUserUid | null>(null);
    const [loading, setLoading] = useState(true);
    const [indexBottomSheet, setIndexBottomSheet] = useState(1);

    const theme = useTheme();

    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['20%', '89%'], []);
    const handleSheetChanges = useCallback((index: number) => {
        setIndexBottomSheet(index);
    }, []);

    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    async function fetchActivityByUid() {
        const uidClass = await AsyncStorage.getItem('@uid_class');
        const uidActivity = await AsyncStorage.getItem('@uid_activity');

        if (!uidClass || uidClass === '') {
            navigation.navigate('Home');
        }

        if (!uidActivity || uidActivity === '') {
            navigation.navigate('Home');
        }

        setUidClass(uidClass);
        setUidActivity(uidActivity);

        try {
            const responseClassByUid = await api.get<IResponseClassByUid>(`/class/${uidClass}`);
            const responseActivityByUid = await api.get<IResponseActivityByUid>(`/find-by-activity-uid/${uidActivity}`);
            const responseMe = await api.get<IResponseMe>('/me');
            const responseDetailActivity = await api.get<IResponseDetailActivityByUserUid | null>(`detail-activity/${uidActivity}/${responseMe.data.uid_user}`);

            setNameMatterClass(responseClassByUid.data.name_matter_class);
            setActivity(responseActivityByUid.data);
            setDetailActivity(responseDetailActivity.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    async function handleUploadDocument() {
        const result = await DocumentPicker.getDocumentAsync({
            multiple: true,
            type: ["png/*", "jpg/*", "jpeg/*", "pdf/*", "doc/*", "docx/*", "zip/*", "rar/*"],
        });

        if (result.type === 'cancel') {
            return;
        }

        console.log(result);
    }

    async function handleDownloadDetailActivity(data: MaterialDetailActivity) {
        console.log(`http://192.168.1.11:8000/files${data.link_material_detail_activity}`);
    }

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            fetchActivityByUid();
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
                : <ActivityUid
                    dataActivity={activity}
                    dataDetailActivity={detailActivity}
                />
            }

            {["student"].includes(user.roles) && (
                <BottomSheet
                    ref={bottomSheetRef}
                    index={0}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    backgroundStyle={{
                        backgroundColor: theme.colors.background_secondary,
                    }}
                >
                    <ContainerBottomSheet>
                        <Content>
                            <Title>
                                Seu trabalho
                            </Title>

                            {indexBottomSheet === 1 && (
                                <MaterialDetailActivityList
                                    data={detailActivity?.MaterialDetailActivity ?? []}
                                    keyExtractor={item => String(item.id_material_detail_activity)}
                                    renderItem={({ item }) => (
                                        <DetailActivity>
                                            <TitleDetailActivity numberOfLines={1}>
                                                {item.name_material_detail_activity}
                                            </TitleDetailActivity>

                                            <DetailActivityButton>
                                                <MaterialIcons
                                                    name='close'
                                                    size={20}
                                                />
                                            </DetailActivityButton>

                                            <DetailActivityButton onPress={() => handleDownloadDetailActivity(item)}>
                                                <MaterialIcons
                                                    name='file-download'
                                                    size={20}
                                                />
                                            </DetailActivityButton>
                                        </DetailActivity>
                                    )}
                                    ItemSeparatorComponent={() => <Separator />}
                                />
                            )}

                            <Buttons>
                                {detailActivity === null && (
                                    <Button onPress={handleUploadDocument} light>
                                        <TitleButton>
                                            Adicionar trabalho
                                        </TitleButton>
                                    </Button>
                                )}

                                <Button isFinalized={!!detailActivity}>
                                    <TitleButton>
                                        {!!detailActivity ? 'Cancelar entrega' : 'Entregar atividade'}
                                    </TitleButton>
                                </Button>
                            </Buttons>
                        </Content>
                    </ContainerBottomSheet>
                </BottomSheet>
            )}
        </Container>
    );
}