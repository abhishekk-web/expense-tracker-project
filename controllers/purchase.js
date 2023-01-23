const Order = require('../models/purchase');
const user = require('../models/user');
const userController = require('./user');
const Razorpay = require('razorpay');

exports.premium = async (req, res) => {

    try {

        var rzp = new Razorpay ({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })

        const amount = 2500;

        rzp.orders.create({amount, currency: "INR"}, async (err, order) => {

            try {
            
                if(err){
                    console.log(err);
                }
                console.log("The user id is "+ req.user);
                const status = await Order.create({orderid: order.id, status: 'Pending', userId: req.user.id});
                // console.log(status);
                return res.status(200).json({status, key_id: rzp.key_id})

            }

            catch(err) {
                console.log(err);
            }
            
        })

    }

    catch(err) {
        console.log(err);
    }

}

exports.updateTrans = async (req, res) => {

    try {        
        
        const userId = req.user.id;
        const {payment_id, order_id} = req.body;
        console.log("the req.body is "+ order_id);
        console.log("the payment is "+ payment_id);
        const order = await Order.findOne({where: {orderid: order_id}})
        console.log("the first order is "+order);
        const promise1 = order.update({paymentid: payment_id, status: 'Successful'});
        const promise2 = req.user.update({isPremiumUser: true});

        Promise.all([promise1, promise2]).then(()=> {

            return res.status(200).json({success: true, message: "Transaction successful", token: userController.generateAccessToken(userId, undefined, true)});
            
        }).catch((err)=>{
            throw new Error(err);
        })
        
        }

    catch(err){
        res.status(500).json({sucess: false, message: "transaction failed"});
    }

}