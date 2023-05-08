import { Box, HStack, Heading, Icon, Image, ScrollView, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";
import { Button } from "@components/Button";

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <VStack flex={1}>
        <VStack px={8} bg='gray.600' pt={12}>
          <TouchableOpacity onPress={handleGoBack}>
            <Icon as={Feather} name='arrow-left' color="green.500" size={6} />
          </TouchableOpacity>

        <HStack justifyContent='space-between' mt={4} mb={8} alignItems='center'>
          <Heading color='gray.100' fontSize='lg' flexShrink={1} fontFamily="heading">
            Puxada frontal
          </Heading>
          <HStack alignItems='center'>
            <BodySvg />
            <Text color='gray.200' ml={1} textTransform='capitalize'>Costas</Text>
          </HStack>
        </HStack>
        </VStack>
      <ScrollView>

        <VStack p={8}>
          <Image
            w='full'
            h={80}
            source={{ uri: 'https://www.smartfit.com.br/news/wp-content/uploads/2014/10/flex%C3%A3o-de-bra%C3%A7o-parte-1-e-3.jpg' }}
            alt=""
            mb={3}
            resizeMode="cover"
            rounded='lg'
          />

          <Box bg='gray.600' rounded="md" pb={4} px={4}>
            <HStack alignItems='center' justifyContent='space-around' mb={6} mt={5}>
              <HStack>
                <SeriesSvg />
                <Text color="gray.200" ml={2}>
                  3 séries
                </Text>
            </HStack>
              <HStack>
                <RepetitionsSvg />
                <Text color="gray.200" ml={2}>
                  12 repetições
                </Text>
            </HStack>
            </HStack>

            <Button
              title="Marcar como realizado"
            />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  )
}