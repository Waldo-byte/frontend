
import React, { useState, useEffect } from 'react';
import axios from "axios";
import LoginForm from './components/LoginForm';
import './index.css';
import SignUpForm from './components/SignUpForm';

// const UserProfiles = () =>{
//   const [userProfiles, setUserprofiles]= useState([]);

//   const fetchUsers = () => {
//     const response = fetch("http://localhost:8080/photoDot/mvc/UserAccount/all");
//     axios.get("http://localhost:8080/UserAccount/all").then((res)=> {
//       console.log(res.data);
//       setUserprofiles(res.data);
//     });
//   }

//   useEffect(() =>{
//     fetchUsers();
//   }, []);

//     return userProfiles.map((userProfile, index) => {
//     return ( 
//         <div className = "App" key = {index}>
//         <h1>{userProfile.name}</h1>
//         <h1>{userProfile.email}</h1>
//         </div>
//     );
//    });

// // };

function App() {

  const [user ,setUserprofiles] = useState({name:""});
  const [error, setError] = useState("");
  const[singup, setSignUp] = useState();

  const Login = details=>{
    console.log(details);
  }
  const Logout = () => {
    setUserprofiles({
      name : ""
    });
  }
  
  return (
    <div className = "App">
      {(user.name !== "") ? (
        <div className = "welcome">
          <h2>Welcome <span>{user.name}</span></h2>
          <button onClick = {Logout}>Logout</button>
        </div>
      ) : ( (singup != true) ?(
        <LoginForm Login={Login} error={error} />
      ) : (<SignUpForm/>))};
    </div>
  );
}

export default App;
