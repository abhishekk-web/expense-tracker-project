const User = require('../models/user');
const bcrypt = require('bcrypt');

function isstringinvalid(string){
    if(string == undefined || string.length === 0){
        return true
    } else {
        return false;
    }
}

exports.signUp = async (req, res) => {

    try {

    const {name, email, password} = req.body;
    console.log("The email is "+email);
    console.log("the name is "+ name);

    if(isstringinvalid(name)|| isstringinvalid(email) || isstringinvalid(password))  {
        console.log("Okay done")
        return res.status(400).json({err: "Bad parameters... something is missing"});
    }

    const saltrounds = 10;

    bcrypt.hash(password, saltrounds, async (err, hash) => {

        await User.create({name, email, password: hash})
        res.status(201).json({message: 'Successfully create new user'});

        })

    }

    catch(err){
        res.status(500).json({message: 'User not created'});
    }
    
}

exports.login = async (req, res) => {

    try{

    const {email, password} = req.body;

    console.log("email is"+ email);

    if(isstringinvalid(email) || isstringinvalid(password))  {
        console.log("Okay done")
        return res.status(400).json({err: "Bad parameters... something is missing"});
    }

    const user = await User.findAll({where: {email}})
    if(user.length > 0) {

            bcrypt.compare(password, user[0].password, (err, result) => {
                
                if(err){
                    throw new Error;
                }
                
                if(result === true){
                    res.status(200).json({success: true, message: "user logged in successfully"});
                }
                else{
                    return res.status(400).json({success: false, message: "password is incorrect"});
            }
        })
    }
    else{
        return res.status(404).json({success: false, message: "User not found"});
    }


    }

    catch(err) {
        console.log(err);
    }

}
