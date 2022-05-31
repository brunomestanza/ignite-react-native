import { ImageBackground } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(ImageBackground).attrs({
  imageStyle: {
    top: '-47%'
  },
  resizeMode: 'contain'
})`
  flex: 1;
`;

export const SafeAreaViewIOS = styled.SafeAreaView`
  flex: 1;
`;