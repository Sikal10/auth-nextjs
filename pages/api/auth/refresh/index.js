import {signAccessToken, signRefreshToken, verifyRefreshToken} from "../../../../utils/tokens";

const handler = async (req, res) => {
    if (req.method !== "POST") return res.status(400).json({message: `Method ${req.method} is not allowed.`})

    try {
        let {refreshToken} = req.body;
        if (!refreshToken) return res.status(401).json({message: "Unauthorized access. Please try again."});

        let accessToken;
        const decodedRefreshToken = await verifyRefreshToken(refreshToken);
        accessToken = await signAccessToken(decodedRefreshToken.id);
        refreshToken = await signRefreshToken(decodedRefreshToken.id);

        res.status(200).json({success: true, accessToken, refreshToken});
    } catch (err) {
        return res.stats(500).json({message: err.message});
    }

}

export default handler;