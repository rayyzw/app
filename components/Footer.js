import React from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from './Styles';
import Svg, { Line, Path, Rect } from 'react-native-svg';

export default function Footer(props){
  return (
    <View style={styles.footer}>
      <View style={styles.row}>
          <Pressable 
            onPress={() => {props.setPage("home")}}
            style={{width:'25%',alignContent:'center',alignItems:'center',textAlign:'center'}}
          >
            <Text style={{textAlign:'center',fontSize:20,color:'#2b3362'}}>
              <Svg width={32} height={36} viewBox="0 0 16 18" onPress={() => {props.setPage("home")}}>
                <Rect x={0} y={0} width={16} height={16} fill="#2b3362"/>
                <Path fill="#999999" d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
                {props.page==="home" && <Line x1={0} y1={18} x2={16} y2={18} stroke="#999999" strokeWidth="1"/>}
              </Svg>
            </Text>
          </Pressable>
          <Pressable 
            onPress={() => {props.setPage("categories")}}
            style={{width:'25%',alignContent:'center',alignItems:'center',textAlign:'center'}}
          >
            <Text style={{textAlign:'center',fontSize:20,color:'#2b3362'}}>
              <Svg width={32} height={36} viewBox="0 0 16 18" onPress={() => {props.setPage("categories")}}>
                <Rect x={0} y={0} width={16} height={16} fill="#2b3362"/>
                <Path fill="#999999" d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                <Path fill="#999999" d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
                {props.page==="categories" && <Line x1={0} y1={18} x2={16} y2={18} stroke="#999999" strokeWidth="1"/>}
              </Svg>
            </Text>
          </Pressable>
          <Pressable 
            onPress={() => {props.setPage("feelings")}}
            style={{width:'25%',alignContent:'center',alignItems:'center',textAlign:'center'}}
          >
            <Text style={{textAlign:'center',fontSize:20,color:'#2b3362'}}>
              <Svg width={32} height={36} viewBox="0 0 16 18" onPress={() => {props.setPage("feelings")}}>
                <Rect x={0} y={0} width={16} height={16} fill="#2b3362"/>
                <Path fill="#999999" d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053.918 3.995.78 5.323 1.508 7H.43c-2.128-5.697 4.165-8.83 7.394-5.857.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17c3.23-2.974 9.522.159 7.394 5.856h-1.078c.728-1.677.59-3.005.108-3.947C13.486.878 10.4.28 8.717 2.01L8 2.748ZM2.212 10h1.315C4.593 11.183 6.05 12.458 8 13.795c1.949-1.337 3.407-2.612 4.473-3.795h1.315c-1.265 1.566-3.14 3.25-5.788 5-2.648-1.75-4.523-3.434-5.788-5Zm8.252-6.686a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8H.5a.5.5 0 0 0 0 1H4a.5.5 0 0 0 .416-.223l1.473-2.209 1.647 4.118a.5.5 0 0 0 .945-.049l1.598-5.593 1.457 3.642A.5.5 0 0 0 12 9h3.5a.5.5 0 0 0 0-1h-3.162l-1.874-4.686Z"/>
                {props.page==="feelings" && <Line x1={0} y1={18} x2={16} y2={18} stroke="#999999" strokeWidth="1"/>}
              </Svg>
            </Text>
          </Pressable>
          <Pressable 
            onPress={() => {props.setPage("profile")}}
            style={{width:'25%',alignContent:'center',alignItems:'center',textAlign:'center'}}
          >
            <Text style={{textAlign:'center',fontSize:20,color:'#2b3362'}}>
              <Svg width={32} height={36} viewBox="0 0 16 18" onPress={() => {props.setPage("profile")}}>
                <Rect x={0} y={0} width={16} height={16} fill="#2b3362"/>
                <Path fill="#999999" d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
                {props.page==="profile" && <Line x1={0} y1={18} x2={16} y2={18} stroke="#999999" strokeWidth="1"/>}
              </Svg>
            </Text>
          </Pressable>
      </View>
    </View>
  );
}