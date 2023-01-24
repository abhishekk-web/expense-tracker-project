const user = require('../models/user');
const expense = require('../models/expense');
const sequelize = require('../utils/database');

exports.leaderBoard = async (req, res) => {

    try {
        const users = await user.findAll({

            attributes: ['id', 'name', [sequelize.fn('sum', sequelize.col('expenses.expense')), 'total_cost']],
            include: [
                {
                    model: expense,
                    attributes: []
                }
            ],
            group: 'user.id',
            order: [['total_cost', "DESC"]]

        });

            console.log(users);
            return res.status(200).json({users});
    }

    catch(err) {
        console.log(err);
    }

}