import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import {
    Container,
    IconContainer,
    Avatar,
    InputText,
    Icon,
} from './styles';

interface Props extends TextInputProps {
    value?: string;
    onPressSend: () => Promise<void>;
}

export function InputComment({
    value,
    onPressSend,
    ...rest
}: Props) {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    function handleInputFocus() {
        setIsFocused(true);
    }

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!value)
    }

    return (
        <Container>
            <IconContainer isFocused={isFocused}>
                <Avatar
                    isFocused={(isFocused || isFilled) ? true : false}
                    source={{ uri: 'https://github.com/neanderdev.png' }}
                    resizeMode="cover"
                />
            </IconContainer>

            <InputText
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                autoCorrect={false}
                isFocused={isFocused}
                {...rest}
            />

            <BorderlessButton onPress={onPressSend}>
                <IconContainer isFocused={isFocused}>
                    <Icon
                        name='send'
                        size={24}
                        isFocused={isFocused}
                    />
                </IconContainer>
            </BorderlessButton>
        </Container>
    );
}