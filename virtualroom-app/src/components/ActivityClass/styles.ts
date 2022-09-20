import styled from "styled-components/native";
import { BorderlessButton } from "react-native-gesture-handler";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled(BorderlessButton)``;

export const ActivityContent = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;

  padding: 8px;
  margin-bottom: 8px;
`;

export const IconContainer = styled.View`
  width: 40px;
  height: 40px;

  border-radius: 20px;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.success};
`;

export const DetailActivity = styled.View`
  width: ${RFPercentage(40)}px;

  padding-left: 12px;
`;

export const TitleActivity = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};
  color: ${({ theme }) => theme.colors.shape_dark};
`;

export const DatePublishedActivity = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
`;
