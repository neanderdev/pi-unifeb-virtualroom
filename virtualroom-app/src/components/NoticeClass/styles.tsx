import styled from 'styled-components/native';
import { FlatList, FlatListProps } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import { ClassNoticeAnswer } from '../../dtos/ClassNoticeByClassUidDTO';

export const Container = styled.View``;

export const NoticeClassContent = styled.View`
  width: 100%;

  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.shape};

  background-color: ${({ theme }) => theme.colors.background_primary};

  flex-direction: column;

  padding: 12px;
  margin-bottom: 16px;
`;

export const HeaderClassNotice = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AvatarNoticeClass = styled.Image`
  width: 40px;
  height: 40px;

  border-radius: 20px;

  background-color: ${({ theme }) => theme.colors.success};
`;

export const NoticeClassDetail = styled.View`
  width: ${RFPercentage(40)}px;

  padding-left: 12px;
`;

export const TitleNoticeClass = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.shape_dark};
`;

export const DatePublishedNoticeClass = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
`;

export const MessageNoticeClass = styled.Text`
  padding-top: 8px;

  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
`;

export const CommentNoticeClassList = styled(
  FlatList as new (
    props: FlatListProps<ClassNoticeAnswer>
  ) => FlatList<ClassNoticeAnswer>
).attrs({
  showsVerticalScrollIndicator: false,
})``;

export const ContainerInputComment = styled.View`
  padding-top: 10px;
`;