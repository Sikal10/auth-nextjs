import bcrypt from "bcryptjs";

export const isMatchPassword = async (password, user) => {
    return await bcrypt.compare(password, user.password);
}

export const hashPasswordHandler = async (password) => {
    return await bcrypt.hash(password, 12);
}

export const validateUserData = (name, email, password, res) => {
    if (!name || !email || !password) {
        return res.status(400).json({message: "Please enter all fields."})
    }
}

export const validateLoginUser = (email, password, res) => {
    if (!email || !password) return res.status(400).json({message: "Please enter all fields."})
}