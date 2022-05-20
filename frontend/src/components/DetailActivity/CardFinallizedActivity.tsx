import { useRouter } from "next/router";
import { useState } from "react";
import { Box, Button, Flex, Icon, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useToast, VStack } from "@chakra-ui/react";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineFilePdf, AiOutlineFileWord, AiOutlineFileZip } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { useMutation } from "react-query";

import { setupAPIClient } from "../../services/api";
import { queryClient } from "../../services/queryClient";

import { useModal } from "../../contexts/ModalContext";

interface CreateMaterialDetailActivityFormData {
    dt_isEntrega_detail_acitivity: Date;
    activity_uid: string;
    ra_user: number;
};

interface GetResponseCreateMaterialDetailActivity {
    id_detail_activity: number;
    dt_isEntrega_detail_acitivity: Date;
    nota_user: number | string;
    activity_uid: string;
    user_uid: string;
};

interface UploadMaterialDetailActivityFormData {
    detail_activity_id: number;
    formData: any;
};

interface MaterialDetailActivity {
    id_material_detail_activity: number;
    link_material_detail_activity: string;
    detail_activity_id: number;
    name_material_detail_activity: string;
    size_material_detail_activity: number;
};

interface CardFinallizedActivityProps {
    ra_user: number;
    roles: any;
    dt_entrega_activity: Date;
    isAcceptWithDelay_Activity: boolean;
    nota_max_activity: number;
    dt_isEntrega_detail_acitivity: Date | string;
    nota_user: number;
    MaterialDetailActivity: MaterialDetailActivity[];
};

