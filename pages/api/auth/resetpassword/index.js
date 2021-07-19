import {hashPasswordHandler} from "../../../../utils/validate";
import {verifyPasswordResetToken} from "../../../../utils/tokens";
import User from "../../../../models/userModel";
import connectDB from "../../../../db/connectDB";

const handler = async (req, res) => {
    await connectDB();
    if (req.method !== "POST") return res.status(400).json({message: `Method ${req.method} is not allowed.`});

    try {
        const {password, passwordResetToken} = req.body;
        if (!passwordResetToken) return res.status(400).json({message: "Unauthorized access."});

        await verifyPasswordResetToken(passwordResetToken);

        const user = await User.findOne({passwordResetToken});
        if (!user) return res.status(500).json({message: "Expired link. Please request a new password reset link."});

        const hashedPassword = await hashPasswordHandler(password);

        user.password = hashedPassword;
        user.passwordResetToken = "";
        try {
            await user.save();
        } catch (err) {
            return res.status(500).json({message: "Something went wrong, could not process your request. Please try again."});
        }
        res.status(200).json({message: "Password Reset Successful."});
    } catch (err) {
        return res.status(500).json({message: err.message});
    }

}

export default handler;