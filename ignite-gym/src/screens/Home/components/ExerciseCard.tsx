import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { HStack, Heading, Image, Text, VStack, Icon } from "native-base";
import { Entypo } from "@expo/vector-icons";

interface ExerciseCard extends TouchableOpacityProps {

}

export function ExerciseCard({ ...rest }: ExerciseCard) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg="gray.500" alignItems="center" p={2} pr={4} rounded="md" mb={3}>
        <Image
          source={{ uri: 'https://www.smartfit.com.br/news/wp-content/uploads/2014/10/flex%C3%A3o-de-bra%C3%A7o-parte-1-e-3.jpg' }}
          alt=""
          w={16}
          h={16}
          rounded='md'
          mr={4}
          resizeMode="cover"
        />

        <VStack flex={1}>
          <Heading fontSize="lg" color="white" fontFamily="heading">Flexão</Heading>
          <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>3 séries x 12 repetições</Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  )
}
