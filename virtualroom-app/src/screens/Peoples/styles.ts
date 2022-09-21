import styled from "styled-components/native";
import { FlatList } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const TeacherList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showsVerticalScrollIndicator: false,
})``;

export const StudentList = styled(FlatList).attrs({
  showsVerticalScrollIndicator: false,
})``;

export const PeopleContent = styled.View`
  flex-direction: row;
  align-items: center;

  padding-bottom: 12px;
`;

export const HeaderPeople = styled.Text`
  padding-bottom: 8px;

  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};
  color: ${({ theme }) => theme.colors.shape_dark};
`;

export const AvatarPeople = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;

  background-color: ${({ theme }) => theme.colors.success};
`;

export const NamePeople = styled.Text`
  padding-left: 12px;

  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};
  color: ${({ theme }) => theme.colors.shape_dark};
`;

export const Separator = styled.View`
  margin-top: 8px;
  margin-bottom: 12px;

  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.text_detail};
`;
