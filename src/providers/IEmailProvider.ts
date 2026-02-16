export interface SendEmailDTO {
  to: string
  subject: string
  html: string
  text?: string
}

export interface IEmailProvider {
  sendEmail(data: SendEmailDTO): Promise<void>
}
