import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

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
}

export function Header({ title = 'Febroom' }: Props) {
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

                <AvatarButton>
                    <Avatar
                        source={{ uri: 'https://github.com/neanderdev.png' }}
                        resizeMode="cover"
                    />
                </AvatarButton>
            </HeaderContent>
        </Container>
    );
}