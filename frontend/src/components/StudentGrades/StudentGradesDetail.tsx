import { useState } from "react";
import { Flex, FormControl, FormErrorMessage, Icon, IconButton, Input, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { IoSaveSharp } from "react-icons/io5";
import { useMutation } from "react-query";

import { setupAPIClient } from "../../services/api";
import { queryClient } from "../../services/queryClient";

interface StudentGradesDetailProps {
    activity_uid: string;
    id_detail_activity: number | undefined;
    uid_user: string;
    name_user: string;
    nota_user: string | undefined;
    nota_max_activity: number;
    isStudentDeliveredTheActivity: boolean;
};

interface ErrorInputNote {
    message: string;
};

interface GradeStudents {
    id_detail_activity: number | null;
    nota_user: number | string;
    activity_uid: string;
    user_uid: string;
};

export function StudentGradesDetail({ activity_uid, id_detail_activity, uid_user, name_user, nota_user, nota_max_activity, isStudentDeliveredTheActivity }: StudentGradesDetailProps) {
    const toast = useToast();

    const [note, setNote] = useState(nota_user === undefined ? null : nota_user);
    const [error, setError] = useState<ErrorInputNote | null>({} as ErrorInputNote | null);

    const gradeTheStudent = useMutation(async (gradeStudents: GradeStudents) => {
        const apiClient = setupAPIClient();
        const response = await apiClient.post('grade-the-student', gradeStudents);

        return response;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('listActivityAndUsers')
        },
    });

    const handleChange = (event) => {
        if (event.target.value <= nota_max_activity) {
            setNote(event.target.value);
        }
    };

    const handleBlur = (event) => {
        if (note === null || note === "") {
            setError({
                message: "Campo vazio"
            });
        } else {
            setError({
                message: null,
            });
        }
    };

    const handleGradeTheStudent = async () => {
        try {
            const gradeTheStudents = {
                id_detail_activity: id_detail_activity === undefined ? null : id_detail_activity,
                nota_user: note,
                activity_uid: activity_uid,
                user_uid: uid_user,
            };

            await gradeTheStudent.mutateAsync(gradeTheStudents);

            await toast({
                title: 'Dar nota ao aluno',
                description: "Dar nota ao aluno com sucesso",
                status: 'success',
                duration: 1500,
                isClosable: true,
            });
        } catch (err) {
            console.log(err);

            toast({
                title: 'Erro ao dar nota ao aluno',
                description: `Erro: ${err.message}`,
                status: 'error',
                duration: 1500,
                isClosable: true,
            });
        }
    };

    return (
        <Flex align="center">
            <Text
                textStyle="default"
                fontSize="lg"
                fontWeight="semibold"
                pr={6}
                isTruncated
            >
                {name_user}
            </Text>

            <Flex alignItems="center">
                <FormControl isInvalid={!!error.message} pr={2}>
                    <Input
                        name={`nota_user_${uid_user}`}
                        type="number"
                        id={`nota_user_${uid_user}`}
                        focusBorderColor={!!error.message === false ? 'pink.500' : 'red.500'}
                        bgColor={useColorModeValue('gray.100', 'gray.600')}
                        variant='filled'
                        _hover={{
                            bgColor: useColorModeValue('gray.200', 'gray.500'),
                        }}
                        _focus={{
                            bg: useColorModeValue('gray.200', 'gray.500'),
                            borderColor: !!error.message === false ? 'pink.500' : 'red.500',
                        }}
                        width={20}
                        value={note ?? ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    {!!error.message && (
                        <FormErrorMessage>
                            {error.message}
                        </FormErrorMessage>
                    )}
                </FormControl>

                <Text
                    textStyle="default"
                    fontSize="2xl"
                    pr={1}
                    color={!isStudentDeliveredTheActivity ? "red.500" : "green.500"}
                >
                    /
                </Text>

                <Text
                    textStyle="default"
                    fontSize="2xl"
                    pr={2}
                    color={!isStudentDeliveredTheActivity ? "red.500" : "green.500"}
                >
                    {nota_max_activity}
                </Text>

                <IconButton
                    aria-label="Salvar nota do aluno"
                    title="Salvar nota do aluno"
                    size="md"
                    bg="green.300"
                    _hover={{
                        bg: "green.400",
                    }}
                    _active={{
                        bg: "green.400",
                    }}
                    icon={<Icon as={IoSaveSharp} fontSize={18} />}
                    disabled={(note === null || note === "") && true}
                    onClick={handleGradeTheStudent}
                />
            </Flex>
        </Flex>
    );
}