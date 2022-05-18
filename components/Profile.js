import React from 'react';
import { Image, View, Text, Pressable, Modal, TextInput, ActivityIndicator } from 'react-native';
import styles from './Styles';
import Swipeable from './Swipeable';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile(props){
  const [showProfile, setShowProfile] = React.useState(false);
  const [profile, setProfile] = React.useState();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if(props.user && props.apiURI){
      const fetchData = async () =>{
        setLoading(true);
        let res = await fetch(`${props.apiURI}/api/users/profile`,{
          method:"GET",
          headers: new Headers({"Content-Type": "application/json",Accept: "application/json","Token":props.user.token}),
        });
        if(res.status===200){
          setProfile(await res.json());
        }
        else{
          alert("Resources not Found");
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [props.user, props.apiURI]);

  return (
    <>
    <View 
      style={styles.topRight}
    >
      <Pressable 
        onPress={()=>{
          setShowProfile(true);
        }}
      >
        {props.user.photo ?
          <Image source={{uri:props.user.photo}} style={styles.photo}/>
          :
          <Text style={styles.title}>Hi, {props.user.name}</Text>
        }
      </Pressable>
    </View>
    {showProfile && 
      <Modal
        animationType="slide"
        transparent={false}
        visible={showProfile}
        onRequestClose={() => {
          setShowProfile(false);
        }}
      >
        <View style={styles.container}>
          <Swipeable 
            onSwipeRight={() => (
              <Text style={styles.titleSwipe}>Back</Text>
            )}
            onSwipedRight={()=>{setShowProfile(null);}}
          >              
            <Text style={styles.title}>Profile</Text>
          </Swipeable>
          {!loading && profile && 
            <View>
              {profile.photo &&
                <View style={styles.row}>
                  <Text style={styles.item}>Photo:</Text>
                  <Image source={{uri:profile.photo}} style={styles.photo}/>
                </View>
              }
              <View style={styles.row}>
                <Text style={styles.item}>Name:</Text>
                <TextInput style={styles.input} placeholder="Name" value={profile.name} onChangeText={(text)=>{setProfile({...profile,name:text});}}/>
              </View>
              <View style={styles.row}>
                <Text style={styles.item}>Email:&nbsp;</Text>
                <TextInput style={styles.input} placeholder="Email" value={profile.email} onChangeText={(text)=>{setProfile({...profile,email:text});}}/>
              </View>
              <View style={styles.row}>
                <Text style={styles.item}>Version:&nbsp;1.0</Text>
              </View>
              <View style={styles.row}>
                <Pressable style={styles.centeredButton}
                  onPress={async () => {   
                    setLoading(true);           
                    let res1 = await fetch(`${props.apiURI}/api/users/profile`,{
                      method:"PUT",
                      headers: new Headers({"Content-Type": "application/json",Accept: "application/json","Token":props.user.token}),
                      body:JSON.stringify(profile)
                    });
                    if(res1.status===200){
                      alert("Save!");
                    }
                    else{
                      alert("Can't save!");
                    }
                    setLoading(false);
                  }}
                >
                  <Text style={styles.item}>Save</Text>
                </Pressable>
                <Pressable style={[styles.centeredButton, {flex:1}]}
                  onPress={() => setShowProfile(null) }
                >
                  <Text style={styles.item}>Back</Text>
                </Pressable>
                <Pressable style={styles.centeredButton}
                  onPress={async () => {
                    props.setUser(null);
                    await AsyncStorage.removeItem("loginedUser");
                  }}
                >
                  <Text style={styles.item}>Logout</Text>
                </Pressable>
              </View>
            </View>
          }
          {loading && 
            <ActivityIndicator/>
          }
        </View>
      </Modal>
    }
    </>
  );
}