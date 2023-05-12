import React, { useContext, useState } from "react";
import {useNavigate} from "react-router-dom"
import {toast } from 'react-toastify';
// create useContext
const appContext = React.createContext();

const AppProvider = ({ children }) => {

  
  // register state ----->

  const [regsterInp, setRegisterInp] = useState({
    name: "",
    email: "",
    pass: "",
    cpass: "",
  });

  //   register error
  const [isRegErr, setIsRegError] = useState(false);
  // error msg state -->
  const [errMsg, seterrMag] = useState({
    name: "",
    mail: "",
    password: "",
    cpassword: "",
  });

  const regChangeHandler = (e) => {
    const { name, value } = e.target;
    setRegisterInp({ ...regsterInp, [name]: value });
    // add validation -->
    if (regsterInp.name.length < 3) {
      setIsRegError(true);
      seterrMag({
        name: "Name should have atleast 3 character",
        mail: "",
        password: "",
        cpassword: "",
      });
    } else if (regsterInp.pass.length < 8) {
      setIsRegError(true);
      seterrMag({
        name: "",
        mail: "",
        password: "Password should have atleast 8 character",
        cpassword: "",
      });
    } else if (regsterInp.cpass.length < 8) {
      setIsRegError(true);
      seterrMag({
        name: "",
        mail: "",
        password: "",
        cpassword: "Confirmed Password should have atleast 8 character",
      });
    } else {
      setIsRegError(false);
    }
  };


 

  //   login state --------------------------------------------->

  const [loginInp, setLogInp] = useState({
    email: "",
    pass: "",
  });

  const [islogerr, setIsloginerr] = useState({
    mail: false,
    pass: false,
  });

  const loginChangeHandler = (e) => {
    const { name, value } = e.target;
    setLogInp({ ...loginInp, [name]: value });
    // validation --->
    if (loginInp.email.indexOf("@") == -1) {
      setIsloginerr({
        mail: true,
        pass: false,
      });
    } else if (loginInp.pass.length < 8) {
      setIsloginerr({
        mail: false,
        pass: true,
      });
    } else {
      setIsloginerr({
        mail: false,
        pass: false,
      });
    }
  };

  const loginClickHandler = async (e)=>{
    e.preventDefault();
    console.log({...loginInp})
    if(!islogerr.mail && !islogerr.pass){
    const res = await fetch("/signin",{
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({...loginInp}),
    })
    const data = await res.json();
    // console.log(data);
    if(data.error){
      toast.error(data.error,{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "dark"});
    }else{
      toast.success("Log in successful",{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "dark"});
    }
  }
  }


  // -------- update state page --------->

  const [updateInp, setUpdateInp] = useState({
    email : "",
    pass : "",
  })

  const updateHandler = (e)=>{
    const {name, value} = e.target;
    setUpdateInp({...updateInp,[name]:value})
  }

  

  return (
    <appContext.Provider
      value={{
        regsterInp,
        regChangeHandler,
        isRegErr,
        errMsg,
        loginInp,
        loginChangeHandler,
        islogerr,
        loginClickHandler,
        updateInp,
        updateHandler,
        
      }}
    >
      {children}
    </appContext.Provider>
  );
};

const useGlobalHooke = () => useContext(appContext);
export { useGlobalHooke, AppProvider };
