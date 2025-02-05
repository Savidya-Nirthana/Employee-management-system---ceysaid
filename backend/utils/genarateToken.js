import jwt from 'jsonwebtoken'
const genarateToken = (res, username) => {
    let token;
    token = jwt.sign({username}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
    try {
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: "strict",
            maxAge: 30*24*60*60*1000
        })
        return token;
    }catch (err) {
        res.status(500).json({message: err});
    }
    return;
}

export default genarateToken;