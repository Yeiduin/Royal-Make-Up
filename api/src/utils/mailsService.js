const { transporter } = require("../transporter/transporter");


async function sendRegistrationEmail(email, subject, body) {
   
    try {

        await transporter.sendMail({
            from: '"Royal Makeup" <royalmakeupbeauty22@gmail.com>',
            to: `${email}`,
            subject: `${subject}`,
            html: `${body}`
        })

    } catch (error) {

        throw error;

    }
}

module.exports = {
    sendRegistrationEmail
}
