import bcrypt from "bcryptjs";

export const isMatchPassword = async (password, user) => {
    const isMatch = await bcrypt.compare(password, user.password);

}

export const hashPasswordHandler = async (password) => {
    return await bcrypt.hash(password, 12);
}