import React,{useState} from 'react'
import SignUpForm from './SignUpForm';
import axios from 'axios';


function LoginForm({Login, error}) {
    const [details, setDetails] = useState({email:"", password:""})
    const [data, setdata] = useState();

    const sumbmitHandler = e =>{
        e.preventDefault();
        if(details.email === "" || details.password === ""){

        }
        else{
                axios.get("http://localhost:8080/UserAccount/all").then((res)=> {
                  console.log(res.data);
                });
              }
            Login(details);
        }   
    

    return (
        <form>
            <div className = "form-inside">
                <h2>Login</h2>
                {(error !== "") ? (<div className= "error">{error}</div>) : ""}
                <div className = "form-group">
                    <label htmlFor="name">Email:</label>
                    <input type="text" name = "email" id = "email" onChange = {e => setDetails({...details, email: e.target.value})} value = {details.name}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange = {e => setDetails({...details, password: e.target.value})} value = {details.password}/>
                </div>
                <button onClick = {sumbmitHandler}>Log in</button>
                <button onClick = {SignUpForm}>Sign Up</button>
            </div>
        </form>
    )
}

export default LoginForm
