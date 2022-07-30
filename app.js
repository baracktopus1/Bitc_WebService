const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const fs = require('fs');
const readline = require("readline");
const Joi = require('joi');
const emailconfig = require('./emailconfig');
const transportconfig = require('./transportconfig');
const https = require('https');
require('dotenv').config()
app.use(express.urlencoded({extended : true}))
const {readFileSync, promises: fsPromises} = require('fs');



const port = process.env.PORT||3000;
app.listen(port, () =>
{
    console.log(`Application operational and listening on port ${port}`)
});
//returns rate of BTC to UAH
app.get('/rate', function(req, res)
{
    https.get(`https://openexchangerates.org/api/latest.json?app_id=${process.env.OPENEXCHANGERATES_APPID}`, (resp) => {
        let data = '';
      
        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          data += chunk;
        });
        // The whole response has been received. Print out the result.
        resp.on('end', () => {

            let rates = JSON.parse(data);
            let rate = rates.rates.UAH/rates.rates.BTC;
            res.status(200).send(`${rate}`);
        
        });
      }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.status(400).send("Invalid status value");
      });
    
});

 //subscribe email for posts
app.post('/subscribe', function(req,res)
{
   
    var body = req.body;
    
    //email adress format validation
    const schema =Joi.object({
        email: Joi.string().email().required()
    });
    const email_validation = schema.validate(body);
    
    if(email_validation.error){
        res.status(400).send(email_validation.error.message);
        return;
    }

    if(isDuplicateMailbox(body.email, 'mailboxes.csv')){
        res.status(409).send('Повертати, якщо e-mail вже є в базі даних (файловій)');
        return;
    }
    else{
        fs.appendFileSync('mailboxes.csv', `\n${body.email}`, function (err) {
            if (err) throw err;
        });
    }
    res.status(200).send('E-mail додано');
});

app.post('/sendEmails', function(req, res)
{
    //repeated code from /rate request. Better would be to use already implemented request.
    function getRate(callback){
        https.get(`https://openexchangerates.org/api/latest.json?app_id=${process.env.OPENEXCHANGERATES_APPID}`, (resp) => {
            let data = '';
        
            // A chunk of data has been received.
            resp.on('data', (chunk) => {
            data += chunk;
            });
            // The whole response has been received. Print out the result.
            resp.on('end', () => {

                let rates = JSON.parse(data);
                rate = rates.rates.UAH/rates.rates.BTC;
                callback(rate)
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
            res.status(400).send("Invalid status value");
        });
    }

    //used callback here
    getRate(function(rate){

    
       
        // create reusable transporter object using the default SMTP transport

        let transporter = nodemailer.createTransport(transportconfig); 
        const stream = fs.createReadStream("mailboxes.csv");
        const rl = readline.createInterface({ input: stream });
        rl.on("line", (row) => {
            sendEmail(row, rate, transporter)
        });
        rl.on("close", () => {
        });
    });
    res.status(200).send("E-mailʼи відправлено");

});

//check if mailbox is already in file
function isDuplicateMailbox(input_mailbox, input_file_path){

    //check if directory exists
    if (!fs.existsSync(input_file_path)) {
        throw 'isDuplicateMailbox: Directory not found.';
    }

    const contents = readFileSync(input_file_path, 'utf-8');

    return contents.toLowerCase().includes(input_mailbox.toLowerCase());
}

function sendEmail(send_to, Rate, transporter){
    //get email configuration from file, set reciever and send email
    var emailconfig_send_options_reciever = emailconfig;

    emailconfig_send_options_reciever.to=send_to;
    emailconfig_send_options_reciever.text = emailconfig_send_options_reciever.text.replace('$$',Rate);
    emailconfig_send_options_reciever.html = emailconfig_send_options_reciever.html.replace('$$',Rate);
    
    return transporter.sendMail(emailconfig_send_options_reciever);
}

