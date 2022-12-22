import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submit = async (data) => {
    console.log(data);
    await axios
      .post("http://localhost:1337/reg", {
        emaill: data.email,
        password: data.password,
        firstname: data.name,
        lastname: data.surname,
        username: data.username,
      })
      .then((res) => {
        localStorage.clear();
        localStorage.setItem("user-token", JSON.stringify(res.data.data));
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
          <h2>Register</h2>
          <form className="register-form" onSubmit={handleSubmit(submit)}>
            <label htmlFor="name">name</label>
            <input
              {...register("name")}
              name="name"
              id="name"
              placeholder="Name"
            ></input>
            <label htmlFor="name">surname</label>
            <input
              {...register("surname")}
              name="surname"
              id="surname"
              placeholder="Surname"
            ></input>
            <label htmlFor="email">email</label>
            <input
              {...register("email")}
              type="email"
              name="email"
              id="email"
              placeholder="Email"
            ></input>
            <label htmlFor="name">username</label>
            <input
              {...register("username")}
              name="username"
              id="username"
              placeholder="username"
            ></input>
            <label htmlFor="password">password</label>
            <input
              {...register("password")}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            ></input>
            <button type="submit">Register</button>
          </form>
          <Link className="link-btn" to={"/login"}>
            Already have an account? Login here.
          </Link>
        </div>
      </div>
    </div>
  );
};
