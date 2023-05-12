import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config("../.env");
console.log();

const mongoConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URL);
    console.log("connected...");
  } catch (error) {
    console.log("not connected.");
  }
};

mongoConnect();

export default mongoConnect;
