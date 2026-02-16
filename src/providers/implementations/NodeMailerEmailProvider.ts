import type { IEmailProvider, SendEmailDTO } from "../IEmailProvider";
import nodemailer from "nodemailer";
import { emailConfig } from "@/config/email";
import { AppError } from "@/utils/AppError";

export class NodeMailerEmailProvider implements IEmailProvider {
  private mailer = nodemailer.createTransport({
    port: emailConfig.port,
    host: emailConfig.host,
    from: emailConfig.from,
    auth:{
      user: emailConfig.auth.user,
      pass: emailConfig.auth.pass
    }
  })

  async sendEmail({ to, subject, html, text }: SendEmailDTO): Promise<void> {
    try{
      await this.mailer.sendMail({
        to,
        subject,
        html,
        text
      })

    }catch(err){
      console.log("Error sending email:", err);
      throw new AppError("Failed to send email");
    }
  }
}
