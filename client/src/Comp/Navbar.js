import { Menu } from 'antd';
import React, { useContext, useState } from 'react'
import { UserContext } from '../Helper/UserContext';
import { HomeTwoTone, LogoutOutlined,  ProfileTwoTone, UserOutlined } from '@ant-design/icons';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Cakes from './Cakes';

const Navbar = () => {
    const {users,setusers}=useContext(UserContext);

    const logout=()=>{
        
        localStorage.removeItem("accessToken");
        setusers(null);
    }
    const items = [
        {
            label:  (<Link to="/" >Home</Link>),
            key: 'Home',
            icon:<HomeTwoTone />
        },
    ];
    
    items.push(users===null?
        {
            label: (<Link to="/login" >Login</Link>),
            key: 'Login',
            style:{right:0,position:"absolute"}

        }:(
        {
        label: users.name,
        key: 'users',
        icon:<UserOutlined />,
        style:{right:0,position:"absolute"},
        children: [
            {
                key: 'profile',
                label: 'Profile',
                icon:<ProfileTwoTone />
            },
            {
                key: 'logout',
                label: 'logout',
                icon:<LogoutOutlined />,
                onClick:logout

            }
        ],
    }))
    if(users!==null && users.status===1)
    {
        items.push({
            label:(<Link to="/Cakes" >Cakes</Link>),
            key:"Cakes"
        })
    }
    const [current, setCurrent] = useState('Home');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (<><Menu  onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path="/Cakes"   element={<Cakes/>}  />
        <Route path='/login' element={<Login/>}  />
        

    </Routes>
    </>);
}

export default Navbar
