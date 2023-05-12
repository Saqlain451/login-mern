import React from "react";
import Button from "../../Component/Button/Button";
import "./register.css";
import { BsFillPersonFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { RiLockPasswordFill } from "react-icons/ri";
import { Si1Password } from "react-icons/si";
import { NavLink, useNavigate } from "react-router-dom";
import { useGlobalHooke } from "../../Hooks/Context";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const { regsterInp, regChangeHandler, isRegErr, errMsg } = useGlobalHooke();
  const navigate = useNavigate();

  const signupHandler = async (e) => {
    e.preventDefault();
    // console.log({ ...regsterInp });
    if (!isRegErr) {
      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...regsterInp }),
      });
      const data = await res.json();

      console.log(data);
      if (data.error) {
        toast.error(data.error, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          theme: "dark",
        });
      } else {
        toast.success(data.msg, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          theme: "dark",
        });
        setTimeout(() => {
          navigate("/login");
        }, 3500);
      }
    }
  };

  return (
    <>
      <div className="register">
        <div className="register-card">
          <div className="register-card2">
            <div className="card-left">
              <img src="./assets/register.png" alt="register img" />
            </div>
            <div className="card-right">
              <form>
                <h1>Sign up</h1>
                <div className="inp-field">
                  <span className="icon">
                    <BsFillPersonFill />
                  </span>
                  <input
                    type="text"
                    placeholder="Name :"
                    autoComplete="off"
                    name="name"
                    value={regsterInp.name}
                    onChange={regChangeHandler}
                  />
                </div>
                {isRegErr ? <p className="err">{errMsg.name}</p> : ""}
                <div className="inp-field">
                  <span className="icon">
                    <GrMail />
                  </span>
                  <input
                    type="email"
                    placeholder="Email id:"
                    autoComplete="off"
                    name="email"
                    value={regsterInp.email}
                    onChange={regChangeHandler}
                  />
                </div>
                <div className="inp-field">
                  <span className="icon">
                    <RiLockPasswordFill />
                  </span>
                  <input
                    type="password"
                    placeholder="Password :"
                    autoComplete="off"
                    name="pass"
                    value={regsterInp.pass}
                    onChange={regChangeHandler}
                  />
                </div>
                {isRegErr ? <p className="err">{errMsg.password}</p> : ""}
                <div className="inp-field">
                  <span className="icon">
                    <Si1Password />
                  </span>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    autoComplete="off"
                    name="cpass"
                    value={regsterInp.cpass}
                    onChange={regChangeHandler}
                  />
                </div>
                {isRegErr ? <p className="err"> {errMsg.cpassword} </p> : ""}
                <div className="btns">
                  <Button btnName={"Sign up"} btnClick={signupHandler} />
                  <NavLink to={"/login"}>
                    <Button btnName={"Sign In"} />
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
