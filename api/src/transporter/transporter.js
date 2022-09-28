const nodemailer = require("nodemailer");
const { DB_EMAIL, DB_PASS } = process.env; 

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: DB_EMAIL, // generated ethereal user
      pass: DB_PASS, // generated ethereal password
    },
  });
  

module.exports = {
  transporter
}
