import React from 'react';
import { BorderlessButtonProps } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';

import { ClassResponse } from '../../dtos/ClassesDTO';

import {
    Container,
    DetailClass,
    MatterClass,
    NameClass,
    OptionClass,
} from './styles';

interface Props extends BorderlessButtonProps {
    data: ClassResponse;
};

export function Class({ data, ...rest }: Props) {
    return (
        <Container {...rest}>
            <DetailClass>
                <MatterClass numberOfLines={1}>
                    {data.name_matter_class}
                </MatterClass>

                <NameClass numberOfLines={1}>
                    {data.name_class}
                </NameClass>
            </DetailClass>

            <OptionClass>
                <MaterialIcons
                    name="more-vert"
                    size={24}
                    color="#000"
                />
            </OptionClass>
        </Container>
    );
}
