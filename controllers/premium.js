const user = require('../models/user');
const expense = require('../models/expense');
const sequelize = require('../utils/database');

exports.leaderBoard = async (req, res) => {

// we are using join here

    try {
        const users = await user.findAll({

            attributes: ['id', 'name', [sequelize.fn('sum', sequelize.col('expenses.expense')), 'total_cost']], // here we are taking the id and name through users table and we took expenses.expense from the model where we define model = expense
            include: [
                {
                    model: expense,
                    attributes: []
                }
            ],
            group: 'user.id', // user.id is like we are taking all the ids so that we can show all users
            order: [['total_cost', "DESC"]]  // it is for sorting the total cost in a descending order

        });

            console.log(users);
            return res.status(200).json({users});
    }

    catch(err) {
        console.log(err);
    }

}