import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import Button from "../../Component/Button/Button";
import "./login.css";
import { NavLink } from "react-router-dom";
import { useGlobalHooke } from "../../Hooks/Context";
import { ToastContainer, toast } from 'react-toastify';
const Login = () => {
  const { loginInp, loginChangeHandler, islogerr ,loginClickHandler} = useGlobalHooke();
  return (
    <>
      <div className="register ">
        <div className="register-card register-2">
          <div className="register-card2 register-2">
            <div className="card-right">
              <form>
                <h1>Sign In</h1>

                <div className="inp-field">
                  <span className="icon">
                    <BsFillPersonFill />
                  </span>
                  <input
                    type="email"
                    placeholder="Email id:"
                    autoComplete="off"
                    onChange={loginChangeHandler}
                    name="email"
                    value={loginInp.email}
                  />
                </div>
                <p className="err">{islogerr.mail? "Invalid Email id" : ""}</p>
                <div className="inp-field">
                  <span className="icon">
                    <RiLockPasswordFill />
                  </span>
                  <input
                    type="password"
                    placeholder="Password"
                    autoComplete="off"
                    name="pass"
                    value={loginInp.pass}
                    onChange={loginChangeHandler}
                  />
                </div>
                <p className="err">{islogerr.pass? "Password should have 8 character" : ""}</p>
                <div className="btns">
                  <Button btnName={"Sign In"} btnClick={loginClickHandler}/>
                  <NavLink to={"/signup"}>
                    <Button btnName={"Sign up"} />
                  </NavLink>
                </div>
               <NavLink to={"/update"}> <Button btnName={"Forgot password"} /></NavLink>
              </form>
            </div>
            <div className="card-left">
              <img src="./assets/sign.png" alt="register img" />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default Login;
