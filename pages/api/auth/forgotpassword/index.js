import User from "../../../../models/userModel";
import sendEmail from "../../../../utils/sendEmail";
import {signPasswordResetToken} from "../../../../utils/tokens";
import connectDB from "../../../../db/connectDB";

const handler = async (req, res) => {
    await connectDB();
    if (req.method !== "POST") return res.status(400).json({message: `Method ${req.method} is not allowed.`});

    try {
        const {email} = req.body;
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: `User with email ${email} does not exist.`});

        const resetToken = await signPasswordResetToken(user._id)
        user.passwordResetToken = resetToken;
        const resetUrl = `${process.env.CLIENT_URL}/auth/resetpassword/${resetToken}`;

        const message = "reset your password"

       try {
           await user.save();
           await sendEmail(res, "noreply@gmail.com", email, "Password Recovery.", resetUrl, message);
           res.json({message: `Password reset link with instructions has been sent to your mail '${email}'`});
       } catch (err) {
           user.passwordResetToken = undefined;
           await user.save({validateBeforeSave: false});
       }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }

}

export default handler;