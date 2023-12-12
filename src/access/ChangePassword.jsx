import {useMutation} from 'react-query';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {useState} from 'react'; 
import Logout from './Logout';
import Header from './Header';

const url = "http://localhost:8080/user/change-password";

function ChangePassword(){
    
    const[email, setEmail] = useState("");
    const[currentPassword, setCurrentPassword] = useState("");
    const[newPassword, setNewPassword] = useState("");
    
    const navigate = useNavigate();
    
    const action = useMutation((records) => {
        axios.post(`${url}`, records, 
                  {
            headers: {
                 "Content-Type": "application/json",
                "authorization": 'Bearer ' + sessionStorage.getItem("token")
            }
            
        }
                  
                   ).then((res) => {
            
            
            if(res.data.message === "Bad-Credentials"){
                alert("Wrong email or password provided. Check the details properly");
                navigate("/listusers")
            }else if(res.data.message === "Success"){
                alert("Password changed successfully");                
            }else{
                alert("Bad Credentials!");
            }
            
        })
        
    })
    

    
    if(action.isError) return "Error has occurred " + action.error.message;
    
    if(action.isSuccess) return(
       <div>
        <h2>Password changed Successfully</h2>
        <Logout />
        </div>
    );
    const submitData = () => {
        action.mutate({email, currentPassword, newPassword});
        
        navigate("/");
    }
    
    return(
    <>
     <Header />
        
        <h1>Change Password</h1>
        <div>
        <div>
           <label>Email:    </label>
             <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} ></input>
            </div>
            <br />
            <div>
            <label>Current Password:  </label>
            <input type="password" onChange={e => setCurrentPassword(e.target.value)} value={currentPassword} ></input>
            </div>
            <br />
            <div>
            <label>New Password:  </label>
            <input type="password" onChange={e => setNewPassword(e.target.value)} value={newPassword} ></input>
            </div>
            <br />                         
        </div> 
        
            <div>
                <button type="submit" onClick={submitData}>Submit</button>
           </div>
        
    </>
    )
    
}

export default ChangePassword;