import styled from 'styled-components/native';

interface Props {
  active: boolean;
}

export const Container = styled.View<Props>`
  background-color: ${({ theme, active }) => active ? theme.colors.title : theme.colors.shape};
  border-radius: 3px;
  margin-left: 8px;
  height: 6px;
  width: 6px;
`;
