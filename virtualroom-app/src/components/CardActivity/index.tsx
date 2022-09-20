import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { BorderlessButtonProps } from "react-native-gesture-handler";

import {
    Container,
    ActivityContent,
    IconContainer,
    Detail,
    TitleActivity,
    DatePublishedActivity,
} from './styles';

interface Activity {
    id: string;
    name: string;
    dataPublished: string;
}

interface Props extends BorderlessButtonProps {
    data: Activity;
}

export function CardActivity({ data, ...rest }: Props) {
    return (
        <Container {...rest}>
            <ActivityContent>
                <IconContainer>
                    <MaterialIcons
                        name="menu"
                        size={24}
                        color="#FFF"
                    />
                </IconContainer>

                <Detail>
                    <TitleActivity numberOfLines={1}>
                        {data.name}
                    </TitleActivity>

                    <DatePublishedActivity numberOfLines={1}>
                        {data.dataPublished}
                    </DatePublishedActivity>
                </Detail>
            </ActivityContent>
        </Container>
    );
}