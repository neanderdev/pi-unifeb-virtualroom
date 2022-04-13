import { Dispatch, SetStateAction } from "react";
import { Box, Button, Textarea } from "@chakra-ui/react";

interface NoticeClassProps {
    classNotice: string;
    setClassNotice: Dispatch<SetStateAction<string>>
}

export function NoticeClass({ classNotice, setClassNotice }: NoticeClassProps) {
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
                >
                    Enviar aviso
                </Button>
            </Box>
        </Box>
    );
}