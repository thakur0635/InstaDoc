const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                res.status(200).send({ success: false, message: "Auth failed" })
            }
            else {
                req.body.userID = decode.id
                next()
            }
        })
    }
    catch (error) {
        console.log(error)
        res.status(401).send({
            success: false,
            message: "Authhhh Failed"
        })
    }
}