import React, {useState} from 'react';
import {useQuery} from 'react-query';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import Logout from './Logout';
import Header from './Header';

const url = "http://localhost:8080/user/findall";

function ListUsers(){

    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");    
    

    
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
        
    <h1>Welcome {sessionStorage.getItem("email")} </h1>
        <h3>Logged in user: {sessionStorage.getItem("email")} </h3>
    <h2>List of Registered Users Information</h2>
   
    <div>
        <table>
            <thead>
            <tr>
                <td>Lastname</td>
                <td>Firstname</td>
                <td>Email</td>
                <td>Gender</td>                
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
                      </tr>
             </tbody>
            )}

                )
            
            
            
            }
            
           
            
            </table>
        
        
        
        </div>
    
        <div>
        <Logout />
        </div>
    </>
    );
}

export default ListUsers;