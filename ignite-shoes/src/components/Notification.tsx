import { HStack, Text, IconButton, CloseIcon, Icon, Pressable } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import type { OSNotification } from 'react-native-onesignal';
import * as Linking from 'expo-linking';

type Props = {
  data: OSNotification;
  onClose: () => void;
}

type CustomOSNotification = {
  custom: any
  u: string
}

export function Notification({ data, onClose }: Props) {
  function handleOnPress() {
    const { custom }: CustomOSNotification = JSON.parse(
      data.rawPayload.toString(),
    )
    const { u: uri }: CustomOSNotification = JSON.parse(custom.toString())

    if (uri) {
      Linking.openURL(uri)
      onClose()
    }
  }

  return (
    <Pressable
      w="full"
      p={4}
      pt={12}
      bgColor="gray.200"
      position="absolute"
      onPress={handleOnPress}
    >
      <HStack 
        justifyContent="space-between" 
        alignItems="center" 
        top={0}
      >
          <Icon as={Ionicons} name="notifications-outline" size={5} color="black" mr={2}/>

          <Text fontSize="md" color="black" flex={1}>
            {data.title}
          </Text>

        <IconButton 
          variant="unstyled" 
          _focus={{ borderWidth: 0 }} 
          icon={<CloseIcon size="3" />} 
          _icon={{ color: "coolGray.600"}} 
          color="black"
          onPress={onClose}
        />
      </HStack>
    </Pressable>
  );
}