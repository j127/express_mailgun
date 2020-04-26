// This loads the environment variables in your .env file
require("dotenv").config();

// Load the code for interacting with Mailgun's API
const Mailgun = require("mailgun-js");

// This library will make a text version of the HTML email
const htmlToText = require("html-to-text");

// This gets an environment variable, which is hidden in your .env file.
const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;

// This is the domain that you verified in Mailgun
const DOMAIN = process.env.DOMAIN;

const TEST_EMAIL_ADDRESS = process.env.TEST_EMAIL_ADDRESS;
const DEFAULT_FROM_EMAIL = process.env.DEFAULT_FROM_EMAIL;

const mailgun = new Mailgun({ apiKey: MAILGUN_API_KEY, domain: DOMAIN });

/**
 * Send an email
 */
function sendEmail(toEmail, subject, html, fromEmail = DEFAULT_FROM_EMAIL) {
    const textVersion = htmlToText.fromString(html, { wordwrap: 78 });

    const payload = {
        from: fromEmail,
        to: toEmail,
        subject: subject,
        html: html,
        text: textVersion,
    };

    // You can preview the payload here if you want
    console.log(payload);

    mailgun.messages().send(payload, (err, _body) => {
        if (err) {
            console.error("ERROR", err);
        } else {
            console.log(`Sent email to ${toEmail}`);
        }
    });
}

/**
 * Send a test email
 */
function sendTestEmail() {
    const bodyHtml = `
        <h1>Hello World</h1>
        <p>Here is your test email.</p>
        <p><img src="https://placekitten.com/300/300" alt="placekitten image" /></p>
        <ul>
            <li>item 1</li>
            <li>item 2</li>
            <li>item 3</li>
        </ul>
        <p>Here's <a href="https://example.com/">a link</a>.</p>
    `.trim();

    // Run the function above
    sendEmail(TEST_EMAIL_ADDRESS, "Hello World", bodyHtml);
}

sendTestEmail();
