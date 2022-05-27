import { useState } from "react";
import { Box, Button, Checkbox, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useBreakpointValue, VStack } from "@chakra-ui/react";

import { useModal } from "../../contexts/ModalContext";

interface ModalAddUserProps {
    class_uid: string;
    isWideVersion: boolean;
};

export function ModalAddUser({ class_uid, isWideVersion }: ModalAddUserProps) {
    const { isOpen, onClose } = useModal();

    const [checkedItems, setCheckedItems] = useState([false, false]);

    const allChecked = checkedItems.every(Boolean);
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

    return (
        <Modal
            isCentered
            onClose={onClose}
            isOpen={isOpen}
            motionPreset='slideInBottom'
            size="2xl"
        >
            <ModalOverlay />

            <ModalContent>
                <ModalHeader>Adicionar Professor e Aluno a esta turma</ModalHeader>

                <ModalCloseButton />

                <ModalBody>
                    <Box
                        flex='1'
                        borderRadius={8}
                        p={['6', '8']}
                    >
                        <VStack spacing='8'>
                            <TableContainer w="full">
                                <Table variant='striped' colorScheme='gray'>
                                    <Thead>
                                        <Tr>
                                            <Th>
                                                <Checkbox
                                                    colorScheme='pink'
                                                    isChecked={allChecked}
                                                    isIndeterminate={isIndeterminate}
                                                    onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
                                                />
                                            </Th>
                                            <Th isNumeric>RA</Th>

                                            {isWideVersion && <Th>Nome</Th>}
                                        </Tr>
                                    </Thead>

                                    <Tbody>
                                        <Tr key="1">
                                            <Td>
                                                <Checkbox
                                                    colorScheme='pink'
                                                    isChecked={checkedItems[0]}
                                                    onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
                                                />
                                            </Td>

                                            <Td isNumeric>535885</Td>

                                            {isWideVersion && <Td isTruncated>Neander de Souza</Td>}
                                        </Tr>

                                        <Tr key="2">
                                            <Td>
                                                <Checkbox
                                                    colorScheme='pink'
                                                    isChecked={checkedItems[1]}
                                                    onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
                                                />
                                            </Td>

                                            <Td isNumeric>999999</Td>

                                            {isWideVersion && <Td isTruncated>Dudu Buch</Td>}
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </VStack>

                        <HStack mt={4} alignItems="center" justifyContent="flex-end">
                            <Button type='submit' colorScheme='pink' mr={3}>
                                Salvar
                            </Button>

                            <Button variant='ghost' onClick={onClose}>Fechar</Button>
                        </HStack>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal >
    );
}