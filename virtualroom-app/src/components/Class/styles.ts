import styled from "styled-components/native";
import { BorderlessButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(BorderlessButton)`
  width: 100%;
  height: 100px;
  border-radius: 8px;

  background-color: ${({ theme }) => theme.colors.shape};

  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  padding: 24px;
  margin-bottom: 16px;
`;

export const DetailClass = styled.View``;

export const MatterClass = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.title};
`;

export const NameClass = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
`;

export const OptionClass = styled(BorderlessButton)``;
