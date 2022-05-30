import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Box, Button, Flex, Heading, HStack, SimpleGrid, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue, useMediaQuery, useToast, VStack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import md5 from 'md5';

import { getMe } from "../../services/hooks/useMe";

import { setupAPIClient } from "../../services/api";
import { queryClient } from '../../services/queryClient';

import { withSSRAuth } from "../../utils/withSSRAuth";
import { maskWhatsApp, maskCPFOrCNPJ, maskPhone, maskCEP } from "../../utils/masks";

import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { MobileSidebar } from "../../components/Sidebar/MobileSidebar";
import { Input } from "../../components/Form/Input";
import { RadioButton } from "../../components/Form/RadioButton";
import { Switch } from "../../components/Form/Switch";

interface CreateUserFormData {
    ra_user: number;
    email_user: string;
    name_user: string;
    gender_user: string;
    cpf_cnpj_user: string;
    tel_res_user: string;
    tel_cel_user: string;
    endereco_user: string;
    numero_user: string;
    bairro_user: string;
    complemento_user: string;
    cep_user: string;
    cidade_user: string;
    uf_user: string;
    dt_nascimento_user: Date;
    dt_matricula_user: Date;
    situacao_user: boolean;
    senha: string;
    confirmacao_senha: string;
};

const createUserFormSchema = yup.object().shape({
    ra_user: yup.number().typeError("RA é somente número").required('RA obrigatório'),
    email_user: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    name_user: yup.string().required('Nome obrigatório'),
    gender_user: yup.string().required('Gênero obrigatório'),
    cpf_cnpj_user: yup.string().required('CPF/CNPJ obrigatório').min(14, "Formato de CPF inválido").max(18, "Formato de CNPJ inválido"),
    tel_res_user: yup.string().required('Telefone obrigatório').min(14, "Formato de telefone inválido"),
    tel_cel_user: yup.string().required('Celular obrigatório').min(15, "Formato de celular inválido"),
    endereco_user: yup.string().required('Endereço obrigatório'),
    numero_user: yup.string().required('Número obrigatório'),
    bairro_user: yup.string().required('Bairro obrigatório'),
    complemento_user: yup.string(),
    cep_user: yup.string().required('CEP obrigatório'),
    cidade_user: yup.string().required('Cidade obrigatório'),
    uf_user: yup.string().required('UF obrigatório'),
    dt_nascimento_user: yup.date().required("Data de nascimento obrigatório").max(new Date(), 'Não é possível incluir uma data futura').typeError("Data inválida"),
    dt_matricula_user: yup.date().required("Data de matrícula obrigatório").max(new Date(), 'Não é possível incluir uma data futura').typeError("Data inválida"),
    situacao_user: yup.boolean(),
    senha: yup.string().required('Senha obrigatória').min(6, 'No minímo 6 caracteres'),
    confirmacao_senha: yup.string().oneOf([
        null, yup.ref('senha'),
    ], 'As senhas precisam ser iguais'),
});

interface TeachersProps {
    uid_user: string;
};

interface CreateTeacherProps {
    uid_user: string;
};

