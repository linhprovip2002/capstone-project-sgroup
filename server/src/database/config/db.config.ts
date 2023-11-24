import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const uri = `mongodb://mongo:27017/sGroup`;

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connect successfully!!!");
    } catch (error) {
        console.log(error);
        
        console.log("Connect failure!!!");
    }
}
export default { connect };