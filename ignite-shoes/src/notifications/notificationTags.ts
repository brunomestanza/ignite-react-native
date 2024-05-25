import { OneSignal } from "react-native-onesignal";

export function createUserInfo() {
  OneSignal.User.addTags({
    user_name: 'Bruno Mestanza',
    user_email: 'bruno.mestanza@mail.com'
  })
}

export function updateCartTag(itemsCount: string) {
  OneSignal.User.addTag("cart_items_count", itemsCount)
}