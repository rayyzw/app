import React from 'react';
import { Text, View, Pressable, TextInput, ActivityIndicator } from 'react-native';
import styles from './Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(false);
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>XinY</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={(text)=>{setEmail(text);}}/>
      <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} value={password} onChangeText={(text)=>{setPassword(text);}}/>      
      {!loading &&
        <Pressable style={styles.centeredButton} 
          onPress={ async ()=>{
            setLoading(true);
            let res = await fetch(`${props.apiURI}/api/users/login`,{
              method:"POST",
              headers: new Headers({"Content-Type": "application/json",Accept: "application/json",}),
              body:JSON.stringify({email:email,password:password})
            });
            setLoading(false);
            if(res.status===200){
              let loginedUser = await res.json();
              await AsyncStorage.setItem('loginedUser', JSON.stringify(loginedUser));
              props.setUser(loginedUser);
            }
            else{
              alert("User not Found");
            }
          }}
        >
          <Text style={styles.item}>Login</Text>
        </Pressable>
      }
      {loading && 
        <ActivityIndicator/>
      }
    </View>
  );
}
