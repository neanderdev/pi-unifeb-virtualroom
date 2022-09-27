import styled, { css } from "styled-components/native";
import { FlatList, FlatListProps } from "react-native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { RFPercentage } from "react-native-responsive-fontsize";

import { MaterialDetailActivity } from "../../dtos/DetailActivityDTO";

interface ButtonProps {
  light?: boolean;
  isFinalized?: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const ContainerBottomSheet = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;

  padding: 12px;
`;

export const Title = styled.Text`
  margin-bottom: 8px;
`;

export const DetailActivity = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TitleDetailActivity = styled.Text`
  width: ${RFPercentage(40)}px;
  margin-bottom: 12px;
`;

export const DetailActivityButton = styled(BorderlessButton)`
  padding-right: 8px;
`;

export const Buttons = styled.View``;

export const Button = styled(RectButton)<ButtonProps>`
  width: 100%;
  padding: 10px;
  margin-bottom: 8px;
  align-items: center;
  justify-content: center;

  ${({ light, isFinalized, theme }) =>
    light
      ? css`
          background-color: ${theme.colors.background_primary};
        `
      : isFinalized
      ? css`
          background-color: ${theme.colors.main};
        `
      : css`
          background-color: ${theme.colors.success};
        `};
`;

export const TitleButton = styled.Text``;

export const MaterialDetailActivityList = styled(
  FlatList as new (
    props: FlatListProps<MaterialDetailActivity>
  ) => FlatList<MaterialDetailActivity>
).attrs({
  showsVerticalScrollIndicator: false,
})``;

export const Separator = styled.View`
  margin-top: 8px;
  margin-bottom: 12px;

  border-width: 0.5px;
  border-color: ${({ theme }) => theme.colors.shape_dark};
`;
