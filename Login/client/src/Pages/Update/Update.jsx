import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../../Component/Button/Button";
import { BsFillPersonFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "./update.css";
import { useGlobalHooke } from "../../Hooks/Context";
import { ToastContainer, toast } from "react-toastify";
const Update = () => {
  const navigate = useNavigate();
  const { updateInp, updateHandler } = useGlobalHooke();

  const upDateClickHandler = async (e) => {
    e.preventDefault();
    console.log({ ...updateInp });
    const res = await fetch("/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...updateInp }),
    });

    const data = await res.json();

    if (data.msg) {
      toast.success(data.msg, { theme: "dark" });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else if (data.error) {
      toast.error(data.error, { theme: "dark" });
      setTimeout(() => {
        navigate("/signup");
      }, 3000);
    } else {
      toast.warning(data.err, { theme: "dark" });
    }
  };

  return (
    <>
      <div className="register">
        <div className="register-card ">
          <div className="register-card2 ">
            <div className="card-left">
              <img src="./assets/update.png" alt="register img" />
            </div>
            <div className="card-right">
              <form>
                <h1>
                  Update <br /> Password
                </h1>

                <div className="inp-field">
                  <span className="icon">
                    <BsFillPersonFill />
                  </span>
                  <input
                    type="email"
                    placeholder="Email id:"
                    autoComplete="off"
                    onChange={updateHandler}
                    name="email"
                    value={updateInp.email}
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
                    onChange={updateHandler}
                    name="pass"
                    value={updateInp.pass}
                  />
                </div>

                <div className="btns">
                  <Button btnName={"Update"} btnClick={upDateClickHandler} />
                  <NavLink to={"/login"}>
                    <Button btnName={"Sign In"} />
                  </NavLink>
                </div>
                <Button
                  btnName={"Sign Up"}
                  btnClick={() => {
                    navigate("/signup");
                  }}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Update;
