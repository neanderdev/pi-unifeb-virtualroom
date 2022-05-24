import { useRouter } from "next/router";
import { Box, Flex, Select, Spinner, Text } from "@chakra-ui/react";

interface AllCategories {
    id_category_activity: number;
    name_category_activity: string;
    tipo_category_activity: string;
    class_uid: string;
};

interface SelectCategoriesAcitivityProps {
    categories: AllCategories[];
    isLoadingCategories: boolean;
    errorCategories: unknown;
};

export function SelectCategoriesAcitivity({ categories, isLoadingCategories, errorCategories }: SelectCategoriesAcitivityProps) {
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

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <Box mr="auto" ml={4} w="full">
            <Select
                defaultValue={router.asPath.split("#")[1]}
                onChange={(event) => {
                    if (event.target.value === "all-categories") {
                        router.replace(`#${event.target.value}`);
                        scrollToTop();
                    } else {
                        router.replace(`#${event.target.value}`);
                    }
                }}
            >
                <option
                    value="all-categories"
                >
                    Todos os temas
                </option>

                {categories.map((categorie) => (
                    <option
                        key={categorie.id_category_activity.toString()}
                        value={categorie.id_category_activity.toString()}
                    >
                        {categorie.name_category_activity}
                    </option>
                ))}
            </Select>
        </Box>
    );
}