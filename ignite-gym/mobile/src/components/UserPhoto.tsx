import { IImageProps, Image } from "native-base";

interface ImageProps extends IImageProps {
  size: number
}

export function UserPhoto({ size, ...rest }: ImageProps) {
  return (
    <Image width={size} height={size} rounded='full' borderWidth={2} borderColor='gray.400' {...rest} />
  )
}
