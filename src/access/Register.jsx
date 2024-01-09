import React, {useState, useEffect, ChangeEvent} from 'react';
import {useMutation} from 'react-query';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, FormGroup, Input, Label, Row, Col, FormText, Progress} from 'reactstrap';

const url = "http://localhost:8080/user/register";
const pics_url = "http://localhost:8080/upload?";

function Register(){
    
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [photo, setPhoto] = useState("");
    
    const [filepath, setFilepath] = useState("Images-dev");
    const [file, setFile] = useState("");    
    const [status, setStatus] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    
    let formData = new FormData();
    formData.append("file", file);
    formData.append("filepath", filepath);
    
    const navigate = useNavigate();
    
    useEffect(() => {
    setIsLoading(true);
      setStatus(0);

  }, []);
    
        const resultpics = useMutation((cod) => 
                              axios.post(`${pics_url}`, cod, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

                                        ).then((res) => {
        console.log("pics data ", res.data);
            setPhoto(res.data);
            setIsLoading(false);
            setStatus(100);

 }
                                    
    )
                              );
    
    const action = useMutation((rec) => 
                              axios.post(`${url}`, rec,

                                        )
                              );

    if(action.isLoading) return "Loading in progress..." ;
    
    if(action.isError) return "Error has occurred " + action.error.message;
    
    if(action.isSuccess) return (
        <>
    <h1>Registration is successful. Thank you for registering with us</h1>;
        <FormGroup>
            <Button type="button" onClick={(e) => navigate("/")} color="success">Go Home</Button>
        </FormGroup>
        </>
    )
    
    if(resultpics.isLoading) return (
        <>
        <h1>Loading Profile Photo. Do not close this window.</h1>
        </>
    );
    
    const submitData = () => {
        action.mutate({lastname, firstname, gender, email, password, photo});
    }
    
    
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files){
            setFile(event.target.files[0]);

        }
    }

    const handleUpoad = (event) => {        
        
        resultpics.mutate({filepath, file});
        
    }
 
    
    const imageURL = "https://drive.google.com/thumbnail?id=" + photo;
    
    return(
    <>
        <h1>Register With Us</h1>        
        
<Form> 
    <Row>
        <Col>
       <FormGroup>           
        <Label for="txtLastname">Lastname</Label>
        {' '}
        <Input id="txtLastname" name="lastname" placeholder="Enter your surname" type="text" onChange={(e) => setLastname(e.target.value)} value={lastname} ></Input>
            </FormGroup>
        </Col>
        <Col>  
         <FormGroup>
        <Label for="txtFirstname">Firstname</Label>
        {' '}
        <Input id="txtFirstname" name="firstname" placeholder="Enter your first name" type="text" onChange={(e) => setFirstname(e.target.value)} value={firstname} ></Input>
            </FormGroup>
        </Col>
    </Row>
        <FormGroup>
            <Label for="selGender">Gender</Label>
            {' '}
            <Input id="selGender" name="gender" type="select" onChange={(e) => setGender(e.target.value)} value={gender}>
               <option>Select gender</option>
               <option>MALE</option>
               <option>FEMALE</option>
            </Input>
        </FormGroup>
                    
        
        <FormText>Security Section: Provide the following details</FormText>
        
     <FormGroup>
        <Label for="txtEmail">Email</Label>
         {'  '}
        <Input id="txtEmail" name="email" type="email" placeholder="example@email.com" onChange={(e) => setEmail(e.target.value)} value={email} ></Input>
        <FormText>Enter a valid email</FormText>
     </FormGroup>
      <FormGroup>
            <Label for="txtPassword">Password</Label>
             {'  '}
            <Input id="txtPassword" name="password" placeholder="*****" type="password" onChange={e => setPassword(e.target.value)} value={password} ></Input>
      </FormGroup>
    
       <FormGroup>
    <div>
      <h3>
      {isLoading ? <p>Upload Profile Image...</p> : <p>Loading completed</p>}
     </h3>
    </div>
    <Progress value={status} color="primary" bar>Successfully uploaded</Progress>       
    <Label for="filePhoto" >Profile Image</Label>
    <Input id="filePhoto" type="file" name="file" onChange={handleFileChange}/>
    <div>
        <img src={`${imageURL}`} alt="Your Profile Image" />
    </div>    
    
    <Button color="info" type="button" onClick={handleUpoad}>Upload photo</Button>
    
    </FormGroup>     
       
      <Row>
          <Col>
      <FormGroup>
            <Button type="submit" onClick={submitData} color="primary" block>Register</Button>
      </FormGroup>
         </Col>
         <Col>
        <FormGroup>
            <Button type="button" onClick={(e) => navigate("/")} color="secondary" block>Go Home</Button>
        </FormGroup>
        </Col>
       </Row>
        </Form>

        </>
    );
}
            
export default Register;