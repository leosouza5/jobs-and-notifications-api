import { env } from "./env.js";

export const emailConfig = {
  host:env.MAIL_HOST,
  port: Number(env.MAIL_PORT),
  from: env.MAIL_FROM,
  auth:{
    user: env.MAIL_USER,
    pass: env.MAIL_PASS
  }
}