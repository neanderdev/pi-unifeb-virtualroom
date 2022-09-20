import styled from "styled-components/native";
import { FlatList } from "react-native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const ActivityList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  ListHeaderComponentStyle: {
    marginBottom: 16,
  },
  showsVerticalScrollIndicator: false,
})``;
