import { Box, Flex, Spinner, Text, VStack } from "@chakra-ui/react";

import { useAllActivities } from "../../services/hooks/useAllActivities";
import { useAllCategories } from "../../services/hooks/useAllCategories";

import { SidebarActivity } from "./SidebarActivity";
import { SelectCategoriesAcitivity } from "./SelectCategoriesAcitivity";
import { ActionsActivity } from "./ActionsActivity";
import { BoxActivity } from "./BoxActivity";

interface ActivityProps {
    class_uid: string;
    isSmallScreen: boolean
}

export function Activity({ class_uid, isSmallScreen }: ActivityProps) {
    const { data, isLoading, error } = useAllActivities(class_uid);
    const {
        data: categories,
        isLoading: isLoadingCategories,
        error: errorCategories
    } = useAllCategories(class_uid);

    if (isLoading) {
        return (
            <Flex justify="center" alignItems="center">
                <Spinner color="red" size="xl" />
            </Flex>
        );
    }

    if (error) {
        return (
            <Flex justify="center" alignItems="center">
                <Text fontWeight="bold" fontSize="xl">Erro ao buscar as atividades desta turma</Text>
            </Flex>
        );
    }

    return (
        <Flex
            p={5}
            direction="column"
        >
            <Flex direction="row" pt="1.5rem">
                {!isSmallScreen && <SidebarActivity
                    categories={categories}
                    isLoadingCategories={isLoadingCategories}
                    errorCategories={errorCategories}
                />}

                <VStack spacing={4} w="full">
                    {isSmallScreen && <SelectCategoriesAcitivity
                        categories={categories}
                        isLoadingCategories={isLoadingCategories}
                        errorCategories={errorCategories}
                    />}

                    <Box mr="auto" ml={-4}>
                        <ActionsActivity />
                    </Box>

                    {data.length === 0 ? (
                        <Flex justifyContent="center" alignItems="center">
                            <Text fontWeight="bold" fontSize="xl">Nenhuma atividade vinculada nesta turma</Text>
                        </Flex>
                    ) : (
                        <>
                            {data.map((activity) => (
                                <BoxActivity
                                    key={activity.id_category_activity}
                                    idCategory={activity.id_category_activity}
                                    title={activity.name_category_activity}
                                    tipoActivity={activity.tipo_category_activity}
                                    activity={activity.Activity}
                                />
                            ))}
                        </>
                    )}
                </VStack>
            </Flex>
        </Flex>
    );
}