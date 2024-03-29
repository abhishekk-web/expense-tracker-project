const express = require('express');

const sequelize = require('./utils/database');

const bodyParser = require('body-parser')
const dotenv = require('dotenv');

const cors = require('cors');

const signUproutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');
const resetRoutes = require('./routes/reset');

const user = require('./models/user');
const expense = require('./models/expense');
const order = require('./models/purchase');
const reset = require('./models/reset');
const download = require('./models/download');
// const { HasMany } = require('sequelize');

const app = express();

app.use(cors());
dotenv.config();

app.use(bodyParser.json({extended: false}));



app.use('/user', signUproutes);
app.use('/expense', expenseRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premium', premiumRoutes);
app.use('/password', resetRoutes);

user.hasMany(expense);
expense.belongsTo(user);

user.hasMany(order);
order.belongsTo(user);

user.hasMany(reset);
reset.belongsTo(user);

user.hasMany(download);
download.belongsTo(user);

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