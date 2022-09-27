import React, { useState, useRef } from 'react';
import { Animated, Easing } from 'react-native';

import { PopoverHeader } from '../PopoverHeader';

import { useAuth } from '../../hooks/auth';

import {
    Container,
    HeaderContent,
    Menu,
    TitleHeader,
    AvatarButton,
    Avatar
} from './styles';

interface Props {
    title?: string;
};

export function Header({ title = 'Febroom' }: Props) {
    const { user } = useAuth();

    const [visible, setVisible] = useState(false);
    const scale = useRef(new Animated.Value(0)).current;

    function resizeBox(to: number) {
        to === 1 && setVisible(true);

        Animated.timing(scale, {
            toValue: to,
            useNativeDriver: true,
            duration: 200,
            easing: Easing.linear,
        }).start(() => to === 0 && setVisible(false));
    }

    return (
        <Container>
            <HeaderContent>
                <Menu>
                    <TitleHeader numberOfLines={1}>
                        {title}
                    </TitleHeader>
                </Menu>

                <AvatarButton onPress={() => resizeBox(1)}>
                    <Avatar
                        source={{ uri: `http://192.168.1.11:8000/files${user.avatar}` }}
                        resizeMode="cover"
                    />
                </AvatarButton>
            </HeaderContent>

            <PopoverHeader
                visible={visible}
                scale={scale}
                resizeBox={resizeBox}
            />
        </Container>
    );
}