import React from 'react';
import { Text, View, Pressable, ScrollView } from 'react-native';
import styles from './Styles';
import PushNotifications from './PushNotifications';
import Swipeable from './Swipeable';
import Header from './Header';
import Footer from './Footer';

export default function Home(props){
  const [notification, setNotification] = React.useState();

  const fetchData = async () =>{ 
  };

  React.useEffect(() => {
    if(props.user && props.apiURI){
      fetchData();
    }
  }, [props.user, props.apiURI]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>XinY</Text>
        <Header {...props}/>
      </View>
      <PushNotifications {...props} setNotification={setNotification}/>
      {notification &&
        <Swipeable 
          style={styles.paper}
          onSwipeLeft={() => (
            <Pressable 
              style={styles.paperSwipe}
              onPress={() => {
                setNotification(null);
              }}
            >
              <Text>Delete</Text>
            </Pressable>
          )}
          onSwipeRight={() => (
            <Pressable 
              style={styles.paperSwipe}
              onPress={() => {
                setNotification(null);
              }}
            >
              <Text>Delete</Text>
            </Pressable>
          )}
        >
          <View style={styles.flexEnd}>
            <Text>New Notification: {notification.title}</Text>
            <Text>{notification.body}</Text>
          </View>
        </Swipeable>
      }
      <ScrollView>
          <Text style={styles.item}>Home</Text>
      </ScrollView>
      <Footer {...props}/>
    </View>
  );
}