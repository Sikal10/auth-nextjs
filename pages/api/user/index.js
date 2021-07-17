import protect from "../../../middlewares/auth";

const handler = async (req, res) => {
    if (req.method !== 'GET') return res.status(404).json({message: `Method ${req.method} is not allowed.`});

    try {
        const user = await protect(req, res);
        res.status(200).json({message: `The profile page for ${user.name}.`});
    } catch (err) {
        res.status(500).json({message: err.message});
    }

}

export default handler;