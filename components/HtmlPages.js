import React from 'react';
import { Text, View, FlatList , ActivityIndicator, Pressable, Modal, Platform, Image, RefreshControl } from 'react-native';
import styles from './Styles';
import WebView from 'react-native-webview';
import Swipeable from './Swipeable';
import Profile from './Profile';
import pageIcon from '../assets/page.png';

export default function HtmlPages(props){
  const [htmlPages, setHtmlPages] = React.useState();
  const [htmlPage, setHtmlPage] = React.useState();
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchData = async () =>{
    let res = await fetch(`${props.apiURI}/api/htmlPages?categoryId=${props.category.id}`,{
      method:"GET",
      headers: new Headers({"Content-Type": "application/json",Accept: "application/json","Token":props.user.token}),
    });
    if(res.status===200){
      setHtmlPages(await res.json());
    }
    else{
      alert("Resources not Found");
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
        <Swipeable 
          onSwipeRight={() => (
            <Text style={styles.titleSwipe}>Back</Text>
          )}
          onSwipedRight={()=>{props.setCategory(null);}}
        >              
          <Text style={styles.title}>{props.category.name}</Text>
        </Swipeable>
        <Profile {...props}/>
      </View>
      {htmlPages &&         
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
          data={htmlPages}
          renderItem={({ item }) => (
            <Pressable onPress={()=>{setHtmlPage(item);}} style={styles.card}>
              <View style={styles.row}>
                <Image source={item.image?{uri:item.image}:pageIcon} style={styles.logo}/>
                <Text style={styles.item}>{item.title}</Text>
              </View>              
            </Pressable>            
          )}
          keyExtractor={item => item.id}
        />
      }
      {!htmlPages && 
        <ActivityIndicator/>
      }
      {htmlPage && 
        <Modal
          animationType="slide"
          transparent={false}
          visible={Boolean(htmlPage)}
          onRequestClose={() => {
            setHtmlPage(null);
          }}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Swipeable 
                onSwipeRight={() => (
                  <Text style={styles.titleSwipe}>Back</Text>
                )}
                onSwipedRight={()=>{setHtmlPage(null);}}
              >              
                <Text style={styles.title}>{htmlPage.title}</Text>
              </Swipeable>
              <Profile {...props}/>
            </View>
            {Platform.OS !== "web" &&
              <WebView source={{ uri: `${props.apiURI}/html/${htmlPage.id}` }}/>
            }
            {Platform.OS === "web" &&
              <iframe src={`${props.apiURI}/html/${htmlPage.id}`} height="100%"/>
            }
            <Pressable style={styles.centeredButton}
              onPress={() => setHtmlPage(null) }
            >
              <Text style={styles.item}>Back</Text>
            </Pressable>
          </View>
        </Modal>
      }
      <Pressable style={styles.centeredButton}
        onPress={() => props.setCategory(null) }
      >
        <Text style={styles.item}>Back</Text>
      </Pressable>
    </View>
  );
}