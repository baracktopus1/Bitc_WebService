require('dotenv').config()
const emailconfig = {
    from: `"Bitc_WebService" <${process.env.SSMTP_USER}>`, // sender address
    to: "", // list of receivers (set explicitly in app.js)
    subject: "Current BTC/UAH price", // Subject line
    text: 
    `Greetings!
    Thank you for your interest in my app ☆(>ᴗ•).
    Current BTC/UAH price is:
    $$
    Danylo Vaschchevskyi
    Student at IASA, NTUU KPI
    telegram: https://t.me/vaschchevskyi
    linkedin: https://www.linkedin.com/in/danylo-vaschchevskyi-351105236/
    You recieved this message because you are subscribed to Bitc_WebService.`, 
    // plain text body

    // `$$` is used here as placeholder to replace it with rate later.
    html: 
    `<div style="
    margin-left: 28%;
    border: 6px double #FFB4B4; 
    width:800px; 
    border-radius: 10px;
    align-items: center;
    background-color: #FFF9CA;
    padding-bottom: 0%;">
<h3 style="font-family: 'Cookie', cursive;
    font-size: 60px;
    color: rgb(155, 15, 106);
    text-align: center;
    margin: 30px;">
Greetings!</h3>
<p style ="font-family: 'Kalam', cursive;
    font-size: 20px;
    text-align: center;">
Thank you for your interest in my app ☆(>ᴗ•)</p>

<p style="font-family: 'Kalam', cursive;
    font-size: 20px;
    margin-top: 20px;
    margin-left: 10px;">
<b>Current BTC/UAH price is:</b></p>
<p style="font-family: 'Ubuntu', sans-serif;
    font-size: 50px;
    color: rgb(0, 0, 0);
    text-align: center;
    margin: 20px;
    background-color: #FFDEB4;
    border-radius: 25px;
    border: 2px solid #fac097;">
$$</p>
<div style="background-color: black;
    border-radius: 4px;">
<div style="display: flex;"><div style="width: 80px;
    height: 80px;
    margin: 6px;
    padding: 5px;
    border-radius: 100%;
    background-color: white;
    background-image: url('https://i.ibb.co/5KRMJpd/photo-2022-06-29-00-10-30.jpg');
    
    background-size: 102%;"></div>
<div>
    <div><p style="font-size: 25px;
        color:white; font-family:  'Ubuntu', sans-serif;
        margin: 5px;">Danylo Vaschchevskyi</p>
    <p style="font-size: 10px;
        color:white; font-family:  'Ubuntu', sans-serif;
        margin: 5px;">Student at IASA, NTUU KPI</p></div>
    <div style="display: flex;">
    <a href="https://t.me/vaschchevskyi" style="
    padding: 10px;
    font-size: 10px;
    height: 10px;
    width: 10px;
    text-align: center;
    text-decoration: none;
    margin: 3px;
    background-image: url('https://i.ibb.co/xJMGyFp/telegram-logo-944.png');
    background-size: 100%;" 
    onmouseover="this.style.opacity=0.7" onmouseout="this.style.opacity=1"></a>
    <a href="https://www.linkedin.com/in/danylo-vaschchevskyi-351105236/" style="padding: 10px;
    font-size: 10px;
    width: 10px;
    height: 10px;
    text-align: center;
    text-decoration: none;
    margin: 3px;
    border-radius: 100%;
    background-image: url('https://i.ibb.co/Rv8BpQr/linkedin-logo-png-1837.png');
    background-size: 100%;
    "
    onmouseover="this.style.opacity=0.7" onmouseout="this.style.opacity=1"></a>
</div>
</div>
</div>
<p style="text-align: right;
font-family: 'Kalam', cursive;
font-size: 12px;
margin: 0%;
color:  white;">You recieved this message because you are subscribed to Bitc_WebService.</p>
</div>
</div>

` // html body node app.js

}

module.exports = emailconfig;