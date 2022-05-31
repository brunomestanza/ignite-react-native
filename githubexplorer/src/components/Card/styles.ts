import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons'
import { Swipeable } from 'react-native-gesture-handler';

interface CardContainerProps {
  hasImage: boolean;
}

export const SwipeableContainer = styled(Swipeable).attrs({
  containerStyle: {
    marginBottom: 12
  }
})``;

export const CardContainer = styled.Pressable<CardContainerProps>`
  padding: 12px 18px;
        
  border-radius: 5px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background-color: #FFF;

  ${({ hasImage }) => !hasImage && css`
      margin-bottom: 12px;
  `}
`;

export const Info = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const Image = styled.Image`
  margin-right: 12px;

  width: 64px;
  height: 64px;
  border-radius: 32px;
`;

export const TextGroup = styled.View`
  justify-content: space-around;
  flex: 1;
  height: 64px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.gray_700};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 18px;
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.gray_400};
  font-size: 14px;
`;

export const Icon = styled(Feather)`
  margin-left: 12px;

  color: ${({ theme }) => theme.colors.gray_200};
`;

export const DeleteContainer = styled.View`
  padding: 0 30px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  justify-content: center; 
  align-items: flex-end; 
  background-color: red;
`;

export const DeleteIcon = styled(Feather)`
  color: #FFF;
`;
