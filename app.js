const express = require('express');

const sequelize = require('./utils/database');

const bodyParser = require('body-parser')

const cors = require('cors');

const signUproutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');

const user = require('./models/user');
const expense = require('./models/expense');
const { HasMany } = require('sequelize');

const app = express();

app.use(cors());


app.use(bodyParser.json({extended: false}));

app.use('/user', signUproutes);
app.use('/expense', expenseRoutes);

user.hasMany(expense);
expense.belongsTo(user);


sequelize
// .sync({force:true})
.sync()
.then(result=>{
    console.log(result);
    // https.createServer({key: privateKey, cert: certificate}, app).listen(process.env.PORT || 3000);
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
})