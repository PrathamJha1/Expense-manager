const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Expense_Manager_db');
const db = mongoose.connection;
db.on('error', console.error.bind("error connectiog to db"));
db.once('open', function () {
    console.log("Connected");
});
