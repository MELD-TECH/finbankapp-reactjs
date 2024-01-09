import {useMutation} from 'react-query';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'reactstrap';

const url = "http://localhost:8080/user/logout";

function Logout(){
    
    const navigate = useNavigate();
    
    const action = useMutation((records) => 
                                               axios.post(`${url}`, records 
                                                        )
                                                .then((res) => 
                                                      
                                                      console.log("logout data ", res.data))
                                               
                                               );
    
    if(action.isLoading) return "Loading in progress";
    
    if(action.isError) return "Error occurred " + action.error.message;
    
    
    
    
    const submitData = () => {
      action.mutate(); 
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("email");

      navigate("/");
    }
    
    return(
    <>
    <div>
        <Button type="button" onClick={submitData} color="primary">Logout</Button>
    </div>
    </>
    )
    

}
export default Logout;