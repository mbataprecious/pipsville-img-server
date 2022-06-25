import {default as nodemailer} from "nodemailer";
import {default as multiparty} from "multiparty";
import config from "./config/config.mjs";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", //replace with your email provider
  port: 587,
  auth: {
    user: config.email,
    pass: config.password,
  },

});


// verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
      console.log(error,'verification error');
    } else {
      console.log("Server is ready to take our messages");
    }
  });


  export const sendMail= (req, res, next) => {
    //1.
    let form = new multiparty.Form();
    let data = {};
    form.parse(req, function (err, fields) {
      console.log(fields);
      Object.keys(fields).forEach(function (property) {
        data[property] = fields[property].toString();
      });
  
      //2. You can configure the object however you want
      const mail = {
        from: data.name,
        to: config.email,
        subject: "message via from tatishubconnect.com",
        text: `${data.name} <${data.email}> \n${data.message}`,
      };
  
      //3.
      transporter.sendMail(mail, (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send("Something went wrong.");
        } else {
          res.status(200).send("Email successfully sent to recipient!");
        }
      });
    });
  }
  

