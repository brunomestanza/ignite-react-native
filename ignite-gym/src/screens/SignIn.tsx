import { useNavigation } from "@react-navigation/native";
import { Center, Heading, Image, Text, VStack, ScrollView } from "native-base";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { AuthNavigatorRouterProps } from "@routes/auth.routes";

import LogoSvg from '@assets/logo.svg';
import backgroundImg from '@assets/background.png';

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRouterProps>();

  function handleGoToSignUp() {
    navigation.navigate('signUp');
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={backgroundImg}
          defaultSource={backgroundImg}
          resizeMode="contain"
          position="absolute"
          alt=""
        />

        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">Treine sua mente e seu corpo</Text>
        </Center>

        <Center>
          <Heading
            color="gray.100"
            fontSize="xl" mb={6}
            fontFamily="heading"
          >
            Acesse sua conta
          </Heading>

          <Input placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" />

          <Input placeholder="Senha" secureTextEntry />

          <Button title="Acessar" />
        </Center>

        <Center mt={24}>
          <Text
            color="gray.100"
            fontSize="sm"
            mb={3}
            fontFamily="body"
          >
            Ainda não tem acesso?
          </Text>

          <Button title="Criar conta" variant='outline' onPress={handleGoToSignUp} />
        </Center>
      </VStack>
    </ScrollView>
  );
};
