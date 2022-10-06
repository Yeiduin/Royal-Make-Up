import React from "react";
import { useDispatch } from "react-redux";
import { GaleryFav } from "../../components/Favorites/GaleryFav";
import { Modal, TextField } from "@mui/material";
import { useState } from "react";
import { editUser, getUsers } from "../../redux/actions";
import { Orders } from '../../pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';

export const Profile = () => {
  const userLogged = JSON.parse(localStorage.getItem("userLogged"));
  const [inputs, setInputs] = useState({
    creditCard: userLogged.creditCard,
    id:userLogged.id,
    username: userLogged.username ,
    email: userLogged.email,
    img: userLogged.img,
    favorites: userLogged.favorites,
    type: userLogged.type
  });
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const openModal = () => {
    setModal(!modal);
  };

  const handleInputs = (e) => {
    setInputs((prevState)=>{
      return {...prevState, [e.target.name]: e.target.value}
    })
    
  };

  const handleEdit = () =>{
    
    dispatch(editUser(userLogged.id, inputs))
    localStorage.setItem("userLogged", JSON.stringify(inputs))
    setTimeout(() => {
      dispatch(getUsers());
    }, 500);
    openModal();
  }

  const uploadImage = () => {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dpkrrtsdg",
        uploadPreset: "hcudvij0",
        maxFiles: 1,
        clientAllowedFormats: ["PNG", "JPEG", "JPG", "JFIF", "TIFF"],
        showCompletedButton: true,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          
          setInputs({ ...inputs, img: result.info.secure_url });
        }
      }
    );  
    myWidget.open();
  };

  const body = (
    <div className="w-3/4 h-auto bg-tertiary top-0 left-1/2 translate-x-1/4 translate-y-1/2 p-5 flex flex-col rounded-lg">
      <div>
        <h2 className="text-xl text-primary py-4">Edit User</h2>
      </div>
      <TextField
        name="username"
        label="Name"
        className="w-full focus:ring-secondary focus:border-secondary border-secondary"
        onChange={handleInputs}
      />
      <br />
      <TextField label="Email" className="w-full" 
      name="email"
        onChange={handleInputs}
      />
      <br />
      <TextField label="Image" className="w-full" 
      name="img"
      value={inputs.img}
        onChange={handleInputs}
        onClick={uploadImage}
      />
      <br />
      <div className="flex justify-between">
        <button
          onClick={() => handleEdit()}
          className="bg-secondary text-white px-4 py-2 rounded-lg"
        >
          Save
        </button>
        <button
          className="bg-white text-primary px-4 py-2 rounded-lg"
          onClick={() => openModal()}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="text-primary flex flex-col items-center mt-4">
      <ToastContainer/>
      <div className="w-52 h-52 flex ">
        <img
          src={userLogged.img}
          alt={userLogged.username}
          className="w-full h-full object-cover rounded-full"
        />
        <i className="text-secondary material-icons cursor-pointer" onClick={() => openModal()} >edit</i>
        {/* <button
          className="cursor-pointer bg-secondary"
          onClick={() => openModal()}
        >
          Open
        </button> */}
        <Modal open={modal} onClose={openModal}>
          {body}
        </Modal>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl">{userLogged.username}</h1>
        {userLogged.type === "Admin" && (
          <h1 className="opacity-50">{userLogged.type}</h1>
        )}
        <h1>{userLogged.email}</h1>
      </div>
      <div className="flex flex-col mt-4 w-3/4">
        <div className="flex items-center">
          <h1 className="text-3xl">My Favorites</h1>
          <i className="text-3xl material-icons text-secondary">favorite</i>
        </div>
        <GaleryFav />
        <Orders/>
      </div>
    </div>
  );
};
