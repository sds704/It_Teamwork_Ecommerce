import { config } from 'dotenv';
import mongoose from 'mongoose'

config();

const connectDb = () => {

  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Successfully connected to db"))
    .catch(() => console.log("Failed to connect to db"))
}


export default connectDb;



//     user  ===>  itteamworke5
// password  ===>   6BvxPZ74Sutx34MJ
