import styled from "styled-components/native";
import { FlatList, FlatListProps } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

import { MaterialActivity } from "../../dtos/ActivityByUidDTO";

export const Container = styled.View`
  padding: 24px;

  flex-direction: column;
`;

export const HeaderActivity = styled.View``;

export const TitleHeaderActivity = styled.Text``;

export const Detail = styled.View`
  padding-top: 8px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const PointHeaderActivity = styled.Text``;

export const DateHeaderActivity = styled.Text``;

export const DescriptionActivity = styled.Text``;

export const TitleAttachment = styled.Text`
  padding-top: 12px;
`;

export const AttachmentContent = styled.View`
  flex-direction: column;

  padding-left: 12px;
`;

export const AttachmentButton = styled(BorderlessButton)``;

export const Attachment = styled.View`
  width: ${RFValue(75)}px;
  height: ${RFValue(75)}px;

  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const AttachmentIcon = styled.View`
  width: ${RFValue(75)}px;
  height: ${RFValue(75)}px;

  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.shape_dark};

  align-items: center;
  justify-content: center;
`;

export const AttachmentImage = styled.Image`
  width: ${RFValue(75)}px;
  height: ${RFValue(75)}px;

  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.shape_dark};
`;

export const AttachmentName = styled.Text`
  width: ${RFPercentage(15)}px;
`;

export const AttachmentSize = styled.Text`
  width: ${RFPercentage(15)}px;
`;

export const MaterialActivityList = styled(
  FlatList as new (
    props: FlatListProps<MaterialActivity>
  ) => FlatList<MaterialActivity>
).attrs({
  showsHorizontalScrollIndicator: false,
  horizontal: true,
})``;

export const Separator = styled.View`
  margin-top: 8px;
  margin-bottom: 12px;

  border-width: 0.5px;
  border-color: ${({ theme }) => theme.colors.shape_dark};
`;
