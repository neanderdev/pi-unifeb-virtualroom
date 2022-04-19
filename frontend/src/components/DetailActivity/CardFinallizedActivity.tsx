import { useState } from "react";
import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";

export function CardFinallizedActivity() {
    const [isFinished, setIsFinished] = useState(false);
    const [attachmentArchives, setAttachmentArchives] = useState([]);

    return (
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

            <Flex justifyContent="center" alignItems="center">
                {attachmentArchives.length === 0 ? (
                    <Text fontSize="md">
                        Nenhum trabalho anexado
                    </Text>
                ) : (
                    attachmentArchives.map((archive, index) => (
                        <Text fontSize="md" key={index}>
                            {archive}
                        </Text>
                    ))
                )}

            </Flex>

            <VStack w="full" my={4}>
                {!isFinished ? (
                    <>
                        <Button colorScheme='gray' variant='solid' onClick={() => setAttachmentArchives(['Arquivo 1'])}>
                            Adicionar trabalho
                        </Button>

                        <Button colorScheme='gray' variant='outline' onClick={() => setIsFinished(!isFinished)}>
                            Marcar como concluído
                        </Button>
                    </>
                ) : (
                    <Button colorScheme='gray' variant='outline' onClick={() => setIsFinished(!isFinished)}>
                        Cancelar envio
                    </Button>
                )}
            </VStack>
        </Box>
    );
}