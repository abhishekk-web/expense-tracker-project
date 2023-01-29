const expenses = require('../models/expense');
const downloads = require('../models/download');
const S3Services = require('../services/S3services');
const userservice = require('../services/userservices');

exports.postexpense = async(req, res) => {

    const {expense, description, category} = req.body;
    console.log(expense);

    if(expense == undefined || expense.length === 0) {
        return res.status(400).json({success: false, message: "parameters missing"})
    }

    // const userId = req.user;
    // const data = await expenses.create({expense, description, category, userId: req.user.id});
    const data = await req.user.createExpense({expense, description, category});
    res.status(200).json({success: true, message: "expenses successfully added", allData: data});

}

const ITEMS_PER_PAGE = 2;

exports.getexpense = async(req, res, next) => {

    try{

        const page = +req.query.page || 1;
        console.log("page no is "+page);
        var totalItems;

    // const users = req.user;
    // console.log("The user is "+ users);
    await expenses.count({where: {userId: req.user.id}}).then((data)=> {
    totalItems = data;
    return expenses.findAll({where: 
            {userId: req.user.id},
            offset: (page - 1) * ITEMS_PER_PAGE,
            limit: ITEMS_PER_PAGE 
        });
    }).then(datas=>{
    // const data = await expenses.findAll({where: {userId: req.user.id}});
    // const data = await expenses.findAll();
        res.json({
        allData: datas,
        currentPage: page,
        hasnextPage: ITEMS_PER_PAGE * page < totalItems,
        nextPage: +page + 1,
        hasPreviousPage: page > 1,
        previousPage: +page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
        })
        console.log(datas);
    })
    // console.log(data);
    

    }
    catch(err) {
        console.log(err);
        // return res.status(500).json({success: false, error: err});
    }

}

exports.download = async(req, res) => {

    try {

        const expenses = await userservice.getExpenses(req);
        console.log(expenses);
        const stringifiedExpenses = JSON.stringify(expenses);

        const userId = req.user.id;

        const filename = `Expenses${userId}/${new Date()}.txt`;
        const fileURL = await S3Services.uploadToS3(stringifiedExpenses, filename);
        res.status(200).json({fileURL, success: true})
        await downloads.create({fileUrl: fileURL, userId: userId});
        

    }

    catch(err){
        console.log(err);
    }

}

exports.detetePost = async (req, res, next) => {
    
    try {

        const userId = req.params.id;
        console.log(userId);

        if(userId == undefined || userId.length === 0){
            res.status(400).json({success: false})
        }

        const rows = await expenses.destroy({where: {id: userId, userId: req.user.id}})
        if(rows === 0){
            return res.status(404).json({success: false, message: "Expense is not belong to the user"});
        }
        return res.status(200).json({success: true, message: "deleted successfully"});
        
    }

    catch(err) {
        console.log(err);
        res.status(500).json({success: true, message: "failed"});
    }

}

