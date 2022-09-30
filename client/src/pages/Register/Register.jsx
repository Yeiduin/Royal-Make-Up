import React, { useState } from "react";
import { useAuth } from "../firebase/context.jsx";
import { useNavigate } from "react-router-dom";
import { addUser, getUserByEmail } from "../../redux/actions/index.js";
import { useDispatch } from "react-redux";

export const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });

  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
    console.log(name, value);
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      if(handlePass()){

        setError("");

        await signUp(user.email, user.password);

        dispatch(addUser({email: user.email, password: user.password, username: user.username}))
        .then(() => {

          navigate("/Login");
          
        })

        
      }
      else{
        setError("Passwords do not match");
      }
      
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePass = () => {
    if (user.password !== user.confirmPassword) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="text-primary flex flex-col justify-center items-center mt-8">
      <form onSubmit={handleSubmit} className="w-96 space-y-2">
        <div>{error && <p>{error}</p>}</div>
        <h2 className="text-2xl">Sign Up</h2>
        <div className="flex flex-col">
          <div className="flex pt-4 pb-2 space-x-1">
            <i className="material-icons">mail_outline</i>
            <label htmlFor="email">Email</label>
          </div>
          <input
            type="email"
            name="email"
            placeholder="email@example.com"
            onChange={handleChange}
            className='rounded-lg ring-secondary focus:border-secondary focus:ring-secondary'
          />
        </div>
        <div className="flex flex-col">
          <div className="flex pt-4 pb-2 space-x-1">
            <i className="material-icons">person_outline</i>
            <label htmlFor="username">Username</label>
          </div>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            onChange={handleChange}
            className='rounded-lg ring-secondary focus:border-secondary focus:ring-secondary'
          />
        </div>
        <div className="flex flex-col">
          <div className="flex pt-4 pb-2 space-x-1">
            <i className="material-icons">lock_open</i>
            <label htmlFor="password">Password</label>
          </div>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            onChange={handleChange}
            className='rounded-lg ring-secondary focus:border-secondary focus:ring-secondary'
          />
        </div>
        <div className="flex flex-col">
          <div className="flex pt-4 pb-2 space-x-1">
            <i className="material-icons">lock_outline</i>
            <label>Confirm Password</label>
          </div>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm your password"
            onChange={handleChange}
            className='rounded-lg ring-secondary focus:border-secondary focus:ring-secondary'
          />
        </div>
        <p className="py-4">
        By signing up, you agree to our <span className="text-secondary cursor-pointer">Terms and Conditions</span>  and <span className="text-secondary cursor-pointer">Privacy Policy</span>
        </p>
        <button type="submit" className="bg-secondary w-full h-11 rounded-lg text-white font-bold cursor-pointer">Register</button>
      </form>
    </div>
  );
};
