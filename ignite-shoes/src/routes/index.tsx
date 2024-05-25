import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer, type LinkingOptions } from '@react-navigation/native';

import { AppRoutes } from './app.routes';
import { useEffect, useState } from 'react';
import { OneSignal, type NotificationWillDisplayEvent, type OSNotification } from 'react-native-onesignal';
import { Notification } from '../components/Notification';

const linking: LinkingOptions<{ details: unknown }> = {
  prefixes: ['igniteshoes://', 'com.brunomestanza.igniteshoes://'],
  config: {
    screens: {
      details: {
        path: '/details/:productId',
        parse: {
          productId: (productId: string) => productId
        }
      }
    }
  }
}

export function Routes() {
  const { colors } = useTheme();
  const [notification, setNotification] = useState<OSNotification>()

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    const handleNotification = (event: NotificationWillDisplayEvent) => {
      event.preventDefault()

      const response = event.getNotification()

      setNotification(response)
    }

    OneSignal.Notifications.addEventListener('foregroundWillDisplay', handleNotification)

    return () => OneSignal.Notifications.removeEventListener('foregroundWillDisplay', handleNotification)
  }, [])

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />

      {
        notification?.title && (
          <Notification
            data={notification}
            onClose={() => setNotification(undefined)}
          />
        )
      }
    </NavigationContainer>
  );
}