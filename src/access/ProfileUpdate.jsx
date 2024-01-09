import React, {useState} from 'react';
import {useMutation, useQuery} from 'react-query';
import axios from 'axios';
import {useParams} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, FormGroup, Input, Label, Row, Col, Card, CardBody, CardTitle} from 'reactstrap';
import Header from './Header';
import Logout from './Logout';

const url = "http://localhost:8080/user/update/";

function ProfileUpdate(){   
    const param = useParams();    
    
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");    
    const [gender, setGender] = useState("");
    const [photo, setPhoto] = useState(""); 
    
    const { data} = useQuery(["rec"], () => 
                                                              axios.get(`http://localhost:8080/user/${param.id}`, 
                                                                   {
        headers:{
            "Content-Type": "application/json",
            
            "authorization": 'Bearer ' + sessionStorage.getItem("token")
        }
    }).then((res) => {
         
        setLastname(res.data.lastname);
        setFirstname(res.data.firstname);
        setGender(res.data.gender);
        setPhoto(res.data.photo);
                       
    })
                                                              
                                                                       );
    
 
    const action = useMutation((record) => 
                               axios.put(`${url}${param.id}`, record, 
                                                                   {
        headers:{
            "Content-Type": "application/json",
            
            "authorization": 'Bearer ' + sessionStorage.getItem("token")
        }
    })

    );
    
    
const submitData = () => {
        action.mutate({lastname, firstname, gender, photo});
    };

  const imageURL = "https://drive.google.com/thumbnail?id=" + photo;
                                             
  return(
        <> 
      <Header  />
         <h1>Register With Us</h1>        
        
<Form>
    <Card style={{width: '18rem'}}>
    <div>
        <img src={`${imageURL}`} alt="Your Profile Image" />
    </div>
    <CardBody>
        <CardTitle tag="h5">
            {lastname} {" "} {firstname}
        </CardTitle>
        </CardBody>
    </Card>
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

      <FormGroup>
            <Button type="submit" onClick={submitData} color="primary" block>Submit</Button>
      </FormGroup>

    <Logout />
    </Form>
                                             
        </>
                                            );  

}
export default ProfileUpdate;