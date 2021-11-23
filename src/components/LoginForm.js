import React,{useState, useEffect} from 'react'
import SignUpForm from './SignUpForm';
import axios from 'axios';
import App from '../App';
import Cookies from 'universal-cookie/es6';


function LoginForm({Login, error, signup}) {
    const [data, setdata] = useState({});
    const [details, setDetails] = useState({email: "", password :""})
    // const cookiesusr = new Cookies();

    const fetchUser = (email, password) =>{
            email.replace("@", "%")
            axios.get('http://localhost:8080/UserAccount/emailpass?email='
            + email +'&pass=' + password).then((res)=> {
               setdata(res.data);}).catch(err =>{
                   console.log(err);
               });
    }

    function validation(){
        if(details.email !== "" && details.password !== ""){

            fetchUser(details.email, details.password);

            if(details.password === data.password)
            {
                
                Login(data, 1);
            }
            {
                console.log("incorrect password");
            }
            
            console.log(data);  
        }
        else{
            console.log("invalid login");
        }
    }
    
    function sign() {
        signup(3);
    }
    
    useEffect(()=>{
        fetchUser(details.email, details.password)
        console.log("triggered");
        console.log(data);
    }, [details.password]);

    return (
        <form>
            <div className = "form-inside">
                <h2>Login</h2>
                {(error !== "") ? (<div className= "error">{error}</div>) : ""}
                <div className = "form-group">
                    <label htmlFor="name">Email:</label>
                    <input type="email" name = "email" id = "email" onChange = {e => setDetails({...details, email: e.target.value})} value = {details.email}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange = {e => setDetails({...details, password: e.target.value})} value = {details.password}/>
                </div>
                <button onClick = {validation} type ="button">Log in</button>
                <button onClick = {sign} type = "button">Sign Up</button>
            </div>
        </form>
    )
}

export default LoginForm
