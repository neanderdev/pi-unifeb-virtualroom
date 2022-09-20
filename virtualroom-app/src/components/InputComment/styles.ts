import styled, { css } from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

export const IconContainer = styled.View<Props>`
  height: 56px;
  width: 55px;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.background_secondary};

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `};
`;

export const Avatar = styled.Image<Props>`
  width: 40px;
  height: 40px;
  border-radius: 20px;

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border: 1px solid ${theme.colors.main};
    `};
`;

export const InputText = styled(TextInput)<Props>`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_secondary};
  color: ${({ theme }) => theme.colors.text};

  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;

  padding: 0 10px;

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `};
`;

export const Icon = styled(Feather)<Props>`
  color: ${({ theme }) => theme.colors.text_detail};

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      color: ${({ theme }) => theme.colors.main};
    `};
`;
