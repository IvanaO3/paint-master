import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submit = async (data) => {
    await axios
      .post("http://localhost:1337/log", {
        username: data.username,
        password: data.password,
      })
      .then((res) => {
        localStorage.clear();
        localStorage.setItem("user-token", JSON.stringify(res.data.data[0]));
        setTimeout(() => {
          navigate("/");
        });
      })
      .catch((err) => alert(err.response.data.error));
  };

  return (
    <div className="form-wrapper">
      <div className="container center-layout">
        <div className="form-container">
          <h2>Login</h2>
          <form className="login-form" onSubmit={handleSubmit(submit)}>
            <label htmlFor="username">username</label>
            <input
              {...register("username")}
              name="username"
              id="username"
              placeholder="username"
              required
            ></input>
            <label htmlFor="password">password</label>
            <input
              {...register("password")}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
            ></input>
            <button type="submit">Log In</button>
          </form>
          <Link className="link-btn" to={"/register"}>
            Don't have a account? Register here.
          </Link>
        </div>
      </div>
    </div>
  );
};
