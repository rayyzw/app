import React from 'react';
import { Image, View, Text, Pressable, TextInput, ScrollView } from 'react-native';
import styles from './Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import Footer from './Footer';

export default function Profile(props){
  const [profile, setProfile] = React.useState({});

  React.useEffect(() => {
    if(props.user && props.apiURI){
      const fetchData = async () =>{
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
      };
      fetchData();
    }
  }, [props.user, props.apiURI]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>XinY</Text>
        <Header {...props}/>
      </View>
      <ScrollView>
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
        <Pressable style={styles.centeredButton}
          onPress={async () => {
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
          }}
        >
          <Text style={styles.item}>Save</Text>
        </Pressable>
        <Text> </Text>
        <Pressable style={styles.centeredButton}
          onPress={async () => {
            props.setUser(null);
            await AsyncStorage.removeItem("loginedUser");
          }}
        >
          <Text style={styles.item}>Logout</Text>
        </Pressable>
      </ScrollView>
      <Footer {...props}/>
    </View>
  );
}