
import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config({path:"../.env"});

const userSchema = new mongoose.Schema({
    name : {type : String, require : true},
    email : {type : String, require:true, unique : true},
    pass : {type : String, require:true,},
    cpass : {type : String, require :true},
    tokens : [
        {
            token:{
                type : String,
                require : true
            }
        }
    ]
})


const taskSchema = new mongoose.Schema({
    title : {
        type : String,
        require : true,
    },
    subtitle : {
        type : String,
        require : true,
    }
})



userSchema.pre('save',async function(next){
    if(this.isModified('pass')){
        this.pass = await bcryptjs.hash(this.pass,12);
        this.cpass =await bcryptjs.hash(this.cpass,12);
    }
    next();
})

userSchema.methods.generateToken = async function(){
    try {
        let mytoken = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: mytoken})
         await this.save();
         return mytoken;
    } catch (error) {
        console.log(error);
    }
}

const task = new mongoose.model("task",taskSchema);

const users = new mongoose.model("user",userSchema);
export default users;
export {task};