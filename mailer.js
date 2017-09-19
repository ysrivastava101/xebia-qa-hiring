var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: '587',
  auth: { user: 'achauhan@xebia.com', pass: 'adi' },
  secureConnection: false,
  tls: { ciphers: 'SSLv3' }
});

var mailOptions = {
  from: 'achauhan@xebia.com',
  to: 'chauhan.aditya51@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
