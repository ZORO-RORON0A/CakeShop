import { useEffect, useState } from "react";
import Login from "./Login";
import { UserContext } from "../Helper/UserContext";
import axios from "axios";
import { message } from "antd";

import Navbar from "./Navbar";

function App() {

  const [users, setusers] = useState(null);
  
  useEffect(() => {
    getAuth()
  },[]);
  const getAuth=async()=>
  {
    const result=await axios.get("http://localhost:8000/Users/auth",{
      headers:{
        accesstoken:localStorage.getItem("accessToken"),
      }
    })
    if(result.data.err )
    {
      message.error(result.data.err);
      return
    }
    if(result.data.msg==="login")
    {
      return setusers(null);
    }
    let user=result.data.user[0];
    setusers({
      id: user.id,
      name: user.name,
      emailid: user.emailid,
      status:user.status
    })
  }
  return (
    <UserContext.Provider value={{ users, setusers ,getAuth}}>
        <Navbar/>
      </UserContext.Provider>
  );
}

export default App;
