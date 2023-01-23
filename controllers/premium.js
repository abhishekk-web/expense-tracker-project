const user = require('../models/user');
const expense = require('../models/expense');

exports.leaderBoard = async (req, res) => {

    try {

        const users = await user.findAll();
        const expenses = await expense.findAll();

        const usersArray = [];

        expenses.forEach((expense) => {
            if(usersArray[expense.userId]){
                console.log(usersArray[expense.userId]);
                usersArray[expense.userId] += expense.expense;
                
            }
            usersArray[expense.userId] = expense.expense;
        })

        var userPremiumDetails = [];
        users.forEach((user)=> {
            userPremiumDetails.push({name:user.name, total_cost: usersArray[user.id] || 0});
        })
        // console.log(userPremiumDetails);
        userPremiumDetails.sort((a, b) => b.total_cost - a.total_cost);
        return res.status(200).json({userPremiumDetails});

    }

    catch(err) {
        console.log(err);
    }

}