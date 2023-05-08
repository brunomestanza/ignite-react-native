import { Center, Heading } from "native-base";

interface ScreenHeaderProps {
  title: string;
}

export function ScreenHeader({ title }: ScreenHeaderProps) {
  return (
    <Center bg='gray.600' pb={6} pt={16}>
      <Heading color='gray.100' fontSize='xl' fontFamily="heading">
        {title}
      </Heading>
    </Center>
  )
};
