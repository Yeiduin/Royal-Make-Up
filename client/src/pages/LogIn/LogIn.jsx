import React, { useState } from "react";
import { useAuth } from "../firebase/context.jsx";
import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
import { getUserByEmail, addUser } from "../../redux/actions/index.js";
import { useDispatch } from "react-redux";
export const LogIn = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    user: "",
    password: "",
  });

  const { login, loginWithGoogle, resetPassword } = useAuth();
  const [error, setError] = useState("");
  
 const dispatch = useDispatch(); 

  function handleState(e) {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }

  async function loginSession(e) {
    e.preventDefault();
    /*  setError() */
    try {
      let usuario = await login(userData.user, userData.password);
       dispatch(getUserByEmail(userData.user));
      //this should change to home whem it's time
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!userData.user) return setError("Please enter your email");
    console.log("reset");
    try {
      await resetPassword(userData.user);
      setError("we sent you an email with a link to reset");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="text-primary flex flex-col justify-center items-center mt-8">
      <form onSubmit={(e) => loginSession(e)} className='w-96 space-y-2'>
      <div>{error && <p>{error}</p>}</div>
      <h2 className="text-2xl">Login</h2>
      <h4 className="opacity-50">Welcome back! please enter your details</h4>
        <div className="flex flex-col">
          <label className="pb-2">Username</label>
          <input
            type="email"
            name="user"
            placeholder="Enter your username"
            onChange={(e) => handleState(e)}
            className='rounded-lg ring-secondary focus:border-secondary focus:ring-secondary'
          />
        </div>

        <div className="flex flex-col pt-4">
          <label className="pb-2">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleState(e)}
            className='rounded-lg ring-secondary focus:border-secondary focus:ring-secondary'
          />
        </div>
        <div className="flex justify-between text-sm py-4">
          <div>
            <input type="checkbox" className="rounded-md ring-secondary checked:ring-secondary checked:bg-secondary checked:text-secondary focus:ring-secondary"/> <span>Remember me</span>
          </div>
          <a href="#!" onClick={handleResetPassword} className='text-secondary'>
            Forgot Password?
          </a>
        </div>
        <div>
          {/*  <input type="submit" /> */}
          <button className="bg-secondary w-full h-11 rounded-lg text-white font-bold">Sign in</button>
        </div>
      </form>

      <button className="border border-gray-500 w-96 h-11 rounded-lg text-primary font-bold mt-6" onClick={handleGoogleSignIn}>Sign In with Google</button>
    </div>
  );
};
