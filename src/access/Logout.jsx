import {useMutation} from 'react-query';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const url = "http://localhost:8080/user/logout";

function Logout(){
    
    const navigate = useNavigate();
    
    const action = useMutation((records) => 
                                               axios.post(`${url}`, records 
                                                        )
                                                .then((res) => 
                                                      
                                                      res.data
                                                     )
                                               
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
        <button type="button" onClick={submitData}>Logout</button>
        </div>
        </>
    )
    

}
export default Logout;