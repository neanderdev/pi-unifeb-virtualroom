import { Box, Text } from "@chakra-ui/react";

interface StudentGradesHeaderProps {
    name_activity: string;
    count: number;
}

export function StudentGradesHeader({ name_activity, count }: StudentGradesHeaderProps) {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Text
                textStyle="default"
                fontSize="2xl"
                fontWeight="bold"
                isTruncated
            >
                {name_activity}
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