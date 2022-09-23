import React from 'react';
import { Modal, SafeAreaView, Animated, TouchableOpacity } from 'react-native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { useAuth } from '../../hooks/auth';

import { Title } from './styles';

interface Props {
    visible: boolean;
    scale: Animated.Value;
    resizeBox: (to: number) => void;
};

export function PopoverHeader({ visible, scale, resizeBox }: Props) {
    const theme = useTheme();
    const { signOut } = useAuth();

    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    function handleAllActivities() {
        navigation.navigate('AllActivities');
    }

    return (
        <Modal transparent visible={visible}>
            <SafeAreaView
                style={{ flex: 1 }}
                onTouchStart={() => resizeBox(0)}
            >
                <Animated.View
                    style={{
                        borderRadius: 8,
                        borderColor: theme.colors.text_detail,
                        borderWidth: 1,
                        backgroundColor: theme.colors.background_primary,
                        paddingHorizontal: 24,
                        position: 'absolute',
                        top: 38,
                        right: 20,
                        opacity: scale.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }),
                        transform: [{ scale },],
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingVertical: 7,
                            borderBottomWidth: 1,
                            borderBottomColor: theme.colors.text_detail,
                        }}
                        onPress={handleAllActivities}
                    >
                        <Title>Atividades</Title>

                        <MaterialIcons
                            name="add"
                            size={24}
                            color={theme.colors.shape_dark}
                            style={{
                                marginLeft: 12,
                            }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingVertical: 7,
                        }}
                        onPress={signOut}
                    >
                        <Title>Logout</Title>

                        <MaterialIcons
                            name="logout"
                            size={24}
                            color={theme.colors.shape_dark}
                            style={{
                                marginLeft: 12,
                            }}
                        />
                    </TouchableOpacity>
                </Animated.View>
            </SafeAreaView>
        </Modal>
    );
}