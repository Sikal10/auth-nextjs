import User from "../../../../models/userModel";
import {signActivationToken} from "../../../../utils/tokens";
import {hashPasswordHandler, validateUserData} from "../../../../utils/validate";
import sendEmail from "../../../../utils/sendEmail";
import connectDB from "../../../../db/connectDB";

const handler = async (req, res) => {
    await connectDB();
    if (req.method !== "POST") return res.status(404).json({message: `Method ${req.method} is not allowed.`});

    const {name, email, password} = req.body;

    validateUserData(name, email, password, res);

    const existingUser = await User.findOne({email});
    if (existingUser) {
        return res.status(404).json({message: `User with email ${email} already exists.`});
    }

    const hashedPassword = await hashPasswordHandler(password);

    const user = {name, email, password: hashedPassword};
    const activationToken = await signActivationToken(user);

    const activationUrl = `${process.env.CLIENT_URL}/auth/verifyemail/${activationToken}`;
    const message = "activate your account"
    await sendEmail(res, "noreply@gmail.com", email, "Email Verification", activationUrl, message)

    res.status(200).json({message: "Registration successful. Please activate your email to continue."});
}

export default handler;