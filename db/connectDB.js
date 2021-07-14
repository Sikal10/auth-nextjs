import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        console.log("Already connected".blue.bold.underline);
        return;
    }
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`mongoDB connected ${connection.connection.host}`.blue.underline.bold);
    } catch (err) {
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
}

export default connectDB;