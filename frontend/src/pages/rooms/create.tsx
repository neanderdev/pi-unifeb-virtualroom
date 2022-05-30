import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, Stack, useColorModeValue, useMediaQuery, useToast, VStack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';

import { getMe } from "../../services/hooks/useMe";
import { setupAPIClient } from "../../services/api";
import { queryClient } from '../../services/queryClient';

import { withSSRAuth } from "../../utils/withSSRAuth";

import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { MobileSidebar } from "../../components/Sidebar/MobileSidebar";
import { Input } from "../../components/Form/Input";

interface CreateClassFormData {
    name_class: string;
    name_matter_class: string;
    background_class_file?: any;
};

interface UploadBackgroundClassFormData {
    uid_class: String;
    data: any;
};

interface GetResponseCreateClass {
    uid_class: string;
    name_class: string;
    name_matter_class: string;
    background_class: string;
    createdAt_class: Date;
    updatedAt_class: Date;
};

const createClassFormSchema = yup.object().shape({
    name_class: yup.string().required('Nome da classe obrigatório'),
    name_matter_class: yup.string().required('Nome da matéria obrigatório'),
    background_class_file: yup.mixed()
        .required('A file is required')
        // .test('isEmpty', "File is empty", (value) => value.length > 0)
        .test('fileSize', "Arquivo é muito grande", (value) => !value[0] || (value[0] && value[0].size <= 2000000))
        .test("type", "Aceita apenas os formatos: .png, .jpeg e .jpg", (value) => !value[0] || (value[0] && ["image/png", "image/jpeg", "image/jpg"].includes(value[0].type))),
});

interface CreateRoomProps {
    uid_user: string;
};

export default function CreateRoom({ uid_user }: CreateRoomProps) {
    const router = useRouter();
    const toast = useToast();
    const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

    const createClass = useMutation(async (createClass: CreateClassFormData) => {
        const apiClient = setupAPIClient();
        const response = await apiClient.post<GetResponseCreateClass>('class', createClass);

        return response.data;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('class')
        },
    });

    const uploadBackgroundClass = useMutation(async ({ uid_class, data }: UploadBackgroundClassFormData) => {
        const apiClient = setupAPIClient();
        const response = await apiClient.patch(`upload-background-class/${uid_class}`, data, {
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
            queryClient.invalidateQueries('class')
        },
    });

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createClassFormSchema),
    });

    const { errors } = formState;

    const handleCreateClass: SubmitHandler<CreateClassFormData> = async (values) => {
        try {
            const newClass = {
                name_class: values.name_class,
                name_matter_class: values.name_matter_class
            };

            const responseCreateClass = await createClass.mutateAsync(newClass);

            await toast({
                title: 'Turma criado',
                description: "Turma criado com sucesso",
                status: 'success',
                duration: 1500,
                isClosable: true,
            });

            if (values.background_class_file.length > 0) {
                let data = new FormData();

                data.append("class", values.background_class_file[0]);

                await uploadBackgroundClass.mutateAsync({ uid_class: responseCreateClass.uid_class, data });
            }

            router.push('/rooms');
        } catch (err) {
            console.log(err);
            toast({
                title: 'Erro ao criar turma',
                description: `Erro: ${err.message}`,
                status: 'error',
                duration: 1500,
                isClosable: true,
            });
        }
    }

    return (
        <Box>
            <Navbar title="Criar turma" />

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
                            onSubmit={handleSubmit(handleCreateClass)}
                        >
                            <Heading size='lg' fontWeight='normal'>Criar turma</Heading>

                            <Divider my='6' borderColor='gray.700' />

                            <VStack spacing='8'>

                                <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
                                    <Input
                                        name='name_class'
                                        label='Nome da classe'
                                        {...register('name_class')}
                                        error={errors.name_class}
                                        bgColor={useColorModeValue('gray.50', 'gray.600')}
                                        _hover={{
                                            bgColor: useColorModeValue('gray.100', 'gray.500')
                                        }}
                                        _focus={{
                                            bg: useColorModeValue('gray.100', 'gray.500'),
                                        }}
                                    />
                                    <Input
                                        name='name_matter_class'
                                        label='Nome da matéria'
                                        {...register('name_matter_class')}
                                        error={errors.name_matter_class}
                                        bgColor={useColorModeValue('gray.50', 'gray.600')}
                                        _hover={{
                                            bgColor: useColorModeValue('gray.100', 'gray.500')
                                        }}
                                        _focus={{
                                            bg: useColorModeValue('gray.100', 'gray.500'),
                                        }}
                                    />
                                    <Input
                                        name='background_class_file'
                                        type="file"
                                        label='Background da turma'
                                        {...register('background_class_file')}
                                        error={errors.background_class_file}
                                        bgColor={useColorModeValue('gray.50', 'gray.600')}
                                        _hover={{
                                            bgColor: useColorModeValue('gray.100', 'gray.500')
                                        }}
                                        _focus={{
                                            bg: useColorModeValue('gray.100', 'gray.500'),
                                        }}
                                        accept="image/*"
                                    />
                                </SimpleGrid>
                            </VStack>

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

    return {
        props: {
            uid_user: me.uid_user,
        }
    };
})