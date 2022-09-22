import styled from "styled-components/native";
import { FlatList, FlatListProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { IResponseAcitivities } from "../../dtos/ActivitiesByClassUidDTO";
import { IResponseClassNotice } from "../../dtos/ClassNoticeByClassUidDTO";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const ActivityList = styled(
  FlatList as new (
    props: FlatListProps<IResponseAcitivities>
  ) => FlatList<IResponseAcitivities>
).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  ListHeaderComponentStyle: {
    marginBottom: 16,
  },
  showsVerticalScrollIndicator: false,
})``;

export const ClassNoticeList = styled(
  FlatList as new (
    props: FlatListProps<IResponseClassNotice>
  ) => FlatList<IResponseClassNotice>
).attrs({
  showsVerticalScrollIndicator: false,
})``;

export const ContentIsEmpty = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TextIsEmpty = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};
  color: ${({ theme }) => theme.colors.shape_dark};
`;
