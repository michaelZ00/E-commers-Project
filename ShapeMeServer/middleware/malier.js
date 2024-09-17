const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user: process.env.MAILER_AUTH_USER_NAME,
    pass: process.env.MAILER_AUTH_PASSWORD
  }
})

module.exports = {transporter};