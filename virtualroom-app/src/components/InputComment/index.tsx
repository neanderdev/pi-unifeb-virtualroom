import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { useAuth } from '../../hooks/auth';

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
    const { user } = useAuth();

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
                    source={{ uri: `http://192.168.1.11:8000/files${user.avatar}` }}
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

            <BorderlessButton onPress={onPressSend} enabled={!!value}>
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