export default function CreateTeacher({ uid_user }: CreateTeacherProps) {
    const router = useRouter();
    const toast = useToast();
    const [isSmallScreen] = useMediaQuery("(max-width: 768px)");
    const [tabIndex, setTabIndex] = useState(0);

    const createUser = useMutation(async (user: CreateUserFormData) => {
        const apiClient = setupAPIClient();
        const response = await apiClient.post('user', user);

        return response.data.user;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('user')
        },
    });

    const { register, handleSubmit, formState, getValues } = useForm({
        resolver: yupResolver(createUserFormSchema),
    });

    const { errors } = formState;

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
        const user = {
            ...values,
            senha: md5(values.senha),
            confirmacao_senha: md5(values.confirmacao_senha),
            tipo_user: "T",
            roles: "teacher"
        };

        try {
            await createUser.mutateAsync(user);

            await toast({
                title: 'Professor criado',
                description: "Professor criado com sucesso",
                status: 'success',
                duration: 2000,
                isClosable: true,
            })

            router.push('/teachers');
        } catch (err) {
            toast({
                title: 'Erro ao criar professor',
                description: `Erro: ${err.message}`,
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }
    }

    return (
        <Box>
            <Navbar title="Criar Professor" />

            <Box pos="relative" h="max-content" m={[2, , 5]}>
                <Stack direction="row" spacing={{ md: 5 }}>
                    <Sidebar uid_user={uid_user} />

                    {isSmallScreen && <MobileSidebar uid_user={uid_user} />}

                    <Box w="full">
                        <Box
                            as='form'
                            flex='1'
                            borderRadius={8}
                            bg={useColorModeValue('gray.200', 'gray.800')}
                            p={['6', '8']}
                            onSubmit={handleSubmit(handleCreateUser)}
                        >
                            <Heading size='lg' fontWeight='normal'>Criar professor</Heading>

                            <Tabs isLazy index={tabIndex} my='6' onChange={(index) => setTabIndex(index)}>
                                <TabList>
                                    <Tab _selected={{ borderColor: "pink.500", borderBottomWidth: "3.5px" }}>Dados Cadastrais</Tab>
                                    <Tab _selected={{ borderColor: "pink.500", borderBottomWidth: "3.5px" }}>Endereço</Tab>
                                </TabList>

                                <TabPanels>
                                    <TabPanel>
                                        <VStack spacing='8'>
                                            <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
                                                <Input
                                                    name='ra_user'
                                                    type="number"
                                                    label='RA'
                                                    {...register('ra_user')}
                                                    error={errors.ra_user}
                                                    bgColor={useColorModeValue('gray.50', 'gray.600')}
                                                    _hover={{
                                                        bgColor: useColorModeValue('gray.100', 'gray.500')
                                                    }}
                                                    _focus={{
                                                        bg: useColorModeValue('gray.100', 'gray.500'),
                                                    }}
                                                />
                                                <Input
                                                    name='name_user'
                                                    label='Nome Completo'
                                                    {...register('name_user')}
                                                    error={errors.name_user}
                                                    bgColor={useColorModeValue('gray.50', 'gray.600')}
                                                    _hover={{
                                                        bgColor: useColorModeValue('gray.100', 'gray.500')
                                                    }}
                                                    _focus={{
                                                        bg: useColorModeValue('gray.100', 'gray.500'),
                                                    }}
                                                />
                                                <Input
                                                    name='email_user'
                                                    type='email'
                                                    label='E-mail'
                                                    {...register('email_user')}
                                                    error={errors.email_user}
                                                    bgColor={useColorModeValue('gray.50', 'gray.600')}
                                                    _hover={{
                                                        bgColor: useColorModeValue('gray.100', 'gray.500')
                                                    }}
                                                    _focus={{
                                                        bg: useColorModeValue('gray.100', 'gray.500'),
                                                    }}
                                                />
                                            </SimpleGrid>

                                            <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
                                                <Input
                                                    name='cpf_cnpj_user'
                                                    label='CPF/CNPJ'
                                                    {...register('cpf_cnpj_user')}
                                                    error={errors.cpf_cnpj_user}
                                                    bgColor={useColorModeValue('gray.50', 'gray.600')}
                                                    _hover={{
                                                        bgColor: useColorModeValue('gray.100', 'gray.500')
                                                    }}
                                                    _focus={{
                                                        bg: useColorModeValue('gray.100', 'gray.500'),
                                                    }}
                                                    maxLength={18}
                                                    onChange={(e) => {
                                                        e.target.value = maskCPFOrCNPJ(e.target.value);
                                                    }}
                                                />
                                                <Input
                                                    name='tel_res_user'
                                                    label='Telefone'
                                                    {...register('tel_res_user')}
                                                    error={errors.tel_res_user}
                                                    bgColor={useColorModeValue('gray.50', 'gray.600')}
                                                    _hover={{
                                                        bgColor: useColorModeValue('gray.100', 'gray.500')
                                                    }}
                                                    _focus={{
                                                        bg: useColorModeValue('gray.100', 'gray.500'),
                                                    }}
                                                    maxLength={14}
                                                    onChange={(e) => {
                                                        e.target.value = maskPhone(e.target.value);
                                                    }}
                                                />
                                                <Input
                                                    name='tel_cel_user'
                                                    label='Celular'
                                                    {...register('tel_cel_user')}
                                                    error={errors.tel_cel_user}
                                                    bgColor={useColorModeValue('gray.50', 'gray.600')}
                                                    _hover={{
                                                        bgColor: useColorModeValue('gray.100', 'gray.500')
                                                    }}
                                                    _focus={{
                                                        bg: useColorModeValue('gray.100', 'gray.500'),
                                                    }}
                                                    maxLength={15}
                                                    onChange={(e) => {
                                                        e.target.value = maskWhatsApp(e.target.value);
                                                    }}
                                                />

                                                <RadioButton
                                                    name='gender_user'
                                                    label='Sexo'
                                                    {...register('gender_user')}
                                                    error={errors.gender_user}
                                                    arrayValuesRadio={[
                                                        {
                                                            value: 'M',
                                                            name: 'masculino',
                                                            id: 'masculino',
                                                            label: 'Masculino',
                                                        },
                                                        {
                                                            value: 'F',
                                                            name: 'feminino',
                                                            id: 'feminino',
                                                            label: 'Feminino',
                                                        }
                                                    ]}
                                                />
                                            </SimpleGrid>

                                            <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
                                                <Input
                                                    name='dt_nascimento_user'
                                                    type='date'
                                                    label='Data de Nascimento'
                                                    {...register('dt_nascimento_user')}
                                                    error={errors.dt_nascimento_user}
                                                    bgColor={useColorModeValue('gray.50', 'gray.600')}
                                                    _hover={{
                                                        bgColor: useColorModeValue('gray.100', 'gray.500')
                                                    }}
                                                    _focus={{
                                                        bg: useColorModeValue('gray.100', 'gray.500'),
                                                    }}
                                                />
                                                <Input
                                                    name='dt_matricula_user'
                                                    type='date'
                                                    label='Data de Matrícula'
                                                    {...register('dt_matricula_user')}
                                                    error={errors.dt_matricula_user}
                                                    bgColor={useColorModeValue('gray.50', 'gray.600')}
                                                    _hover={{
                                                        bgColor: useColorModeValue('gray.100', 'gray.500')
                                                    }}
                                                    _focus={{
                                                        bg: useColorModeValue('gray.100', 'gray.500'),
                                                    }}
                                                />
                                                <Switch
                                                    name='situacao_user'
                                                    label='Situação'
                                                    {...register('situacao_user')}
                                                    error={errors.situacao_user}
                                                />
                                            </SimpleGrid>

                                            <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
                                                <Input
                                                    name='senha'
                                                    type='password'
                                                    label='Senha'
                                                    {...register('senha')}
                                                    error={errors.senha}
                                                    bgColor={useColorModeValue('gray.50', 'gray.600')}
                                                    _hover={{
                                                        bgColor: useColorModeValue('gray.100', 'gray.500')
                                                    }}
                                                    _focus={{
                                                        bg: useColorModeValue('gray.100', 'gray.500'),
                                                    }}
                                                />
                                                <Input
                                                    name='confirmacao_senha'
                                                    type='password'
                                                    label='Confirmação da senha'
                                                    {...register('confirmacao_senha')}
                                                    error={errors.confirmacao_senha}
                                                    bgColor={useColorModeValue('gray.50', 'gray.600')}
                                                    _hover={{
                                                        bgColor: useColorModeValue('gray.100', 'gray.500')
                                                    }}
                                                    _focus={{
                                                        bg: useColorModeValue('gray.100', 'gray.500'),
                                                    }}
                                                    onBlur={(e) => setTabIndex(1)}
                                                />
                                            </SimpleGrid>
                                        </VStack>
                                    </TabPanel>

                                    <TabPanel>
                                        <VStack spacing='8'>
                                            <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
                                                <Input
                                                    name='cep_user'
                                                    label='CEP'
                                                    {...register('cep_user')}
                                                    error={errors.cep_user}
                                                    bgColor={useColorModeValue('gray.50', 'gray.600')}
                                                    _hover={{
                                                        bgColor: useColorModeValue('gray.100', 'gray.500')
                                                    }}
                                                    _focus={{
                                                        bg: useColorModeValue('gray.100', 'gray.500'),
                                                    }}
                                                    onChange={(e) => {
                                                        e.target.value = maskCEP(e.target.value);
                                                    }}
                                                    maxLength={9}
                                                />
                                                <Input
                                                    name='uf_user'
                                                    label='UF'
                                                    {...register('uf_user')}
                                                    error={errors.uf_user}
                                                    bgColor={useColorModeValue('gray.50', 'gray.600')}
                                                    _hover={{
                                                        bgColor: useColorModeValue('gray.100', 'gray.500')
                                                    }}
                                                    _focus={{
                                                        bg: useColorModeValue('gray.100', 'gray.500'),
                                                    }}
                                                />
                                                <Input
                                                    name='cidade_user'
                                                    label='Cidade'
                                                    {...register('cidade_user')}
                                                    error={errors.cidade_user}
                                                    bgColor={useColorModeValue('gray.50', 'gray.600')}
                                                    _hover={{
                                                        bgColor: useColorModeValue('gray.100', 'gray.500')
                                                    }}
                                                    _focus={{
                                                        bg: useColorModeValue('gray.100', 'gray.500'),
                                                    }}
                                                />
                                            </SimpleGrid>

                                            <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
                                                <Input
                                                    name='endereco_user'
                                                    label='Endereço'
                                                    {...register('endereco_user')}
                                                    error={errors.endereco_user}
                                                    bgColor={useColorModeValue('gray.50', 'gray.600')}
                                                    _hover={{
                                                        bgColor: useColorModeValue('gray.100', 'gray.500')
                                                    }}
                                                    _focus={{
                                                        bg: useColorModeValue('gray.100', 'gray.500'),
                                                    }}
                                                />
                                                <Input
                                                    name='numero_user'
                                                    label='Número'
                                                    {...register('numero_user')}
                                                    error={errors.numero_user}
                                                    bgColor={useColorModeValue('gray.50', 'gray.600')}
                                                    _hover={{
                                                        bgColor: useColorModeValue('gray.100', 'gray.500')
                                                    }}
                                                    _focus={{
                                                        bg: useColorModeValue('gray.100', 'gray.500'),
                                                    }}
                                                />
                                                <Input
                                                    name='bairro_user'
                                                    label='Bairro'
                                                    {...register('bairro_user')}
                                                    error={errors.bairro_user}
                                                    bgColor={useColorModeValue('gray.50', 'gray.600')}
                                                    _hover={{
                                                        bgColor: useColorModeValue('gray.100', 'gray.500')
                                                    }}
                                                    _focus={{
                                                        bg: useColorModeValue('gray.100', 'gray.500'),
                                                    }}
                                                />
                                                <Input
                                                    name='complemento_user'
                                                    label='Complemento'
                                                    {...register('complemento_user')}
                                                    error={errors.complemento_user}
                                                    bgColor={useColorModeValue('gray.50', 'gray.600')}
                                                    _hover={{
                                                        bgColor: useColorModeValue('gray.100', 'gray.500')
                                                    }}
                                                    _focus={{
                                                        bg: useColorModeValue('gray.100', 'gray.500'),
                                                    }}
                                                />
                                            </SimpleGrid>
                                        </VStack>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>

                            <Flex mt='8' justify='flex-end'>
                                <HStack spacing='4'>
                                    <Link href='/teachers' passHref>
                                        <Button colorScheme='whiteAlpha'>Cancelar</Button>
                                    </Link>

                                    <Button type='submit' colorScheme='pink' isLoading={formState.isSubmitting}>Salvar</Button>
                                </HStack>
                            </Flex>
                        </Box>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const { me } = await getMe(ctx);

    return {
        props: {
            uid_user: me.uid_user,
        }
    };
})