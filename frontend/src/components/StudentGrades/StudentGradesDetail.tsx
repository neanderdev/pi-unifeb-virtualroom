import { useState } from "react";
import { Flex, FormControl, FormErrorMessage, Icon, IconButton, Input, Text, useColorModeValue } from "@chakra-ui/react";
import { IoSaveSharp } from "react-icons/io5";

interface StudentGradesDetailProps {
    id: number;
    name: string;
    notaMax: number;
};

interface ErrorInputNote {
    message: string;
}

export function StudentGradesDetail({ id, name, notaMax }: StudentGradesDetailProps) {
    const [note, setNote] = useState(null);
    const [error, setError] = useState<ErrorInputNote | null>({} as ErrorInputNote);

    const handleChange = (event) => {
        if (event.target.value <= notaMax) {
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

    return (
        <Flex align="center">
            <Text
                textStyle="default"
                fontSize="lg"
                fontWeight="semibold"
                pr={6}
                isTruncated
            >
                {name}
            </Text>

            <Flex alignItems="center">
                <FormControl isInvalid={!!error.message} pr={2}>
                    <Input
                        name={`nota_user_${id.toString()}`}
                        type="number"
                        id={`nota_user_${id.toString()}`}
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
                >
                    /
                </Text>

                <Text
                    textStyle="default"
                    fontSize="2xl"
                    pr={2}
                >
                    {notaMax}
                </Text>

                <IconButton
                    aria-label="Salvar nota do aluno"
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
                    onClick={() => alert("Nota: " + note)}
                />
            </Flex>
        </Flex>
    );
}