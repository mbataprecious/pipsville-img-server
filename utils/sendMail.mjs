// const API_KEY = 'YOUR_API_KEY';
// const DOMAIN = 'YOUR_DOMAIN_NAME';
import config from "../config/config.mjs"
import formData from 'form-data'
import Mailgun from 'mailgun.js'
// from: 'Excited User <me@samples.mailgun.org>',
export const sendMail=async (msg,email)=>{
const mailgun = new Mailgun(formData);
const client = mailgun.client({username: 'api', key:config.apiKey});

const messageData = {
  from: '<me@mailloggerorg>',
  to: email,
  subject: 'Admin Logger',
  text: msg
};

return await client.messages.create(config.domain, messageData)
 .then((res) => {
   console.log(res);
 })
 .catch((err) => {
   console.error(err);
 });  
}


