require('dotenv').config()
const transportconfig = {
    host: "smtp.ukr.net",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
    user: process.env.SSMTP_USER, // generated ethereal user
    pass: process.env.SSMTP_PASS // generated ethereal password
    }
}

    
module.exports = transportconfig;