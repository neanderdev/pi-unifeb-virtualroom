import { Box, Divider, Flex, Icon, IconButton, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { AiOutlineDownload, AiOutlineFilePdf, AiOutlineFileWord, AiOutlineFileZip, AiOutlineLink } from "react-icons/ai";
import { CgNotes } from "react-icons/cg";

interface MaterialActivity {
    id_material_activity: number;
    name_material_activity: string;
    size_material_activity: number;
    link_material_activity: string;
    tipo_material_activity: string;
};

interface CardDetailActivityProps {
    name_activity: string;
    content_activity: string;
    dt_entrega_activity: string | Date;
    isEntregue_activity: boolean;
    createdAt_activity: string | Date;
    updatedAt_activity: string | Date;
    materiais: MaterialActivity[];
    links: MaterialActivity[];
}

export function CardDetailActivity({
    name_activity,
    content_activity,
    dt_entrega_activity,
    isEntregue_activity,
    createdAt_activity,
    updatedAt_activity,
    materiais,
    links,
}: CardDetailActivityProps) {
    function download(uri: string, nome: string) {
        var link = document.createElement("a");
        link.download = nome;
        link.href = uri;
        link.click();
    }

    return (
        <Box
            w="full"
        >
            <Flex alignItems="center">
                <Box
                    w={10}
                    h={10}
                    bg="gray"
                    rounded="full"
                    my="6px"
                    ml="12px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <CgNotes size={22} color="white" />
                </Box>

                <Box mx="2">
                    <Text
                        fontWeight="semibold"
                        fontSize="lg"
                    >
                        {name_activity}
                    </Text>

                    <Text
                        fontWeight="normal"
                        fontSize="sm"
                    >
                        Wendel Cortes • {createdAt_activity} {createdAt_activity !== updatedAt_activity && ` • Editado às ${updatedAt_activity}`}
                    </Text>
                </Box>
            </Flex>

            <Box display="flex" justifyContent="end" mr={2}>
                <Text
                    fontWeight="normal"
                    fontSize="md"
                >
                    {isEntregue_activity && `Data de entrega: ${dt_entrega_activity}`}
                </Text>
            </Box>

            <Divider mt={2} />

            <Box
                my="6px"
                ml="12px"
            >
                <Text
                    fontWeight="normal"
                    fontSize="md"
                >
                    {content_activity}
                </Text>
            </Box>

            <Divider mt={2} />

            <SimpleGrid
                flex="1"
                my="6px"
                ml="12px"
                minChildWidth="250px"
                alignItems="flex-start"
            >
                {materiais.map((material, index) => (
                    ["jpg", "jpeg", "png"].includes(material.link_material_activity.replace(/^.*\./, '')) ? (
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
                                src={`http://localhost:8000/files${material.link_material_activity}`}
                                alt={material.name_material_activity}
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
                                    {material.name_material_activity}
                                </Text>

                                <Text
                                    fontSize={{ sm: "sm", lg: "md" }}
                                    color="gray.400"
                                    fontWeight='bold'
                                    ms={{ sm: "8px", md: "0px" }}
                                >
                                    {material.size_material_activity / 1000} KB
                                </Text>
                            </Flex>

                            <IconButton
                                aria-label="Fazer download do material"
                                width="10"
                                height="12"
                                variant="unstyled"
                                ml="auto"
                                icon={<Icon as={AiOutlineDownload} fontSize={24} />}
                                onClick={() => download(`http://localhost:8000/files${material.link_material_activity}`, material.name_material_activity)}
                            />
                        </Flex>
                    ) : ["doc", "docx"].includes(material.link_material_activity.replace(/^.*\./, '')) ? (
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
                                    {material.name_material_activity}
                                </Text>

                                <Text
                                    fontSize={{ sm: "sm", lg: "md" }}
                                    color="gray.400"
                                    fontWeight='bold'
                                    ms={{ sm: "8px", md: "0px" }}
                                >
                                    {material.size_material_activity / 1000} KB
                                </Text>
                            </Flex>

                            <IconButton
                                aria-label="Fazer download do material"
                                width="10"
                                height="12"
                                variant="unstyled"
                                ml="auto"
                                icon={<Icon as={AiOutlineDownload} fontSize={24} />}
                                onClick={() => download(`http://localhost:8000/files${material.link_material_activity}`, material.name_material_activity)}
                            />
                        </Flex>
                    ) : ["zip", "rar"].includes(material.link_material_activity.replace(/^.*\./, '')) ? (
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
                                    {material.name_material_activity}
                                </Text>

                                <Text
                                    fontSize={{ sm: "sm", lg: "md" }}
                                    color="gray.400"
                                    fontWeight='bold'
                                    ms={{ sm: "8px", md: "0px" }}
                                >
                                    {material.size_material_activity / 1000} KB
                                </Text>
                            </Flex>

                            <IconButton
                                aria-label="Fazer download do material"
                                width="10"
                                height="12"
                                variant="unstyled"
                                ml="auto"
                                icon={<Icon as={AiOutlineDownload} fontSize={24} />}
                                onClick={() => download(`http://localhost:8000/files${material.link_material_activity}`, material.name_material_activity)}
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
                                    {material.name_material_activity}
                                </Text>

                                <Text
                                    fontSize={{ sm: "sm", lg: "md" }}
                                    color="gray.400"
                                    fontWeight='bold'
                                    ms={{ sm: "8px", md: "0px" }}
                                >
                                    {material.size_material_activity / 1000} KB
                                </Text>
                            </Flex>

                            <IconButton
                                aria-label="Fazer download do material"
                                width="10"
                                height="12"
                                variant="unstyled"
                                ml="auto"
                                icon={<Icon as={AiOutlineDownload} fontSize={24} />}
                                onClick={() => download(`http://localhost:8000/files${material.link_material_activity}`, material.name_material_activity)}
                            />
                        </Flex>
                    )
                ))}
            </SimpleGrid>

            <Divider mt={2} />

            <SimpleGrid
                flex="1"
                my="6px"
                ml="12px"
                minChildWidth="250px"
                alignItems="flex-start"
            >
                {links.map((link, index) => (
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
                        as="a"
                        href={link.link_material_activity}
                        target="_blank"
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
                            <Icon as={AiOutlineLink} fontSize={24} color="gray.900" />
                        </Box>

                        <Flex direction='column' maxWidth='100%' my={{ sm: "14px" }} isTruncated>
                            <Text
                                fontSize={{ sm: "lg", lg: "xl" }}
                                color="gray.600"
                                fontWeight='bold'
                                ms={{ sm: "8px", md: "0px" }}
                                isTruncated
                            >
                                {link.name_material_activity}
                            </Text>
                        </Flex>
                    </Flex>
                ))}
            </SimpleGrid>
        </Box >
    );
}