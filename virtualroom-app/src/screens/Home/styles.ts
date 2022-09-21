import styled from "styled-components/native";
import { FlatList, FlatListProps } from "react-native";

import { ClassResponse } from "../../dtos/ClassesDTO";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const ClassList = styled(
  FlatList as new (
    props: FlatListProps<ClassResponse>
  ) => FlatList<ClassResponse>
).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showsVerticalScrollIndicator: false,
})``;
