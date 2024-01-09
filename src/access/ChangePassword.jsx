import {useMutation} from 'react-query';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {useState} from 'react'; 
import Logout from './Logout';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, FormGroup, Input, Label, Row, Col, FormText, Alert} from 'reactstrap';

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
                navigate("/listusers")
            }else{
                alert("Bad Credentials!");
            }
            
        })
        
    })
    

    
    if(action.isError) return "Error has occurred " + action.error.message;
    

    const submitData = () => {
        action.mutate({email, currentPassword, newPassword});
        navigate("/listusers")
    }
    
    return(
    <>
     <Header />
        <center>
        <h1>Change Password</h1>
        </center>
        
    <Form>
        
        <FormGroup>
           <Label for="txtEmail">Email </Label>
            {"  "}
           <Input id="txtEmail" name="email" placeholder="example@email.com" type="email" onChange={(e) => setEmail(e.target.value)} value={email} ></Input>
        </FormGroup>            
        <FormGroup>
            <Label for="txtCurrentPassword">Current Password:  </Label>
            <Input id="txtCurrentPassword" name="currentPassword" placeholder="*******" type="password" onChange={e => setCurrentPassword(e.target.value)} value={currentPassword} ></Input>
        </FormGroup>
            
        <FormGroup>
            <Label for="txtNewPassword">New Password:  </Label>
            <Input id="txtNewPassword" name="newPassword" placeholder="*******" type="password" onChange={e => setNewPassword(e.target.value)} value={newPassword} ></Input>
        </FormGroup>                 
             
            <FormGroup>
                <Button type="submit" onClick={submitData} color="success" block>Submit</Button>
           </FormGroup>
            
        <Logout />
     </Form> 
    </>
    )
    
}

export default ChangePassword;