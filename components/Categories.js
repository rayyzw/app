import React from 'react';
import { Text, View, FlatList , ActivityIndicator, Pressable, Modal, RefreshControl, Image } from 'react-native';
import HtmlPages from './HtmlPages';
import styles from './Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotifications from './PushNotifications';
import Swipeable from './Swipeable';
import Profile from './Profile';
import folderIcon from '../assets/folder.png';
//import { Bar, Pie } from './Charts';

export default function Categories(props){
  const [categories, setCategories] = React.useState();
  const [category, setCategory] = React.useState();
  const [hiddenCategories, setHiddenCategories] = React.useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const [categorySwiped, setCategorySwiped] = React.useState();
  const [notification, setNotification] = React.useState();
  const [scrollEnabled, setScrollEnabled] = React.useState(true);

  const fetchData = async () =>{          
    setHiddenCategories(await AsyncStorage.getItem('hiddenCategories'));
    let res = await fetch(`${props.apiURI}/api/categories?type=HtmlPage`,{
      method:"GET",
      headers: new Headers({"Content-Type": "application/json",Accept: "application/json","Token":props.user.token}),
    });
    if(res.status===200){
      setCategories(await res.json());
    }
    else{
      alert("Categories not Found");
    }
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
        <Profile {...props}/>
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
      {categories &&         
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={()=>{
                setRefreshing(true);
                fetchData();
                setRefreshing(false);
              }}
            />
          }
          data={categories.filter((c)=>(!String(hiddenCategories).includes(","+c.id+",")))}
          renderItem={({ item }) => (
            <Swipeable 
              scrollEnabled={scrollEnabled}
              style={styles.card}
              reset={categorySwiped && categorySwiped.id!==item.id}
              onPress={()=>{
                setCategory(item);
              }}
              onSwipe={() => {
                setScrollEnabled(false);
                setCategorySwiped(item);
              }}
              onSwiped={() => {
                setScrollEnabled(true);
              }}
              onSwipeLeft={() => (
                <Pressable 
                  style={styles.swipeLeft}
                  onPress={async () => {
                    setHiddenCategories(hiddenCategories + "," + item.id + ",");
                    await AsyncStorage.setItem('hiddenCategories', hiddenCategories + "," + item.id + ",");
                  }}
                >
                  <Text>Hide</Text>
                </Pressable>
              )}
              onSwipeRight={() => (
                <Pressable 
                  style={styles.swipeRight}
                  onPress={async () => {
                    setHiddenCategories(hiddenCategories + "," + item.id + ",");
                    await AsyncStorage.setItem('hiddenCategories', hiddenCategories + "," + item.id + ",");
                  }}
                >
                  <Text>Hide</Text>
                </Pressable>
              )}
            >
              <View style={styles.row}>
                <Image source={item.image?{uri:item.image}:folderIcon} style={styles.logo}/>
                <Text style={styles.item}>{item.name}</Text>
              </View>
            </Swipeable>
          )}
          keyExtractor={item => item.id}
        />
      }
      {!categories && 
        <ActivityIndicator/>
      }
      {hiddenCategories &&
        <Pressable style={styles.centeredButton}
          onPress={async () => {
            await AsyncStorage.removeItem("hiddenCategories");
            setHiddenCategories(null);
          }}
        >
          <Text style={styles.item}>Show All</Text>
        </Pressable>
      }
      {category && 
        <Modal
          animationType="slide"
          transparent={false}
          visible={Boolean(category)}
          onRequestClose={() => {
            setCategory(null);
          }}
        >
            <HtmlPages {...props} category={category} setCategory={setCategory}/>
        </Modal>
      }
      
      {/* <Bar 
        interval={10}
        height={150}
        data={[
          {
            label:"Sunday",
            values: [10,9,10,9,8,7]
          },
          {
            label:"Monday",
            values: [10,9,10,9,8,7]
          },
          {
            label:"Tuesday",
            values: [1,2,3,4,5,6]
          },
          {
            label:"Wednesday",
            values: [10,9,10,9,8,7]
          },
          {
            label:"Thursday",
            values: [6,5,4,3,2,1]
          },
          {
            label:"Friday",
            values: [10,9,10,9,8,7]
          },
          {
            label:"Saturday",
            values: [5,6,7,8,9,10]
          },
        ]}
      />
      <Pie 
        data={[
          {
            label:"Purpose",
            value: 1
          },
          {
            label:"Thinking",
            value: 2
          },
          {
            label:"Feelings",
            value: 3
          },
          {
            label:"Environment",
            value: 4
          },
          {
            label:"Physical",
            value: 5
          },
          {
            label:"Moving",
            value: 6
          },
        ]}
      /> */}
    </View>
  );
}