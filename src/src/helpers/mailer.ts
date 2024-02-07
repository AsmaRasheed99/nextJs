import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  console.log( process.env.TRANSPORTER_USER)
  console.log( process.env.TRANSPORTER_PASSWORD)
  console.log(email)
  
  console.log(emailType,userId)
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    var transport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.TRANSPORTER_USER ,
        pass: process.env.TRANSPORTER_PASSWORD,
        //TODO : Add these credentials to env file
      },
    });
    const mailOptions = {
      from: "Asmarasheed4599@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }${emailType === "VERIFY" ? "/verifyemail" : "/forgotpassword"}?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "Verify your email" : "Reset your password" 
      } or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }${emailType === "VERIFY" ? "/verifyemail" : "/forgotpassword"}?token=${hashedToken}</p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
