import styled from "styled-components/native";
import { BorderlessButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  width: 100%;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.header};
  justify-content: flex-end;
  padding: 16px 24px;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Menu = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const MenuButton = styled(BorderlessButton)`
  padding-right: 12px;
`;

export const TitleHeader = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};
  color: ${({ theme }) => theme.colors.text};
`;

export const AvatarButton = styled(BorderlessButton)``;

export const Avatar = styled.Image`
  width: ${RFValue(30)}px;
  height: ${RFValue(30)}px;
  border-radius: ${RFValue(15)}px;
`;
