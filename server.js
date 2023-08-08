const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const nodemailer = require('nodemailer');
require('dotenv').config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine()

app.get('/api/email', (req, res, next) => {
    res.render('success.html');
})



app.post('/api/email', (req, res, next) => {

    let data = req.body;
    let username = process.env.SMTP_USERNAME;
    let password = process.env.SMTP_PASSWORD;

    const transporter = nodemailer.createTransport({
      host: "ptsclinicilorin.com",
      port: 465,
      secure: true,
      auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: username,
        pass: password
      }
    });

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: req.body.from, // sender address
        to: `${req.body.to}`, // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.message // plain text body
        // html: //use this to send html mail 
      });

      console.log("Message sent: %s", info.messageId);
      res.send('Message sent!!!...');
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      //
      // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
      //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
      //       <https://github.com/forwardemail/preview-email>
      //
    }


  main().catch(console.error);



})

app.listen(5000, () => {
    console.log('server running...')
})
