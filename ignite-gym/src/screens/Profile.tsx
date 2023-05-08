import { TouchableOpacity, Platform } from "react-native";
import { useState } from "react";
import { Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";

export function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState('https://github.com/brunomestanza.png');
  const toast = useToast();

  async function handleUserPhotoSelect() {
    setIsLoading(true);
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.6,
        aspect: [4, 4],
        allowsEditing: true
      });

      if (photoSelected.canceled) {
        return;
      }

      const photoUri = photoSelected.assets[0].uri;

      if (photoUri) {
        // FileSystem typing error, changed for any because will no be used after the next line
        const photoInfo: any = await FileSystem.getInfoAsync(photoUri);
        // Converting size in bytes to megabytes
        if (photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {
          return toast.show({
            title: 'Essa imagem é muito grande, escolha uma de até 5MB.',
            placement: 'top',
            bgColor: 'red.500'
          });
        };

        setUserPhoto(photoUri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 100 : 36 }} bounces={false}>
        <Center mt={6} px={10}>
          { isLoading ? (
            <Skeleton
              w={33}
              h={33}
              rounded="full"
              startColor='gray.500'
              endColor='gray.400'
            /> ) : (
            <UserPhoto
              source={{ uri: userPhoto }}
              size={33}
              alt=""
            />
            )
          }

          <TouchableOpacity>
            <Text
              color='green.500'
              fontWeight='bold'
              fontSize='md'
              mt={2}
              mb={8}
              onPress={handleUserPhotoSelect}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>
          <Input placeholder="Nome"  />
          <Input placeholder="brunomonteiromestanza@gmail.com" bg="gray.600" isDisabled />
        </Center>

        <Center px={10} mb={9}>
          <Heading color='gray.200' fontSize='md' mb={2} alignSelf="flex-start" mt={12} fontFamily="heading">
            Alterar senha
          </Heading>

          <Input bg="gray.600" placeholder="Senha antiga" secureTextEntry />

          <Input bg="gray.600" placeholder="Nova senha" secureTextEntry />

          <Input bg="gray.600" placeholder="Confirmar nova senha" secureTextEntry />

          <Button title="Atualizar" mt={4} />
        </Center>
      </ScrollView>
    </VStack>
  )
}