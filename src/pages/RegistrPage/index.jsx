import React from "react";
import styles from "./index.module.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
function RegistrPage() {
  const navigate = useNavigate("")
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const rePasswordRef = useRef(null);
  function validate(username, email, password, repassword){
    if (username.current.value < 3) {
      alert("username is not valid !");
      username.current.style.outlineColor = "red";
      username.current.focus();
      return false;
    }
    if (email.current.value < 3) {
      alert("email is not valid !");
      email.current.focus();
      email.current.style.outlineColor = "red";
      return false;
    }
    if (password.current.value < 3) {
      alert("password is not valid !");
      password.current.focus();
      password.current.style.outlineColor = "red";
      return false;
    }
    if (repassword.current.value < 3) {
      alert("repassword is not valid !");
      repassword.current.focus();
      repassword.current.style.outlineColor = "red";
      return false;
    }
    if (password.current.value != repassword.current.value) {
      alert("passwords are not equal !");
      password.current.focus();
      password.current.style.outlineColor = "red";
      repassword.current.style.outlineColor = "red";
      return false;
    }
    return true;
  }
  function handleSubmit(event){
    event.preventDefault()
  const isvalid = validate(nameRef, emailRef, passwordRef, rePasswordRef);
  if(!isvalid){
  return
  }

  const user = {
    username: nameRef.current.value,
    email: emailRef.current.value,
    password: passwordRef.current.value
  }
  fetch("https://auth-rg69.onrender.com/api/auth/signup",{
  method:"POST",
  headers:{
  "content-type":"application/json"
  },
  body: JSON.stringify(user)
})
.then(res => res.json())
.then(data => {
console.log(data);
if(data.message == "Failed! Email is already in use!"){
alert("Ushbu email manzilni boshqa foydanaluvchi ishlatmoqda")
emailRef.current.focus()
} 
if(data.message == "Failed! Username is already in use!"){
  alert("Ushbu nom boshqa foydanaluvchi tegishli")
  nameRef.current.focus()
}
if(data.message == "User registered successfully!"){
  alert("Siz muvaffaqiyatli royhatdan o'tdingiz")
  navigate("/")
}
})
.catch(err => {
console.log(err);
})
  }
  return (
    <div className={styles.container}>
      <h2>Register</h2>
      <form id="form">
        <div className={styles.formGroup}>
          <label>Username</label>
          <input ref={nameRef} className={styles.input} type="text" />
        </div>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input ref={emailRef} className={styles.input} type="email" />
        </div>
        <div className={styles.formGroup}>
          <label>Password</label>
          <input ref={passwordRef} className={styles.input} type="password" />
        </div>
        <div className={styles.formGroup}>
          <label>Confirm Password</label>
          <input ref={rePasswordRef} className={styles.input} type="password" />
        </div>
        <button onClick={handleSubmit}>Register</button>
      </form>
    </div>
  );
}

export default RegistrPage;
