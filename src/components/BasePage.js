import axios from 'axios';
import React, {useState, useEffect} from 'react'
import Cookies from 'universal-cookie';
import "../components/photo.css";
import "../App.css";

function useForceUpdate(){
    const [value, setvalue] = useState(0);
    return () => setvalue(value => value +1);
}

function BasePage({userstate, signUp , forceupdate}) {
    const [images, setImages] = useState([]);
    const [id, setID] = useState(0);
    const [selectedFile, setSelectedFile] = useState();
    const [filepicked, setFilePicked] = useState(false);
    const [value, setValeu] = useState(0);
    const [uploaded, setUploaded] = useState(0);
    const [filenames, setFilenames] = useState(0);
    const [todelete, setTodelete] = useState("")

    const fetchuser = () =>{
        const email = userstate.email.replace("@", "%40");
        console.log("replaced email = " + email)
        axios.get('http://localhost:8080/UserAccount/email?email=' + email).then((res) => {
            setID(res.data);
            console.log(id);
            }).catch(err => {
            console.log("first get" + err);
            })
    }
     
    const fetchimages = () =>{
        const response  = axios.get('http://localhost:8080/photos/all?name='+userstate.name+'&userid=' + id+"").then((res) => {
        setImages(res.data);
        console.log(res.data);
        console.log(images);
        }).catch(err => {
        console.log("second get" + err);
        })}
 
    useEffect(() => {
        fetchuser();       
    },[]);

    useEffect(() => {
        fetchimages();       
    },[uploaded]);

    useEffect(() =>{
        fetchimages();
    },[id])
    
    useEffect(() =>{
        setValeu(1)
    },[selectedFile])

    const Logout = () =>{
        signUp(0)
    }

    // const uploadPhoto = () =>{

    // }

    const changeHandler = (event) => {

		setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0]);
		setFilePicked(true);
	};


	const handleSubmission = () => {
        const formData = new FormData();
        console.log(selectedFile);
		
        formData.append('file', selectedFile);

        axios.post('http://localhost:8080/photos/upload/photo?usrid=' + id,
        formData,{
            headers: {
                "Content-Type": "multipart/form-date"
            }
        } 
        ).then((res) => {
            console.log("Sucess")
        }).catch(err =>{ 
            console.log(err);
        });
        setUploaded(uploaded+1);

	};

    const getfilenameFromURI = (uri) => {
        const uri1 = (uri +"").replace("https://retryspringboot.blob.core.windows.net/", "");
        const uri2 = uri1.replace(id+userstate.name+"/" , "");
        console.log(uri2);
    };

    const deletePost = (string) => {
        axios.delete('http://localhost:8080/photos/delete?filename=' +string+'&userplusid=' + id+userstate.name).then((res) => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })

    }
    const selectfileToDelete = () =>{
        var filename = "";
        const string = filenames[todelete];
        if(string.includes('%20'))
        {
            string.replace("%20", " ");
            deletePost(string);
        }
        else{
            deletePost(string);
        }

    }


    return (
        <div className = "photos">
            <h2>
                <h2 className= "above">
                    <label className = "header">Upload File</label>
                    <label classname= "select" for="img">Select image:</label>
                    <input className= "browse" type="file" id="img" name="img" accept="image/*" onChange = {changeHandler}></input>
                    
                    {filepicked ? (

                        <div>
        
                            <p>Filename: {selectedFile.name}</p>
        
                            <p>Filetype: {selectedFile.type}</p>
        
                            <p>Size in bytes: {selectedFile.size}</p>
                        </div>
        
                    ) : (
        
                        <p>Select a file to show details</p>
        
                    )}
                    <button className = "upload" type ="button" onClick = {handleSubmission}> Upload File</button>
                </h2>
                <ul> {images.map((post, index )=>(
                <h1>
                <img src = {post} key = {index}></img>
                <a href = {post}>{index}</a>
                <label onLoad ={getfilenameFromURI(post)} ></label>
                </h1>))}
                </ul>
                
                <button className="logout" type = "button" onClick = {signUp}>Logout</button>
                <button className="logout" type = 'button' onClick = {fetchimages}>Refresh</button>
            </h2>
        </div>
        
    );
}

export default BasePage
