import React from 'react';
import { Text, View, Pressable, ScrollView } from 'react-native';
import styles from './Styles';
import PushNotifications from './PushNotifications';
import Swipeable from './Swipeable';
import Header from './Header';
import Footer from './Footer';
import {Calendar} from 'react-native-calendars';
import Svg, { Path } from 'react-native-svg';

export default function Home(props){
  const [notification, setNotification] = React.useState();
  const [feelings, setFeelings] = React.useState();
  const [date, setDate] = React.useState();
  const [markedDates, setMarkedDates] = React.useState({});

  const fetchData = async () =>{
    let res = await fetch(`${props.apiURI}/api/feelings`,{
      method:"GET",
      headers: new Headers({"Content-Type": "application/json",Accept: "application/json","Token":props.user.token}),
    });
    if(res.status===200){
      let fs = await res.json();
      setFeelings(fs);
      let md = {};
      fs.map((f)=>{
        md[f.createdAt.split('T')[0]] = {selected: true, selectedColor: 'blue'}
      });
      setMarkedDates(md);
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
        <Text style={styles.title}></Text>
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
      <Calendar
        style={styles.cardContainer}
        markedDates={markedDates}
        onDayPress={async (day) => {
          console.log(day);
          setDate(day);
        }}
        onMonthChange={async (month) => {
          console.log(month);
          setDate(null);
        }}
      />
      {feelings && date &&
        <Text style={styles.title}>{date.dateString}</Text>
      }
      <ScrollView style={styles.cardContainer}>
        {feelings && date && feelings.filter((f)=>(f.createdAt.includes(date.dateString))).sort((a,b)=>((b.id)-(a.id))).map((feeling)=>{
          let feelingsPercentage = ((feeling.purpose+feeling.thinking+feeling.energy+feeling.environment+feeling.physical+feeling.moving)/0.3).toFixed();
          return (
            <View style={styles.row} key={feeling.id}>
              <Text style={{width:100}}>{new Date(feeling.createdAt).toLocaleTimeString()} {' '}</Text>                  
              {feelingsPercentage>0 && feelingsPercentage<20 && 
                <>
                <Svg width={30} height={30} viewBox="0 0 16 16">
                  <Path fill="maroon" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <Path fill="maroon" d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zm6.991-8.38a.5.5 0 1 1 .448.894l-1.009.504c.176.27.285.64.285 1.049 0 .828-.448 1.5-1 1.5s-1-.672-1-1.5c0-.247.04-.48.11-.686a.502.502 0 0 1 .166-.761l2-1zm-6.552 0a.5.5 0 0 0-.448.894l1.009.504A1.94 1.94 0 0 0 5 6.5C5 7.328 5.448 8 6 8s1-.672 1-1.5c0-.247-.04-.48-.11-.686a.502.502 0 0 0-.166-.761l-2-1z"/>
                </Svg>
                <Text style={{fontSize:25,color:'maroon',width:'30%',paddingLeft:10}}>Bad</Text>
                <Text style={{fontSize:25,color:'maroon',width:'30%',paddingLeft:10}}>{feelingsPercentage}%</Text>
                </>
              }
              {feelingsPercentage>=20 && feelingsPercentage<40 && 
                <>
                <Svg width={30} height={30} viewBox="0 0 16 16">
                  <Path fill="red" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <Path fill="red" d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
                </Svg>
                <Text style={{fontSize:25,color:'red',width:'30%',paddingLeft:10}}>Poor</Text>
                <Text style={{fontSize:25,color:'red',width:'30%',paddingLeft:10}}>{feelingsPercentage}%</Text>
                </>
              }
              {feelingsPercentage>=40 && feelingsPercentage<60 && 
                <>
                <Svg width={30} height={30} viewBox="0 0 16 16">
                  <Path fill="olive" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <Path fill="olive" d="M4 10.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5zm3-4C7 5.672 6.552 5 6 5s-1 .672-1 1.5S5.448 8 6 8s1-.672 1-1.5zm4 0c0-.828-.448-1.5-1-1.5s-1 .672-1 1.5S9.448 8 10 8s1-.672 1-1.5z"/>
                </Svg>
                <Text style={{fontSize:25,color:'olive',width:'30%',paddingLeft:10}}>Average</Text>
                <Text style={{fontSize:25,color:'olive',width:'30%',paddingLeft:10}}>{feelingsPercentage}%</Text>
                </>
              }
              {feelingsPercentage>=60 && feelingsPercentage<80 && 
                <>
                <Svg width={30} height={30} viewBox="0 0 16 16">
                  <Path fill="green" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <Path fill="green" d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
                </Svg>
                <Text style={{fontSize:25,color:'green',width:'30%',paddingLeft:10}}>Good</Text>
                <Text style={{fontSize:25,color:'green',width:'30%',paddingLeft:10}}>{feelingsPercentage}%</Text>
                </>
              }
              {feelingsPercentage>=80 &&
                <>
                <Svg width={30} height={30} viewBox="0 0 16 16">
                  <Path fill="teal" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <Path fill="teal" d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5zM7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z"/>
                </Svg>
                <Text style={{fontSize:25,color:'teal',width:'30%',paddingLeft:10}}>Great</Text>
                <Text style={{fontSize:25,color:'teal',width:'30%',paddingLeft:10}}>{feelingsPercentage}%</Text>
                </>
              }
            </View>
          );
        })}
      </ScrollView>   
      <Footer {...props}/>
    </View>
  );
}