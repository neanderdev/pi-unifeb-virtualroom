import { useState } from "react";
import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    HStack,
    Image,
    SimpleGrid,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useColorModeValue,
    useMediaQuery,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from "react-query";

import { setupAPIClient } from "../../../services/api";
import { queryClient } from "../../../services/queryClient";
import { getClassUid } from "../../../services/hooks/useClassUid";

import { withSSRAuth } from "../../../utils/withSSRAuth";

import { Navbar } from "../../../components/Navbar";
import { Sidebar } from "../../../components/Sidebar";
import { MobileSidebar } from "../../../components/Sidebar/MobileSidebar";
import { Wall } from "../../../components/Wall";
import { Activity } from "../../../components/Activity";
import { Classmates } from "../../../components/Classmates";
import { Can } from "../../../components/Can";
import { Input } from "../../../components/Form/Input";
import { ModalNewCategory } from "../../../components/ModalNewCategory";

interface ClassUser {
    user: {
        ra_user: number;
        name_user: string;
        email_user: string;
        tipo_user: string;
    };
};

interface Class {
    uid_class: string;
    name_class: string;
    name_matter_class: string;
    background_class: string;
    isArchive: boolean;
    createdAt_class: Date;
    updatedAt_class: Date;
    ClassUser: ClassUser[];
};


interface RoomIdProps {
    classes: Class,
}

interface UpdateClassFormData {
    name_class: string;
    name_matter_class: string;
    background_class_file?: any;
};

interface UploadBackgroundClassFormData {
    uid_class: String;
    formData: any;
};

const createClassFormSchema = yup.object().shape({
    name_class: yup.string().required('Nome da classe obrigatório'),
    name_matter_class: yup.string().required('Nome da matéria obrigatório'),
    background_class_file: yup.mixed()
        .required('A file is required')
        // .test('isEmpty', "File is empty", (value) => value.length > 0)
        .test('fileSize', "Arquivo é muito grande", (value) => !value[0] || (value[0] && value[0].size <= 2000000))
        .test("interface", "Aceita apenas os formatos: .png, .jpeg e .jpg", (value) => !value[0] || (value[0] && ["image/png", "image/jpeg", "image/jpg"].includes(value[0].type))),
});

