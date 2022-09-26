import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/context";

export const Dashboard = () => {

    const { user, logout, loading } = useAuth();
    const navigate = useNavigate()
    localStorage.setItem('userID',JSON.stringify(user?.reloadUserInfo?.localId));
    console.log(user);
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/Login');
            
        } catch (error) {
            console.log(error)
        }
    }
    if( loading) return <h2>Loading</h2>
    return (
        <div>
            <h1>Bienvenido: {user.displayName  || /* && */ user.email}</h1>
        

           <button onClick={handleLogout} >
           Logout
           </button>
           </div>
    )
  
};

