import { useState } from "react";
import Login from "./Login";
import { UserContext } from "../Helper/UserContext";

function App() {
  const [users, setusers] = useState(null);

  return (
    <UserContext.Provider value={{ users, setusers }}>
      {users==null ? <Login /> : "User is Here!"}
    </UserContext.Provider>
  );
}

export default App;
