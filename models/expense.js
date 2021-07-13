const mongoose = require('mongoose');
const expenseSchema= mongoose.Schema({
    name:{
        type: String ,
        required : true
    },
    money:{
        type:  Number,
        required :true
    }
});
const Expense = mongoose.model('Expense',expenseSchema);
module.exports = Expense;