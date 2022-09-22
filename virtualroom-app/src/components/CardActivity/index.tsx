import React from 'react';
import { BorderlessButtonProps } from "react-native-gesture-handler";
import { Fontisto, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { IResponseAcitivities } from '../../dtos/ActivitiesByClassUidDTO';

import { formatterDate } from '../../utils/formatterDate';

import {
    Container,
    ActivityContent,
    IconContainer,
    Detail,
    TitleActivity,
    DatePublishedActivity,
} from './styles';

interface Props extends BorderlessButtonProps {
    data: IResponseAcitivities;
}

export function CardActivity({ data, ...rest }: Props) {
    return (
        <Container {...rest}>
            <ActivityContent>
                <IconContainer>
                    {
                        data.category_activity.tipo_category_activity === 'C'
                            ? <Fontisto
                                name="checkbox-active"
                                size={24}
                                color="#FFF"
                            />
                            : data.category_activity.tipo_category_activity === 'M'
                                ? <MaterialIcons
                                    name="note-add"
                                    size={24}
                                    color="#FFF"
                                />
                                : <MaterialCommunityIcons
                                    name="bag-personal-outline"
                                    size={24}
                                    color="#FFF"
                                />
                    }
                </IconContainer>

                <Detail>
                    <TitleActivity numberOfLines={1}>
                        {data.name_activity}
                    </TitleActivity>

                    <DatePublishedActivity numberOfLines={1}>
                        {formatterDate(data.createdAt_activity)}
                    </DatePublishedActivity>
                </Detail>
            </ActivityContent>
        </Container>
    );
}