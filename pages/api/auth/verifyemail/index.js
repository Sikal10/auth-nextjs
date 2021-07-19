import {verifyActivationToken} from "../../../../utils/tokens";
import connectDB from "../../../../db/connectDB";
import User from "../../../../models/userModel";

const handler = async (req, res) => {
    await connectDB();

    if (req.method !== "POST") return res.status(400).json({message: `Method ${req.method} is not allowed.`})

    const {activationToken} = req.body;
    if (!activationToken) return res.status(404).json({message: "Please sign up."});

    try {
        const userData = await verifyActivationToken(activationToken);
        const {name, email, password} = userData;

        const user = await User.create({name, email, password});
        res.status(201).json({message: "Account has been activated", user});
    } catch (err) {
        console.log(err);
    }
}

export default handler;