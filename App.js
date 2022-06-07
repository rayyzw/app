import React from 'react';
import Login from './components/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import Home from './components/Home';
import Categories from './components/Categories';
import Feelings from './components/Feelings';
import Profile from './components/Profile';

export default function App() {
  const apiURI = "https://xiny.ca";
  //const apiURI = "http://localhost:3000";
  const [user, setUser] = React.useState();
  const [page, setPage] = React.useState("home");
  const [loading, setLoading] = React.useState(true);

  const props = {
    apiURI:apiURI,
    user:user,
    setUser:setUser,
    page:page,
    setPage:setPage,
  }

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
      if(page==="home"){
        return (
          <Home {...props}/>
        );
      }
      else if(page==="categories"){
        return (
          <Categories {...props}/>
        );
      }
      else if(page==="feelings"){
        return (
          <Feelings {...props}/>
        );
      }
      else if(page==="profile"){
        return (
          <Profile {...props}/>
        );
      }
    }
    else{
      return (
        <Login {...props}/>
      );
    }
  }
}