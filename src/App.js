
import React, { useState, useEffect } from 'react';
import axios from "axios";
import LoginForm from './components/LoginForm';
import './index.css';
import SignUpForm from './components/SignUpForm';
import Cookies from 'universal-cookie';
import HeaderComponent from './components/HeaderComponent';
import BasePage from './components/BasePage';

// const UserProfiles = () =>{
//   const [userProfiles, setUserprofiles]= useState([]);

//   const fetchUsers = () => {
//     const response = fetch("http://localhost:8080/photoDot/mvc/UserAccount/all");
//     axios.get("http://localhost:8080/UserAccount/all").then((res)=> {
//       console.log(res.data);
//       setUserprofiles(res.data);
//     });
//   }

  // useEffect(() =>{
  //   fetchUsers();
  // }, []);

//     return userProfiles.map((userProfile, index) => {
//     return ( 
//         <div className = "App" key = {index}>
//         <h1>{userProfile.name}</h1>
//         <h1>{userProfile.email}</h1>
//         </div>
//     );
//    });

// // };


//State 0 not logged in
//State 1 logged in
//State 3 Sign Up
function App() {
  const initialstate = 0;
  const [user ,setUserprofiles] = useState({});
  const [error, setError] = useState("");
  const [shouldupdate, setshouldupdate] = useState(true);

  const [appstate, setAppState] = useState(initialstate);

    const forceUpdate = () =>{
        setshouldupdate(!shouldupdate);
    }

  //const cookies = new Cookies(); 

  function Login(details, state){
    setUserprofiles(details);
    setAppState(state);
  }

  function signUp(state){
    setAppState(state);
  }

  const Logout = () => {
    setUserprofiles({
      email : ""
    });
  }
  
  return (
    <div>
      <HeaderComponent/>
      <div className = "App">
      {(appstate === 1) ? (
        <BasePage userstate = {user} signUp= {signUp} forcedupdate = {forceUpdate}/>
      ) : ( (appstate === 0) ?(
        <LoginForm Login={Login} error={error} signup = {signUp}/>
      ) : (<SignUpForm SignUp = {signUp}/>))};
      </div>
    </div>
  );
}

export default App;
