import React, { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';
import { Container, ImageIndexes, ImageIndex, CarImageWrapper, CarImage } from './styles';

interface Props {
  imageUrl: string[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imageUrl }: Props){
  const [imageIndex, setImageIndex] = useState<number>(0);
  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index;
    setImageIndex(index);
  });

  return(
    <Container>
      <ImageIndexes>
        {
          imageUrl.map((image, index) => (
            <ImageIndex active={index === imageIndex} key={index} />
          ))
        }
      </ImageIndexes>
      <FlatList
        data={imageUrl}
        horizontal
        keyExtractor={key => key}
        onViewableItemsChanged={indexChanged.current}
        renderItem={({ item }) =>(
          <CarImageWrapper>
            <CarImage
              resizeMode="contain" 
              source={{ uri: item }}
            />
          </CarImageWrapper>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
};
