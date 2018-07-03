import PushNotification from 'react-native-push-notification';
import { PushNotificationIOS, DeviceEventEmitter, Alert } from 'react-native';

export function configure() {
  PushNotification.configure({

    onRegister(token) {
      // process token
    },

    onNotification(notification) {
      // process the notification
      // required on iOS only
      // notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,
    requestPermissions: true,

  });
}

export function actions() {
  PushNotification.registerNotificationActions(['Accept', 'Reject', 'Yes', 'No', 'Ok']);
  DeviceEventEmitter.addListener('notificationActionReceived', (action) => {
    console.log(`Notification action received: ${action}`);
    const info = JSON.parse(action.dataJSON);
    if (info.action === 'Accept') {
      // Do work pertaining to Accept action here
    } else if (info.action === 'Reject') {
      // Do work pertaining to Reject action here
    } else if (info.action === 'Ok') {
      Alert.alert(info.data);
    }
    // Add all the required actions handlers
  });
}

export function localNotification() {
  PushNotification.localNotification({
    autoCancel: true,
    largeIcon: 'ic_launcher',
    smallIcon: 'ic_notification',
    bigText: 'My big text that will be shown when notification is expanded',
    subText: 'This is a subText',
    color: 'green',
    vibrate: true,
    vibration: 300,
    title: 'Notification Title',
    message: 'Notification Message',
    playSound: true,
    soundName: 'default',
    actions: '["Accept", "Reject"]',
  });
}

export function forgotPassword() {
  PushNotification.localNotification({
    autoCancel: true,
    largeIcon: 'ic_launcher',
    smallIcon: 'ic_notification',
    bigText: 'Please login using given temporary credentials',
    subText: 'Are you lost',
    color: 'red',
    vibrate: true,
    vibration: 300,
    title: 'Forgot Password',
    message: 'Click ok for the credentials',
    playSound: true,
    soundName: 'default',
    actions: '["Ok"]',
    data: 'UserName: sa\nPassword: 123',
  });
}

export {
};
