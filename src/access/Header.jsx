import {useState} from 'react';
import {NavLink} from 'react-router-dom';
import './Sample.css';

const data = [
    {
        title:'List Users',
        link:'/listusers',
    },
    
    {
        title:'Profile',
        link:'/Profile',
    },
    
    {
        title:'Change Password',
        link:'/changepassword',
    }
    
]

function Header(){
    const [nav] = useState(data);
    
    return(
    
        <>
          <div>
                    
        </div>
        
        <ul>
        {nav.map((res, index) => (
                <li key={index} className='display:{inlineBlock}'>
                <NavLink to={res.link}>
                    {res.title}
                    </NavLink>
                
                </li>
                
            ))
        }
        
        
        </ul>
        </>
    
    
    )
}

export default Header;