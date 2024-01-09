import {useState} from 'react';
import './Sample.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav, NavItem, NavLink, Navbar, NavbarText, Button, Badge} from 'reactstrap';

const data = [
    {
        title:'List Users',
        link:'/listusers',
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
    <Navbar color="light">
    <Nav pills>        
        <NavItem>
        {nav.map((res, index) => (
                <li key={index} className='display:{inlineBlock}'>
                <NavLink href={res.link} active>
                    {res.title}
                </NavLink>
                
                </li>
                
            ))
        }
        
        
        </NavItem>
    </Nav>
    <NavbarText>
    <Button
    color="primary"
    outline
    >
    Notifications{' '}
         <Badge>
             4
          </Badge>
       </Button>        
    </NavbarText>
    </Navbar>
        </>
    
    
    )
}

export default Header;