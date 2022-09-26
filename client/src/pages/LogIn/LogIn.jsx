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
      console.log('SOY LOS DATOS DEL USUARIO',userData)
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
    <div>
      <div>{error && <p>{error}</p>}</div>
      <h2>Login</h2>
      <h4>Welcome Back</h4>
      <form onSubmit={(e) => loginSession(e)}>
        <div>
          <label>Username: </label>
          <input
            type="email"
            name="user"
            placeholder="e-commerce"
            onChange={(e) => handleState(e)}
          />
        </div>

        <div>
          <label htmlFor="">Password: </label>
          <input
            type="password"
            name="password"
            placeholder="e-commerce"
            onChange={(e) => handleState(e)}
          />
        </div>
        <div>
          {/*  <input type="submit" /> */}
          <button>Login</button>
        </div>
        <a href="#!" onClick={handleResetPassword}>
          Forgot Password?
        </a>
      </form>

      <button onClick={handleGoogleSignIn}>Sign In with Google</button>
    </div>
  );
};
