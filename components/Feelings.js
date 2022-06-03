import React from 'react';
import { Text, View, ScrollView, Dimensions, Pressable } from 'react-native';
import styles from './Styles';
import Header from './Header';
import Footer from './Footer';
import { BarChart, LineChart } from './Charts';
import Svg, { Circle, Path, Line } from 'react-native-svg';
import { Rating } from 'react-native-ratings';

export default function Feelings(props){
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const today = new Date();
  const months = {1:'Jan',2:'Feb',3:'Mar',4:'Apr',5:'May',6:'Jun',7:'Jul',8:'Aug',9:'Sep',10:'Oct',11:'Nov',12:'Dec'};
  const daysOfWeek = {0:'Sun',1:'Mon',2:'Tue',3:'Wed',4:'Thu',5:'Fri',6:'Sat'};

  const [feeling, setFeeling] = React.useState({
    purpose:0,
    thinking:0,
    energy:0,
    environment:0,
    physical:0,
    moving:0
  });
  const [feelingsPercentage, setFeelingsPercentage] = React.useState(0);
  const [feelingsLatest, setFeelingsLatest] = React.useState();
  const [feelingsSum, setFeelingsSum] = React.useState();
  const [feelingsAverage, setFeelingsAverage] = React.useState();

  const fetchData = async () =>{    
    let fa = [];
    let fs = [];
    
    for(let i=6; i>=0; i--){
      let startDate = new Date(today.getTime()-(86400000*i));
      let endDate = new Date(startDate.getTime()+86400000);
      let res = await fetch(`${props.apiURI}/api/feelings/average?startDate=${startDate.toISOString().split("T")[0]}&endDate=${endDate.toISOString().split("T")[0]}`,{
        method:"GET",
        headers: new Headers({"Content-Type": "application/json",Accept: "application/json","Token":props.user.token}),
      });
      if(res.status===200){
        let feeling = await res.json();
        feeling.label = `${daysOfWeek[startDate.getDay()]}`;
        feeling.values = [feeling.purpose,feeling.thinking,feeling.energy,feeling.environment,feeling.physical,feeling.moving];
        fa.push(feeling);
        let feeling1 = {...feeling};
        feeling1.label = `${daysOfWeek[startDate.getDay()]}`;
        feeling1.values = [(feeling.purpose+feeling.thinking+feeling.energy+feeling.environment+feeling.physical+feeling.moving)];
        fs.push(feeling1);
      }
    }
    setFeelingsAverage(fa);
    setFeelingsSum(fs);
    setFeelingsPercentage((fs[6].values[0]/0.3).toFixed());
    
    let startDate = new Date(today.getTime());
    let endDate = new Date(startDate.getTime()+86400000);
    let res1 = await fetch(`${props.apiURI}/api/feelings/latest?startDate=${startDate.toISOString().split("T")[0]}&endDate=${endDate.toISOString().split("T")[0]}`,{
      method:"GET",
      headers: new Headers({"Content-Type": "application/json",Accept: "application/json","Token":props.user.token}),
    });
    if(res1.status===200){
      setFeelingsLatest(await res1.json());
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
        <Header {...props}/>
      </View>
      <ScrollView>
      <Text style={styles.item}>Record Feeling</Text>
        <View style={styles.cardContainer}>
          <Text style={styles.item}>{months[today.getMonth()+1]} {today.getDate()}, {today.getFullYear()}</Text>
          <View style={{flexDirection:'row',paddingLeft:10}}>
            <View style={{width:'50%'}}>
              <Text>Purpose</Text>
              <Rating
                onFinishRating={(rating)=>{setFeeling((old)=>({...old,purpose:rating}))}}
                startingValue={feeling.purpose}
                imageSize={25}
                style={{alignItems:'flex-start'}}
              />
              <Text>Energy</Text>
              <Rating
                onFinishRating={(rating)=>{setFeeling((old)=>({...old,energy:rating}))}}
                startingValue={feeling.energy}
                imageSize={25}
                style={{alignItems:'flex-start'}}
              />
              <Text>Physical</Text>
              <Rating
                onFinishRating={(rating)=>{setFeeling((old)=>({...old,physical:rating}))}}
                startingValue={feeling.physical}
                imageSize={25}
                style={{alignItems:'flex-start'}}
              />
            </View>
            <View style={{width:'50%'}}>
              <Text>Thinking</Text>
              <Rating
                onFinishRating={(rating)=>{setFeeling((old)=>({...old,thinking:rating}))}}
                startingValue={feeling.thinking}
                imageSize={25}
                style={{alignItems:'flex-start'}}
              />
              <Text>Environment</Text>
              <Rating 
                onFinishRating={(rating)=>{setFeeling((old)=>({...old,environment:rating}))}}
                startingValue={feeling.environment}
                imageSize={25}
                style={{alignItems:'flex-start'}}
              />
              <Text>Moving</Text>
              <Rating
                onFinishRating={(rating)=>{setFeeling((old)=>({...old,moving:rating}))}}
                startingValue={feeling.moving}
                imageSize={25}
                style={{alignItems:'flex-start'}}
              />
            </View>
          </View>
          <Text>{' '}</Text>
          <View style={styles.flexCenter}>
            <Pressable onPress={async ()=>{  
              let res1 = await fetch(`${props.apiURI}/api/feelings`,{
                method:"POST",
                headers: new Headers({"Content-Type": "application/json",Accept: "application/json","Token":props.user.token}),
                body:JSON.stringify(feeling)
              });
              if(res1.status===200){
                fetchData();
              }
              else{
                alert("Can't save!");
              }
            }}>
              <Text style={styles.button}>Save</Text>
            </Pressable>
            <Text>{' '}</Text>
            <Pressable onPress={()=>{
              setFeeling({
                date:today,
                purpose:0,
                thinking:0,
                energy:0,
                environment:0,
                physical:0,
                moving:0
              });
            }}>
              <Text style={styles.button}>Reset</Text>
            </Pressable>
          </View>    
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.item}>Today's Energy Status</Text>
          <View style={styles.flexCenter}>
            {feelingsPercentage>0 && feelingsPercentage<20 && 
              <>
              <Svg width={20} height={20} viewBox="0 0 16 16">
                <Path fill="maroon" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <Path fill="maroon" d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zm6.991-8.38a.5.5 0 1 1 .448.894l-1.009.504c.176.27.285.64.285 1.049 0 .828-.448 1.5-1 1.5s-1-.672-1-1.5c0-.247.04-.48.11-.686a.502.502 0 0 1 .166-.761l2-1zm-6.552 0a.5.5 0 0 0-.448.894l1.009.504A1.94 1.94 0 0 0 5 6.5C5 7.328 5.448 8 6 8s1-.672 1-1.5c0-.247-.04-.48-.11-.686a.502.502 0 0 0-.166-.761l-2-1z"/>
              </Svg>
              <Text style={{fontSize:25,color:'maroon',width:'30%',paddingLeft:10}}>Bad</Text>
              <Text style={{fontSize:25,color:'maroon',width:'30%',paddingLeft:10}}>{feelingsPercentage}%</Text>
              </>
            }
            {feelingsPercentage>=20 && feelingsPercentage<40 && 
              <>
              <Svg width={20} height={20} viewBox="0 0 16 16">
                <Path fill="red" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <Path fill="red" d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
              </Svg>
              <Text style={{fontSize:25,color:'red',width:'30%',paddingLeft:10}}>Poor</Text>
              <Text style={{fontSize:25,color:'red',width:'30%',paddingLeft:10}}>{feelingsPercentage}%</Text>
              </>
            }
            {feelingsPercentage>=40 && feelingsPercentage<60 && 
              <>
              <Svg width={20} height={20} viewBox="0 0 16 16">
                <Path fill="olive" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <Path fill="olive" d="M4 10.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5zm3-4C7 5.672 6.552 5 6 5s-1 .672-1 1.5S5.448 8 6 8s1-.672 1-1.5zm4 0c0-.828-.448-1.5-1-1.5s-1 .672-1 1.5S9.448 8 10 8s1-.672 1-1.5z"/>
              </Svg>
              <Text style={{fontSize:25,color:'olive',width:'30%',paddingLeft:10}}>Average</Text>
              <Text style={{fontSize:25,color:'olive',width:'30%',paddingLeft:10}}>{feelingsPercentage}%</Text>
              </>
            }
            {feelingsPercentage>=60 && feelingsPercentage<80 && 
              <>
              <Svg width={20} height={20} viewBox="0 0 16 16">
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
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.item}>Today's Last Recorded</Text>
          {feelingsLatest &&
            <View style={{padding:10}}>
              <Svg width={windowWidth-70} height={10}>
                <Line x1={0} y1={5} x2={(windowWidth-70)*feelingsLatest.purpose/5} y2={5} stroke="#FF0000" strokeWidth="2" />
              </Svg>
              <Text style={{paddingLeft:10,paddingBottom:10}}>Purpose</Text>
              <Svg width={windowWidth-70} height={10}>
                <Line x1={0} y1={5} x2={(windowWidth-70)*feelingsLatest.thinking/5} y2={5} stroke="#0000FF" strokeWidth="2" />
              </Svg>
              <Text style={{paddingLeft:10,paddingBottom:10}}>Thinking</Text>
              <Svg width={windowWidth-70} height={10}>
                <Line x1={0} y1={5} x2={(windowWidth-70)*feelingsLatest.energy/5} y2={5} stroke="#00FF00" strokeWidth="2" />
              </Svg>
              <Text style={{paddingLeft:10,paddingBottom:10}}>Energy</Text>
              <Svg width={windowWidth-70} height={10}>
                <Line x1={0} y1={5} x2={(windowWidth-70)*feelingsLatest.environment/5} y2={5} stroke="#888800" strokeWidth="2" />
              </Svg>
              <Text style={{paddingLeft:10,paddingBottom:10}}>Environment</Text>
              <Svg width={windowWidth-70} height={10}>
                <Line x1={0} y1={5} x2={(windowWidth-70)*feelingsLatest.physical/5} y2={5} stroke="#008888" strokeWidth="2" />
              </Svg>
              <Text style={{paddingLeft:10,paddingBottom:10}}>Physical</Text>
              <Svg width={windowWidth-70} height={10}>
                <Line x1={0} y1={5} x2={(windowWidth-70)*feelingsLatest.moving/5} y2={5} stroke="#880088" strokeWidth="2" />
              </Svg>
              <Text style={{paddingLeft:10,paddingBottom:10}}>Moving</Text>
            </View>
          }
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.item}>History</Text>
          {feelingsAverage &&  
            <BarChart 
              interval={5}
              height={150}
              width={windowWidth-70}
              data={feelingsAverage}
            />
          }
        </View>
        <Text style={{fontSize:11,paddingLeft:10}}>
          <Svg width={8} height={12}><Circle r={4} cx={4} cy={8} fill={"#FF0000"}/></Svg>Purpose{" "}
          <Svg width={8} height={12}><Circle r={4} cx={4} cy={8} fill={"#0000FF"}/></Svg>Thinking{" "}
          <Svg width={8} height={12}><Circle r={4} cx={4} cy={8} fill={"#00FF00"}/></Svg>Energy{" "}
          <Svg width={8} height={12}><Circle r={4} cx={4} cy={8} fill={"#888800"}/></Svg>Environment{" "}
          <Svg width={8} height={12}><Circle r={4} cx={4} cy={8} fill={"#008888"}/></Svg>Physical{" "}
          <Svg width={8} height={12}><Circle r={4} cx={4} cy={8} fill={"#880088"}/></Svg>Moving{" "}
        </Text>
        <View style={styles.cardContainer}>
          <Text style={styles.item}>Energy Graph (Last 7 Days)</Text>
          {feelingsSum &&            
            <LineChart 
              interval={30}
              height={150}
              width={windowWidth-70}
              data={feelingsSum}
            />
          }
        </View>
      </ScrollView>
      <Footer {...props}/>
    </View>
  );
}