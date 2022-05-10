import { Box, Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, SimpleGrid, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from "react-query";

import { setupAPIClient } from "../../services/api";
import { queryClient } from "../../services/queryClient";

import { useModal } from "../../contexts/ModalContext";

import { Input } from "../Form/Input";
import { RadioButton } from "../Form/RadioButton";

interface CreateCategoryFormData {
    name_category_activity: string;
    tipo_category_activity: string;
}

interface CreateClassFormData {
    class_uid: string;
    name_category_activity: string;
    tipo_category_activity: string;
};

interface ModalNewCategoryProps {
    class_uid: string;
};

const createCategoryFormSchema = yup.object().shape({
    name_category_activity: yup.string().required('Nome da categoria é obrigatório').max(100, 'Máximo de caracteres é 100'),
    tipo_category_activity: yup.string().required('Tipo da categoria é obrigatório'),
});

export function ModalNewCategory({ class_uid }: ModalNewCategoryProps) {
    const { isOpen, onClose } = useModal();
    const toast = useToast();

    const { register, handleSubmit, formState, reset } = useForm({
        resolver: yupResolver(createCategoryFormSchema),
    });

    const createCategory = useMutation(async (createClass: CreateClassFormData) => {
        const apiClient = setupAPIClient();
        const response = await apiClient.post('category-activity', createClass);

        return response;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('activities')
        },
    });

    const { errors } = formState;

    const handleCreateCategory: SubmitHandler<CreateCategoryFormData> = async (values) => {
        const newCategory = {
            ...values,
            class_uid,
        };

        try {
            await createCategory.mutateAsync(newCategory);

            await toast({
                title: 'Categoria criada',
                description: "Categoria criado com sucesso",
                status: 'success',
                duration: 2000,
                isClosable: true,
            })

            reset();
            onClose();
        } catch (err) {
            toast({
                title: 'Erro ao criar categoria',
                description: `Erro: ${err.message}`,
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }
    }

    return (
        <Modal
            isCentered
            onClose={onClose}
            isOpen={isOpen}
            motionPreset='slideInBottom'
        >
            <ModalOverlay />

            <ModalContent>
                <ModalHeader>Nova Categoria</ModalHeader>

                <ModalCloseButton />

                <ModalBody>
                    <Box
                        as='form'
                        flex='1'
                        borderRadius={8}
                        p={['6', '8']}
                        onSubmit={handleSubmit(handleCreateCategory)}
                    >
                        <VStack spacing='8'>
                            <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
                                <Input
                                    name='name_category_activity'
                                    label='Nome da Categoria'
                                    {...register('name_category_activity')}
                                    error={errors.name_category_activity}
                                    bgColor={useColorModeValue('gray.50', 'gray.600')}
                                    _hover={{
                                        bgColor: useColorModeValue('gray.100', 'gray.500')
                                    }}
                                    _focus={{
                                        bg: useColorModeValue('gray.100', 'gray.500'),
                                    }}
                                />

                                <RadioButton
                                    name='tipo_category_activity'
                                    label='Tipo da Categoria'
                                    {...register('tipo_category_activity')}
                                    error={errors.tipo_category_activity}
                                    bgColor={useColorModeValue('gray.200', 'gray.600')}
                                    arrayValuesRadio={[
                                        {
                                            value: 'M',
                                            name: 'materiais',
                                            id: 'materiais',
                                            label: 'Materiais',
                                        },
                                        {
                                            value: 'C',
                                            name: 'chamada',
                                            id: 'chamada',
                                            label: 'Chamada',
                                        },
                                        {
                                            value: 'A',
                                            name: 'atividade',
                                            id: 'atividade',
                                            label: 'Atividade',
                                        }
                                    ]}
                                />
                            </SimpleGrid>
                        </VStack>

                        <HStack mt={4} alignItems="center" justifyContent="flex-end">
                            <Button type='submit' colorScheme='pink' mr={3} isLoading={formState.isSubmitting}>
                                Salvar
                            </Button>

                            <Button variant='ghost' onClick={onClose}>Fechar</Button>
                        </HStack>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}