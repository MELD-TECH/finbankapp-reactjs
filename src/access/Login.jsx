import React, {useState} from 'react';
import {useMutation} from 'react-query';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import CryptoJS from 'crypto-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, FormGroup, Label, Input, Col, Row, Card, CardImg} from 'reactstrap';

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
        console.log("data is ", res.data)
        
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

    const cardStyle = {
        width: "75%",
        height: "200px"
    };
    
return(
    <>
    <center>
    <h1>Welcome to Fin Bank International</h1>
   </center> 
    
    <Form>
    <Card>
        <div style={{textAlign: 'center'}}>
        <CardImg src="https://drive.google.com/thumbnail?id=1zK2Z9mwPeH6gro7B2ocxuNK_8tTncgHa" alt="bank images" style={cardStyle}></CardImg>
        </div>
        </Card> 
        <Row>
          <Col>
         <FormGroup>
        
             <Label for="inputEmail"><b>Email</b></Label>
             {'  '}
            <Input id="inputEmail" type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="example@email.com"></Input>
        </FormGroup>
        </Col>
        <Col>
            <FormGroup>
            <Label for="inputPassword"><b>Password</b></Label>
            <Input id="inputPassword" type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="**********"></Input>
            </FormGroup>
        </Col>
         </Row>   
            <Row>
            <Col>
            <FormGroup>            
                <Button type="submit" onClick={submitData} color="primary" block size="sm">Login</Button>
           </FormGroup>
            </Col>
            <Col>
            <FormGroup>
                <Button type="button" onClick={(e) => navigate("/register")} block size="sm">Not Registered? Click Here</Button>
            </FormGroup>
            </Col>
            </Row>
   </Form> 
    
    
    </>
    );
}

export default Login;