import {verifyAccessToken} from "../utils/tokens";
import User from "../models/userModel";
import connectDB from "../db/connectDB";

const protect = async (req, res) => {
    await connectDB();

    let accessToken;
    const authHeaders = req.headers.authorization;

    if (authHeaders && authHeaders.startsWith("Bearer")) {
        accessToken = authHeaders.split(" ")[1];
    }

    //make sure accessToken is sent
    if (!accessToken) return res.status(401).json({message: "Unauthorized access."})

    try {
        const decodedAccessToken = await verifyAccessToken(accessToken);
        const user = await User.findById(decodedAccessToken.id);
        return user;
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
}

export default protect;