import { Outlet } from "react-router-dom";
import Nav from "./Components/Structure/Nav";
import Login from "./Components/Login";
import 'react-notifications/lib/notifications.css';
import './css/main.css'
import { useState, useEffect } from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';


export default function App() {
  const [Auth, setAuth] = useState(false);
  const loginCatch = async (e) =>{
    e.preventDefault();
    let target = e.target;
    let formItems = {};
    for (let i = 0; i < target.length; i++) {
      const item = target[i];
      if(item.type !== 'submit'){
        formItems[item.name] = item.value;
      }
    }
    const checkAuth = await fetch(process.env.REACT_APP_API_URL+'/login', {
      method:"POST",
      headers:{
        'Content-Type': '"application/x-form-urlencoded"'
      },
      body:JSON.stringify(formItems)
    })
    const checkAuthData = await checkAuth.json();
    if(checkAuthData.Token && (checkAuthData.success || checkAuthData.info)){
      localStorage.setItem('Token', checkAuthData.Token);
      NotificationManager.success(checkAuthData.success);
      setAuth(true);
    }else if(checkAuthData.error){
      NotificationManager.error(checkAuthData.error);
    }
    
    
  }

  const checkToken = async (Token) => {
    const checkToken = await fetch(process.env.REACT_APP_API_URL+'/token?token='+Token, {
      method:"POST",
      headers:{
        'Content-Type': '"application/x-form-urlencoded"'
      },
      body:JSON.stringify({'Token':Token})
    });
    const tokenData = await checkToken.json();
    if(tokenData.success && tokenData.Token){
      setAuth(true);
    }else{
      setAuth(false);
    }
  }


  useEffect(() => {
    if(localStorage.getItem('Token')){
      checkToken(localStorage.getItem('Token'));
    }
  }, []);
  

  


  return (
    <>
    
    {!Auth && 
      <Login onSubmit={loginCatch} />
    }
    {Auth && 
      <div className="Wrapper">
        <Nav/>
      <Outlet/>
      </div>
    }
    <NotificationContainer/>
    </>
  );
}

