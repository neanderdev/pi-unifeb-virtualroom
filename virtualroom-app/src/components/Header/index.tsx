import React, { useState, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { PopoverHeader } from '../PopoverHeader';

import {
    Container,
    HeaderContent,
    Menu,
    MenuButton,
    TitleHeader,
    AvatarButton,
    Avatar
} from './styles';

interface Props {
    title?: string;
};

export function Header({ title = 'Febroom' }: Props) {
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
                    <MenuButton>
                        <MaterialIcons
                            name="menu"
                            size={24}
                            color="#FFF"
                        />
                    </MenuButton>

                    <TitleHeader numberOfLines={1}>
                        {title}
                    </TitleHeader>
                </Menu>

                <AvatarButton onPress={() => resizeBox(1)}>
                    <Avatar
                        source={{ uri: 'https://github.com/neanderdev.png' }}
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