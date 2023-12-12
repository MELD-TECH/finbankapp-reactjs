import React, {useState} from 'react';
import {useMutation} from 'react-query';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const url = "http://localhost:8080/user/register";

function Register(){
    
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    
    const navigate = useNavigate();
    
    const action = useMutation((rec) => 
                              axios.post(`${url}`, rec,

                                        )
                              );

    if(action.isLoading) return "Loading in progress..." ;
    
    if(action.isError) return "Error has occurred " + action.error.message;
    
    if(action.isSuccess) return (
        <>
    <h1>Registration is successful. Thank you for registering with us</h1>;
        <div>
            <button type="button" onClick={(e) => navigate("/")}>Go Home</button>
        </div>
        </>
    )
    
    const submitData = () => {
        action.mutate({lastname, firstname, gender, email, password});
    }
    
    return(
    <>
        <h1>Register With Us</h1>
        
       <div>
        <label>Lastname:    </label>
        <input type="text" onChange={(e) => setLastname(e.target.value)} value={lastname} ></input>
            </div>
            <br />  
         <div>
        <label>Firstname:    </label>
        <input type="text" onChange={(e) => setFirstname(e.target.value)} value={firstname} ></input>
            </div>
            <br />
         <div>
        <label>Gender (MALE OR FEMALE): </label>
        <input type="text" onChange={(e) => setGender(e.target.value)} value={gender} ></input>
            </div>
            <br />        
        
        <h4>Security Section: Provide the following details</h4>
        
     <div>
        <label>Email:    </label>
        <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} ></input>
            </div>
            <br />
            <div>
            <label>Password:  </label>
            <input type="text" onChange={e => setPassword(e.target.value)} value={password} ></input>
            </div>
            <br />
         <div>
            <button type="submit" onClick={submitData}>Register</button>
        </div>
            <br />

        <div>
            <button type="button" onClick={(e) => navigate("/")}>Go Home</button>
        </div>
        
        </>
    );
}
            
export default Register;