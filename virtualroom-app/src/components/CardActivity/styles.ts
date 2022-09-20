import styled from "styled-components/native";
import { BorderlessButton } from "react-native-gesture-handler";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled(BorderlessButton)``;

export const ActivityContent = styled.View`
  width: 100%;
  height: 80px;

  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.shape};

  background-color: ${({ theme }) => theme.colors.background_primary};

  flex-direction: row;
  align-items: center;

  padding: 12px;
  margin-bottom: 16px;
`;

export const IconContainer = styled.View`
  width: 40px;
  height: 40px;

  border-radius: 20px;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.success};
`;

export const Detail = styled.View`
  width: ${RFPercentage(40)}px;

  padding-left: 12px;
`;

export const TitleActivity = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.shape_dark};
`;

export const DatePublishedActivity = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
`;
