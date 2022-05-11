import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { Box, Button, Divider, Flex, Heading, HStack, Icon, IconButton, SimpleGrid, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue, useMediaQuery, VStack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { IoAddSharp } from "react-icons/io5";

import { withSSRAuth } from "../../../utils/withSSRAuth";

import { Navbar } from "../../../components/Navbar";
import { Sidebar } from "../../../components/Sidebar";
import { MobileSidebar } from "../../../components/Sidebar/MobileSidebar";
import { Input } from "../../../components/Form/Input";
import { Switch } from "../../../components/Form/Switch";
import { TextArea } from "../../../components/Form/TextArea";

interface CreateActivityFormData {
    name_activity: string;
    dt_entrega_activity?: Date;
    isAcceptWithDelay_Activity?: boolean;
    nota_max_activity?: number;
    content_activity: string;
    archives_materials?: any;
};

const createActivityFormSchema = yup.object().shape({
    name_activity: yup.string().required("Nome da atividade obrigatório"),
    dt_entrega_activity: yup.date()
        .required("Data de entrega obrigatório")
        .min(new Date(), "Não é possível incluir uma data antiga")
        .typeError("Data inválida"),
    isAcceptWithDelay_Activity: yup.boolean().required("Aceitar com atraso obrigatório"),
    nota_max_activity: yup.number()
        .typeError("Nota máxima da atividade é somente número")
        .required("Nota máxima da atividade obrigatório")
        .min(1, "Minímo da nota máxima é 1")
        .max(10, "Máximo da nota máxima é 10"),
    content_activity: yup.string().required("Conteúdo da atividade obrigatório"),
    archives_materials: yup.mixed()
        .required('A file is required')
        // .test('isEmpty', "Nenhum arquivo encontrado", (value) => value.length > 0)
        .test('fileSize', "Arquivo é muito grande", (value) => {
            let isArchiveLarge = false;

            Object.keys(value).forEach((key) => {
                if (!value[0] || value[key].size >= 2000000) {
                    isArchiveLarge = true;
                }
            });


            if (isArchiveLarge) {
                return;
            } else {
                return value;
            }
        })
        .test("type", "Aceita apenas os formatos: .jpg, .jpeg, .png, .doc, .docx, .pdf, .zip, .rar", (value) => {
            let isFormattedValid = false;

            Object.keys(value).forEach((key) => {
                if (!value[0] || !["jpg", "jpeg", "png", "doc", "docx", "pdf", "zip", "rar"].includes(value[key].name.replace(/^.*\./, ''))) {
                    isFormattedValid = true;
                }
            });

            if (isFormattedValid) {
                return;
            } else {
                return value;
            }
        }),
});

export default function CreateActivity() {
    const router = useRouter();
    const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

    const bgColor = useColorModeValue('gray.50', 'gray.600');
    const bgHoverAndFocus = useColorModeValue('gray.100', 'gray.500');

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createActivityFormSchema),
    });

    const { errors } = formState;

    const [materias, setMaterias] = useState([]);
    const [links, setLinks] = useState([]);

    const handleCreateActivity: SubmitHandler<CreateActivityFormData> = async (values) => {
        console.log(values);
    }

    return (
        <Box>
            <Navbar title="Criar atividade" />

            <Box pos="relative" h="max-content" m={[2, , 5]}>
                <Stack direction="row" spacing={{ md: 5 }}>
                    <Sidebar />

                    {isSmallScreen && <MobileSidebar />}

                    <Box w="full">
                        <Box
                            as='form'
                            flex='1'
                            borderRadius={8}
                            bg={useColorModeValue('gray.200', 'gray.800')}
                            p={['6', '8']}
                            onSubmit={handleSubmit(handleCreateActivity)}
                        >
                            <Heading size='lg' fontWeight='normal'>Criar atividade</Heading>

                            <Tabs isFitted isLazy defaultIndex={0}>
                                <TabList>
                                    <Tab _selected={{ borderColor: "pink.500", borderBottomWidth: "3.5px" }}>Dados da atividade</Tab>
                                    <Tab _selected={{ borderColor: "pink.500", borderBottomWidth: "3.5px" }}>Materiais</Tab>
                                    <Tab _selected={{ borderColor: "pink.500", borderBottomWidth: "3.5px" }}>Links</Tab>
                                </TabList>

                                <TabPanels>
                                    <TabPanel>
                                        <VStack spacing='8'>
                                            <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
                                                <Input
                                                    name='name_activity'
                                                    label='Nome da atividade'
                                                    {...register('name_activity')}
                                                    error={errors.name_activity}
                                                    bgColor={bgColor}
                                                    _hover={{
                                                        bgColor: bgHoverAndFocus,
                                                    }}
                                                    _focus={{
                                                        bg: bgHoverAndFocus,
                                                    }}
                                                />
                                                {router.query.createActivity[0] === 'A' || router.query.createActivity[0] === 'C' ? (
                                                    <>
                                                        <Input
                                                            name='dt_entrega_activity'
                                                            type='datetime-local'
                                                            label='Data de entrega'
                                                            {...register('dt_entrega_activity')}
                                                            error={errors.dt_entrega_activity}
                                                            bgColor={bgColor}
                                                            _hover={{
                                                                bgColor: bgHoverAndFocus,
                                                            }}
                                                            _focus={{
                                                                bg: bgHoverAndFocus
                                                            }}
                                                        />
                                                        <Switch
                                                            name='isAcceptWithDelay_Activity'
                                                            label='Aceitar com atraso'
                                                            {...register('isAcceptWithDelay_Activity')}
                                                            error={errors.isAcceptWithDelay_Activity}
                                                        />
                                                        <Input
                                                            name='nota_max_activity'
                                                            type='number'
                                                            label='Nota máxima'
                                                            {...register('nota_max_activity')}
                                                            error={errors.nota_max_activity}
                                                            bgColor={bgColor}
                                                            _hover={{
                                                                bgColor: bgHoverAndFocus,
                                                            }}
                                                            _focus={{
                                                                bg: bgHoverAndFocus,
                                                            }}
                                                        />
                                                    </>
                                                ) : null}
                                            </SimpleGrid>

                                            <TextArea
                                                name='content_activity'
                                                label='Conteúdo da atividade'
                                                {...register('content_activity')}
                                                error={errors.content_activity}
                                                bgColor={bgColor}
                                                _hover={{
                                                    bgColor: bgHoverAndFocus,
                                                }}
                                                _focus={{
                                                    bg: bgHoverAndFocus,
                                                }}
                                                height="48"
                                            />
                                        </VStack>
                                    </TabPanel>
                                    <TabPanel>
                                        <VStack spacing='8'>
                                            <Input
                                                name='archives_materials'
                                                type="file"
                                                multiple
                                                label='Materiais para fixação'
                                                {...register('archives_materials')}
                                                error={errors.archives_materials}
                                                bgColor={useColorModeValue('gray.50', 'gray.600')}
                                                _hover={{
                                                    bgColor: useColorModeValue('gray.100', 'gray.500')
                                                }}
                                                _focus={{
                                                    bg: useColorModeValue('gray.100', 'gray.500'),
                                                }}
                                                accept=".jpg,.jpeg,.png,.doc,.docx,.pdf,.zip,.rar"
                                            />

                                            <Divider my='2' borderColor='gray.700' />
                                        </VStack>
                                    </TabPanel>
                                    <TabPanel>
                                        <VStack spacing='8'>
                                            <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%' alignItems="center">
                                                <Input
                                                    name='name_link'
                                                    label='Nome do link'
                                                    {...register('name_link')}
                                                    error={errors.name_link}
                                                    bgColor={bgColor}
                                                    _hover={{
                                                        bgColor: bgHoverAndFocus,
                                                    }}
                                                    _focus={{
                                                        bg: bgHoverAndFocus,
                                                    }}
                                                />
                                                <Input
                                                    name='link'
                                                    label='Link'
                                                    {...register('link')}
                                                    error={errors.link}
                                                    bgColor={bgColor}
                                                    _hover={{
                                                        bgColor: bgHoverAndFocus,
                                                    }}
                                                    _focus={{
                                                        bg: bgHoverAndFocus,
                                                    }}
                                                />

                                                <Box pt={30}>
                                                    <IconButton
                                                        aria-label="Adicionar nova atividade"
                                                        width="10"
                                                        height="12"
                                                        colorScheme="blue"
                                                        icon={<Icon as={IoAddSharp} fontSize={24} />}
                                                        onClick={() => alert("AQUI")}
                                                    />
                                                </Box>
                                            </SimpleGrid>

                                            <Divider my='2' borderColor='gray.700' />
                                        </VStack>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>

                            <Flex mt='8' justify='flex-end'>
                                <HStack spacing='4'>
                                    <Link href={`/rooms/${router.query.roomId}`} passHref>
                                        <Button colorScheme='whiteAlpha'>Cancelar</Button>
                                    </Link>

                                    <Button type='submit' colorScheme='pink' isLoading={formState.isSubmitting}>Salvar</Button>
                                </HStack>
                            </Flex>
                        </Box>
                    </Box>
                </Stack>
            </Box >
        </Box >
    );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    return {
        props: {},
    };
}, {
    roles: ['admin', 'teacher', 'student']
})