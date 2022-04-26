import { useContext } from 'react';
import { Flex, Button, Stack, Text } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { AuthContext } from '../contexts/AuthContext';

import { Input } from '../components/Form/Input';

type SignInFormData = {
    ra: number;
    senha: string;
}

const signInFormSchema = yup.object().shape({
    ra: yup.number().required('RA obrigatório'),
    senha: yup.string().required('Senha obrigatória'),
});

export default function SignIn() {
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(signInFormSchema),
    });

    const { errors } = formState;

    const { signIn } = useContext(AuthContext);

    const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
        await signIn(values);
    }

    return (
        <Flex
            w='100vw'
            h='100vh'
            align='center'
            justify='center'
            direction="column"
        >
            <Text
                fontSize={['2xl', '3xl']}
                fontWeight="bold"
                letterSpacing="tight"
                w="64"
                align="center"
                mb="6"
            >
                feb
                <Text as="span" ml="1" color="pink.500">
                    room
                </Text>
            </Text>

            <Flex
                as='form'
                width='100%'
                maxWidth={360}
                bg='gray.100'
                p='8'
                borderRadius={8}
                flexDir='column'
                onSubmit={handleSubmit(handleSignIn)}
            >
                <Stack spacing='4'>
                    <Input
                        name='ra'
                        type='number'
                        label='RA'
                        {...register('ra')}
                        error={errors.ra}
                    />

                    <Input
                        name='senha'
                        type='password'
                        label='Senha'
                        {...register('senha')}
                        error={errors.senha}
                    />
                </Stack>

                <Button
                    type='submit'
                    mt='6'
                    colorScheme='pink'
                    size='lg'
                    isLoading={formState.isSubmitting}
                    loadingText="Fazendo login..."
                >
                    Entrar
                </Button>
            </Flex>
        </Flex>
    )
}