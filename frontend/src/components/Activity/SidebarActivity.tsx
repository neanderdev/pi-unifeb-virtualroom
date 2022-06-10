import { useRouter } from "next/router";
import { Flex, Spinner, Text, VStack } from "@chakra-ui/react";

import { LinkCategorieActivity } from "./LinkCategorieActivity";

interface AllCategories {
    id_category_activity: number;
    name_category_activity: string;
    tipo_category_activity: string;
    class_uid: string;
};

interface SidebarActivityProps {
    categories: AllCategories[];
    isLoadingCategories: boolean;
    errorCategories: unknown;
};

export function SidebarActivity({ categories, isLoadingCategories, errorCategories }: SidebarActivityProps) {
    const router = useRouter();

    if (isLoadingCategories) {
        return (
            <Flex justify="center" alignItems="center">
                <Spinner color="red" size="md" />
            </Flex>
        );
    }

    if (errorCategories) {
        return (
            <Flex justify="center" alignItems="center">
                <Text fontWeight="bold" fontSize="xl">Erro ao buscar as categorias desta turma</Text>
            </Flex>
        );
    }

    return (
        <VStack spacing={2} alignItems="start">
            {categories.length > 0 && (
                <>
                    <LinkCategorieActivity
                        href="#all-categories"
                        nameCategorieActivity="Todos as categorias"
                        isActive={router.asPath.split("#").length === 1 ? true : router.asPath.split("#")[1] === "all-categories" ? true : false}
                    />

                    {categories.map((categorie) => (
                        <LinkCategorieActivity
                            key={categorie.id_category_activity}
                            href={`#${categorie.id_category_activity.toString()}`}
                            nameCategorieActivity={categorie.name_category_activity}
                            isActive={router.asPath.split("#")[1] === `${categorie.id_category_activity.toString()}` ? true : false}
                        />
                    ))}
                </>
            )}
        </VStack>
    );
}