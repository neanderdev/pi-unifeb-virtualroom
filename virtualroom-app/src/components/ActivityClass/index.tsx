import React from 'react';
import { BorderlessButtonProps } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';

import {
    Container,
    ActivityContent,
    IconContainer,
    DetailActivity,
    TitleActivity,
    DatePublishedActivity,
} from './styles';

interface Activity {
    id: string;
    name: string;
    dataPublished: string;
};

interface Props extends BorderlessButtonProps {
    data: Activity;
};

export function ActivityClass({ data, ...rest }: Props) {
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

                <DetailActivity>
                    <TitleActivity numberOfLines={1}>
                        {data.name}
                    </TitleActivity>

                    <DatePublishedActivity numberOfLines={1}>
                        Data de postagem: {data.dataPublished}
                    </DatePublishedActivity>
                </DetailActivity>
            </ActivityContent>
        </Container>
    );
}