import React, { useState } from "react";
import { useAuth } from "../firebase/context.jsx";
import { useNavigate } from "react-router-dom";
import { addUser, getUserByEmail } from "../../redux/actions/index.js";
import { useDispatch } from "react-redux";

//validation regex


export const Register = () => {
  let noEmpty = /\S+/;
  
  let validateMail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //A regular expression that matches and validates email addresses.
  
  //allows Latin characters ("a" - "z" or "A" - "Z") within the email address.
  //permits digits (0 - 9) in the email address.
  
  let vUserName = /^[a-z][^\W_]{7,14}$/i;
  //Must be 8-15 characters and must start with a letter
  //May not contain special characters – only letters and numbers
  
  let password = /^(?=[^a-z]*[a-z])(?=\D*\d)[^:&.~\s]{5,20}$/;
  //Ingrese 5 a 20 caracteres, minimo 1 numero, no debe contener
  /* ust contain at least one lower-case letter (abcdefghijklmnopqrstuvwxyz)
  Must contain at least one number (0123456789)
  Must not contain a colon (:); an ampersand (&); a period (.); a tilde (~); or a space.
   */
  
  function validated(user) {
    let errors = [];
    //a bit of an issue here objects are not valid as react child
    if (!noEmpty || !vUserName.test(user.username)) {
      errors.username =
        "username is required and must contain 8-15 characters starting with letter ";
    }
    if (!validateMail.test(user.email)) {
      errors.email = "Please insert Valid email pattern";
    }
    if (!password.test(user.password)) {
      errors.password =
        "5 to 20 characters. Must contain at least one lower-case letter and one number";
    }
  
    return errors;
  }
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
    setError(validated({ ...user, [name]: value }));
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!error.username && !error.password && !error.email) {
        if (handlePass()) {
          setError("");

          await signUp(user.email, user.password);

          dispatch(
            addUser({
              email: user.email,
              password: user.password,
              username: user.username,
            })
          ).then(() => {
            navigate("/Login");
          });
        } else {
          setError("Passwords do not match");
        }
      } else {
        throw new Error("incorrect data, please check form");
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
            className="rounded-lg ring-secondary focus:border-secondary focus:ring-secondary"
          />
          {error.email && <span>{error.email}</span>}
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
            className="rounded-lg ring-secondary focus:border-secondary focus:ring-secondary"
          />
          {error.username && <span>{error.username}</span>}
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
            className="rounded-lg ring-secondary focus:border-secondary focus:ring-secondary"
          />
          {error.password && <span>{error.password}</span>}
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
            className="rounded-lg ring-secondary focus:border-secondary focus:ring-secondary"
          />
        </div>
        <p className="py-4">
          By signing up, you agree to our{" "}
          <span className="text-secondary cursor-pointer">
            Terms and Conditions
          </span>{" "}
          and{" "}
          <span className="text-secondary cursor-pointer">Privacy Policy</span>
        </p>

        <button
          type="submit"
          className="bg-secondary w-full h-11 rounded-lg text-white font-bold cursor-pointer"
        >
          Register
        </button>
      </form>
    </div>
  );
};
