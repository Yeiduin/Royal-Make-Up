import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/context";

export const Dashboard = () => {

    const { user, logout, loading } = useAuth();
    const navigate = useNavigate()
    console.log(user);
    const handleLogout = async () => {
        await logout();
        navigate('/Login');
    }
    if( loading) return <h2>Loading</h2>
    return (
        <div>
            <h1>Holi: {user.email && user.email}</h1>
        

           <button onClick={handleLogout} >
           Logout
           </button>
           </div>
    )
  
};
