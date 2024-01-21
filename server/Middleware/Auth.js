const { verify } = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
    const accesstoken = req.headers.accesstoken;

    if (!accesstoken) {
        return res.json({ msg: "login" });
    }
    try {
        const verifyToken = verify(accesstoken, "UltraInstinct");
        
        if (verifyToken) {
            req.user = verifyToken;

            return next();
        }
        else {
            return res.json({ err: "Invalid User!" })
        }
    }
    catch (error) {
        return res.json({ err: error.message });

    }

}
module.exports = { validateToken }