import { TouchableOpacity, type TouchableOpacityProps } from "react-native";
import { Container, Greeting, Message, Picture, Username } from "./styles";
import { Power } from "phosphor-react-native";
import theme from "../../theme";
import { useApp, useUser } from "@realm/react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Header() {
  const user = useUser()
  const realmApp = useApp()
  const insets = useSafeAreaInsets()

  const paddingTop = insets.top + 32

  function handleLogOut() {
    realmApp.currentUser?.logOut()
  }

  return (
    <Container style={{ paddingTop }}>
      <Picture
        source={{ uri: user?.profile.pictureUrl }}
        placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
      />

      <Greeting>
        <Message>Olá</Message>
        <Username>{user?.profile.name}</Username>
      </Greeting>

      <TouchableOpacity onPress={handleLogOut} activeOpacity={0.7}>
        <Power size={32} color={theme.COLORS.GRAY_400} />
      </TouchableOpacity>
    </Container>
  )
}
