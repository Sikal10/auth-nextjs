import User from "../../../../models/userModel";
import protect from "../../../../middlewares/auth";
import {hashPasswordHandler, isMatchPassword} from "../../../../utils/validate";

const handler = async (req, res) => {
    if (req.method !== "POST") return res.status(404).json({message: `Method ${req.method} is not allowed.`});

    const {oldPassword, newPassword} = req.body;
    const authUser = await protect(req, res);

    //check if entered password matches stored password.
    const isPasswordValid = await isMatchPassword(oldPassword, authUser);
    if (!isPasswordValid) return res.status(401).json({message: "Password is incorrect."});

   try {
       const user = await User.findById(authUser._id);
       user.password = await hashPasswordHandler(newPassword);

       await user.save();

       res.status(200).json({message: "password updated."})
   } catch (err) {
       res.status(500).json({message: err.message});
   }
}

export default handler;