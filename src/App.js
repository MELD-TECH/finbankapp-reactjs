import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout'
import NoPage from './pages/NoPage';
import Login from './access/Login';
import Register from './access/Register';
import ListUsers from './access/ListUsers';
import ProfileUpdate from './access/ProfileUpdate';

import Logout from './access/Logout';
import ChangePassword from './access/ChangePassword';


export default function App(){
    

    return(

        <BrowserRouter>
        <Routes>        
          <Route path="/" element={<Layout />} >
          <Route  index element={<Login />} />
          <Route path="register" element={< Register/>} />          
          <Route path="listusers" element={<ListUsers />} /> 
          <Route path="logout" element={<Logout />}/>
          <Route path="changepassword" element={<ChangePassword />}/>
          <Route path="profile/:id" element={<ProfileUpdate />} /> 
          <Route path="*" element={<NoPage />} />
        
        
        
        </Route> 
                  
        </Routes>
    </BrowserRouter>
        
    
    );
    
}
