
import React,{useState} from "react";
import axios from "axios";

function SignUpForm() {
    const [userdetails, setuserdetails]= useState({name:"", 
    surname: "",
    email: "",
    password: "" });
    const [password, setPassword] = useState({password1:"", password2:""})

    const test = false;
    var error = "";

    const createUser = ( name , surname, email, password) =>{
        const json = {name, surname, email, password}
        axios.post('http://192.168.0.30:8080/UserAccount/',null ,{
            params:{
                name, 
                surname, 
                email, 
                password
            } 
        }).then((res) => {
            console.log(res);
        }).catch(err => {
            console.log(err)
        });    
    }

    function signUpCLick()
    {
        console.log("got this far");
        //valididty check
        if(password.password1 !== password.password2)
        {
            console.log("got this far if 1");
            error = "passwords do not match";

        }
        else{
            console.log("got this far else 1");
            userdetails.password = password.password1; 
            if(userdetails.name === "" || userdetails.surname === "" || userdetails.email === "" || userdetails.password === "")
            {
                console.log("got this far if 2");
    
            }
            else{
                console.log("else 2")
                createUser(userdetails.name, userdetails.surname, userdetails.email, userdetails.password);
            }
        }
       

    }

    return (
        <form>
        <div className = "form-inside">
                <h2>Sign Up</h2>
                {(error !== "") ? (<div className= "error">{error}</div>) : ""}
                <div className = "form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" name = "name" id = "name" onChange = {e => setuserdetails({...userdetails, name: e.target.value})} value = {userdetails.name}/>
                </div>
                <div className = "form-group">
                    <label htmlFor="Surname">Surname:</label>
                    <input type="text" name = "surname" id = "surname" onChange = {e => setuserdetails({...userdetails, surname: e.target.value})} value = {userdetails.surname}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" name="email" id="email" onChange = {e => setuserdetails({...userdetails, email: e.target.value})} value = {userdetails.email}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange = {e => setPassword({...password, password1: e.target.value})} value = {password.password1}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" name="password" id="password" onChange = {e => setPassword({...password, password2: e.target.value})} value = {password.password2}/>
                </div>
                <button onClick ={signUpCLick} type ="button">Sign Up</button>
        </div>
        </form>
    )
}

export default SignUpForm
