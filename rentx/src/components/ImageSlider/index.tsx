import React, { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';
import { Bullet } from '../Bullet';
import { Container, ImageIndexes, CarImageWrapper, CarImage } from './styles';

interface Props {
  imageUrl: {
    id: string;
    photo: string;
  }[];
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
          imageUrl.map((item, index) => (
            <Bullet active={index === imageIndex} key={item.id} />
          ))
        }
      </ImageIndexes>
      <FlatList
        data={imageUrl}
        horizontal
        keyExtractor={item => item.id}
        onViewableItemsChanged={indexChanged.current}
        renderItem={({ item }) =>(
          <CarImageWrapper>
            <CarImage
              resizeMode="contain" 
              source={{ uri: item.photo }}
            />
          </CarImageWrapper>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
};
