import React from "react";
import stylesL from "./index.module.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();
  function validate(username, password){
    if (username.current.value < 3) {
      alert("username is not valid !");
      username.current.style.outlineColor = "red";
      username.current.focus();
      return false;
    }
    if (password.current.value < 3) {
      alert("password is not valid !");
      password.current.focus();
      password.current.style.outlineColor = "red";
      return false;
    }
    return true;
  }
  function handleClick(event) {
    event.preventDefault();
    console.log("salom")
    navigate('/register');
  }
  function handleSubmit(event) {
    event.preventDefault();
    const isvalid = validate(usernameRef, passwordRef);
    if(!isvalid){
    return
    }
    navigate('/')
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    console.log(user);
    fetch("https://auth-rg69.onrender.com/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (data.message == "User Not found.") {
          alert("Foydalanuvchi nomi hato kiritdingiz !");
          usernameRef.current.focus();
        }
        if (data.message == "Invalid Password!") {
          alert("parolni hato kiritdingiz !");
          passwordRef.current.focus();
        }
        if (data.accessToken) {
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("token", data.accessToken);

          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <div className={stylesL.loginContainer}>
        <div className={stylesL.login}>
          <h2>Login</h2>
          <form action="#">
            <div className={stylesL.input}>
              <input ref={usernameRef} className={stylesL.input} type="text" />
              <label>Username</label>
            </div>
            <div className={stylesL.input}>
              <input
                ref={passwordRef}
                className={stylesL.input}
                type="password"
              />
              <label>Password</label>
            </div>
            <div className={stylesL.options}>
              <label>
                <input className={stylesL.input} type="checkbox" /> Remember me
              </label>
              <a href="#">Forgot Password?</a>
            </div>
            <button onClick={handleSubmit}>Login</button>
            <p>
              Don't have an account?{" "}
              <a className={stylesL.registr} href="" onClick={handleClick}>
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
