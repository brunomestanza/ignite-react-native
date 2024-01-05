import { TouchableOpacity, Platform } from "react-native";
import { useState } from "react";
import { Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import defaultUserPhotoImg from "@assets/userPhotoDefault.png"

interface FormDataProps {
  name: string
  email: string
  old_password: string
  password: string
  confirm_password: string
}

const profileSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  password: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 dígitos')
    .nullable()
    .transform((value) => !!value ? value : null),
  confirm_password: yup
  .string()
  .nullable()
  .transform((value) => !!value ? value : null)
  .oneOf([yup.ref('password'), undefined], 'A confirmação de senha não confere')
  .when('password', {
    is: (Field: any) => Field,
    then: (schema) => schema.nullable().required('Informe a confirmação de senha').transform((value) => !!value ? value : null)
  })
})

export function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { user, updateUserProfile } = useAuth()
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    defaultValues: { name: user.name, email: user.email },
    resolver: yupResolver(profileSchema)
  })

  async function handleProfileUpdate(data: FormDataProps) {
    setIsLoading(true);
    try {
      await api.put('/users', data)
      const userUpdated = user
      userUpdated.name = data.name
      await updateUserProfile(userUpdated)
      toast.show({
        title: 'Perfil atualizado com sucesso',
        placement: 'top',
        bgColor: 'green.500'
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível atualizar os dados, tente novamente mais tarde'
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

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
      const photoType = photoSelected.assets[0].type;

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

        const fileExtension = photoUri.split('.').pop()
        const photoFile = {
          name: `${user.name}.${fileExtension}`.toLowerCase(),
          uri: photoUri,
          type: `${photoType}/${fileExtension}`
        } as any

        const userPhotoUploadForm = new FormData()
        userPhotoUploadForm.append('avatar', photoFile)

        const response = await api.patch('/users/avatar', userPhotoUploadForm, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        const userUpdated = user
        userUpdated.avatar = response.data.avatar
        updateUserProfile(userUpdated)

        toast.show({
          title: 'Foto atualizada!',
          placement: 'top',
          bgColor: 'green.500'
        })
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
              source={ user.avatar ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` } : defaultUserPhotoImg }
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
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange }}) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value} errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange }}) => (
              <Input
                placeholder="E-mail"
                bg="gray.600"
                isDisabled
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </Center>

        <Center px={10} mb={9}>
          <Heading color='gray.200' fontSize='md' mb={2} alignSelf="flex-start" mt={12} fontFamily="heading">
            Alterar senha
          </Heading>

          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange }}) => (
              <Input
                bg="gray.600"
                placeholder="Senha antiga"
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange }}) => (
              <Input
                bg="gray.600"
                placeholder="Nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange }}) => (
              <Input
                bg="gray.600"
                placeholder="Confirmar nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />
          <Button
            title="Atualizar"
            mt={4}
            onPress={handleSubmit(handleProfileUpdate)}
            isLoading={isLoading}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}