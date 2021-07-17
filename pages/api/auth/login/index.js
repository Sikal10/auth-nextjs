import connectDB from "../../../../db/connectDB";
import User from "../../../../models/userModel";
import {isMatchPassword, validateLoginUser} from "../../../../utils/validate";
import {signAccessToken, signRefreshToken} from "../../../../utils/tokens";

connectDB();

const handler = async (req, res) => {
    if (req.method !== "POST") return res.status(404).json({message: `Method ${req.method} not allowed.`});

    try {
        const {email, password} = req.body;

        validateLoginUser(email, password, res);

        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: `user with the email ${email} does not exist.`});

        //check if the unhashed password matches the password stored in the database
        const isPasswordValid = password === user.password;
        if (!isPasswordValid) return res.status(400).json({message: "Password is not valid. Please try again!"});

        const accessToken = await signAccessToken(user._id);
        const refreshToken = await signRefreshToken(user._id);

        res.status(200).json({success: true, user: {accessToken, refreshToken}});
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

export default handler;