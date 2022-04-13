import NextLink from "next/link";
import { Box, Text, VStack } from "@chakra-ui/react";

import { LinkCategorieActivity } from "./LinkCategorieActivity";

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

export function SidebarActivity() {
    return (
        <VStack spacing={2} alignItems="start">
            <LinkCategorieActivity
                href="#all"
                nameCategorieActivity="Todos os temas"
                isActive
            />

            {fakeCategoriesActivity.map((categorie) => (
                <LinkCategorieActivity
                    key={categorie.id}
                    href={`#${categorie.slug}`}
                    nameCategorieActivity={categorie.nameCategorieActivity}
                />

            ))}

        </VStack>
    );
}