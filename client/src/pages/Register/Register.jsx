import React, { useState } from "react";
import { useAuth } from "../firebase/context.jsx";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../redux/actions/index.js";
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
    /* setError('') */
    try {
      console.log(user);
      await signUp(user.email, user.password, user.username);
      dispatch(addUser(user));
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
      console.log(error);
      /*  if (error.code === "auth/internal-error")
        setError("Correo o contraseña Invalido")
            console.log(error) */
    }
  };

      const handlePass =  (e) =>{
        if (user.password !== user.confirmPassword){
          setError("Passwords do not match")
        }
        else {
          setError("")
        }
      }

  return (
    <div>
      <div>{error && <p>{error}</p>}</div>
      <h2>sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
        />
          <label>confirm Password:</label>
        <input type="password"
        name="confirmPassword"
        id="confirmPassword" onChange={handlePass}
        />         
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChange}
        />

        <p>
          by signing up, you're agree to our terms and Conditions and Privacy
        </p>
        <button disabled={error}>Register</button>
      </form>
    </div>
  );
};
