import React from "react";
import { GaleryFav } from "../../components/Favorites/GaleryFav";

export const Profile = () => {
    const userLogged = JSON.parse(localStorage.getItem('userLogged'));
    console.log(userLogged)


  return (
      <div className="text-primary flex flex-col items-center">
        <div className="w-52 h-52">
            <img src={userLogged.img} alt={userLogged.username} className='w-full h-full object-cover rounded-full'/>
            <i className="text-secondary material-icons">edit</i>
        </div>
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl">{userLogged.username}</h1>
            <h1 className="opacity-50">{userLogged.type}</h1>
            <h1>{userLogged.email}</h1>
        </div>
        <div className="flex flex-col mt-4 w-3/4">
          <h1 className="text-3xl">My Favorites💓</h1>
          <GaleryFav/>
        </div>
      </div>      
      ) 
};
