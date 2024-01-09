import React, {useState} from 'react';
import {useQuery} from 'react-query';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import Logout from './Logout';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, Table, FormText} from 'reactstrap';

const url = "http://localhost:8080/user/findall";

function ListUsers(){

    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");    
    
    const navigate = useNavigate();

    
    const {data, isLoading, isError, isSuccess, error} = useQuery(["rec"], () => 
                                                          axios.get(`${url}`, 
                                                                   {
        headers:{
            "Content-Type": "application/json",
            
            "authorization": 'Bearer ' + sessionStorage.getItem("token")
        }
    }
                                                                   ).then((res) =>                                                           
                                                                          res.data   
   )
                                                          );
  
   
    if(isLoading) return "Loading in Progress...   ";
    
    if(isError) return "Error has occurred   " + error.message;
    
    return(
    <>
    <Header  />
        
    <h2>List of Registered Users Information</h2>
   
    <Form>
    <FormText>Logged in user:<b> {sessionStorage.getItem("email")} </b></FormText>
        
        <Table bordered hover responsive>
            <thead>
            <tr>
                <th>Lastname</th>
                <th>Firstname</th>
                <th>Email</th>
                <th>Gender</th>
                
            </tr>
            
            </thead>
            
            
            {data.map((rec) => {
                      return(
                          <tbody>
                     <tr key={rec.id}>
                      <td>{rec.lastname}</td>
                      <td>{rec.firstname}</td>
                      <td>{rec.email}</td>
                      <td>{rec.gender}</td>
                      <td>
                      <Button type="button" onClick={(e) => navigate("/profile/"+ rec.id)} >Edit Profile</Button> 
                       </td>
                      </tr>
             </tbody>
            )}

                )
            
            }
            
            </Table>

        <Logout />
        </Form>
    </>
    );
}

export default ListUsers;