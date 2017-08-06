const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set("view engine","hbs");
hbs.registerHelper("currentYear" , ()=>{
    return new Date().getFullYear();
});
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.path}`
    console.log(log);
    fs.appendFile('log.txt' , log + '\n', (err)=>{
        console.log('Unable to write to file log.txt');
    });
    next();
});
app.use((req, res, next)=>{
    res.render('maintenance.hbs' , {
        pageTitle: "Maintenance Page"
    });
});
app.use(express.static(__dirname+'/public'));
app.get("/" , (req,res)=>{
    res.render("home" , {
        pageTitle: "Home Page"
    });
});
app.get("/about" , (req,res)=>{
    res.render("about", {
        pageTitle: "About page",
    });
});

app.listen(3000,()=>{
    console.log("Server started, listening on port 3000!");
});
