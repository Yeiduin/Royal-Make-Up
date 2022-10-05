import React, { useState } from "react";
import { useAuth } from "../firebase/context.jsx";
import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
import { getUserByEmail, addUser } from "../../redux/actions/index.js";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
//working
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

    try {
      if (validateMail(userData.user) && validatePassword(userData.password)) {
        await login(userData.user, userData.password);

        dispatch(getUserByEmail(userData.user)).then((data) => {
          console.log(data);
          localStorage.setItem("userLogged", JSON.stringify(data.payload));

          if (data.type == "Admin") {
            navigate("/dashboard");
          } else {
            navigate("/home");
          }
        });
      } else {
        throw new Error("Email or Password incorrect");
      }
    } catch (error) {
       console.log(error.code)
      setError(error.message); 
      if(error.code === "auth/user-not-found"){
        setError('User not Found.')
      }
      if (error.code === "auth/wrong-password") {
        setError('Incorrect Password')
      }
    
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const userGoogle = await loginWithGoogle();

      dispatch(getUserByEmail(userGoogle.user.email)).then((data) => {
        if (data.payload == null) {
          dispatch(
            addUser({
              username: userGoogle.user.displayName,
              email: userGoogle.user.email,
            })
          ).then(() => {
            dispatch(getUserByEmail(userGoogle.user.email)).then((resp) => {
              localStorage.setItem("userLogged", JSON.stringify(resp.payload));

              if (resp.type == "Admin") {
                navigate("/dashboard");
              } else {
                navigate("/home");
              }
            });
          });
        }

        localStorage.setItem("userLogged", JSON.stringify(data.payload));

        if (data.type == "Admin") {
          navigate("/dashboard");
        } else {
          navigate("/home");
        }
      });

      /* navigate("/dashboard"); */
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

  function validateMail(email) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }
  function validatePassword(password) {
    return /^(?=[^a-z]*[a-z])(?=\D*\d)[^:&.~\s]{5,20}$/.test(password);
  }

  return (
    <div className="text-primary flex flex-col justify-center items-center mt-8">
      <form onSubmit={(e) => loginSession(e)} className="w-96 space-y-2">
        <div>{error && <p>{error}</p>}</div>
        <h2 className="text-2xl">Login</h2>
        <h4 className="opacity-50">Welcome back! please enter your details</h4>
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

        <div className="flex flex-col pt-4">
          <label className="pb-2">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleState(e)}
            className="rounded-lg ring-secondary focus:border-secondary focus:ring-secondary"
          />
        </div>
        <div className="flex justify-between text-sm py-4">
          <div>
            <input
              type="checkbox"
              className="rounded-md ring-secondary checked:ring-secondary checked:bg-secondary checked:text-secondary focus:ring-secondary"
            />{" "}
            <span>Remember me</span>
          </div>
          <Link to="/resetPassword">
          <a className="text-secondary">
            Forgot Password? Click here
          </a>
          </Link>
          <Link to="/register">
            <a className="text-secondary">don't have an account? sign Up here</a>
          </Link>
        </div>

        <div>
          {/*  <input type="submit" /> */}
          <button className="bg-secondary w-full h-11 rounded-lg text-white font-bold">
            Sign in
          </button>
        </div>
      </form>

      <button
        className="border border-gray-500 w-96 h-11 rounded-lg text-primary font-bold mt-6"
        onClick={handleGoogleSignIn}
      >
        Sign In with Google
      </button>
    </div>
  );
};
