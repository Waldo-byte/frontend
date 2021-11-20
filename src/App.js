import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";

const UserProfiles = () =>{
  const [userProfiles, setUserprofiles]= useState([]);

  const fetchUsers = () => {
    const response = fetch("http://localhost:8080/photoDot/mvc/UserAccount/all");
    axios.get("http://localhost:8080/photoDot/mvc/UserAccount/all").then((res)=> {
      console.log(res.data);
      setUserprofiles(res.data);
    });
  }

  useEffect(() =>{
    fetchUsers();
  }, []);

    return userProfiles.map((userProfile, index) => {
    return ( 
        <div className = "App" key = {index}>
        <h1>{userProfile.name}</h1>
        <h1>{userProfile.email}</h1>
        </div>
    );
   });

};

function App() {
  return (
    <div className="App">
      <UserProfiles />
    </div>
  );
}

export default App;
