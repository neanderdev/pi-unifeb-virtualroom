import { Box, Text } from "@chakra-ui/react";

interface StudentGradesHeaderProps {
    title: string;
    count: number;
}

export function StudentGradesHeader({ title, count }: StudentGradesHeaderProps) {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Text
                textStyle="default"
                fontSize="2xl"
                fontWeight="bold"
                isTruncated
            >
                {title}
            </Text>

            <Text
                textStyle="default"
                fontSize="md"
                fontWeight="normal"
                ml={4}
                isTruncated
            >
                {count} entregaram
            </Text>
        </Box>
    );
}