import React, { useState } from 'react';
import {
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import * as Yup from 'yup';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import theme from '../../styles/theme';

import {
    Container,
    Header,
    Title,
    SubTitle,
    Form,
    Footer
} from './styles';

export function SignIn() {
    const [ra, setRa] = useState('');
    const [password, setPassword] = useState('');

    async function handleSignIn() {
        try {
            const schema = Yup.object().shape({
                ra: Yup.number().required('RA obrigatório').typeError('RA é somente número'),
                password: Yup.string().required('A senha é obrigatória'),
            });

            await schema.validate({ ra, password });

            Alert.alert('Tudo certo');

            // Fazer login.
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return Alert.alert('Error', error.message);
            } else {
                return Alert.alert(
                    'Erro na autentitacação',
                    'Ocorreu um erro ao fazer login, verifique as credenciais'
                );
            }
        }
    }

    return (
        <Container>
            <KeyboardAvoidingView behavior="position" enabled>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Container>
                        <StatusBar
                            barStyle="dark-content"
                            backgroundColor="transparent"
                            translucent
                        />

                        <Header>
                            <Title>
                                Estamos {'\n'}
                                quase lá.
                            </Title>

                            <SubTitle>
                                Faça seu login para começar {'\n'}
                                uma experiência incrível nos seus estudos.
                            </SubTitle>
                        </Header>

                        <Form>
                            <Input
                                iconName="user"
                                placeholder="RA"
                                keyboardType="number-pad"
                                autoCorrect={false}
                                autoCapitalize="none"
                                onChangeText={setRa}
                                value={ra}
                            />

                            <PasswordInput
                                iconName="lock"
                                placeholder="Senha"
                                onChangeText={setPassword}
                                value={password}
                            />
                        </Form>

                        <Footer>
                            <Button
                                title="Login"
                                onPress={handleSignIn}
                            // enabled={!isLogging}
                            // loading={isLogging}
                            />

                            <Button
                                title="Esqueceu sua senha"
                                color={theme.colors.background_secondary}
                                light
                            />
                        </Footer>

                    </Container>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Container>
    );
}