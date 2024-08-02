import React from "react";
import stylesL from "./index.module.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();
  function handlelick(event) {
    event.preventDefault();

    navigate("/registr");
  }
  function handleSubmit(event) {
    event.preventDefault();
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
          navigate("/home");
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
              Don't have an account? <a onClick={handlelick}>Register</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
