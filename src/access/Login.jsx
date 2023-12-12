import React, {useState} from 'react';
import {useMutation} from 'react-query';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import CryptoJS from 'crypto-js';

const url = "http://localhost:8080/user/login";

function Login(){
        
    const[email, setEmail] = useState("");                                      
    const[password, setPassword] = useState("");    
    const[loggedIn, setLoggedIn] = useState(false);  
    
    const navigate = useNavigate();
    
    const CryptoJS = require('crypto-js');
    
    const result = useMutation((records) => 
                                      axios.post(`${url}`, records, {
        headers: {
           "Content-Type": "application/json"           
        }}).then((res) => 
                 {
        
        
        if(res.data.message === "Bad-Credentials"){
            setEmail("");
             setPassword("");
            alert("Bad credentials");
        }
        else if(res.data.message === "Success"){
            
                        
            var key  = CryptoJS.enc.Latin1.parse('frankofurt@123456789345678123457');
           
             var iv   = CryptoJS.enc.Latin1.parse(res.data.ivparameter);
            
            var decrypted = CryptoJS.AES.decrypt(res.data.passencrypt, key, {iv:iv});
            
            const bytes = decrypted.toString(CryptoJS.enc.Utf8)           
                
            sessionStorage.setItem("email", res.data.subject);
            sessionStorage.setItem("token", res.data.token);
            
            navigate("/listusers")
        }
         else{
            alert("The username or password does not exist");
             
             setEmail("");
             setPassword("");
             
            navigate("/");
        }
    }
    
    )
                                                           );

    if(result.isError) return "Error has occurred " + result.error.message;
    
    if(result.isLoading) return "Loading in Progress ...";
    
    
                                  
    
    const submitData = () => {
            result.mutate({email, password});

        localStorage.setItem("isLoggedIn", true);      
                             }

    
return(
    <>
    <h1>Welcome to Fin Bank International</h1>
    <h3>Do Login to access your Account Details</h3>
        
    <div>
        <label>Email:    </label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} ></input>
            </div>
            <br />
            <div>
            <label>Password:  </label>
            <input type="password" onChange={e => setPassword(e.target.value)} value={password} ></input>
            </div>
            <br />
                                      
            <div>
                <button type="submit" onClick={submitData}>Login</button>
           </div>
            <div>
                <button type="button" onClick={(e) => navigate("/register")}>Not Registered? Click Here</button>
            </div>
    
    
    
    
    </>
    );
}

export default Login;