export default function RoomId({ classes }: RoomIdProps) {
    const toast = useToast();

    const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

    const [classNotice, setClassNotice] = useState("");
    const [classComment, setClassComment] = useState("");

    const [image, setImage] = useState(null);

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createClassFormSchema),
        defaultValues: {
            name_class: classes.name_class,
            name_matter_class: classes.name_matter_class,
            background_class_file: {} as any,
        },
    });

    const { errors } = formState;

    const updateClass = useMutation(async (updateClass: UpdateClassFormData) => {
        const apiClient = setupAPIClient();
        const response = await apiClient.put('class', updateClass);

        return response;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('classUid')
        },
    });

    const uploadBackgroundClass = useMutation(async ({ uid_class, formData }: UploadBackgroundClassFormData) => {
        const apiClient = setupAPIClient();
        const response = await apiClient.patch(`upload-background-class/${uid_class}`, formData, {
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
            queryClient.invalidateQueries('classUid')
        },
    });

    const handleUpdateClass: SubmitHandler<UpdateClassFormData> = async (values) => {
        try {
            const classUpdate = {
                uid_class: classes.uid_class,
                name_class: values.name_class,
                name_matter_class: values.name_matter_class
            };

            await updateClass.mutateAsync(classUpdate);

            await toast({
                title: 'Turma atualizada',
                description: "Turma atualizada com sucesso",
                status: 'success',
                duration: 1500,
                isClosable: true,
            });

            if (values.background_class_file.length > 0) {
                let formData = new FormData();

                formData.append("class", values.background_class_file[0]);

                await uploadBackgroundClass.mutateAsync({ uid_class: classes.uid_class, formData });
            }
        } catch (err) {
            console.log(err);

            toast({
                title: 'Erro ao atualizar a turma',
                description: `Erro: ${err.message}`,
                status: 'error',
                duration: 1500,
                isClosable: true,
            });
        }
    }

    function handleFileChange(event) {
        let files;

        if (event.dataTransfer) {
            files = event.dataTransfer.files;
        } else if (event.target) {
            files = event.target.files;
        }

        const reader = new FileReader();

        reader.onload = () => setImage(reader.result);

        reader.readAsDataURL(files[0]);
    }

    return (
        <Box>
            <Navbar
                title={classes.name_matter_class}
                isRoom
                nameClass={classes.name_class}
                nameMatter={classes.name_matter_class}
            />

            <Box pos="relative" h="max-content" m={[2, , 5]}>
                <Stack direction="row" spacing={{ md: 5 }}>
                    <Sidebar isCollapseSidebar />

                    {isSmallScreen && <MobileSidebar />}

                    <Box w="full">
                        <Box
                            h="3rem"
                        >
                            <Tabs isFitted isLazy defaultIndex={0}>
                                <Box w="full" display="flex" justifyContent="center">
                                    <TabList>
                                        <Tab _selected={{ borderColor: "pink.500", borderBottomWidth: "3.5px" }}>Mural</Tab>

                                        <Tab _selected={{ borderColor: "pink.500", borderBottomWidth: "3.5px" }}>Atividades</Tab>

                                        <Tab _selected={{ borderColor: "pink.500", borderBottomWidth: "3.5px" }}>Pessoas</Tab>

                                        <Can roles={["admin", "teacher"]}>
                                            <Tab _selected={{ borderColor: "pink.500", borderBottomWidth: "3.5px" }}>Configuração</Tab>
                                        </Can>
                                    </TabList>
                                </Box>

                                <TabPanels>
                                    <TabPanel>
                                        <Wall
                                            backgroundClass={`http://localhost:8000/files${classes.background_class}`}
                                            nameClass={classes.name_class}
                                            nameMatter={classes.name_matter_class}
                                            classNotice={classNotice}
                                            setClassNotice={setClassNotice}
                                            avatarTeacher=""
                                            nameTeacher="Wendel Cortes"
                                            publicDateComment="12 de abril de 2020"
                                            avatarStudent="https://github.com/neanderdev.png"
                                            nameStudent="Neander de Souza"
                                            classComment={classComment}
                                            setClassComment={setClassComment}
                                        />
                                    </TabPanel>

                                    <TabPanel>
                                        <Activity class_uid={classes.uid_class} isSmallScreen={isSmallScreen} />

                                        <ModalNewCategory class_uid={classes.uid_class} />
                                    </TabPanel>

                                    <TabPanel>
                                        <Classmates
                                            teachers={classes.ClassUser.filter((classe) => classe.user.tipo_user === "T")}
                                            students={classes.ClassUser.filter((classe) => classe.user.tipo_user === "S")}
                                        />
                                    </TabPanel>

                                    <TabPanel>
                                        <Can roles={["admin", "teacher"]}>
                                            <Box w="full">
                                                <Box
                                                    as='form'
                                                    flex='1'
                                                    borderRadius={8}
                                                    bg={useColorModeValue('gray.200', 'gray.800')}
                                                    p={['6', '8']}
                                                    onSubmit={handleSubmit(handleUpdateClass)}
                                                >
                                                    <Heading size='lg' fontWeight='normal'>Editar turma</Heading>

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

                                                            <VStack>
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
                                                                    onChange={handleFileChange}
                                                                />

                                                                <Box maxH="120px">
                                                                    <Image
                                                                        src={!image ? `http://localhost:8000/files${classes.background_class}` : image}
                                                                        alt='Background da turma'
                                                                        h="120px"
                                                                        w="full"
                                                                    />
                                                                </Box>
                                                            </VStack>
                                                        </SimpleGrid>
                                                    </VStack>

                                                    <Flex mt='8' justify='flex-end'>
                                                        <HStack spacing='4'>
                                                            <Button type='submit' colorScheme='pink' isLoading={formState.isSubmitting}>Salvar</Button>
                                                        </HStack>
                                                    </Flex>
                                                </Box>
                                            </Box>
                                        </Can>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </Box>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const { classes } = await getClassUid(ctx.params.roomId as string, ctx);

    return {
        props: {
            classes,
        }
    };
}, {
    roles: ['admin', 'teacher', 'student']
})