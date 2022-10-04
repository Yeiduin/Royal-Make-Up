import React, { useState } from "react";
import { useAuth } from "../firebase/context.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [userData, setUserData] = useState({
    user: "",
    password: "",
  });
  //localStorage.setItem("userLogged", JSON.stringify(data.payload));
  //working

  const { login, loginWithGoogle, resetPassword } = useAuth();

  function handleState(e) {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }

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
      <div>{error && <p>{error}</p>}</div>
      <h2 className="text-2xl">Reset Password</h2>
      <h4 className="opacity-50">please enter your email</h4>
      <div className="flex flex-col">
        <label className="pb-2">Email</label>
        <input
          type="email"
          name="user"
          /* value={userData.user} */
          placeholder="Please enter your email"
          onChange={(e) => handleState(e)}
          className="rounded-lg ring-secondary focus:border-secondary focus:ring-secondary"
        />
      </div>

      <div>
        <button
          onClick={handleResetPassword}
          className="bg-secondary w-full h-11 rounded-lg text-white font-bold"
        >
          Get Email to reset password
        </button>
      </div>
    </div>
  );
};
