import React, { useState } from "react";
import { useAuth } from "../firebase/context.jsx";
import { useNavigate } from "react-router-dom";


export const LogIn = () => {

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        user: "",
        password: "",
    });

    const { login, loginWithGoogle, resetPassword } = useAuth();
    const [error, setError] = useState("");


    function handleState(e){

        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
        
    }

    async function loginSession(e){
        e.preventDefault();
        try {
            let usuario = await login(userData.user, userData.password);
            //this should change to home whem it's time
            navigate("/dashboard")
            
        } catch (error) {
            setError(error.message);
        }

    }

  return (
    <div>
      <h2>Login</h2>
      <h4>Welcome Back</h4>
      <form onSubmit={(e) => loginSession(e)}>
        <div>
          <label>Username: </label>
          <input type="email" name="user" onChange={(e) => handleState(e)}/>
        </div>

        <div>
          <label htmlFor="">Password: </label>
          <input type="password" name="password" onChange={(e) => handleState(e)}/>
        </div>
        <div>
         {/*  <input type="submit" /> */}
         <button>Login</button>
        </div>
      </form>
    </div>
  );
};