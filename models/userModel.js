import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {
        type: String,
        required: [true, "Please add an email."],
        unique: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password."],
        min: 6
    },
    passwordResetToken: String

}, {timestamps: true});

UserSchema.plugin(uniqueValidator);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;