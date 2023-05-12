import React from "react";
import "./home.css";
import Button from "../../Component/Button/Button";
import {useNavigate} from "react-router-dom"
const Home = () => {
  const navigate  = useNavigate();
  return (
    <>
      <div className="home">
        <div className="home-content">
          <h1> Welcome to my simple MERN Project</h1>
          <Button btnName={"See More"} btnClick={()=>{navigate("/login")}}/>
        </div>
      </div>
    </>
  );
};

export default Home;
