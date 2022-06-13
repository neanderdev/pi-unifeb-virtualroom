import { useRouter } from "next/router";
import Link from "next/link";
import { Box, Button, Flex, Heading, HStack, Image, SimpleGrid, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue, useMediaQuery, useToast, VStack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';

import { getMe } from "../services/hooks/useMe";
import { setupAPIClient } from "../services/api";
import { queryClient } from "../services/queryClient";

import { withSSRAuth } from "../utils/withSSRAuth";

import { formatterDateTimeForInput, maskCEP, maskPhone, maskWhatsApp } from "../utils/masks";

import { Navbar } from "../components/Navbar";
import { MobileSidebar } from "../components/Sidebar/MobileSidebar";
import { Sidebar } from "../components/Sidebar";
import { Input } from "../components/Form/Input";
import { RadioButton } from "../components/Form/RadioButton";

interface Me {
    uid_user: string;
    email_user: string;
    name_user: string;
    gender_user: string;
    tel_cel_user: string;
    tel_res_user: string;
    endereco_user: string;
    numero_user: string;
    bairro_user: string;
    complemento_user: string;
    cep_user: string;
    cidade_user: string;
    uf_user: string;
    avatar: string | any;
};

interface UpdateMeFormData {
    uid_user: string;
    email_user: string;
    name_user: string;
    gender_user: string;
    tel_cel_user: string;
    tel_res_user: string;
    endereco_user: string;
    numero_user: string;
    bairro_user: string;
    complemento_user: string;
    cep_user: string;
    cidade_user: string;
    uf_user: string;
};

interface UploadAvatarFormData {
    uid_user: String;
    data: any;
};

interface ISettingProps {
    me: Me,
};

const updateMeFormSchema = yup.object().shape({
    name_user: yup.string().required('Nome obrigatório'),
    email_user: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    gender_user: yup.string().required('Gênero obrigatório'),
    tel_res_user: yup.string().required('Telefone obrigatório').min(14, "Formato de telefone inválido"),
    tel_cel_user: yup.string().required('Celular obrigatório').min(15, "Formato de celular inválido"),
    endereco_user: yup.string().required('Endereço obrigatório'),
    numero_user: yup.string().required('Número obrigatório'),
    bairro_user: yup.string().required('Bairro obrigatório'),
    complemento_user: yup.string(),
    cep_user: yup.string().required('CEP obrigatório'),
    cidade_user: yup.string().required('Cidade obrigatório'),
    uf_user: yup.string().required('UF obrigatório'),
    avatar: yup.mixed()
        .required('A file is required')
        // .test('isEmpty', "File is empty", (value) => value.length > 0)
        .test('fileSize', "Arquivo é muito grande", (value) => !value[0] || (value[0] && value[0].size <= 2000000))
        .test("type", "Aceita apenas os formatos: .png, .jpeg e .jpg", (value) => !value[0] || (value[0] && ["image/png", "image/jpeg", "image/jpg"].includes(value[0].type))),
});

export default function Setting({ me }: ISettingProps) {
    const router = useRouter();
    const toast = useToast();
    const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

    const updateMe = useMutation(async (me: UpdateMeFormData) => {
        const apiClient = setupAPIClient();
        const response = await apiClient.put('me', me);

        return response;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('userUid')
            queryClient.invalidateQueries('user')
            queryClient.invalidateQueries('class')
            queryClient.invalidateQueries('me')
        },
    });

    const uploadUserAvatar = useMutation(async ({ uid_user, data }: UploadAvatarFormData) => {
        const apiClient = setupAPIClient();
        const response = await apiClient.patch(`upload-avatar-user/${uid_user}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            transformRequest: (data) => {
                return data;
            },
            onUploadProgress: (e) => {
                const progress = Math.round((e.loaded * 100) / e.total);
            }
        });

        return response;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('userUid')
            queryClient.invalidateQueries('user')
            queryClient.invalidateQueries('class')
            queryClient.invalidateQueries('me')
        },
    });


    const { register, handleSubmit, formState, getValues } = useForm({
        resolver: yupResolver(updateMeFormSchema),
        defaultValues: {
            name_user: me.name_user,
            email_user: me.email_user,
            gender_user: me.gender_user,
            tel_res_user: me.tel_res_user,
            tel_cel_user: me.tel_cel_user,
            endereco_user: me.endereco_user,
            numero_user: me.numero_user,
            bairro_user: me.bairro_user,
            complemento_user: me.complemento_user,
            cep_user: me.cep_user,
            cidade_user: me.cidade_user,
            uf_user: me.uf_user,
            avatar: me.avatar,
        },
    });

    const { errors } = formState;

    const handleUpdateMe: SubmitHandler<Me> = async (values) => {
        try {
            const user = {
                uid_user: me.uid_user,
                email_user: values.email_user,
                name_user: values.name_user,
                gender_user: values.gender_user,
                tel_cel_user: values.tel_cel_user,
                tel_res_user: values.tel_res_user,
                endereco_user: values.endereco_user,
                numero_user: values.numero_user,
                bairro_user: values.bairro_user,
                complemento_user: values.complemento_user,
                cep_user: values.cep_user,
                cidade_user: values.cidade_user,
                uf_user: values.uf_user,
            };

            await updateMe.mutateAsync(user);

            await toast({
                title: 'Configuração atualizado',
                description: "Configuração atualizado com sucesso",
                status: 'success',
                duration: 1500,
                isClosable: true,
            });

            if (values.avatar.length > 0) {
                let data = new FormData();

                data.append("avatar", values.avatar[0]);

                await uploadUserAvatar.mutateAsync({ uid_user: me.uid_user, data });
            }

            router.push('/rooms');
        } catch (err) {
            toast({
                title: 'Erro ao atualizar configuração',
                description: `Erro: ${err.response?.data?.message ?? err.message}`,
                status: 'error',
                duration: 1500,
                isClosable: true,
            });
        }
    }

    return (
        <Box>
            <Navbar title="Configuração" />

            <Box pos="relative" h="max-content" m={[2, , 5]}>
                <Stack direction="row" spacing={{ md: 5 }}>
                    <Sidebar uid_user={me.uid_user} />

                    {isSmallScreen && <MobileSidebar uid_user={me.uid_user} />}

                    <Box w="full">
                        <Box
                            as='form'
                            flex='1'
                            borderRadius={8}
                            bg={useColorModeValue('gray.200', 'gray.800')}
                            p={['6', '8']}
                            onSubmit={handleSubmit(handleUpdateMe)}
                        >
                            <Heading size='lg' fontWeight='normal'>Configuração</Heading>

                            <Tabs isLazy my='6'>
                                <TabList>
                                    <Tab _selected={{ borderColor: "pink.500", borderBottomWidth: "3.5px" }}>Dados Cadastrais</Tab>
                                    <Tab _selected={{ borderColor: "pink.500", borderBottomWidth: "3.5px" }}>Endereço</Tab>
                                    <Tab _selected={{ borderColor: "pink.500", borderBottomWidth: "3.5px" }}>Avatar</Tab>
                                </TabList>

                                <TabPanels>
                                    <TabPanel>
                                        <VStack spacing='8'>
                                            <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
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
                                                    valueChecked={me.gender_user}
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

                                    <TabPanel>
                                        <VStack spacing='8'>
                                            <Input
                                                name='avatar'
                                                type="file"
                                                label='Avatar'
                                                {...register('avatar')}
                                                error={errors.avatar}
                                                bgColor={useColorModeValue('gray.50', 'gray.600')}
                                                _hover={{
                                                    bgColor: useColorModeValue('gray.100', 'gray.500')
                                                }}
                                                _focus={{
                                                    bg: useColorModeValue('gray.100', 'gray.500'),
                                                }}
                                                accept="image/*"
                                            />

                                            {me.avatar !== "" ? (
                                                <Image
                                                    me={{ md: "22px" }}
                                                    src={`http://localhost:8000/files${me.avatar}`}
                                                    alt="Avatar User"
                                                    fallbackSrc="/no_image.jpg"
                                                    w='100px'
                                                    h='100px'
                                                    borderRadius='15px'
                                                />
                                            ) : null}
                                        </VStack>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>

                            <Flex mt='8' justify='flex-end'>
                                <HStack spacing='4'>
                                    <Link href='/rooms' passHref>
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

    me.dt_nascimento_user = formatterDateTimeForInput(new Date(me.dt_nascimento_user)).split("T")[0];

    return {
        props: {
            me,
        }
    };
}, {
    roles: ['admin', 'teacher', 'student']
})