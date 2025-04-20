const nodemailer = require('nodemailer');
console.log(process.env.EMAIL_USER + process.env.EMAIL_PASS);
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = async (to_email, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to_email,
        subject: subject,
        text: text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = {
    sendEmail
};