export function CardFinallizedActivity({
    ra_user,
    roles,
    dt_entrega_activity,
    isAcceptWithDelay_Activity,
    nota_max_activity,
    dt_isEntrega_detail_acitivity,
    nota_user,
    MaterialDetailActivity
}: CardFinallizedActivityProps) {
    const router = useRouter();
    const { isOpen, onClose, onOpen } = useModal();
    const toast = useToast();

    const [isFinished, setIsFinished] = useState(!dt_isEntrega_detail_acitivity ? false : true);
    const [attachmentArchives, setAttachmentArchives] = useState([]);

    const createMaterialDetailActivity = useMutation(async (materialDetailActivity: CreateMaterialDetailActivityFormData) => {
        const apiClient = setupAPIClient();
        const response = await apiClient.post<GetResponseCreateMaterialDetailActivity>('detail-activity', materialDetailActivity);

        return response.data;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('materialDetailActivity')
        },
    });

    const uploadMaterialDetailActivity = useMutation(async ({ detail_activity_id, formData }: UploadMaterialDetailActivityFormData) => {
        const apiClient = setupAPIClient();
        const response = await apiClient.post(`upload-material-detail-activity/${detail_activity_id}`, formData, {
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
            queryClient.invalidateQueries('materialDetailActivity')
        },
    });

    const handleAddJobs = () => {
        const dateNow = new Date();
        const dateEntregaActivity = new Date(dt_entrega_activity);

        if (dateEntregaActivity >= dateNow || isAcceptWithDelay_Activity) {
            onOpen();
        } else {
            alert("Essa atividade passou do prazo, você não poderá-la enviar mais!");
        }
    };

    const handleSendTask = async () => {
        const newMaterialDetailActivity = {
            dt_isEntrega_detail_acitivity: new Date(),
            activity_uid: router.query.activityId as string,
            ra_user: ra_user,
        };

        try {
            const data = await createMaterialDetailActivity.mutateAsync(newMaterialDetailActivity);

            if (attachmentArchives.length > 0) {
                let formData = new FormData();

                attachmentArchives.map((archive) => formData.append("detail_activity", archive));

                await uploadMaterialDetailActivity.mutateAsync({ detail_activity_id: data.id_detail_activity, formData });
            }

            setIsFinished(true);

            await toast({
                title: 'Tarefa enviada',
                description: "Tarefa enviada com sucesso",
                status: 'success',
                duration: 1500,
                isClosable: true,
            });
        } catch (err) {
            console.log(err);

            toast({
                title: 'Erro ao enviar tarefa',
                description: `Erro: ${err.message}`,
                status: 'error',
                duration: 1500,
                isClosable: true,
            });
        }
    };

    const handleChangeFile = (file) => {
        Object.keys(file).forEach((key) => {
            const isExistsAttachmentArchives = attachmentArchives.filter((archive) => archive.name === file[key]['name']);

            file[key]['blobURL'] = URL.createObjectURL(file[key]);
            file[key]['format'] = file[key].name.replace(/^.*\./, '');

            if (isExistsAttachmentArchives.length === 0) {
                if (["jpg", "jpeg", "png", "doc", "docx", "pdf", "zip", "rar"].includes(file[key].name.replace(/^.*\./, ''))) {
                    setAttachmentArchives([
                        ...attachmentArchives,
                        file[key],
                    ]);
                } else {
                    alert("Formato de arquivo inválido");
                }

            }
        });

        onClose();
    };

    return (
        <>
            <Box
                w="full"
                borderWidth="1px"
                borderColor="gray.200"
                rounded="base"
            >
                <Flex m={2} justifyContent="space-between" alignItems="center">
                    <Text fontSize="lg">Seus trabalhos</Text>

                    <Text fontSize="md" color={!isFinished ? "green.500" : "red.500"}>{!isFinished ? "Atríbuido" : "Devolvido"}</Text>
                </Flex>

                <Flex justifyContent="center" alignItems="center" direction="column">
                    {attachmentArchives.length === 0 ? (
                        <Text fontSize="md">
                            Nenhum trabalho anexado
                        </Text>
                    ) : (
                        attachmentArchives.map((archive, index) => (
                            ["jpg", "jpeg", "png"].includes(archive.format) ? (
                                <Flex
                                    key={index}
                                    align='center'
                                    mb={{ sm: "10px", md: "12px" }}
                                    w={{ sm: "90%" }}
                                    height={16}
                                    maxW="sm"
                                    p="1"
                                    borderWidth="1px"
                                    borderColor="gray.500"
                                    borderRadius='15px'
                                >
                                    <Image
                                        me={{ md: "22px" }}
                                        src={archive.blobURL}
                                        alt={archive.name}
                                        fallbackSrc="/no_image.jpg"
                                        w='40px'
                                        h='40px'
                                        borderRadius='15px'
                                    />

                                    <Flex direction='column' maxWidth='100%' my={{ sm: "14px" }} isTruncated>
                                        <Text
                                            fontSize={{ sm: "lg", lg: "xl" }}
                                            color="gray.600"
                                            fontWeight='bold'
                                            ms={{ sm: "8px", md: "0px" }}
                                            isTruncated
                                        >
                                            {archive.name}
                                        </Text>

                                        <Text
                                            fontSize={{ sm: "sm", lg: "md" }}
                                            color="gray.400"
                                            fontWeight='bold'
                                            ms={{ sm: "8px", md: "0px" }}
                                        >
                                            {archive.size / 1000} KB
                                        </Text>
                                    </Flex>

                                    <IconButton
                                        aria-label="Remover trabalho"
                                        width="10"
                                        height="12"
                                        variant="unstyled"
                                        ml="auto"
                                        icon={<Icon as={MdDeleteOutline} fontSize={24} />}
                                        onClick={() => {
                                            attachmentArchives.splice(index, 1);
                                            setAttachmentArchives([...attachmentArchives]);
                                        }}
                                    />
                                </Flex>
                            ) : ["doc", "docx"].includes(archive.format) ? (
                                <Flex
                                    key={index}
                                    align='center'
                                    mb={{ sm: "10px", md: "12px" }}
                                    w={{ sm: "90%" }}
                                    height={16}
                                    maxW="sm"
                                    p="1"
                                    borderWidth="1px"
                                    borderColor="gray.500"
                                    borderRadius='15px'
                                >
                                    <Box
                                        me={{ md: "22px" }}
                                        w='40px'
                                        h='40px'
                                        borderRadius='15px'
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        bg="gray.100"
                                    >
                                        <Icon as={AiOutlineFileWord} fontSize={24} color="gray.900" />
                                    </Box>

                                    <Flex direction='column' maxWidth='100%' my={{ sm: "14px" }} isTruncated>
                                        <Text
                                            fontSize={{ sm: "lg", lg: "xl" }}
                                            color="gray.600"
                                            fontWeight='bold'
                                            ms={{ sm: "8px", md: "0px" }}
                                            isTruncated
                                        >
                                            {archive.name}
                                        </Text>

                                        <Text
                                            fontSize={{ sm: "sm", lg: "md" }}
                                            color="gray.400"
                                            fontWeight='bold'
                                            ms={{ sm: "8px", md: "0px" }}
                                        >
                                            {archive.size / 1000} KB
                                        </Text>
                                    </Flex>

                                    <IconButton
                                        aria-label="Remover trabalho"
                                        width="10"
                                        height="12"
                                        variant="unstyled"
                                        ml="auto"
                                        icon={<Icon as={MdDeleteOutline} fontSize={24} />}
                                        onClick={() => {
                                            attachmentArchives.splice(index, 1);
                                            setAttachmentArchives([...attachmentArchives]);
                                        }}
                                    />
                                </Flex>
                            ) : ["zip", "rar"].includes(archive.format) ? (
                                <Flex
                                    key={index}
                                    align='center'
                                    mb={{ sm: "10px", md: "12px" }}
                                    w={{ sm: "90%" }}
                                    height={16}
                                    maxW="sm"
                                    p="1"
                                    borderWidth="1px"
                                    borderColor="gray.500"
                                    borderRadius='15px'
                                >
                                    <Box
                                        me={{ md: "22px" }}
                                        w='40px'
                                        h='40px '
                                        borderRadius='15px'
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        bg="gray.100"
                                    >
                                        <Icon as={AiOutlineFileZip} fontSize={24} color="gray.900" />
                                    </Box>

                                    <Flex direction='column' maxWidth='100%' my={{ sm: "14px" }} isTruncated>
                                        <Text
                                            fontSize={{ sm: "lg", lg: "xl" }}
                                            color="gray.600"
                                            fontWeight='bold'
                                            ms={{ sm: "8px", md: "0px" }}
                                            isTruncated
                                        >
                                            {archive.name}
                                        </Text>

                                        <Text
                                            fontSize={{ sm: "sm", lg: "md" }}
                                            color="gray.400"
                                            fontWeight='bold'
                                            ms={{ sm: "8px", md: "0px" }}
                                        >
                                            {archive.size / 1000} KB
                                        </Text>
                                    </Flex>

                                    <IconButton
                                        aria-label="Remover trabalho"
                                        width="10"
                                        height="12"
                                        variant="unstyled"
                                        ml="auto"
                                        icon={<Icon as={MdDeleteOutline} fontSize={24} />}
                                        onClick={() => {
                                            attachmentArchives.splice(index, 1);
                                            setAttachmentArchives([...attachmentArchives]);
                                        }}
                                    />
                                </Flex>
                            ) : (
                                <Flex
                                    key={index}
                                    align='center'
                                    mb={{ sm: "10px", md: "12px" }}
                                    w={{ sm: "90%" }}
                                    height={16}
                                    maxW="sm"
                                    p="1"
                                    borderWidth="1px"
                                    borderColor="gray.500"
                                    borderRadius='15px'
                                >
                                    <Box
                                        me={{ md: "22px" }}
                                        w='40px'
                                        h='40px'
                                        borderRadius='15px'
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        bg="gray.100"
                                    >
                                        <Icon as={AiOutlineFilePdf} fontSize={24} color="gray.900" />
                                    </Box>

                                    <Flex direction='column' maxWidth='100%' my={{ sm: "14px" }} isTruncated>
                                        <Text
                                            fontSize={{ sm: "lg", lg: "xl" }}
                                            color="gray.600"
                                            fontWeight='bold'
                                            ms={{ sm: "8px", md: "0px" }}
                                            isTruncated
                                        >
                                            {archive.size}
                                        </Text>

                                        <Text
                                            fontSize={{ sm: "sm", lg: "md" }}
                                            color="gray.400"
                                            fontWeight='bold'
                                            ms={{ sm: "8px", md: "0px" }}
                                        >
                                            {archive.size / 1000} KB
                                        </Text>
                                    </Flex>

                                    <IconButton
                                        aria-label="Remover trabalho"
                                        width="10"
                                        height="12"
                                        variant="unstyled"
                                        ml="auto"
                                        icon={<Icon as={MdDeleteOutline} fontSize={24} />}
                                        onClick={() => {
                                            attachmentArchives.splice(index, 1);
                                            setAttachmentArchives([...attachmentArchives]);
                                        }}
                                    />
                                </Flex>
                            )
                        ))
                    )}
                </Flex>

                <VStack w="full" my={4}>
                    {["admin", "teacher"].includes(roles) ? (
                        <Button colorScheme='gray' variant='solid' onClick={() => alert("Ver notas")}>
                            Ver notas
                        </Button>
                    ) : !isFinished ? (
                        <>
                            <Button colorScheme='gray' variant='solid' onClick={handleAddJobs}>
                                Adicionar trabalho
                            </Button>

                            <Button colorScheme='gray' variant='outline' onClick={handleSendTask}>
                                Marcar como concluído
                            </Button>
                        </>
                    ) : (
                        <Button colorScheme='gray' variant='outline' onClick={() => setIsFinished(!isFinished)}>
                            Cancelar envio
                        </Button>
                    )}
                </VStack>

                <Flex justifyContent="end" alignItems="center" m={2}>
                    <Text
                        fontSize="lg"
                        fontWeight="bold"
                        color={(new Date(dt_entrega_activity) >= new Date() || isAcceptWithDelay_Activity) ? "red.500" : "green.500"}
                    >
                        {nota_max_activity > 0 && `${nota_user ?? 0} / ${nota_max_activity}`}
                    </Text>
                </Flex>
            </Box>

            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset='slideInBottom'
            >
                <ModalOverlay />

                <ModalContent>
                    <ModalHeader>Anexar trabalho</ModalHeader>

                    <ModalCloseButton />

                    <ModalBody>
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            my={8}
                        >
                            <FileUploader
                                handleChange={handleChangeFile}
                                types={["JPG", "JPEG", "PNG", "DOC", "DOCX", "PDF", "ZIP", "RAR"]}
                                multiple={true}
                                name="attachment-archives"
                                label="Anexar trabalho na atividade"
                            />
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}