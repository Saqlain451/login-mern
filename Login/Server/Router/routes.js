import express from "express";
import users from "../model/schema.js";
import bcrypt from "bcryptjs";

const router = new express.Router();

// register user using post methode---->

router.post("/register", async (req, res) => {
  const { name, email, pass, cpass } = req.body;

  try {
    if (!name || !email || !pass || !cpass) {
      return res.json({ error: "please fill all the Input field" });
    }
    const existUser = await users.findOne({ email });
    if (existUser) {
      return res.status(422).json({ error: "Email is already registed" });
    } else if (pass != cpass) {
      return res
        .status(422)
        .json({ error: "Password and Confirm Password Should match" });
    }
    const data = new users({ ...req.body });
    await data.save();
    res.json({ msg: "Registered successfully" });
  } catch (error) {
    res.send("error");
  }
});

// log in part --->

router.post("/signin", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const chekUser = await users.findOne({ email });
    const token = await chekUser.generateToken();
    console.log(token);
    res.cookie("jwt", token, {
      expire: new Date(Date.now() + 240000000),
      httpOnly: true,
    });
    // console.log(chekUser.pass, pass);
    const compPass = await bcrypt.compare(pass, chekUser.pass);
    // console.log(compPass);
    chekUser && compPass
      ? res.status(201).json({ msg: "Log in done" })
      : res.status(422).json({ error: "Username or Password does not match" });
  } catch (error) {
    res.status(401).json({ error: "User not found" });
  }
});


// update by using patch methode ----->

router.patch("/update",async (req, res) =>{
  const {email,pass} = req.body;
  try {
    if(!email || !pass){
      return res.json({err:"Please Enter Email and Password"});
    }
    const chekUser = await users.findOne({email});
    if(chekUser){
      const hashedPassword = bcrypt.hashSync(pass, 12);
      await users.updateOne({email:req.body.email},{$set : {pass:hashedPassword, cpass: hashedPassword}})
      res.json({msg : "Update Done. Now Log in"})
    }else{
      res.json({error : "User not found please register"})
    }
  } catch (error) {
    res.json({error : "User not found"})
  }
})


export default router;
