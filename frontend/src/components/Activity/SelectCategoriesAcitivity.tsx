import { Box, Select } from "@chakra-ui/react";

interface FakeCategoriesActivity {
    id: number;
    slug: string;
    nameCategorieActivity: string;
}

const fakeCategoriesActivity: Array<FakeCategoriesActivity> = [
    {
        id: 1,
        slug: "tde-01",
        nameCategorieActivity: "TDE 01",
    },
    {
        id: 2,
        slug: "tde-02",
        nameCategorieActivity: "TDE 02",
    }
];

export function SelectCategoriesAcitivity() {
    return (
        <Box mr="auto" ml={4} w="full">
            <Select placeholder='Todos os temas'>
                {fakeCategoriesActivity.map((categorieActivity) => (
                    <option key={categorieActivity.id} value={categorieActivity.slug}>{categorieActivity.nameCategorieActivity}</option>
                ))}
            </Select>
        </Box>
    );
}