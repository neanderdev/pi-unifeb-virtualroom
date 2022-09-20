import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  width: 100%;

  border-radius: 8px;

  background-color: ${({ theme }) => theme.colors.background_primary};

  flex-direction: column;

  padding-top: 12px;
`;

export const SeparatorClassNotice = styled.View`
  border-top-width: 2px;
  border-top-color: ${({ theme }) => theme.colors.shape};

  padding-top: 12px;
`;

export const HeaderCommentClassNotice = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AvatarCommentNoticeClass = styled.Image`
  width: 40px;
  height: 40px;

  border-radius: 20px;

  background-color: ${({ theme }) => theme.colors.success};
`;

export const CommentNoticeClassDetail = styled.View`
  width: ${RFPercentage(40)}px;

  padding-left: 12px;
`;

export const TitleCommentNoticeClass = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.shape_dark};
`;

export const DatePublishedCommentNoticeClass = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
`;

export const CommentNoticeClass = styled.Text`
  padding-top: 8px;

  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
`;
