const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    // get Token
    const token = req.header("token")

    // Return error if token doesn't exist
    if (!token) {
        return res.status(401).json({ msg: "No Token" });
    }
    console.log("token", token);

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
        console.log("decodedToken", decodedToken);
        if (err) {
            return res.status(401).json({ msg: "Invalid Token"})
        } else {
            req.decodedUser = decodedToken.userData;
            next();
        }
    })
}

module.exports = authMiddleware;