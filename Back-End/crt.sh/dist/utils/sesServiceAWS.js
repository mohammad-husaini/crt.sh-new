"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const client_ses_1 = require("@aws-sdk/client-ses");
const REGION = "eu-west-2";
const sesClient = new client_ses_1.SESClient({
    region: REGION, credentials: {
        accessKeyId: `${process.env.AWS_ACCESS_KEY}`,
        secretAccessKey: `${process.env.AWS_SECRET_KEY}`,
    }
});
const createSendEmailCommand = (toAddress, fromAddress, emailBody, emailSubject) => {
    return new client_ses_1.SendEmailCommand({
        Destination: {
            ToAddresses: [
                toAddress,
            ],
        },
        Message: {
            Body: {
                Text: {
                    Charset: "UTF-8",
                    Data: emailBody,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: emailSubject,
            },
        },
        Source: fromAddress,
    });
};
const sendEmail = async (dist, emailBody, emailSubject) => {
    const sendEmailCommand = createSendEmailCommand(dist, "cystack@gmail.com", emailBody, emailSubject);
    try {
        return await sesClient.send(sendEmailCommand);
    }
    catch (e) {
        console.error("Failed to send email." + e);
        return e;
    }
};
exports.sendEmail = sendEmail;
