const express=require('express');
const Expense = require('./models/expense');
const db= require('./config/mongoose');
const fs = require('fs');
const path = require('path');
const http = require('http');
const app=express();
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded());

app.use(express.static('assets'));

// var Expense =[
//     {
//         name: "Pratham",
//         money: 15000
//     },
//     {
//         name:"Shrayansh",
//         money: 40000
//     }
// ]
app.get('/',function(req,res){
    Expense.find({},function(err,Expenses){
        if(err){
            return;
        }
        res.render('home',{
            title: "Expense Manager",
            Expense : Expenses
        });
    });
});

app.post('/add-money/',function(req,res){
    let id=req.query.id;
    var m=parseInt(req.body.addVal);
    var n;
    Expense.findById(id,function(err,dox){
        if(err){
            console.log("error");
        }
        console.log(dox);
        n=parseInt(dox.money);
        console.log("n = ",n);
        console.log("m = ",m);
        var up=parseInt(n+m);
        Expense.findByIdAndUpdate(id,{money:up},function(err,doc){
            if(err){
                console.log("ERROR");
            }
            console.log(doc);
            res.redirect('back');
        });
    });
    
});
app.post('/subtract-money/',function(req,res){
    let id=req.query.id;
    var m=parseInt(req.body.subVal);
    var n;
    Expense.findById(id,function(err,dox){
        if(err){
            console.log("error");
        }
        console.log(dox);
        n=parseInt(dox.money);
        console.log("n = ",n);
        console.log("m = ",m);
        var up=parseInt(n-m);
        Expense.findByIdAndUpdate(id,{money:up},function(err,doc){
            if(err){
                console.log("ERROR");
            }
            console.log(doc);
            res.redirect('back');
        });
    });
});

app.get('/delete/',function(req,res){
    const id=req.query.id;
    console.log(id);
    Expense.findByIdAndDelete(id,function(err){
        if(err){
            console.log("error");
            return;
        }
        return res.redirect('back');
    });
});

app.post('/add-member',function(req,res){
    // console.log(req.body)
    Expense.create({
        name:req.body.name,
        money:req.body.amount
    },function(err,newMember){
        if(err){
            console.log("Error");
            return;
        }
        res.redirect('back');
    });
});

app.listen(5000,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("server is up");
})