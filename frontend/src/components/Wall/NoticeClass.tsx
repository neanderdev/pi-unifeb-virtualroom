import { Dispatch, SetStateAction } from "react";
import { Box, Button, Textarea, useToast } from "@chakra-ui/react";
import { useMutation } from 'react-query';

import { setupAPIClient } from "../../services/api";
import { queryClient } from '../../services/queryClient';

interface NoticeClassProps {
    classUid: string;
    user_uid: string;
    classNotice: string;
    setClassNotice: Dispatch<SetStateAction<string>>
};

interface CreateClassNoticeFormData {
    message: string;
    user_uid: string;
    class_uid: string;
};

interface GetResponseCreateClassNotice {
    id_class_notice: number;
    message: string;
    createdAt_class_notice: Date;
    user_uid: string;
    class_uid: number;
};

export function NoticeClass({ classUid, user_uid, classNotice, setClassNotice }: NoticeClassProps) {
    const toast = useToast();

    const createClassNotice = useMutation(async (createClassNotice: CreateClassNoticeFormData) => {
        const apiClient = setupAPIClient();
        const response = await apiClient.post<GetResponseCreateClassNotice>('class-notice', createClassNotice);

        return response.data;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('classNotice')
        },
    });

    const handleCreateClassNotice = async () => {
        try {
            const createClassNoticeFormData = {
                message: classNotice,
                user_uid: user_uid,
                class_uid: classUid,
            };

            await createClassNotice.mutateAsync(createClassNoticeFormData);

            toast({
                title: 'Aviso criado',
                description: "Aviso criado criada com sucesso",
                status: 'success',
                duration: 1500,
                isClosable: true,
            });

            setClassNotice("");
        } catch (err) {
            console.log(err);

            toast({
                title: 'Erro ao criar aviso',
                description: `Erro: ${err.message}`,
                status: 'error',
                duration: 1500,
                isClosable: true,
            });
        }
    };

    return (
        <Box w="full">
            <Textarea
                placeholder='Escreva um aviso para sua turma'
                value={classNotice}
                onChange={(e) => setClassNotice(e.target.value)}
            />

            <Box display="flex" justifyContent="end" mt={2}>
                <Button
                    colorScheme='pink'
                    variant='ghost'
                    cursor={classNotice === "" && "not-allowed"}
                    disabled={classNotice === "" && true}
                    onClick={handleCreateClassNotice}
                >
                    Enviar aviso
                </Button>
            </Box>
        </Box>
    );
}