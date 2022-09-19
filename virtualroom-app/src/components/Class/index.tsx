import React from 'react';
import { BorderlessButtonProps } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';

import {
    Container,
    DetailClass,
    MatterClass,
    NameClass,
    OptionClass,
} from './styles';

interface ClassProps {
    nameClass: string;
    nameMatterClass: string;
};

interface Props extends BorderlessButtonProps {
    data: ClassProps;
};

export function Class({ data, ...rest }: Props) {
    return (
        <Container {...rest}>
            <DetailClass>
                <MatterClass numberOfLines={1}>
                    {data.nameClass}
                </MatterClass>

                <NameClass numberOfLines={1}>
                    {data.nameMatterClass}
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
