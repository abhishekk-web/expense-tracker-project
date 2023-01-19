const jwt = require('jsonwebtoken');
const user = require('../models/user');

exports.authenticate = async(req, res, next) => {

    try {

    const token = req.header("Authorization");
    console.log(token);
    const userId = jwt.verify(token, "secrets");
    console.log(userId.userId);
    const theUser = await user.findByPk(userId.userId);
    console.log("The users are "+ theUser);
    req.user = theUser;
    console.log(req.user);
    next();

    }

    catch(err) {
        return res.status(400).json({success: false});
    }

}