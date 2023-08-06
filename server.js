const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const nodemailer = require('nodemailer')

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/api/email', (req, res, next) => {
    res.send('success')
})



app.post('/api/email', async(req, res, next) => {
    
    let data = req.body;

    let transporter = nodemailer.createTransport({
        host: "mail.destanclassics.com.ng",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: 'test@destanclassics.com.ng',
          pass: 'DanielEsther@100%'
        }
      });

    let info = transporter.sendMail({
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.message
    })

    if(info){
        console.log('mail sent successfully')
    }else(
        console.log('not sents')
    )




})

app.listen(5000, () => {
    console.log('server running...')
})