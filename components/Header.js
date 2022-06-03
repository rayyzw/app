import React from 'react';
import { Image, View, Text, Pressable } from 'react-native';
import styles from './Styles';

export default function Header(props){
  return (
    <View 
      style={styles.topRight}
    >
      <Pressable 
        onPress={()=>{
          props.setPage('profile');
        }}
      >
        {props.user.photo ?
          <Image source={{uri:props.user.photo}} style={styles.photo}/>
          :
          <Text style={styles.title}>Hi, {props.user.name}</Text>
        }
      </Pressable>
    </View>
  );
}