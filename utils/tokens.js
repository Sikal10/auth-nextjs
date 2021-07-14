import jwt from "jsonwebtoken";

export const signActivationToken = async (user) => {
    return jwt.sign(user, process.env.ACTIVATION_TOKEN_KEY, {expiresIn: process.env.ACTIVATION_TOKEN_EXPIRY})
}

export const verifyActivationToken = async (activationToken) => {
    return jwt.verify(activationToken, process.env.ACTIVATION_TOKEN_KEY)
}

export const signAccessToken = async (userId) => {
    return jwt.sign({id: userId}, process.env.ACCESS_TOKEN_KEY, {expiresIn: process.env.ACCESS_TOKEN_EXPIRY});
}

export const verifyAccessToken = async (accessToken) => {
    return jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
}

export const signRefreshToken = async (userId) => {
    return jwt.sign({id: userId}, process.env.REFRESH_TOKEN_KEY, {expiresIn: process.env.REFRESH_TOKEN_EXPIRY});
}

export const verifyRefreshToken = async (refreshToken) => {
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY)
}