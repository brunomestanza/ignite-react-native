import { TextInputProps } from "react-native";
import { Container } from "./styles";

interface TextAreaProps extends TextInputProps {
  isTextArea?: boolean;
}

export function Input({ isTextArea = false, ...rest }: TextAreaProps) {
  return (
    <Container isTextArea={isTextArea} {...rest}></Container>
  )
}