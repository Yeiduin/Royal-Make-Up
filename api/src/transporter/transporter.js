const nodemailer = require("nodemailer");
require('dotenv').config();
const { DB_EMAIL, DB_PASS } = process.env; 

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: DB_EMAIL,
      pass: DB_PASS,
    },
  });
  

module.exports = {
  transporter
}
