import User from "../../../../models/userModel";
import protect from "../../../../middlewares/auth";
import {hashPasswordHandler, isMatchPassword, validateUpdateUser} from "../../../../utils/validate";

const handler = async (req, res) => {
    if (req.method !== "POST") return res.status(404).json({message: `Method ${req.method} is not allowed.`});

    const authUser = await protect(req, res);

    const {name, oldPassword, newPassword} = req.body;
    validateUpdateUser(name, oldPassword, newPassword, res);


    try {
        const user = await User.findById(authUser._id);
        if (!user) return res.status(500).json({message: "There is no such user."});
        if (name) {
            user.name = name
        }
        if (oldPassword && newPassword) {
            //check if entered password matches stored password.
            const isPasswordValid = await isMatchPassword(oldPassword, authUser);
            if (!isPasswordValid) return res.status(401).json({message: "Password is incorrect."});
            user.password = await hashPasswordHandler(newPassword);
        }

        await user.save();

        res.status(200).json({message: "user updated."})
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

export default handler;