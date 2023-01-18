const expenses = require('../models/expense');

exports.postexpense = async(req, res) => {

    const {expense, description, category} = req.body;
    console.log(expense);

    if(expense == undefined || expense.length === 0) {
        return res.status(400).json({success: false, message: "parameters missing"})
    }

    const data = await expenses.create({expense, description, category});
    res.status(200).json({success: true, message: "expenses successfully added", allData: data});

}

exports.getexpense = async(req, res, next) => {

    try{

    const data = await expenses.findAll();
    console.log("hello world");
    // console.log(data);
    return res.status(200).json({success: true, data});

    }
    catch(err) {
        console.log(err);
        // return res.status(500).json({success: false, error: err});
    }

}

exports.detetePost = async (req, res, next) => {
    
    try {

        const userId = req.params.id;
        console.log(userId);

        if(userId == undefined || userId.length === 0){
            res.status(400).json({success: false})
        }

        await expenses.destroy({where: {id: userId}})
        return res.status(200).json({success: true, message: "deleted successfully"});
        
    }

    catch(err) {
        console.log(err);
        res.status(500).json({success: true, message: "failed"});
    }

}