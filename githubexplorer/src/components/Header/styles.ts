import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons'
import { Platform } from 'react-native';

export const SafeAreaViewIOS = styled.SafeAreaView``;

export const Container = styled.View`
  padding: ${() => Platform.OS === 'android' ? '30px 20px' : '15px 20px'};

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.Image``;

export const BackButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5
})``;

export const Icon = styled(Feather)``;

export const BlankSpace = styled.View`
  width: 20px;
`;
