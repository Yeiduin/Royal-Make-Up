import React from "react";

export const Profile = () => {
    const userLogged = JSON.parse(localStorage.getItem('userLogged'));
    console.log(userLogged)


  return (
      <div className="flex flex-col items-center">
        <div className="w-14 h-14">
            <img src={userLogged.img} alt={userLogged.username} className='object-cover'/>
        </div>
        <div>
            <h1>{userLogged.username}</h1>
            <h1>{userLogged.type}</h1>
            <h1>{userLogged.email}</h1>

        </div>
      </div>      
      ) 
};
