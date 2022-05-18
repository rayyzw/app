import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React from 'react';
import { View, Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice && Platform.OS !== 'web') {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

  } else {
    console.log('Must use physical device for Push Notifications');
  }

  return token;
}

export default function PushNotifications(props) {
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  React.useEffect(() => {
    registerForPushNotificationsAsync().then(async (token) => {
      if(token){
        let res = await fetch(`${props.apiURI}/api/users/profile`,{
          method:"PATCH",
          headers: new Headers({"Content-Type": "application/json",Accept: "application/json","Token":props.user.token}),
          body: JSON.stringify({pushToken:token})
        });
        if(res.status===200){
          let u = await res.json();
          console.log(u);
        }
        else{
          let u = await res.json();
          alert("Error on updating push token: " + u.error);
        }
      }
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      props.setNotification(notification.request.content);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      props.setNotification(response.notification.request.content);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View></View>
  );
}