import React from 'react';
import Categories from './components/Categories';
import Login from './components/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';

export default function App() {
  const apiURI = "https://xiny.ca";
  //const apiURI = "http://localhost:3000";
  const [user, setUser] = React.useState();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async ()=>{
      let loginedUser = await AsyncStorage.getItem('loginedUser');
      if(loginedUser){
        try{
          loginedUser = JSON.parse(loginedUser);
          let res = await fetch(`${apiURI}/api/users/profile`,{
            method:"GET",
            headers: new Headers({"Content-Type": "application/json",Accept: "application/json","Token":loginedUser.token}),
          });
          if(res.status===200){
            setUser(loginedUser);
          }
          else{
            await AsyncStorage.removeItem('loginedUser');
          }
        }
        catch(e){
          console.error(e);
          await AsyncStorage.removeItem('loginedUser');
        }
      }
    }
    fetchData();
    setLoading(false);
  }, []);

  if(loading){
    return (
      <ActivityIndicator/>
    );
  }
  else{
    if(user){
      return (
        <Categories apiURI={apiURI} user={user} setUser={setUser}/>
      );
    }
    else{
      return (
        <Login apiURI={apiURI} user={user} setUser={setUser}/>
      );
    }
  }
}