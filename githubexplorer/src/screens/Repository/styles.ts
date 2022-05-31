import { FlatList, FlatListProps } from 'react-native';
import styled from 'styled-components/native';
import { IssueProps } from '../../contexts/RepositoriesProvider';

export const Container = styled.View`
  flex: 1;

  margin-top: 100px;
  padding: 0 20px;
`;

export const RepoInfo = styled.View`
  flex-direction: row;
`;

export const OwnerAvatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

export const TextGroup = styled.View`
  flex: 1;
  justify-content: space-evenly;

  margin-left: 16px;
`;

export const Description = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray_500};
`;

export const RepoStats = styled.View`
  margin-top: 24px;
  padding: 0 20px;

  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Stars = styled.View`
  align-items: center;
`;

export const StarsCounter = styled.Text`
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.gray_800};
`;

export const StarsText = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.gray_500};
`;

export const Forks = styled.View`
  align-items: center;
`;

export const ForksCounter = styled.Text`
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.gray_800};
`;

export const ForksText = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.gray_500};
`;

export const OpenIssues = styled.View`
  align-items: center;
`;

export const OpenIssuesCounter = styled.Text`
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.gray_800};
`;

export const OpenIssuesText = styled.Text`
  text-align: center;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray_500};
`;

export const IssuesList = styled(
  FlatList as new (props: FlatListProps<IssueProps>) => FlatList<IssueProps>
)`
  margin-top: 50px;
`;
